import { BufferGeometry, Color, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Object3D } from 'three';
import { EachPatch, getActiveO3D, getIDFromO3D, useApp, useStoreOfApp } from '../CanvasEditor/AppContext';
import { Input } from '../../ui/input';

// @ts-ignore
import dagre from 'dagre';
import { useThree } from '@react-three/fiber';
import { Button } from '../../ui/button';
import { ArrowRight, BanIcon, BoxIcon, CircleXIcon, CloudOffIcon, Cross, CrossIcon, DeleteIcon, EggOffIcon, EraserIcon, MemoryStickIcon, PenOffIcon, Search, Settings, SettingsIcon, Share2Icon, ShareIcon, XIcon } from 'lucide-react';
// import { v4 } from 'uuid';
// import md5 from 'md5';

export function SceneGraphGUI() {
    const renderTree = useApp((r) => r.renderTree);

    const query = useApp((r) => r.query);

    const useMyStore = useStoreOfApp();

    const allNodes: any[] = [];

    if (renderTree) {
        renderTree.traverse((it: Mesh) => {
            //
            if (it.isMesh) {
                allNodes.push(it);
            }
            //
        });
    }

    return (
        <>
            <div className='bg-white p-3 rounded-2xl border overflow-y-scroll w-56 max-h-96'>
                <div>
                    <div
                        className='text-xs w-full'
                        onKeyDownCapture={(ev) => {
                            ev.stopPropagation();
                        }}
                    >
                        <div
                            className='flex w-full mb-3'
                            onKeyDownCapture={(ev) => {
                                ev.stopPropagation();
                            }}
                        >
                            <Input
                                className=' rounded-r-none border-r-0 h-8 shadow-lg text-xs'
                                value={query}
                                onChange={({ target: { value } }) => {
                                    //
                                    useMyStore.setState({
                                        query: `${value}`,
                                    });
                                    //
                                }}
                            ></Input>

                            {query && (
                                <Button
                                    onClick={() => {
                                        useMyStore.setState({
                                            query: ``,
                                        });
                                    }}
                                    variant={'outline'}
                                    className=' rounded-l-none  h-8 shadow-lg text-xs'
                                >
                                    <EraserIcon></EraserIcon>
                                </Button>
                            )}

                            {!query && (
                                <Button variant={'outline'} className=' rounded-l-none  h-8 shadow-lg text-xs' onClick={() => {}}>
                                    <Search></Search>
                                </Button>
                            )}
                        </div>

                        {/*  */}

                        {allNodes
                            .filter((r: any) => {
                                return r?.material && r.name.toLowerCase().includes(`${query.toLowerCase()}`);
                            })
                            .map((rn: Mesh<BufferGeometry, MeshPhysicalMaterial>) => (
                                <TreeNode key={rn.uuid + 'gui'} query={query} tree={rn}></TreeNode>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

//
//geometryHash
//

function TreeNode({ query, tree }: { query: string; tree: Mesh<BufferGeometry, MeshPhysicalMaterial> }) {
    let patches: EachPatch[] = useApp((r) => r.patches);
    //
    let useMyStore = useStoreOfApp();
    let activeNodeHash = useApp((r) => r.activeNodeHash);
    // let renderTree = useApp((r) => r.renderTree);
    //
    let _id = getIDFromO3D(tree);

    //activeNodeHash

    //
    return (
        <>
            <div className='mb-2 flex justify-between'>
                <div className='inline-flex items-center '>
                    <span
                        onClick={() => {
                            //
                            // let geometryHash = tree.userData.geometryHash;

                            // let nodes: any[] = [];
                            // let edges: any[] = [];

                            if (!tree?.material) {
                                return;
                            }

                            let thisNode: Mesh<BufferGeometry, MeshPhysicalMaterial> = tree as any;
                            let _id = getIDFromO3D(thisNode);
                            let activeNodeHash = _id;
                            let newPatch: EachPatch = { _id: _id, nodes: [], edges: [] };

                            // let o3d = getActiveO3D(renderTree, activeNodeHash);

                            newPatch.nodes.push({
                                id: `materialBox`,
                                type: 'MeshPhysicalEditor',
                                position: { x: 0, y: 0 },
                                data: {
                                    activeNodeHash,
                                },
                            });

                            {
                                // materialBox
                                newPatch.nodes.push({
                                    id: `mapBox`,
                                    type: 'TextureEditor',
                                    position: { x: 400, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-mapBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'map',

                                    // tex node
                                    source: 'mapBox',
                                    sourceHandle: 'texture',
                                    data: {},
                                });
                            }

                            {
                                // colorBox
                                newPatch.nodes.push({
                                    id: `colorBox`,
                                    type: 'ColorEditor',
                                    position: { x: 200, y: -150 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        color: '#' + new Color(thisNode?.material?.color).getHexString(),
                                    },
                                });

                                newPatch.edges.push({
                                    id: `materialBox-colorBox`,
                                    target: 'materialBox',
                                    targetHandle: 'color',

                                    source: 'colorBox',
                                    sourceHandle: 'color',
                                    data: {},
                                });
                            }

                            {
                                // materialBox
                                newPatch.nodes.push({
                                    id: `normalMapBox`,
                                    type: 'TextureEditor',
                                    position: { x: 400, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-normalMapBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'normalMap',

                                    // tex node
                                    source: 'normalMapBox',
                                    sourceHandle: 'texture',
                                    data: {},
                                });
                            }

                            {
                                // materialBox
                                newPatch.nodes.push({
                                    id: `emissiveMapBox`,
                                    type: 'TextureEditor',
                                    position: { x: 400, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-emissiveMapBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'emissiveMap',

                                    // tex node
                                    source: 'emissiveMapBox',
                                    sourceHandle: 'texture',
                                    data: {},
                                });
                            }

                            {
                                // emissiveBox
                                newPatch.nodes.push({
                                    id: `emissiveBox`,
                                    type: 'ColorEditor',
                                    position: { x: 200, y: 150 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        color: '#' + new Color(thisNode?.material?.emissive).getHexString(),
                                        activeNodeHash,
                                    },
                                });

                                newPatch.edges.push({
                                    id: `materialBox-emissiveBox`,
                                    target: 'materialBox',
                                    targetHandle: 'emissive',

                                    source: 'emissiveBox',
                                    sourceHandle: 'color',
                                    data: {},
                                });
                            }

                            {
                                // materialBox
                                newPatch.nodes.push({
                                    id: `roughnessMapBox`,
                                    type: 'TextureEditor',
                                    position: { x: 400, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-roughnessMapBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'roughnessMap',

                                    // tex node
                                    source: 'roughnessMapBox',
                                    sourceHandle: 'texture',
                                    data: {},
                                });
                            }

                            {
                                // roughnessBox
                                newPatch.nodes.push({
                                    id: `roughnessBox`,
                                    type: 'NumberEditor',
                                    position: { x: 500, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        value: thisNode?.material?.roughness,
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-roughnessBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'roughness',

                                    // tex node
                                    source: 'roughnessBox',
                                    sourceHandle: 'value',
                                    data: {},
                                });
                            }

                            {
                                // materialBox
                                newPatch.nodes.push({
                                    id: `metalnessMapBox`,
                                    type: 'TextureEditor',
                                    position: { x: 400, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-metalnessMapBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'metalnessMap',

                                    // tex node
                                    source: 'metalnessMapBox',
                                    sourceHandle: 'texture',
                                    data: {},
                                });
                            }

                            {
                                // metalnessBox
                                newPatch.nodes.push({
                                    id: `metalnessBox`,
                                    type: 'NumberEditor',
                                    position: { x: 500, y: 0 },
                                    dragHandle: '.drag-handle__custom',
                                    data: {
                                        min: 0,
                                        max: 1,
                                        value: thisNode?.material?.metalness,
                                        activeNodeHash,
                                    },
                                });

                                //
                                newPatch.edges.push({
                                    id: `materialBox-metalnessBox`,

                                    // mat
                                    target: 'materialBox',
                                    targetHandle: 'metalness',

                                    // tex node
                                    source: 'metalnessBox',
                                    sourceHandle: 'value',
                                    data: {},
                                });
                            }

                            var g = new dagre.graphlib.Graph();

                            // Set an object for the graph label
                            g.setGraph({});

                            // Default to assigning a new object as a label for each new edge.
                            g.setDefaultEdgeLabel(function () {
                                return {};
                            });

                            newPatch.nodes.forEach((node) => {
                                if (node.type === 'MeshPhysicalEditor') {
                                    g.setNode(node.id, { id: node.id, label: node.type, x: node.position.x, y: node.position.y, width: 400, height: 400 });
                                } else if (node.type === 'ColorEditor') {
                                    g.setNode(node.id, { id: node.id, label: node.type, x: node.position.x, y: node.position.y, width: 250, height: 250 });
                                } else if (node.type === 'NumberEditor') {
                                    g.setNode(node.id, { id: node.id, label: node.type, x: node.position.x, y: node.position.y, width: 250, height: 50 });
                                } else if (node.type === 'TextureEditor') {
                                    g.setNode(node.id, { id: node.id, label: node.type, x: node.position.x, y: node.position.y, width: 250, height: 550 });
                                } else {
                                    g.setNode(node.id, { id: node.id, label: node.type, x: node.position.x, y: node.position.y, width: 250, height: 300 });
                                }
                            });

                            newPatch.edges.forEach((edge) => {
                                g.setEdge(edge.source, edge.target);
                            });

                            //align: 'DL'
                            g.setGraph({ rankdir: 'RL', align: 'DL' });

                            dagre.layout(g);

                            g.nodes().forEach(function (v: any) {
                                // console.log('Node ' + v + ': ' + JSON.stringify(g.node(v)));

                                let node = g.node(v);

                                let found = newPatch.nodes.find((r) => r.id === node.id);

                                if (found) {
                                    found.position.x = node.x;
                                    found.position.y = node.y;
                                }
                            });

                            if (!patches.some((r) => r._id === _id)) {
                                useMyStore.setState({
                                    patches: [...patches, newPatch],
                                    activeNodeHash: _id,
                                });
                            } else {
                                //

                                useMyStore.setState({
                                    activeNodeHash: _id,
                                    patches: [...patches].map((pat) => {
                                        if (pat._id === _id) {
                                            return {
                                                ...newPatch,
                                            };
                                        }
                                        return pat;
                                    }),
                                });
                            }

                            useMyStore.setState({
                                activeNodeHash: _id,
                            });

                            //
                            //
                            // console.log(patches);
                            //
                            //
                        }}
                        className={`px-2 border py-0 rounded-lg hover:bg-gray-200 cursor-pointer ${activeNodeHash === getIDFromO3D(tree) ? 'bg-lime-300' : ''}`}
                    >
                        {tree.name}
                    </span>

                    {patches.some((r) => r._id === _id) && (
                        <>
                            <button
                                className='cursor-pointer'
                                onClick={() => {
                                    //
                                    useMyStore.setState({
                                        activeNodeHash: _id,
                                    });
                                }}
                            >
                                <Share2Icon className='stroke-teal-500 size-4 ml-2'></Share2Icon>
                            </button>
                        </>
                    )}

                    {/* {_id === activeNodeHash && (
                        <button
                            className='cursor-pointer'
                            onClick={() => {
                                //
                                useMyStore.setState({
                                    activeNodeHash: '',
                                });
                            }}
                        >
                            <PenOffIcon color='red' className='size-4 ml-2'></PenOffIcon>
                        </button>
                    )} */}
                </div>
                <div>
                    <BoxIcon className=' size-4'></BoxIcon>
                    {/* {tree.type} */}
                </div>
            </div>
            {/* <pre>{JSON.stringify(tree.userData, null, '  ')}</pre> */}
            {/* <div className='ml-2'> */}
            {/* {tree &&
                    tree.children &&
                    tree.children
                        .filter((r: any) => {
                            return r?.material && r.name.includes(`${query}`);
                        })
                        .map((kid: any) => {
                            return <TreeNode query={query} key={kid.uuid} tree={kid}></TreeNode>;
                        })} */}
            {/* </div> */}
        </>
    );
}

//
