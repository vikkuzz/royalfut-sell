import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { IOrder } from "@royalfut/interfaces";

export interface IOrderState {
    order: IOrder | null;
}

interface IOrderActions {
    setOrder: (order: IOrder | null) => void;
}

export type OrderStore = IOrderState & IOrderActions;

const initialOrderStore: IOrderState = {
    order: null,
};

export const createOrderStore = (
    initState: IOrderState = initialOrderStore
) => {
    return createStore<OrderStore>()(
        immer(set => ({
            ...initState,
            setOrder: (order: IOrder | null) =>
                set(state => {
                    state.order = order;
                }),
        }))
    );
};
