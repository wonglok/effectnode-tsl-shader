'use client';

import { DayTimeControls, EnvLight, OrbitSunControls } from '../CanvasTSL/EffectsSSGI';
import { CanvasTSL } from '../CanvasTSL/CanvasTSL';
import { useApp, useStoreOfApp } from './AppContext';
import { RenderOptions } from '../CanvasTSL/RenderOptions';
import { HDRSearch } from '../HDRSerach/HDRSearch';
import { SceneGraphGUI } from '../SceneGraph/SceneGraphGUI';
import { EditGraph } from '../SceneGraph/EditGraph';
import { ApplyGraphToScene } from '../SceneGraph/ApplyGraphToScene';
import { CircleXIcon } from 'lucide-react';
import { useEffect } from 'react';
import { CameraControls } from '@react-three/drei';

export function EditorGUI({}: {}) {
    //

    let hdrURL = useApp((r) => r.hdrURL);
    let activeNodeHash = useApp((r) => r.activeNodeHash);

    let useMyStore = useStoreOfApp();

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('activeNodeHash', { detail: { activeNodeHash } }));
    }, [activeNodeHash]);
    return (
        <>
            <div className='w-full h-full relative flex'>
                {/* <div className='w-[285px] h-full  bg-gray-100'>Left</div> */}
                <div className=' h-full shrink-0' style={{ width: `calc(100% - 285px * 1)` }}>
                    <div className='bg-gray-100' style={{ height: `calc(35px)` }}></div>
                    <div className='w-full relative flex' style={{ height: `calc(100% - 35px * 2)` }}>
                        {activeNodeHash && (
                            <div className='relative' style={{ width: `40%`, height: `100%` }}>
                                <EditGraph></EditGraph>
                                <div className=' absolute top-2 right-2'>
                                    <button
                                        className='cursor-pointer'
                                        onClick={() => {
                                            //
                                            useMyStore.setState({
                                                activeNodeHash: '',
                                            });
                                        }}
                                    >
                                        <CircleXIcon color='red' className='size-8 ml-2'></CircleXIcon>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className='relative' style={activeNodeHash ? { width: `calc(100% - 40%)`, height: `100%` } : { width: `100%`, height: `100%` }}>
                            <CanvasTSL>
                                {hdrURL && <EnvLight hdrURL={hdrURL}></EnvLight>}

                                <CameraControls></CameraControls>

                                <ApplyGraphToScene></ApplyGraphToScene>

                                {/*  */}
                            </CanvasTSL>

                            <div className=' absolute top-3 left-3'>
                                <SceneGraphGUI></SceneGraphGUI>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-100' style={{ height: `calc(35px)` }}></div>
                </div>
                <div className='w-[285px] overflow-y-scroll h-full  bg-gray-100'>
                    <div className='p-2'>
                        <div className='mb-1'>
                            <DayTimeControls show={true}></DayTimeControls>
                        </div>
                        <div className='mb-1'>
                            <OrbitSunControls show={true}></OrbitSunControls>
                        </div>
                        <div className='mb-1'>
                            <RenderOptions></RenderOptions>
                        </div>

                        <div className='mb-1'>
                            <HDRSearch
                                onHDR={(val) => {
                                    console.log(`${val.hdr.cdn}${val.hdr.hdr}`);

                                    useMyStore.setState({
                                        hdrURL: `${val.hdr.cdn}${val.hdr.hdr}`,
                                    });
                                }}
                            ></HDRSearch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
