'use client';
import { CanvasTSL } from '../CanvasTSL/CanvasTSL';
import { ApplyGraphToScene } from '../SceneGraph/ApplyGraphToScene';

export function RunCanvas({}: {}) {
    return (
        <>
            <div className='w-full h-full relative'>
                <CanvasTSL>
                    {/*  */}

                    <ApplyGraphToScene></ApplyGraphToScene>
                </CanvasTSL>
            </div>
        </>
    );
}

//

//

//
