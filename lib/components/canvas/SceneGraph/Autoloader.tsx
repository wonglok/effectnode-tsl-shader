//
// MeshStandardMaterialEditor
let reqNodes = import.meta.glob('./GraphNodes/*', { eager: true });
let reqEdges = import.meta.glob('./GraphEdges/*', { eager: true });

let nodeTypes: Record<string, any> = {};
Object.keys(reqNodes).forEach((nodekey) => {
    nodeTypes[nodekey.replace('./GraphNodes/', '').replace('.tsx', '')] = reqNodes[nodekey];
});

let edgeTypes: Record<string, any> = {};
Object.keys(reqEdges).forEach((key) => {
    edgeTypes[key.replace('./GraphEdges/', '').replace('.tsx', '')] = edgeTypes[key];
});

export { nodeTypes, edgeTypes };
