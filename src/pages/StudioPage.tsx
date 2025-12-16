import { useCallback } from 'react';
import { AppContext, type AppInitStateType } from '../../lib/components/canvas/CanvasEditor/AppContext';
import { EditorGUI } from '../../lib/components/canvas/CanvasEditor/EditorGUI';

export function StudioPage() {
    //

    //

    let onChange = useCallback((now: Partial<AppInitStateType> | any, before: Partial<AppInitStateType> | any) => {
        //

        let array = [];

        for (let key in now) {
            if (now[key] !== before[key]) {
                array.push(key, now[key]);
            }
        }

        //

        //
        // console.log('d', array.join(','), ','); //
        //
    }, []);

    return (
        <>
            <AppContext subscribe={onChange} state={null}>
                <EditorGUI></EditorGUI>
            </AppContext>
        </>
    );
}
