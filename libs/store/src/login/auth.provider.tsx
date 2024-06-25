"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createAuthStore } from "./auth.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { AuthStore, IAuthState } from "./auth.store";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

export interface IAuthStoreProviderProps {
    children: ReactNode;
    initial: Pick<IAuthState, "isLoggedIn">;
}

export const AuthStoreProvider = ({
    children,
    initial,
}: IAuthStoreProviderProps) => {
    const storeRef = useRef<StoreApi<AuthStore>>();
    if (!storeRef.current) {
        storeRef.current = createAuthStore(initial);
    }

    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
    const authStoreContext = useContext(AuthStoreContext);

    if (!authStoreContext) {
        throw new Error(`useAuthStore must be use within AuthStoreProvider`);
    }

    return useStore(authStoreContext, selector);
};
