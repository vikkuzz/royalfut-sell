"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createUserStore } from "./user.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { UserStore, IUserState } from "./user.store";

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

export interface IUserStoreProviderProps {
    children: ReactNode;
    initial: Pick<IUserState, "user">;
}

export const UserStoreProvider = ({
    children,
    initial,
}: IUserStoreProviderProps) => {
    const storeRef = useRef<StoreApi<UserStore>>();
    if (!storeRef.current) {
        storeRef.current = createUserStore(initial);
    }

    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {children}
        </UserStoreContext.Provider>
    );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
    const userStoreContext = useContext(UserStoreContext);

    if (!userStoreContext) {
        throw new Error(`useUserStore must be use within UserStoreProvider`);
    }

    return useStore(userStoreContext, selector);
};
