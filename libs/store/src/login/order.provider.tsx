"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createOrderStore } from "./order.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { OrderStore, IOrderState } from "./order.store";

export const OrderStoreContext = createContext<StoreApi<OrderStore> | null>(
    null,
);

export interface IOrderStoreProviderProps {
    children: ReactNode;
    initial: Pick<IOrderState, "order">;
}

export const OrderStoreProvider = ({
    children,
    initial,
}: IOrderStoreProviderProps) => {
    const storeRef = useRef<StoreApi<OrderStore>>();
    if (!storeRef.current) {
        storeRef.current = createOrderStore(initial);
    }

    return (
        <OrderStoreContext.Provider value={storeRef.current}>
            {children}
        </OrderStoreContext.Provider>
    );
};

export const useOrderStore = <T,>(selector: (store: OrderStore) => T): T => {
    const orderStoreContext = useContext(OrderStoreContext);

    if (!orderStoreContext) {
        throw new Error(`useUserStore must be use within OrderStoreProvider`);
    }

    return useStore(orderStoreContext, selector);
};
