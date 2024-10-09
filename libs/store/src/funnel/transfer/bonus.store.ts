import { create } from "zustand";
import { createSelectors } from "../../createSelectors";

interface ITransferBonusesState {
    loyalty: {
        points: number;
        cashback: number;
    } | null;
    payment: {
        dicount: number;
    } | null;
    coupon: {
        percent: number;
    } | null;
}

interface ITransferBonusesActions {
    setLoyalty: (loyalty: ITransferBonusesState["loyalty"]) => void;
}

type TTransferBonusesStore = ITransferBonusesState & ITransferBonusesActions;

const initialTransferBonusesState: ITransferBonusesState = {
    loyalty: null,
    coupon: null,
    payment: null,
};

export const useTransferBonusesStore = create<TTransferBonusesStore>(set => ({
    ...initialTransferBonusesState,
    setLoyalty: loyalty =>
        set({
            loyalty,
        }),
}));

export const useTransferBonusesSelectorStore = createSelectors(
    useTransferBonusesStore
);
