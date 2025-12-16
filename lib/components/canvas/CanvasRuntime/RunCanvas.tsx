'use client';
import { DayTimeControls, EnvLight, OrbitSunControls } from '../CanvasTSL/EffectsSSGI';
import { CanvasTSL } from '../CanvasTSL/CanvasTSL';
import { useApp } from '../CanvasEditor/AppContext';
import { Game } from '../WASDGame/Game';
import { ApplyGraphToScene } from '../SceneGraph/ApplyGraphToScene';

export function RunCanvas({}: {}) {
    let hdrURL = useApp((r) => r.hdrURL);
    let placeURL = useApp((r) => r.placeURL);
    let avatarURL = useApp((r) => r.avatarURL);
    let playerStart = useApp((r) => r.playerStart);
    let cameraStart = useApp((r) => r.cameraStart);

    return (
        <>
            <div className='w-full h-full relative'>
                <CanvasTSL>
                    {/*  */}

                    {hdrURL && <EnvLight hdrURL={hdrURL}></EnvLight>}

                    {avatarURL && placeURL && (
                        <Game
                            //
                            cameraStart={cameraStart}
                            //
                            playerStart={playerStart}
                            //
                            avatarURL={avatarURL}
                            //
                            placeURL={placeURL}
                            //
                            onChangeAvatarPosition={({ position, rotateY, cameraLocation }) => {
                                //
                            }}
                            //
                        ></Game>
                    )}

                    <ApplyGraphToScene></ApplyGraphToScene>
                </CanvasTSL>

                <DayTimeControls show={false}></DayTimeControls>
                <OrbitSunControls show={false}></OrbitSunControls>
            </div>
        </>
    );
}

//

//

//
