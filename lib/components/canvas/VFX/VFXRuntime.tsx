import { EachEdge, getActiveO3D, useApp } from '../CanvasEditor/AppContext';
import { useEffect, useMemo } from 'react';
import { useVFX } from './VFXContext';
// import { useVFX } from './VFXContext';

export function VFXRuntime() {
    let renderTree = useApp((r) => r.renderTree);

    let _id = useVFX((r) => r._id);
    let nodes = useVFX((r) => r.nodes);
    let edges = useVFX((r) => r.edges);

    let o3d = useMemo(() => {
        return getActiveO3D(renderTree, _id);
    }, [renderTree, _id]);

    // console.log(o3d);

    // console.log('nodes', nodes, 'edges', edges);

    //

    //

    return (
        <>
            {/*  */}
            {/*  */}

            {/*  */}
            {/*  */}
        </>
    );
}
