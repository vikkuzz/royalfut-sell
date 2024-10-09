"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createAuthStore } from "./auth.store";

import type { ReactNode, ContextType } from "react";
import type { StoreApi } from "zustand";
import type { TAuthStore, IAuthState } from "./auth.store";

type ExtractState<S> = S extends {
    getState: () => infer T;
}
    ? T
    : never;

export const AuthStoreContext = createContext<StoreApi<TAuthStore> | null>(
    null
);

export interface IAuthStoreProviderProps {
    children: ReactNode;
    initial: Pick<IAuthState, "isLoggedIn">;
}

export const AuthStoreProvider = ({
    children,
    initial,
}: IAuthStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TAuthStore>>();
    if (!storeRef.current) {
        storeRef.current = createAuthStore(initial);
    }

    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    );
};

export const useAuthStore = <T,>(
    selector: (store: ExtractState<ContextType<typeof AuthStoreContext>>) => T
): T => {
    const authStoreContext = useContext(AuthStoreContext);

    if (!authStoreContext) {
        throw new Error(`useAuthStore must be use within AuthStoreProvider`);
    }

    return useStore(authStoreContext, selector);
};
