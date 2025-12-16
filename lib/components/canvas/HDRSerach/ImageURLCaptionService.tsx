'use client';

const P = () =>
    class ImageCaption {
        static task = 'image-to-text';
        // static model = "Xenova/all-MiniLM-L6-v2";
        static model = 'Xenova/vit-gpt2-image-captioning';

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

/*

    const captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
    const url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg';
    const output = await captioner(url);

*/

let ImageURLCaptionService: any;
if (process.env.NODE_ENV !== 'production') {
    // When running in development mode, attach the pipeline to the
    // global object so that it's preserved between hot reloads.
    // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
    if (!(global as any).ImageURLCaptionService) {
        (global as any).ImageURLCaptionService = P();
    }
    ImageURLCaptionService = (global as any).ImageURLCaptionService;
} else {
    ImageURLCaptionService = P();
}

export { ImageURLCaptionService };
