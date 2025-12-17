import * as TSL from 'three/tsl';
import { categories } from './ListData/categories';
import { nodes } from './ListData/nodes';
import { useState } from 'react';
import { useDnD } from './DnDContext';

let nodeListData: any = [];

for (let key in TSL) {
    if (/[A-Z]/.test(key[0])) {
        continue;
    }
    nodeListData.push({
        key,
    });
}

export function NodeList() {
    let [query, setQuery] = useState('');

    let filterNodeFnc = (r: any) => {
        return `${r.codeName.toLowerCase()}${r.description?.toLowerCase()}`.includes(query);
    };

    const [_, setType]: any = useDnD();

    const onDragStart = (event: any, nodeType: any) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <div className='px-3 pt-3' style={{ height: `60px` }}>
                <input
                    className='w-full h-full bg-gray-200 py-3 px-3 rounded-lg'
                    value={query}
                    onChange={({ target: { value } }) => {
                        setQuery(value);
                    }}
                ></input>
            </div>
            <div className='w-full h-full overflow-y-scroll px-3' style={{ height: `calc(100% - 60px)` }}>
                {categories
                    .filter((cate) => {
                        let result = nodes.filter((r) => r.category === cate).filter(filterNodeFnc);

                        return result.length > 0;
                    })
                    .map((cate, ci) => {
                        return (
                            <div className='text-left ' key={cate + ci}>
                                <div className='my-3 text-center sticky top-3 z-10'>
                                    <div className='p-2 bg-teal-200 text-gray-800 text-sm rounded-lg shadow-lg'>{cate}</div>
                                </div>

                                <div className=''>
                                    {nodes
                                        .filter((r) => r.category === cate)
                                        .filter(filterNodeFnc)
                                        .map((node, ni) => {
                                            return (
                                                <div
                                                    onDragStart={(event) => onDragStart(event, node.codeName)}
                                                    draggable
                                                    key={node.codeName + ni}
                                                    className='dndnode input p-3 even:bg-purple-50  odd:bg-blue-50  overflow-scroll hover:opacity-50 cursor-grab select-none mb-3 rounded-2xl shadow-sm'
                                                >
                                                    <div className='text-sm'>{node.codeName}</div>
                                                    <div className='text-xs text-gray-500 '>{node.description}</div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
