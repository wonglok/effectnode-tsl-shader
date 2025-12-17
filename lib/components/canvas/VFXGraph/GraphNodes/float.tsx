import { Handle, Position, useEdges, useNodeId, useNodes } from '@xyflow/react';
import { EachEdge, EachNode, useStoreOfApp } from '../../CanvasEditor/AppContext';
import { Input } from '../../../ui/input';

export const name = 'float';
export default function NodeCompo({ ...others }: any) {
    let data = others.data;

    let useMyStore = useStoreOfApp();

    let nodes = useNodes<EachNode>();
    let edges = useEdges<EachEdge>();
    let nodeId = useNodeId();

    let edge = edges.find((r) => r.source === nodeId);

    return (
        <div className='flex flex-col items-start justify-center border rounded-2xl  pb-3 bg-[rgba(255,255,255,0.5)]'>
            <div className='drag-handle__custom hover:bg-gray-100 w-full rounded-t-2xl mb-2'>
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
                    className='mx-2 border rounded-lg touch-manipulation'
                >
                    <div className='p-1'>
                        <Input
                            value={data.value}
                            onChange={({ target: { value } }) => {
                                let parsedValue = Number(value);

                                useMyStore.setState({
                                    nodes: [
                                        ...nodes.map((r) => {
                                            if (r.id === nodeId) {
                                                return {
                                                    ...r,
                                                    data: {
                                                        ...r.data,
                                                        value: parsedValue,
                                                    },
                                                    //
                                                };
                                            }
                                            return r;
                                        }),
                                    ],
                                });
                            }}
                        ></Input>
                    </div>
                    <div className='py-3 px-3'>
                        <input
                            type='range'
                            className='w-full'
                            min={typeof data.min === 'number' ? data.min : -1}
                            max={typeof data.max === 'number' ? data.max : 1}
                            step={0.001}
                            value={data.value}
                            onChange={({ target: { value } }) => {
                                let parsedValue = Number(value);

                                useMyStore.setState({
                                    nodes: [
                                        ...nodes.map((r) => {
                                            if (r.id === nodeId) {
                                                return {
                                                    ...r,
                                                    data: {
                                                        ...r.data,
                                                        value: parsedValue,
                                                    },
                                                    //
                                                };
                                            }
                                            return r;
                                        }),
                                    ],
                                });
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
}
