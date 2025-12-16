import {
    //
    Object3D,
    BufferGeometry,
    Material,
    MeshStandardMaterial,
    MeshPhysicalMaterial,
    Color,
    Vector3,
} from 'three';
import md5 from 'md5';

/**
 * Computes a semantic hash for a Material using only stable,
 * non-texture, non-UUID properties (aligned with glTF 2.0 PBR model).
 */
function computeMaterialHash(mat: Material): string {
    if (!mat) return md5('null_mat');

    const parts: string[] = [];

    // 1. Name (optional but stable)
    parts.push(mat.name || '');

    // 2. Base color + opacity
    if ('color' in mat && mat.color instanceof Color) {
        const c = mat.color;
        const opacity = ('opacity' in mat ? (mat as any).opacity : 1.0) as number;
        parts.push(c.r.toFixed(3), c.g.toFixed(3), c.b.toFixed(3), opacity.toFixed(3));
    } else {
        parts.push('nocolor');
    }

    // 3. Emissive
    if ('emissive' in mat && mat.emissive instanceof Color) {
        const e = mat.emissive;
        parts.push(e.r.toFixed(3), e.g.toFixed(3), e.b.toFixed(3));
    } else {
        parts.push('noemissive');
    }

    // 4. PBR-specific: metalness & roughness
    if (mat instanceof MeshStandardMaterial || mat instanceof MeshPhysicalMaterial) {
        const metalness = mat.metalness ?? 1.0;
        const roughness = mat.roughness ?? 1.0;
        parts.push(metalness.toFixed(3), roughness.toFixed(3));
    }

    return md5(parts.join('|'));
}

// /**
//  * Computes a lightweight hash for geometry based on attribute/index counts.
//  */
// function computeGeometryHashOnlyCounter(geometry: BufferGeometry): string {
//     const pos = geometry.attributes.position?.count || 0;
//     const norm = geometry.attributes.normal?.count || 0;
//     const uv = geometry.attributes.uv?.count || 0;
//     const idx = geometry.index ? geometry.index.count : 0;
//     return md5(`p${pos}|n${norm}|u${uv}|i${idx}`);
// }

function computeGeometryHash(geometry: BufferGeometry): string {
    // Ensure bounding box is computed (in case it wasn't set from glTF)
    if (!geometry.boundingBox) {
        geometry.computeBoundingBox();
    }

    const posCount = geometry.attributes.position?.count || 0;
    const normCount = geometry.attributes.normal?.count || 0;
    const uvCount = geometry.attributes.uv?.count || 0;
    const idxCount = geometry.index ? geometry.index.count : 0;

    let minStr = 'min_none';
    let maxStr = 'max_none';

    if (geometry.boundingBox) {
        const { min, max } = geometry.boundingBox;
        minStr = [min.x.toFixed(3), min.y.toFixed(3), min.z.toFixed(3)].join(',');
        maxStr = [max.x.toFixed(3), max.y.toFixed(3), max.z.toFixed(3)].join(',');
    }

    const sig = [`p${posCount}`, `n${normCount}`, `u${uvCount}`, `i${idxCount}`, `bb_min:${minStr}`, `bb_max:${maxStr}`].join('|');

    return md5(sig);
}

/**
 * Computes a hash for an Object3D based on name + world position (rounded to 3 decimals).
 */
function computeObject3DHash(obj: Object3D): string {
    const name = obj.name || '';
    const worldPos = new Vector3();
    obj.getWorldPosition(worldPos);
    const posStr = [worldPos.x.toFixed(3), worldPos.y.toFixed(3), worldPos.z.toFixed(3)].join(',');
    return md5(`${name}|${posStr}`);
}

/**
 * Annotates a loaded glTF scene with deterministic hashes in userData:
 * - object3dHash
 * - geometryHash (if geometry exists)
 * - materialHash or materialHashes (if material(s) exist)
 *
 * @param gltf The result from GLTFLoader.load()
 * @returns The same gltf instance (mutated in place)
 */
export function annotateGLTFWithHashes(gltf: { scene: Object3D }): typeof gltf {
    // Ensure world matrices are up to date
    gltf.scene.updateMatrixWorld(true);

    gltf.scene.traverse((obj) => {
        if (!(obj as any).isObject3D) return;

        // Object3D hash
        obj.userData.object3dHash = computeObject3DHash(obj);

        // Geometry hash
        if ((obj as any).geometry) {
            obj.userData.geometryHash = computeGeometryHash((obj as any).geometry);
        }

        // Material hash(es)
        const mat = (obj as any).material;
        if (mat) {
            if (Array.isArray(mat)) {
                obj.userData.materialHashes = mat.map(computeMaterialHash);
                obj.userData.materialHash = mat.map(computeMaterialHash).join('');
            } else {
                obj.userData.materialHash = computeMaterialHash(mat);
            }
        }
    });

    return gltf;
}
