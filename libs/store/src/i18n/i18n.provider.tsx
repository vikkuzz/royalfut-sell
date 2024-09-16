"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createI18nStore } from "./i18n.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { I18nStore, II18nState } from "./i18n.store";

export const I18nStoreContext = createContext<StoreApi<I18nStore> | null>(null);

export interface II18nStoreProviderProps {
    children: ReactNode;
    initial: II18nState;
}

export const I18nStoreProvider = ({
    children,
    initial,
}: II18nStoreProviderProps) => {
    const storeRef = useRef<StoreApi<I18nStore>>();
    if (!storeRef.current) {
        storeRef.current = createI18nStore(initial);
    }

    return (
        <I18nStoreContext.Provider value={storeRef.current}>
            {children}
        </I18nStoreContext.Provider>
    );
};

export const useI18nStore = <T,>(selector: (store: I18nStore) => T): T => {
    const i18nStoreContext = useContext(I18nStoreContext);

    if (!i18nStoreContext) {
        throw new Error(`useI18nStore must be use within I18nStoreProvider`);
    }

    return useStore(i18nStoreContext, selector);
};
