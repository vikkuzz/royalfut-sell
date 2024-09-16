import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { IWithdraw } from "@royalfut/interfaces";

export interface IWithdrawState {
    wallet: IWithdraw | null;
}

interface IWithdrawActions {
    setWithdrawWallet: (wallet: IWithdraw | null) => void;
}

export type WithdrawStore = IWithdrawState & IWithdrawActions;

const initialWithdrawStore: IWithdrawState = {
    wallet: null,
};

export const createWithdrawStore = (
    initState: IWithdrawState = initialWithdrawStore,
) => {
    return createStore<WithdrawStore>()(
        immer((set) => ({
            ...initState,
            setWithdrawWallet: (wallet: IWithdraw | null) =>
                set((state) => {
                    state.wallet = wallet;
                }),
        }))
    );
};
