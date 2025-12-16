import { Handle, Position, useEdges, useNodeId, useNodes } from '@xyflow/react';
import { EachPatch, getActiveO3D, useApp, useStoreOfApp } from '../../CanvasEditor/AppContext';
import { Input } from '../../../ui/input';
// import { HexAlphaColorPicker } from 'react-colorful';

export function NumberEditor({ data, ...others }: any) {
    // let renderTree = useApp((r) => r.renderTree);

    let patches = useApp((r) => r.patches);
    let useMyStore = useStoreOfApp();

    let activeNodeHash = data.activeNodeHash;

    let nodes = useNodes();
    let edges = useEdges();
    let nodeId = useNodeId();

    let edge = edges.find((r) => r.source === nodeId);

    return (
        <div className='flex flex-col items-start justify-center border rounded-2xl pb-3 bg-[rgba(255,255,255,0.5)]'>
            <div className='drag-handle__custom hover:bg-gray-100 w-full '>
                <div className='relative p-3 w-full'>
                    <div className='text-center w-full'>Number</div>
                    <div className='text-center'>{edge?.targetHandle}</div>
                    <Handle style={{ width: '13px', height: '13px' }} position={Position.Left} type='source' id={'value'}></Handle>
                </div>
            </div>

            <div>
                <div
                    onPointerDownCapture={(ev) => {
                        ev.stopPropagation();
                    }}
                    className='mx-2 border rounded-2xl touch-manipulation'
                >
                    <Input
                        value={data.value}
                        onChange={({ target: { value } }) => {
                            data.value = value;

                            useMyStore.setState({
                                patches: patches.map((pat: EachPatch) => {
                                    if (pat?._id === activeNodeHash) {
                                        return JSON.parse(JSON.stringify(pat));
                                    }
                                    return { ...pat };
                                }),
                            });
                        }}
                    ></Input>
                    <div className='py-3 px-3'>
                        <input
                            type='range'
                            className='w-full'
                            min={typeof data.min === 'number' ? data.min : -1}
                            max={typeof data.max === 'number' ? data.max : 1}
                            step={0.001}
                            value={data.value}
                            onChange={({ target: { value } }) => {
                                console.log(value);
                                data.value = value;

                                useMyStore.setState({
                                    patches: patches.map((pat: EachPatch) => {
                                        if (pat?._id === activeNodeHash) {
                                            return JSON.parse(JSON.stringify(pat));
                                        }
                                        return { ...pat };
                                    }),
                                });
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
}
