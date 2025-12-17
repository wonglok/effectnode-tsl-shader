// App.tsx
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sky, Environment, ContactShadows, CameraControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Sparkles, Award } from 'lucide-react';
import * as THREE from 'three';
import tunnel from 'tunnel-rat';

let t = tunnel();

// 情緒類型定義
interface Emotion {
    id: string;
    name: string;
    color: string;
    description: string;
    collected: boolean;
}

const EMOTIONS: Emotion[] = [
    { id: 'happy', name: '快樂', color: '#fbbf24', description: '當你感到快樂，嘴角會上揚，身體感到輕盈。', collected: false },
    { id: 'sad', name: '悲傷', color: '#3b82f6', description: '當你感到悲傷，肩膀會下垂，能量變低。', collected: false },
    { id: 'angry', name: '憤怒', color: '#ef4444', description: '當你感到憤怒，心跳會加快，但可以深呼吸冷靜。', collected: false },
    { id: 'anxious', name: '焦慮', color: '#f97316', description: '當你感到焦慮，呼吸會變快，手心可能會出汗。', collected: false },
    { id: 'calm', name: '平靜', color: '#10b981', description: '當你感到平靜，呼吸會變慢，思緒變得清晰。', collected: false },
    { id: 'surprised', name: '驚訝', color: '#8b5cf6', description: '當你感到驚訝，眼睛會睜大，短暫停頓一下。', collected: false },
];

// 情緒泡泡組件
function EmotionBubble({ emotion, position, onCollect }: { emotion: Emotion; position: [number, number, number]; onCollect: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={position} onClick={onCollect} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} scale={hovered ? 1.2 : 1}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color={emotion.color} transparent opacity={0.85} metalness={0.3} roughness={0.2} />
            <Text position={[0, 1.2, 0]} fontSize={0.5} color='white' anchorX='center' anchorY='middle' maxWidth={4}>
                {emotion.name}
            </Text>
        </mesh>
    );
}

// 玩家角色（簡單的發光球體）
function Player({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color='#60a5fa' emissive='#3b82f6' emissiveIntensity={0.5} />
            </mesh>
            <pointLight intensity={1} distance={5} color='#3b82f6' />
        </group>
    );
}

const r = new Map();

// 虛擬城市場景（簡約風格）
function CityScene() {
    return (
        <>
            {/* 地面 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color='#e5e7eb' />
            </mesh>

            {/* 建築物 */}
            {[...Array(12)].map((_, i) => {
                const x = (i % 4) * 10 - 15;
                const z = Math.floor(i / 4) * 10 - 10;
                let rand: number = 0;
                if (r.has(i)) {
                    rand = r.get(i);
                } else {
                    r.set(i, Math.random());
                    rand = r.get(i) as number;
                }

                const height = 3 + rand * 8;
                return (
                    <mesh key={i} position={[x, height / 2 - 1, z]}>
                        <boxGeometry args={[4, height, 4]} />
                        <meshStandardMaterial color={i % 3 === 0 ? '#f3f4f6' : i % 3 === 1 ? '#e5e7eb' : '#d1d5db'} roughness={0.8} />
                    </mesh>
                );
            })}

            <ContactShadows position={[0, -0.9, 0]} opacity={0.4} scale={30} blur={2} far={10} />
        </>
    );
}

// 鍵盤控制 Hook
function useKeyboardControls() {
    const [movement, setMovement] = useState({ x: 0, z: 0 });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            setMovement((prev) => {
                const newMovement = { ...prev };
                if (key === 'w' || key === 'arrowup') newMovement.z = -1;
                if (key === 's' || key === 'arrowdown') newMovement.z = 1;
                if (key === 'a' || key === 'arrowleft') newMovement.x = -1;
                if (key === 'd' || key === 'arrowright') newMovement.x = 1;
                return newMovement;
            });
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            setMovement((prev) => {
                const newMovement = { ...prev };
                if (key === 'w' || key === 's' || key === 'arrowup' || key === 'arrowdown') newMovement.z = 0;
                if (key === 'a' || key === 'd' || key === 'arrowleft' || key === 'arrowright') newMovement.x = 0;
                return newMovement;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
}

// 主遊戲組件
function GameScene() {
    const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0.5, 0]);
    const [emotions, setEmotions] = useState<Emotion[]>(EMOTIONS);
    const [showInfo, setShowInfo] = useState<string | null>(null);
    const movement = useKeyboardControls();
    const { camera } = useThree();

    const cameraControlsRef = useRef<CameraControls>(null);

    // 情緒泡泡位置
    const bubblePositions: [number, number, number][] = [
        [5, 2, 5],
        [-5, 2, 5],
        [5, 2, -5],
        [-5, 2, -5],
        [0, 2, 8],
        [0, 2, -8],
    ];

    // 更新玩家位置
    useFrame(() => {
        if (movement.x !== 0 || movement.z !== 0 || true) {
            setPlayerPos((prev) => [prev[0] + movement.x * 0.1, 0.5, prev[2] + movement.z * 0.1]);

            // 更新相機位置（跟隨玩家）
            camera.position.x = playerPos[0] + 5;
            camera.position.y = 5;
            camera.position.z = playerPos[2] + 5;
            camera.lookAt(playerPos[0], 0.5, playerPos[2]);

            // if (cameraControlsRef.current) {
            //     cameraControlsRef.current.setLookAt(
            //         cameraControlsRef.current.camera.position.x + movement.x * 0.1,
            //         cameraControlsRef.current.camera.position.y,
            //         cameraControlsRef.current.camera.position.z + movement.z * 0.1,

            //         //
            //         playerPos[0],
            //         0.5,
            //         playerPos[2],
            //     );
            //     // cameraControlsRef.current.setTarget(playerPos[0] + movement.x * 0.1, 0.5, playerPos[2] + movement.z * 0.1);
            // }
        }
    });

    // 收集情緒
    const collectEmotion = (id: string) => {
        setEmotions((prev) => prev.map((e) => (e.id === id ? { ...e, collected: true } : e)));

        const emotion = emotions.find((e) => e.id === id);
        if (emotion) {
            setShowInfo(emotion.description);
            setTimeout(() => setShowInfo(null), 3000);
        }
    };

    const collectedCount = emotions.filter((e) => e.collected).length;
    const allCollected = collectedCount === emotions.length;

    return (
        <>
            <Sky sunPosition={[100, 10, 100]} />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset='city' />

            <Player position={playerPos} />
            <CityScene />

            {/* Camera Controls */}
            <CameraControls ref={cameraControlsRef} makeDefault enabled={true} dollyToCursor={false} infinityDolly={false} smoothTime={0.1} />

            <t.In>
                {/* UI */}
                <div className='absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs'>
                    <div className='flex items-center gap-2 mb-2'>
                        <Award className='text-amber-500' size={24} />
                        <h2 className='text-xl font-bold text-gray-800'>情緒調色盤</h2>
                    </div>
                    <p className='text-gray-600 text-sm mb-3'>用 WASD 或方向鍵移動，收集飄浮的情緒泡泡！</p>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-500'>
                            已收集：{collectedCount}/{emotions.length}
                        </span>
                        {allCollected && (
                            <div className='flex items-center gap-1 text-amber-600'>
                                <Sparkles size={16} />
                                <span className='font-bold'>解鎖新服裝！</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 情緒提示 */}
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full font-medium shadow-lg'
                    >
                        {showInfo}
                    </motion.div>
                )}

                {/* 完成提示 */}
                {allCollected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='absolute inset-0 flex items-center justify-center bg-black/20'>
                        <div className='bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4'>
                            <div className='w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Award className='text-white' size={32} />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-2'>恭喜！🎉</h3>
                            <p className='text-gray-600 mb-4'>你已經收集了所有情緒泡泡！你的情緒寵物已解鎖新服裝，快去看看吧！</p>
                        </div>
                    </motion.div>
                )}
            </t.In>

            {emotions.map((emotion, i) => !emotion.collected && <EmotionBubble key={emotion.id} emotion={emotion} position={bubblePositions[i]} onCollect={() => collectEmotion(emotion.id)} />)}

            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} maxPolarAngle={Math.PI / 2.2} minDistance={5} maxDistance={15} />
        </>
    );
}

// rat-tunnel

// 主應用組件
export function ColorPal() {
    return (
        <div className='w-full h-screen bg-gradient-to-b from-blue-50 to-indigo-100'>
            <Canvas camera={{ position: [5, 5, 5], fov: 60 }} shadows>
                <GameScene></GameScene>
            </Canvas>
            {<t.Out></t.Out>}
        </div>
    );
}
