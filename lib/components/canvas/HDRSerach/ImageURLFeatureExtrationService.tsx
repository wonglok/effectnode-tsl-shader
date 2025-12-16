'use client';

const P = () => {
    return class AICore {
        static task = 'image-feature-extraction';
        // static model = 'Xenova/vit-base-patch16-224-in21k';
        static model = 'Xenova/clip-vit-base-patch32';

        //

        // package
        // "@xenova/transformers": "^2.4.2",
        //
        static instance = null;

        static async getInstance(progress_callback: any = null) {
            if (AICore.instance === null) {
                let res = await (window as any).rempteImport(location.origin + '/ai/transformer-3.7.6/dist/transformers.min.js').then((r: any) => r);
                let pipeline = res.pipeline;
                AICore.instance = pipeline(AICore.task as any, AICore.model, { progress_callback }) as any;
            }
            return AICore.instance;
        }
    };
};

/*
const image_feature_extractor = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32');
const url = 'https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/cats.png';
const features = await image_feature_extractor(url);
*/

let ImageURLFeatureExtrationService: any;
if (process.env.NODE_ENV !== 'production') {
    // When running in development mode, attach the pipeline to the
    // global object so that it's preserved between hot reloads.
    // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
    if (!(global as any).ImageURLFeatureExtrationService) {
        (global as any).ImageURLFeatureExtrationService = P();
    }
    ImageURLFeatureExtrationService = (global as any).ImageURLFeatureExtrationService;
} else {
    ImageURLFeatureExtrationService = P();
}

export { ImageURLFeatureExtrationService };

//

//

//

//
