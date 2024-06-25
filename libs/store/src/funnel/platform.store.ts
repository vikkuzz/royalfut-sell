import { create } from "zustand";
import { DefaultWalletSettings } from "@royalfut/collections";
import { EPlatforms } from "@royalfut/enums";

export interface IPlatformState {
    selectedPlatform: EPlatforms;
}

interface IPlatformActions {
    setPlatform: (platform: EPlatforms) => void;
}

export type PlatformStore = IPlatformState & IPlatformActions;

const initialPlatformStore: IPlatformState = {
    selectedPlatform: DefaultWalletSettings.transfer.platform,
};

export const usePlatformStore = create<PlatformStore>(set => ({
    ...initialPlatformStore,
    setPlatform: platform => set({ selectedPlatform: platform }),
}));
