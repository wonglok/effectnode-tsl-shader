//
// Copyright © 2026 Wong lok. All rights reserved
// LokLok DreamFX
// Praise Jesus
//

import md5 from 'md5';
import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';
import { BufferGeometry, Mesh, MeshPhysicalMaterial, Object3D } from 'three';
import { create } from 'zustand';

const getDataTemplate = () => {
    return {
        //
        hdrURL: `https://d2upc1jytt7esc.cloudfront.net/resource/hdr/the_sky_is_on_fire_1k.hdr`,
        // hdrURL: `/assets/hdr/bryanston_park_sunrise_1k.hdr`,

        // placeURL: `/assets/place/home-v02.glb`,
        // placeURL: `/assets/place/lok-church-2.glb`,
        placeURL: `/assets/place/scifi-transformed.glb`,
        // placeURL: `/assets/place/exhitibition.glb`,
        // placeURL: `/assets/place/hall-02.glb`,

        // rpm
        avatarURL: `/assets/non-rpm/rpm/mall-guy.glb`,
        avatarBoneFix: true,
        avatarScale: 1.0,
        avatarOffsetY: -0.8,
        avatarRotX: 0,

        // // ai gen
        // avatarURL: `/assets/non-rpm/ava/swat-raw-transformed.glb`,
        // avatarBoneFix: true,
        // avatarScale: 0.5,
        // avatarOffsetY: -0.45,

        // temp data
        cameraTempLocation: [0, 0, 0],
        avatarTempLocation: [0, 0, 0],
        avatarTempRotY: 0,

        // playerRotY: 0.0 * Math.PI,
        // playerStart: [-0.08599137957061556, 0.8000419616699219, -23.439400274184976],
        // cameraStart: [-0.17773938264989078, 1.0803322058756253, -21.742451232274437],

        ...{
            playerRotY: 0,
            playerStart: [0, 0.795, 0],
            cameraStart: [0.169, 3.701, -4.153],
        },

        //
        render: 'ssgi',

        timeOfDay: 1,
        orbitOfSun: 0.25,

        isAnimatingLight: true,
        isAnimatingOrbit: true,

        readyRender: true,

        isScreenMotion: false,

        patches: [] as EachPatch[],
    };
};

export const getIDFromO3D = (it: Object3D) => {
    return `${md5(`${it?.userData?.object3dHash}${it.userData?.geometryHash}${it.userData?.materialHash}`)}`;
};

export const getActiveO3D = (renderTree: Object3D, activeNodeHash: string): Mesh<BufferGeometry, MeshPhysicalMaterial> => {
    let activeNode: any = false;

    renderTree?.traverse((tree: any) => {
        let hash = getIDFromO3D(tree);
        if (hash === activeNodeHash) {
            if (!activeNode) {
                activeNode = tree;
            }
        }
    });

    return activeNode;
};

export type EachNode = { id: string; type: string; dragHandle?: string; position: { x: number; y: number }; data: any };
export type EachEdge = {
    //
    id: string;
    type?: string;
    source: string;
    sourceHandle?: string;
    target: string;
    targetHandle?: string;
    data: any;
};

export type EachPatch = {
    _id: string;
    nodes: EachNode[];
    edges: EachEdge[];
};

let getAppInititalState = (set: (a: any) => void, get: () => any) => {
    return {
        lighting: null,
        query: '',

        //
        renderTree: null as any,
        activeNodeHash: ``,

        //
        ...getDataTemplate(),
        //
    };
};

export type AppInitStateType = Awaited<ReturnType<typeof getAppInititalState>>;

const getStateStore = () => {
    return create<AppInitStateType>((set, get) => {
        return getAppInititalState(set, get);
    });
};

type StoreType = Awaited<ReturnType<typeof getStateStore>>;

const RawContextApp = createContext<StoreType>(getStateStore());

export const AppContext = ({
    children,
    state = null,
    subscribe = (a: AppInitStateType, b: AppInitStateType) => {},
}: {
    children?: ReactNode;
    state?: AppInitStateType | Partial<AppInitStateType> | null;
    subscribe?: (a: AppInitStateType, b: AppInitStateType) => void;
}) => {
    let store = useMemo(() => {
        return getStateStore();
    }, []);

    useEffect(() => {
        if (!subscribe) {
            return;
        }
        //

        return store.subscribe(subscribe);
    }, [subscribe]);

    useEffect(() => {
        if (state && store) {
            store.setState(state);
        }
    }, [state, store]);

    return <>{<RawContextApp.Provider value={store}>{children}</RawContextApp.Provider>}</>;
};

export const useApp = (fnc: (state: AppInitStateType) => any) => {
    let useCore = useContext(RawContextApp);

    return useCore(fnc);
};

export const useStoreOfApp = () => {
    let useCore2 = useContext(RawContextApp);

    return useCore2;
};

export const getRenderOptionsData = () => {
    return [
        {
            displayName: 'SS Global Illumiunation',
            type: 'render',
            value: 'ssgi',
        },
        {
            displayName: 'SS Reflection',
            type: 'render',
            value: 'ssr',
        },
        {
            displayName: 'Bloom',
            type: 'render',
            value: 'bloom',
        },
        {
            displayName: 'Beauty',
            type: 'debug',
            value: 'beauty',
        },

        {
            displayName: 'Normal',
            type: 'debug',
            value: 'normal',
        },
        {
            displayName: 'Diffuse',
            type: 'debug',
            value: 'diffuse',
        },
        {
            displayName: 'Emissive',
            type: 'debug',
            value: 'emissive',
        },

        {
            displayName: 'Metal',
            type: 'debug',
            value: 'metal',
        },
        {
            displayName: 'Roughness',
            type: 'debug',
            value: 'roughness',
        },
        {
            displayName: 'Depth',
            type: 'debug',
            value: 'depth',
        },
    ];
};
