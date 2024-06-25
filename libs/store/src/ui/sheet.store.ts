import { create } from "zustand";

export interface IUISheetState {
    isOpen: boolean;
}

interface IUISheetActions {
    setOpen: (open: boolean) => void;
}

export type UISheetStore = IUISheetState & IUISheetActions;

const initialUISheetStore: IUISheetState = {
    isOpen: false,
};

export const useUISheetStore = create<UISheetStore>(set => ({
    ...initialUISheetStore,
    setOpen: open => set({ isOpen: open }),
}));
