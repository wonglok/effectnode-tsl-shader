'use client';

import * as THREE from 'three/webgpu';
import { Canvas, extend, type ThreeToJSXElements } from '@react-three/fiber';
import { DRACOLoader, GLTFLoader, HDRLoader } from 'three/examples/jsm/Addons.js';
import { useRef } from 'react';
declare module '@react-three/fiber' {
    interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as any);

export let rgbeLoader = new HDRLoader();

let draco = new DRACOLoader();
draco.setDecoderPath(`/assets/draco/`);
export let glbLoader = new GLTFLoader();
glbLoader.setDRACOLoader(draco);

export const CanvasTSL: any = ({ children }: { children?: any }) => {
    //
    let ref = useRef<HTMLDivElement>(null);
    //

    // let dpr = typeof window !== 'undefined' ? window?.devicePixelRatio || 1 : 1;

    // if (dpr >= 2) {
    //     dpr = dpr / 2;
    // } else if (dpr > 1) {
    //     dpr = 1;
    // }

    // if (render === 'bloom') {
    //     dpr = typeof window !== 'undefined' ? window?.devicePixelRatio || 1 : 1;
    // }

    return (
        <>
            <div className='w-full h-full relative' ref={ref}>
                <Canvas
                    //
                    // dpr={[1, dpr]}
                    shadows='soft'
                    gl={async (props: any): Promise<any> => {
                        const renderer = new THREE.WebGPURenderer({
                            multiview: true,
                            ...(props as any),
                            antialias: true,
                            alpha: true,
                            depth: true,
                            toneMapping: THREE.NoToneMapping,
                            // multiview: true,
                            requiredLimits: {
                                //
                                // maxColorAttachmentBytesPerSample: 40,
                                maxColorAttachmentBytesPerSample: 60,
                                //
                                //
                            },
                        });

                        await renderer.init();

                        if (ref.current) {
                            let rect = ref.current.getBoundingClientRect();
                            renderer.setSize(rect.width, rect.height, true);
                        }

                        // renderer.setPixelRatio(dpr);

                        renderer.shadowMap.enabled = true;
                        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

                        // SunlightObject.configureShadow({ renderer: renderer });

                        return renderer;
                    }}
                >
                    {/* <EffectsSSGI></EffectsSSGI> */}
                    {children}
                </Canvas>
            </div>
        </>
    );
};
