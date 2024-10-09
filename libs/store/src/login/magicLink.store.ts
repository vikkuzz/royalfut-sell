import { create } from "zustand";

export interface IMagicLinkState {
    email: string | null;
    isSendedLink: boolean;
}

interface IMagicLinkActions {
    setEmail: (email: string) => void;
    setIsSendedLink: (send: boolean) => void;
}

export type MagicLinkStore = IMagicLinkState & IMagicLinkActions;

const initialMagicLinkStore: IMagicLinkState = {
    email: null,
    isSendedLink: false,
};

export const useMagicLinkStore = create<MagicLinkStore>(set => ({
    ...initialMagicLinkStore,
    setEmail: email => set({ email }),
    setIsSendedLink: send => set({ isSendedLink: send }),
}));

export const resetMagicLinkStore = () => {
    useMagicLinkStore.setState(initialMagicLinkStore);
};
