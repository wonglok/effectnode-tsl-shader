// @ts-ignore
let reqNodes = import.meta.glob('./GraphNodes/*', { eager: true });
// @ts-ignore
let reqEdges = import.meta.glob('./GraphEdges/*', { eager: true });

let nodeTypes: Record<string, any> = {};
Object.keys(reqNodes).forEach((nodekey) => {
    let node: any = reqNodes[nodekey];

    console.log(node);
    if (node?.name) {
        nodeTypes[node.name] = node.default;
    }
});

let edgeTypes: Record<string, any> = {};
Object.keys(reqEdges).forEach((key) => {
    let edge: any = reqEdges[key];
    if (edge?.name) {
        edgeTypes[edge.name] = edge.default;
    }
});

console.log(nodeTypes, edgeTypes);

export { nodeTypes, edgeTypes };
