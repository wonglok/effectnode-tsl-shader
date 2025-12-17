import { Handle, Position, useEdges, useNodeId, useNodes } from '@xyflow/react';
import { nodes as NodesTypeRawData } from '../ListData/nodes';
import { uiTypes as UITypeRawData } from '../UIloader';

export const name = 'AnyNode';
export default function NodeCompo({ ...others }: any) {
    let data = others.data;

    let nodeTypeData = NodesTypeRawData.find((r) => r.codeName === data.type);

    let UIType = UITypeRawData[data.type] || (({ info }: any) => null);

    // console.log(nodeTypeData);

    return (
        <div className='flex flex-col items-start justify-center border rounded-2xl  pb-3 bg-[rgba(255,255,255,1.0)] min-w-[120px]'>
            <div className='drag-handle__custom hover:bg-gray-100 w-full rounded-t-2xl mb-2'>
                <div className='relative p-3 w-full'>
                    <div className='text-center w-full text-sm'>{data.type}</div>
                </div>
            </div>

            {nodeTypeData?.targets?.map((target, ti) => {
                return (
                    <div key={ti + target.name} className='relative text-sm mb-1'>
                        <div className='ml-5'>{target.name}</div>
                        <Handle style={{ width: '10px', height: '10px' }} position={Position.Left} type='target' id={target.name}></Handle>
                    </div>
                );
            })}

            {nodeTypeData?.sources?.map((source, ti) => {
                return (
                    <div key={ti + source.name} className='relative text-sm mb-1 w-full'>
                        <div className='mr-5  text-right'>{source.name}</div>
                        <Handle style={{ width: '10px', height: '10px' }} position={Position.Right} type='source' id={source.name}></Handle>
                    </div>
                );
            })}

            <UIType info={others}></UIType>
        </div>
    );
}
