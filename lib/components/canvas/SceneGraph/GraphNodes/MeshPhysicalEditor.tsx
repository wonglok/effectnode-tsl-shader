import { Handle, Position } from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import { getActiveO3D, useApp } from '../../CanvasEditor/AppContext';

export function MeshPhysicalEditor({ data, ...others }: any) {
    let renderTree = useApp((r) => r.renderTree);

    let activeNodeHash = data.activeNodeHash;

    let o3d = useMemo(() => {
        return getActiveO3D(renderTree, activeNodeHash);
    }, [renderTree, activeNodeHash]);

    return (
        <div className='drag-handle__custom flex flex-col items-end justify-center border rounded-2xl pb-3 bg-[rgba(255,255,255,0.5)]'>
            <div className='relative p-3'>
                <div className='text-center'>Mesh Physical Material</div>
                <div className='text-center'>{o3d?.material?.name}</div>
            </div>

            <div className='relative'>
                <div className='mx-4'>{`map`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'map'}></Handle>
            </div>
            <div className='relative'>
                <div className='mx-4'>{`color`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'color'}></Handle>
            </div>
            <div className='relative'>
                <div className='mx-4'>{`normalMap`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'normalMap'}></Handle>
            </div>

            <div className='relative'>
                <div className='mx-4'>{`emissiveMap`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'emissiveMap'}></Handle>
            </div>
            <div className='relative'>
                <div className='mx-4'>{`emissive`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'emissive'}></Handle>
            </div>

            <div className='relative'>
                <div className='mx-4'>{`roughnessMap`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'roughnessMap'}></Handle>
            </div>
            <div className='relative'>
                <div className='mx-4'>{`roughness`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'roughness'}></Handle>
            </div>

            <div className='relative'>
                <div className='mx-4'>{`metalnessMap`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'metalnessMap'}></Handle>
            </div>
            <div className='relative'>
                <div className='mx-4'>{`metalness`}</div>
                <Handle style={{ width: '13px', height: '13px' }} position={Position.Right} type='target' id={'metalness'}></Handle>
            </div>
        </div>
    );
}

//

//

//
