//
// MeshStandardMaterialEditor
let reqNodes = import.meta.glob('./GraphNodes/*', { eager: true });
let reqEdges = import.meta.glob('./GraphEdges/*', { eager: true });


console.log(reqNodes)
console.log(reqEdges)
let nodeTypes = {}

Object.keys(reqNodes).forEach(nodekey => {
    nodeTypes[nodekey.replace('./GraphNodes/', '').replace('.tsx', '')] = reqNodes[nodekey]
})

// reqNodes.keys().forEach(key => {
//     let each = reqNodes(key)

//     let eachNodeKey = Object.keys(each)

//     for (let key of eachNodeKey) {
//         if (key === 'default') {
//             continue
//         }
//         nodeTypes[key] = each[key]
//     }

// })

let edgeTypes = {}


Object.keys(reqNodes).forEach(key => {
    edgeTypes[key.replace('./GraphNodes/', '').replace('.tsx', '')] = edgeTypes[key]
})
// reqEdges.keys().forEach(key => {
//     let each = reqEdges(key)

//     let eachKey = Object.keys(each)

//     for (let key of eachKey) {
//         if (key === 'default') {
//             continue
//         }
//         edgeTypes[key] = each[key]
//     }

// })

console.log(nodeTypes)
console.log(edgeTypes)

export { nodeTypes, edgeTypes }