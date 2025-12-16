import { useEffect } from 'react';
import { useApp, type EachPatch, getActiveO3D } from '../CanvasEditor/AppContext';
import { Color, Mesh } from 'three';
import { MeshPhysicalNodeMaterial } from 'three/webgpu';

export function ApplyGraphToScene() {
    let patches = useApp((r) => r.patches);
    let renderTree = useApp((r) => r.renderTree);

    return (
        <>
            {renderTree &&
                patches &&
                patches.map((patch: EachPatch) => {
                    return <EachApplier key={patch._id} patch={patch}></EachApplier>;
                })}
        </>
    );
}

function EachApplier({ patch }: { patch: EachPatch }) {
    let nodes = patch.nodes;
    let edges = patch.edges;
    let renderTree = useApp((r) => r.renderTree);
    let o3d = getActiveO3D(renderTree, patch._id);

    useEffect(() => {
        let materialNode = nodes.find((r) => r.id === 'materialBox');

        if (!materialNode) {
            return;
        }

        if (!o3d?.material) {
            return;
        }

        if (!(o3d?.material?.isMeshPhysicalMaterial || o3d?.material?.isMeshStandardMaterial)) {
            return;
        }

        let newMaterial = new MeshPhysicalNodeMaterial();

        if (!o3d.userData.material) {
            o3d.userData.material = (o3d as Mesh).material;
        }

        let oldMaterial = o3d.userData.material;

        (o3d as Mesh).material = newMaterial;

        let nodeID = materialNode.id;

        let edgesFound = edges.filter((r) => r.target === nodeID);

        for (let edge of edgesFound) {
            let relatedNode = nodes.find((r) => r.id === edge.source);

            let assignType = edge.targetHandle;

            if (assignType) {
                if (assignType === 'color') {
                    if (newMaterial.color.isColor) {
                        newMaterial.color.set(relatedNode?.data?.color);
                    } else {
                        newMaterial.color = new Color(relatedNode?.data?.color);
                    }
                }
                if (assignType === 'map') {
                    newMaterial.map = oldMaterial.map;
                }
                if (assignType === 'normalMap') {
                    newMaterial.normalMap = oldMaterial.normalMap;
                }

                if (assignType === 'emissive') {
                    if (newMaterial.emissive.isColor) {
                        newMaterial.emissive.set(relatedNode?.data?.color);
                    } else {
                        newMaterial.emissive = new Color(relatedNode?.data?.color);
                    }
                }
                if (assignType === 'emissiveMap') {
                    newMaterial.emissiveMap = oldMaterial.emissiveMap;
                }

                if (assignType === 'metalness') {
                    if (newMaterial) {
                        newMaterial.metalness = relatedNode?.data?.value;
                    }
                }
                if (assignType === 'metalnessMap') {
                    newMaterial.metalnessMap = oldMaterial.metalnessMap;
                }

                if (assignType === 'roughness') {
                    if (newMaterial) {
                        newMaterial.roughness = relatedNode?.data?.value;
                    }
                }
                if (assignType === 'roughnessMap') {
                    newMaterial.roughnessMap = oldMaterial.roughnessMap;
                }

                //
            }
        }
    }, [JSON.stringify(patch), o3d]);

    return <></>;
}

/*

    
*/
