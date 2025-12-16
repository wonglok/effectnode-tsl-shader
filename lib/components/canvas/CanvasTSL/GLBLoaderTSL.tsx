'use client';

import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
// @ts-ignore
import md5 from 'md5';
import { annotateGLTFWithHashes } from '../PatchTSL/annotateGLTFWithHashes';

//

export function GLBLoaderTSL({ src, shadow = true }: { shadow?: boolean; src: string }) {
    let glb = useGLTF(src);
    glb.scene = useMemo(() => {
        return clone(glb.scene) as any;
    }, [glb?.scene?.uuid]);

    // let [outlet, setOutlet] = useState<any>({
    //     glb: null,
    //     display: null,
    // });

    useEffect(() => {
        let run = async () => {
            annotateGLTFWithHashes(glb);

            // let glb = await glbLoader.loadAsync(`${src}`);

            if (shadow) {
                glb.scene.traverse((it: any) => {
                    if (it.geometry) {
                        it.castShadow = true;
                        it.receiveShadow = true;
                    }
                });
            }

            glb.scene.userData.isEnv = true;

            glb.scene.traverse((it: any) => {
                let hideList = ['roof', 'glass', 'wind', 'plastic', 'transparent']; // , 'planks', 'ceiling'

                for (let eachHide of hideList) {
                    if (it.material?.name?.toLowerCase().includes(eachHide)) {
                        // it.visible = true;
                        it.castShadow = false;
                        it.receiveShadow = false;
                    }

                    if (it?.name?.toLowerCase().includes(eachHide)) {
                        // it.visible = true;
                        it.castShadow = false;
                        it.receiveShadow = false;
                    }
                }

                if (it.isLight) {
                    if (!it.userData.originalIntensity) {
                        it.userData.originalIntensity = it.intensity;
                    }
                    if (!it.userData.isLight) {
                        it.userData.isLight = true;
                    }
                }
            });

            // setOutlet({
            //     glb,
            //     display: <primitive object={glb.scene}></primitive>,
            // });
        };
        run();

        return () => {
            //
            //
        };
    }, [glb, shadow]);

    return (
        <>
            {/*  */}
            <group>
                <primitive object={glb.scene}></primitive>
            </group>

            {/*  */}
        </>
    );
}
