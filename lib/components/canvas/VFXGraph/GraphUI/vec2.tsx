import { useEdges, useNodeId, useNodes } from '@xyflow/react';
import { type EachEdge, type EachNode, useStoreOfApp } from '../../CanvasEditor/AppContext';
import { Input } from '../../../ui/input';
import { nodes as NodesTypeRawData } from '../ListData/nodes';
import { useState } from 'react';

export const name = 'vec2';
export default function UICompo({ info }: any) {
    let useMyStore = useStoreOfApp();

    let nodes = useNodes<EachNode>();
    let edges = useEdges<EachEdge>();
    let nodeId = useNodeId();

    let data = info.data;
    let nodeTypeData = NodesTypeRawData.find((r) => r.codeName === info.data.type);

    return (
        <div>
            <div
                onPointerDownCapture={(ev) => {
                    ev.stopPropagation();
                }}
                className='mx-2 mb-2 border rounded-lg touch-manipulation'
            >
                <div className='p-1'>
                    <Input
                        value={data.x || 0}
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
                                                    x: parsedValue,
                                                },
                                                //
                                            };
                                        }
                                        return r;
                                    }),
                                ],
                            });
                        }}

                        //
                        //
                    ></Input>
                </div>
                <div className='py-1 px-3'>
                    <input
                        type='range'
                        className='w-full'
                        min={typeof data.min === 'number' ? data.min : -1}
                        max={typeof data.max === 'number' ? data.max : 1}
                        step={0.001}
                        value={data.x || 0}
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
                                                    x: parsedValue,
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

            <div
                onPointerDownCapture={(ev) => {
                    ev.stopPropagation();
                }}
                className='mx-2 mb-2 border rounded-lg touch-manipulation'
            >
                <div className='p-1'>
                    <Input
                        value={data.y || 0}
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
                                                    y: parsedValue,
                                                },
                                                //
                                            };
                                        }
                                        return r;
                                    }),
                                ],
                            });
                        }}

                        //
                        //
                    ></Input>
                </div>
                <div className='py-1 px-3'>
                    <input
                        type='range'
                        className='w-full'
                        min={typeof data.min === 'number' ? data.min : -1}
                        max={typeof data.max === 'number' ? data.max : 1}
                        step={0.001}
                        value={data.y || 0}
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
                                                    y: parsedValue,
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
    );
}
