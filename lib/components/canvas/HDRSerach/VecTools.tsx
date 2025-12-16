import localforage from 'localforage';
import PipelineSingleton from './Pipeline';
import * as zip from '@zip.js/zip.js';
import { hashAddress } from './hash-address';

interface VectorEntry {
    str: string;
    vector: number[];
    vectorMagnitude: number;
    hash: string;
}
type ResultVDB = { entry: VectorEntry; score: number };

let embedCache = localforage.createInstance({
    name: 'embeddings',
});

let fileBinCache = localforage.createInstance({
    name: 'fileBinCache',
});
let CDN_ADDRESS = `https://d2upc1jytt7esc.cloudfront.net`;

export class VecTools {
    //
    static async onSearchHDR(queryText: string) {
        let embeddingsData;

        embeddingsData = await embedCache.getItem('raw-embed');
        if (!embeddingsData) {
            embeddingsData = await VecTools.loadEmbeddings();
            embedCache.setItem('raw-embed', embeddingsData);
        }

        let rerank = await VecTools.rerankEntries(embeddingsData, queryText);

        // let hashAddress = await import('./hash-address').then((r) => r.hashAddress);

        let imagesInfo = rerank.slice(0, 12).map((r) => {
            return {
                ...(hashAddress.find((h) => r.entry.hash === h.hash) || {}),
                cdn: CDN_ADDRESS,
            };
        });

        return imagesInfo;
    }

    static async loadEmbeddings() {
        //
        let locationURL = `${CDN_ADDRESS}/resource/embed-hdr-zip/hash-vector.zip`;
        let arrayBuffer = (await fileBinCache.getItem(locationURL)) as ArrayBuffer;

        if (!arrayBuffer) {
            arrayBuffer = (await fetch(locationURL, {
                method: 'GET',
                mode: 'cors',
            })
                .then((r) => {
                    return r.blob();
                })
                .then(async (blob) => {
                    let ab = await blob.arrayBuffer();

                    await fileBinCache.setItem(locationURL, ab);

                    return ab;
                })) as ArrayBuffer;
        }

        let blob = new Blob([arrayBuffer], {});

        const zipFileReader = new zip.BlobReader(blob);
        const zipReader = new zip.ZipReader(zipFileReader);
        const firstEntry = (await zipReader.getEntries()).shift();

        if (firstEntry) {
            const textWriter = new zip.TextWriter();
            const rawTextOutput = await (firstEntry as any).getData(textWriter); /*  */
            await zipReader.close();

            let data = JSON.parse(rawTextOutput);

            return data;
        }
    }

    static calculateSimilarityScores(entries: VectorEntry[], queryVector: any[], queryMagnitude: number): ResultVDB[] {
        return entries
            .filter((entry) => {
                if (!entry.vector) {
                    return false;
                }

                return true;
            })
            .map((entry: any) => {
                let dotProduct = 0;

                for (let i = 0; i < entry.vector.length; i++) {
                    dotProduct += entry.vector[i] * queryVector[i];
                }

                if (!entry.vectorMagnitude) {
                    entry.vectorMagnitude = VecTools.calculateMagnitude(entry.vector);
                }

                // console.log(entry.vectorMagnitude)
                let score = VecTools.getCosineSimilarityScore(dotProduct, entry.vectorMagnitude, queryMagnitude);
                score = VecTools.normalizeScore(score); // Normalize the score
                return { entry, score };
            });
    }

    static calculateMagnitude(embedding: number[]): number {
        let sumOfSquares = 0;
        for (const val of embedding) {
            sumOfSquares += val * val;
        }
        return Math.sqrt(sumOfSquares);
    }

    static getCosineSimilarityScore(dotProduct: number, magnitudeA: number, magnitudeB: number): number {
        return dotProduct / (magnitudeA * magnitudeB);
    }

    static normalizeScore(score: number): number {
        return (score + 1) / 2;
    }

    static async rerankEntries(entries = [], query = '') {
        const [queryEmbedding] = await VecTools.getEmbeddingsInBrowser([query]);

        const queryMagnitude = VecTools.calculateMagnitude(queryEmbedding);

        const scores = VecTools.calculateSimilarityScores(entries, queryEmbedding, queryMagnitude);
        const sorted = scores.sort((a, b) => b?.score - a?.score);
        return sorted;
    }

    static async getEmbeddingsInBrowser(listText: string[] = []) {
        try {
            // Get the classification pipeline. When called for the first time,
            // this will load the pipeline and cache it for future use.
            const classifier = await (PipelineSingleton as { getInstance: () => any }).getInstance();

            // Actually perform the classification
            const result = await classifier(listText, {
                pooling: 'mean',
                normalize: true,
            });

            let res = result.tolist();

            return res;
        } catch (error) {
            throw error;
        }
    }
}
