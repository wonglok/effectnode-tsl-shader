import { addEdge, applyEdgeChanges, applyNodeChanges, Background, MiniMap, ReactFlow, Controls } from '@xyflow/react';
import { EachPatch, useStoreOfApp } from '../CanvasEditor/AppContext';
import { useCallback } from 'react';
// @ts-ignore
import { nodeTypes, edgeTypes } from './Autoloader.jsx';
// import {  } from 'three';

// console.log(nodeTypes);

export function Graph({ patch }: { patch: EachPatch }) {
    const useMyStore = useStoreOfApp();

    const patches = useMyStore((r) => r.patches);

    const setNodes = (changes: any[]) => {
        const nodesSnapshot = patch.nodes;

        const newNodes = applyNodeChanges(changes, nodesSnapshot);

        useMyStore.setState({
            patches: patches.map((r) => {
                if (r._id === patch._id) {
                    return {
                        ...patch,
                        nodes: newNodes,
                    };
                }

                return r;
            }),
        });
    };

    const setEdges = (changes: any[]) => {
        const edgesSnapshot = patch.edges;

        const newEdges = applyEdgeChanges(changes, edgesSnapshot);

        useMyStore.setState({
            patches: patches.map((r) => {
                if (r._id === patch._id) {
                    return {
                        ...patch,
                        edges: newEdges,
                    };
                }

                return r;
            }),
        });
    };

    const setEdgeConnect = (params: any) => {
        const edgesSnapshot = patch.edges;

        const newEdges = addEdge(params, edgesSnapshot);

        useMyStore.setState({
            patches: patches.map((r) => {
                if (r._id === patch._id) {
                    return {
                        ...patch,
                        edges: newEdges,
                    };
                }

                return r;
            }),
        });
    };

    const onNodesChange = useCallback((changes: any) => setNodes(changes), [patches]);
    const onEdgesChange = useCallback((changes: any) => setEdges(changes), [patches]);
    const onConnect = useCallback((params: any) => setEdgeConnect(params), [patches]);

    return (
        <>
            <ReactFlow
                //
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                nodes={patch.nodes}
                edges={patch.edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                minZoom={0.1}
                fitViewOptions={{
                    nodes: [{ id: 'materialBox' }, { id: 'mapBox' }, { id: 'normalMapBox' }],
                }}
                fitView
                onDelete={({ nodes, edges }) => {
                    console.log(nodes, edges);

                    useMyStore.setState({
                        patches: patches.map((r) => {
                            if (r._id === patch._id) {
                                return {
                                    ...patch,
                                    nodes: patch.nodes.filter((r) => {
                                        return !nodes.some((e) => e.id === r.id);
                                    }),
                                    edges: patch.edges.filter((r) => {
                                        return !edges.some((e) => e.id === r.id);
                                    }),
                                };
                            }

                            return r;
                        }),
                    });
                }}
                // fitView
                //
            >
                <Background />
                <Controls />
            </ReactFlow>
        </>
    );
}
