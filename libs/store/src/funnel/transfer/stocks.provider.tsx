"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createStocksStore } from "./stocks.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { StockStore, IStockState } from "./stocks.store";

export const StocksStoreContext = createContext<StoreApi<StockStore> | null>(
    null
);

export interface IStocksStoreProviderProps {
    children: ReactNode;
    initial: Pick<IStockState, "stocks">;
}

export const StocksStoreProvider = ({
    children,
    initial,
}: IStocksStoreProviderProps) => {
    const storeRef = useRef<StoreApi<StockStore>>();
    if (!storeRef.current) {
        storeRef.current = createStocksStore(initial);
        // storeRef.current.subscribe(_stocksSubscribers);
    }

    return (
        <StocksStoreContext.Provider value={storeRef.current}>
            {children}
        </StocksStoreContext.Provider>
    );
};

export const useStocksStore = <T,>(selector: (store: StockStore) => T): T => {
    const stocksStoreContext = useContext(StocksStoreContext);

    if (!stocksStoreContext) {
        throw new Error(
            `useStocksStore must be use within StocksStoreProvider`
        );
    }

    return useStore(stocksStoreContext, selector);
};
