import { addEdge, applyEdgeChanges, applyNodeChanges, Background, ReactFlow, Controls } from '@xyflow/react';
import { type EachEdge, type EachNode, useApp, useStoreOfApp } from '../CanvasEditor/AppContext.tsx';
// @ts-ignore
import { nodeTypes, edgeTypes } from './Autoloader.tsx';

import { useDnD } from './DnDContext.tsx';
import {
    //
    useReactFlow,
    //
} from '@xyflow/react';

import { v4 } from 'uuid';

export function VFXGraph() {
    return <VFXEditor></VFXEditor>;
}

const getId = () => `dndnode_${v4()}`;

function VFXEditor({}: {}) {
    const { screenToFlowPosition } = useReactFlow();

    const useMyStore = useStoreOfApp();

    const edges = useApp((r) => r.edges);
    const nodes = useApp((r) => r.nodes);

    const [type, setType]: any = useDnD();

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event: any) => {
        event.preventDefault();

        if (!type) {
            return;
        }

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode: any = {
            id: getId(),
            displayName: type,
            type: type,
            position: position,
            data: { value: 0, min: 0, max: 1 },
        };

        if (nodeTypes[type]) {
            newNode.dragHandle = '.drag-handle__custom';
        }

        useMyStore.setState({
            nodes: [...nodes, newNode],
        });

        //
    };

    const onDragStart: any = (event: any, nodeType: any) => {
        setType(nodeType);
        event.dataTransfer.setData('text/plain', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onNodesChange = (changes: any[]) => {
        const nodes2 = applyNodeChanges(changes, nodes) as EachNode[];

        useMyStore.setState({
            nodes: nodes2,
        });
    };
    const onEdgesChange = (changes: any[]) => {
        const edges2 = applyEdgeChanges(changes, edges) as EachEdge[];

        useMyStore.setState({
            edges: edges2,
        });
    };

    const onConnect = (params: any) => {
        const edges2 = addEdge(params, edges);

        useMyStore.setState({
            edges: edges2,
        });
    };

    return (
        <>
            <ReactFlow
                //
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                //
                nodes={nodes}
                edges={edges}
                onDragStart={onDragStart}
                //
                onDrop={onDrop}
                onDragOver={onDragOver}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                minZoom={0.1}
                attributionPosition='bottom-left'
                //

                // fitViewOptions={{
                //     nodes: [{ id: 'materialBox' }, { id: 'mapBox' }, { id: 'normalMapBox' }],
                // }}

                //
            >
                <Background />
                <Controls />
            </ReactFlow>
        </>
    );
}
