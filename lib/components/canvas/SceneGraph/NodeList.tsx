import * as TSL from 'three/tsl';
import { categories } from './List/categories';
import { nodes } from './List/nodes';
import { useState } from 'react';
// import { nodes, categories } from './List/data';

let nodeListData: any = [];

for (let key in TSL) {
    if (/[A-Z]/.test(key[0])) {
        continue;
    }
    nodeListData.push({
        key,
    });
}

//

export function NodeList() {
    let [query, setQuery] = useState('');

    let filterNodeFnc = (r: any) => {
        return `${r.codeName.toLowerCase()}${r.description?.toLowerCase()}`.includes(query);
    };
    return (
        <>
            <div className='px-3 py-3' style={{ height: `80px` }}>
                <input
                    className='w-full h-full bg-gray-200 py-3 px-2'
                    value={query}
                    onChange={({ target: { value } }) => {
                        setQuery(value);
                    }}
                ></input>
            </div>
            <div className='w-full h-full overflow-y-scroll px-3' style={{ height: `calc(100% - 80px)` }}>
                {categories
                    .filter((cate) => {
                        let result = nodes.filter((r) => r.category === cate).filter(filterNodeFnc);

                        return result.length > 0;
                    })
                    .map((cate, ci) => {
                        return (
                            <div className='text-left ' key={cate + ci}>
                                <div className='my-2 text-center sticky top-0'>
                                    <div className='p-2 bg-amber-200 text-gray-800 text-sm'>{cate}</div>
                                </div>

                                <div className=''>
                                    {nodes
                                        .filter((r) => r.category === cate)
                                        .filter(filterNodeFnc)
                                        .map((node, ni) => {
                                            return (
                                                <div key={node.codeName + ni} className='p-2 even:bg-gray-50  odd:bg-amber-50  overflow-scroll hover:opacity-50 cursor-grab select-none'>
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
