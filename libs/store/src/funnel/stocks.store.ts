import { createStore } from "zustand";
import { PricePolicy, type TPricePolicy } from "@royalfut/collections";
import { immer } from "zustand/middleware/immer";

export interface IStockState {
    stocks: TPricePolicy | null;
}

interface IStockActions {
    setStocks: (stocks: TPricePolicy) => void;
}

export type StockStore = IStockState & IStockActions;

const initialStockStore: IStockState = {
    stocks: PricePolicy,
};

export const createStocksStore = (
    initState: IStockState = initialStockStore
) => {
    return createStore<StockStore>()(
        immer((set) => ({
            ...initState,
            setStocks: stocks =>
                set(state => {
                    state.stocks = stocks;
                }),
        }))
    );
};
