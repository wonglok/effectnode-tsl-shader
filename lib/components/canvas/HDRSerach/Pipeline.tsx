'use client';

// import { pipeline } from '@huggingface/transformers';

// env.useFS = false;
// env.useFSCache = false;
// env.useBrowserCache = true;

// import { pipeline } from '@huggingface/transformers';

//@huggingface/transformers

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const P = () =>
    class PipelineSingleton {
        static task = 'feature-extraction';
        // static model = "Xenova/all-MiniLM-L6-v2";
        static model = 'Xenova/nomic-embed-text-v1';

        // package
        // "@xenova/transformers": "^2.4.2",
        //
        static instance = null;

        static async getInstance(progress_callback: any = null) {
            if (this.instance === null) {
                let res = await (window as any).rempteImport(location.origin + '/ai/transformer-3.7.6/dist/transformers.min.js').then((r: any) => r);
                let pipeline = res.pipeline;
                this.instance = pipeline(this.task as any, this.model, { progress_callback }) as any;
            }
            return this.instance;
        }
    };

let PipelineSingleton: any;
if (process.env.NODE_ENV !== 'production') {
    // When running in development mode, attach the pipeline to the
    // window object so that it's preserved between hot reloads.
    // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
    if (!(window as any).PipelineSingleton) {
        (window as any).PipelineSingleton = P();
    }
    PipelineSingleton = (window as any).PipelineSingleton;
} else {
    PipelineSingleton = P();
}

export default PipelineSingleton;
