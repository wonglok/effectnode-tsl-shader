//
// Copyright © 2026 Wong lok. All rights reserved
// LokLok DreamFX
// Praise Jesus
//

import { createContext, useContext, useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { EachEdge, EachNode } from '../CanvasEditor/AppContext';

let getInitData = (set: (a: any) => void, get: () => any) => {
    return {
        _id: '' as string,
        nodes: [] as EachNode[],
        edges: [] as EachEdge[],
        //
    };
};

type InitDataType = Awaited<ReturnType<typeof getInitData>>;

const getStore = () => {
    return create<InitDataType>((set, get) => {
        return getInitData(set, get);
    });
};

type StoreType = Awaited<ReturnType<typeof getStore>>;

const RawContextVFX = createContext<StoreType>(getStore());

export const VFXContext = ({ children, state = null }: any) => {
    let store = useMemo(() => {
        return getStore();
    }, []);

    useEffect(() => {
        store.subscribe(() => {});
    }, []);

    useEffect(() => {
        if (state && store) {
            store.setState(state);
        }
    }, [state, store]);

    return <>{<RawContextVFX.Provider value={store}>{children}</RawContextVFX.Provider>}</>;
};

export const useVFX = (fnc: (state: InitDataType) => any) => {
    let useCore = useContext(RawContextVFX);

    return useCore(fnc);
};

export const useStoreOfVFX = () => {
    let useCore2 = useContext(RawContextVFX);

    return useCore2;
};

//
//
//
