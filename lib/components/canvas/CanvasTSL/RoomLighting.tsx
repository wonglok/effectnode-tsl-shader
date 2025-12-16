import { useEffect } from 'react';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PMREMGenerator, Scene } from 'three/webgpu';
import { useThree } from '@react-three/fiber';

export function RoomLighting({}) {
    let gl: any = useThree((r) => r.gl);
    let scene: Scene = useThree((r) => r.scene);
    useEffect(() => {
        const environment = new RoomEnvironment();
        const pmremGenerator = new PMREMGenerator(gl);
        const envMap = pmremGenerator.fromScene(environment).texture;
        scene.environment = envMap;

        return () => {
            pmremGenerator.dispose();
        };
    }, [scene, gl]);

    return null;
}
