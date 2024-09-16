import { createStore } from "zustand";
import { setCurrency } from "@royalfut/actions";
import { DefaultAppSettings } from "@royalfut/collections";
import { ECCYIDs } from "@royalfut/enums";

export interface ICCYState {
    currency: ECCYIDs;
}

interface ICCYAction {
    setCurrency: (currency: ECCYIDs) => void;
}

export type CurrencyStore = ICCYState & ICCYAction;

const initialCurrencyState: ICCYState = {
    currency: DefaultAppSettings.currency,
};

export const createCurrencyStore = (
    initState: ICCYState = initialCurrencyState,
) => {
    return createStore<CurrencyStore>()((set) => ({
        ...initState,
        setCurrency: (currency) =>
            set(() => {
                setCurrency(currency);
                return { currency };
            }),
    }));
};
