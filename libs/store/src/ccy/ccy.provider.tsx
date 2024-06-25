"use client";

import { createContext, useRef, useContext, useEffect } from "react";
import { useStore } from "zustand";
import { createCurrencyStore } from "./ccy.store";
import {
    useActualPrice,
    useTransferSelectorStore,
} from "../funnel/wallet.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { CurrencyStore, ICCYState } from "./ccy.store";

export const CurrencyStoreContext =
    createContext<StoreApi<CurrencyStore> | null>(null);

export interface ICurrencyStoreProviderProps {
    children: ReactNode;
    initial: ICCYState;
}

const StoreBridges = () => {
    const setPrice = useTransferSelectorStore.use.setPrice();
    const { label, price } = useActualPrice();

    useEffect(() => {
        setPrice(price, label);
    }, [label, price, setPrice]);

    return null;
};

export const CurrencyStoreProvider = ({
    children,
    initial,
}: ICurrencyStoreProviderProps) => {
    const storeRef = useRef<StoreApi<CurrencyStore>>();
    if (!storeRef.current) {
        storeRef.current = createCurrencyStore(initial);
    }

    return (
        <CurrencyStoreContext.Provider value={storeRef.current}>
            <StoreBridges />
            {children}
        </CurrencyStoreContext.Provider>
    );
};

export const useCurrencyStore = <T,>(
    selector: (store: CurrencyStore) => T
): T => {
    const currencyStoreContext = useContext(CurrencyStoreContext);

    if (!currencyStoreContext) {
        throw new Error(
            `useCurrencyStore must be use within CurrencyStoreProvider`
        );
    }

    return useStore(currencyStoreContext, selector);
};
