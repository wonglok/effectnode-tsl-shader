import { type EachPatch, useApp } from '../CanvasEditor/AppContext';
import { Graph } from './Graph';

export function EditGraph() {
    let activeNodeHash = useApp((r) => r.activeNodeHash);
    let patches = useApp((r) => r.patches);
    let renderTree = useApp((r) => r.renderTree);

    return (
        <>
            {
                <>
                    <div className='w-full h-full relative'>
                        {renderTree &&
                            patches &&
                            patches
                                .filter((r: EachPatch) => r._id === activeNodeHash)
                                .map((patch: EachPatch) => {
                                    return <Graph key={patch._id} patch={patch}></Graph>;
                                })}
                    </div>
                </>
            }
        </>
    );
}

//
