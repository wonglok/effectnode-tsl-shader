import { Handle, Position, useEdges, useNodeId, useNodes } from '@xyflow/react';
import { EachPatch, getActiveO3D, useApp, useStoreOfApp } from '../../CanvasEditor/AppContext';

import { HexAlphaColorPicker } from 'react-colorful';

export function ColorEditor({ data, id, ...others }: any) {
    let renderTree = useApp((r) => r.renderTree);

    let patches = useApp((r) => r.patches);
    let useMyStore = useStoreOfApp();

    let activeNodeHash = data.activeNodeHash;

    let nodes = useNodes();
    let edges = useEdges();
    let nodeId = useNodeId();
    let edge = edges.find((r) => r.source === nodeId);

    return (
        <div className='flex flex-col items-start justify-center border rounded-2xl pb-3 bg-[rgba(255,255,255,0.5)]'>
            {/*  */}

            <div className='drag-handle__custom hover:bg-gray-100 w-full '>
                <div className='relative p-3 w-full'>
                    <div className='text-center w-full'>Color</div>
                    <div className='text-center w-full'>{edge?.targetHandle}</div>
                    <Handle style={{ width: '13px', height: '13px' }} position={Position.Left} type='source' id={'color'}></Handle>
                </div>
            </div>

            <div>
                <div
                    onPointerDownCapture={(ev) => {
                        ev.stopPropagation();
                    }}
                    className='mx-2 border rounded-2xl touch-manipulation'
                    style={{ backgroundColor: `${data?.color}` }}
                >
                    <HexAlphaColorPicker
                        color={data.color}
                        onChange={(hexColor) => {
                            data.color = hexColor;

                            useMyStore.setState({
                                patches: patches.map((pat: EachPatch) => {
                                    if (pat._id === activeNodeHash) {
                                        return {
                                            ...pat,
                                        };
                                    }
                                    return { ...pat };
                                }),
                            });
                        }}
                    ></HexAlphaColorPicker>
                </div>
            </div>
        </div>
    );
}
