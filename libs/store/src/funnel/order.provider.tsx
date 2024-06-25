"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createOrderTradeStepsStore } from "./order.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type {
    OrderTradeStepsStore,
    IOrderTradeStepsState,
} from "./order.store";

export const OrderTradeStoreContext =
    createContext<StoreApi<OrderTradeStepsStore> | null>(null);

export interface IOrderTradeStoreProviderProps {
    children: ReactNode;
    initial: Pick<IOrderTradeStepsState, "stepId">;
}

export const OrderTradeStoreProvider = ({
    children,
    initial,
}: IOrderTradeStoreProviderProps) => {
    const storeRef = useRef<StoreApi<OrderTradeStepsStore>>();
    if (!storeRef.current) {
        storeRef.current = createOrderTradeStepsStore(initial);
    }

    return (
        <OrderTradeStoreContext.Provider value={storeRef.current}>
            {children}
        </OrderTradeStoreContext.Provider>
    );
};

export const useOrderTradeStepsStore = <T,>(
    selector: (store: OrderTradeStepsStore) => T
): T => {
    const orderTradeStoreContext = useContext(OrderTradeStoreContext);

    if (!orderTradeStoreContext) {
        throw new Error(
            `useOrderTradeStepsStore must be use within OrderTradeStoreProvider`
        );
    }

    return useStore(orderTradeStoreContext, selector);
};
