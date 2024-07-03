"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createWithdrawStore } from "./withdraw.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { WithdrawStore, IWithdrawState } from "./withdraw.store";

export const WithdrawStoreContext = createContext<StoreApi<WithdrawStore> | null>(
    null
);

export interface IOrderStoreProviderProps {
    children: ReactNode;
    initial: IWithdrawState;
}

export const WithdrawStoreProvider = ({
    children,
    initial,
}: IOrderStoreProviderProps) => {
    const storeRef = useRef<StoreApi<WithdrawStore>>();
    if (!storeRef.current) {
        storeRef.current = createWithdrawStore(initial);
    }

    return (
        <WithdrawStoreContext.Provider value={storeRef.current}>
            {children}
        </WithdrawStoreContext.Provider>
    );
};

export const useWithdrawStore = <T,>(selector: (store: WithdrawStore) => T): T => {
    const withdrawStoreContext = useContext(WithdrawStoreContext);

    if (!withdrawStoreContext) {
        throw new Error(`useWithdrawStore must be use within WithdrawStoreProvider`);
    }

    return useStore(withdrawStoreContext, selector);
};
