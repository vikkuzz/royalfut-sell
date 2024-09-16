import { createStore } from "zustand";

export interface IAuthState {
    isLoggedIn: boolean;
}

interface IAuthActions {
    setIsLogged: (isLoggedIn: boolean) => void;
}

export type AuthStore = IAuthState & IAuthActions;

const initialAuthStore: IAuthState = {
    isLoggedIn: false,
};

export const createAuthStore = (initState: IAuthState = initialAuthStore) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        setIsLogged: (isLoggedIn) => set({ isLoggedIn }),
    }));
};
