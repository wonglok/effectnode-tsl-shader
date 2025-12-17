'use client';

import { CanvasTSL } from '../CanvasTSL/CanvasTSL';
import { useApp, useStoreOfApp } from './AppContext';
import { ApplyGraphToScene } from '../VFXGraph/ApplyGraphToScene';
import { Suspense, useEffect } from 'react';
import { CameraControls, Sphere } from '@react-three/drei';
import { RoomLighting } from '../CanvasTSL/RoomLighting';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { NodeList } from '../VFXGraph/NodeList';
import { VFXGraph } from '../VFXGraph/VFXGraph';
import { DnDProvider } from '../VFXGraph/DnDContext';
import { ReactFlowProvider } from '@xyflow/react';

//

export function EditorGUI({}: {}) {
    //

    let activeNodeHash = useApp((r) => r.activeNodeHash);

    let useMyStore = useStoreOfApp();

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('activeNodeHash', { detail: { activeNodeHash } }));
    }, [activeNodeHash]);

    return (
        <>
            <DnDProvider>
                <ReactFlowProvider>
                    <div className='w-full h-full relative flex'>
                        <div className=' h-full shrink-0 border-r' style={{ width: `calc(250px)` }}>
                            <NodeList></NodeList>
                        </div>
                        <div className=' h-full shrink-0 border-r' style={{ width: `calc(100% - 350px - 250px)` }}>
                            <VFXGraph></VFXGraph>
                        </div>
                        <div className='w-[350px] shrink-0 overflow-y-scroll h-full  bg-gray-100'>
                            <div className='h-full w-full'>
                                <div className='mb-1 h-[350px]'>
                                    <CanvasTSL>
                                        <Suspense fallback={null}>
                                            <ApplyGraphToScene></ApplyGraphToScene>
                                        </Suspense>

                                        <RoomLighting></RoomLighting>

                                        <CameraControls></CameraControls>

                                        <Sphere scale={2}>
                                            <meshStandardMaterial></meshStandardMaterial>
                                        </Sphere>
                                        {/*  */}
                                    </CanvasTSL>
                                </div>
                                <div className='w-full' style={{ height: `calc(100% - 350px)` }}>
                                    <div className='w-full h-full'>
                                        <CodeEditor></CodeEditor>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactFlowProvider>
            </DnDProvider>
        </>
    );
}
