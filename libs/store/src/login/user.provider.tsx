"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createUserStore, createUserBonusStore } from "./user.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type {
    UserStore,
    IUserState,
    IUserBonusState,
    UserBonusStore,
} from "./user.store";

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

const UserBonusStoreContext = createContext<StoreApi<UserBonusStore> | null>(
    null
);

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

interface IUserBonusStoreProviderProps {
    children: ReactNode;
    initial: {
        info: WithRequiredProperty<IUserBonusState, "info">["info"] | null;
        levels:
            | WithRequiredProperty<IUserBonusState, "levels">["levels"]
            | null;
    };
}

export const UserBonusStoreProvider = ({
    children,
    initial,
}: IUserBonusStoreProviderProps) => {
    const storeRef = useRef<StoreApi<UserBonusStore>>();

    if (!storeRef.current) {
        const bonusInfo = initial.info;
        const initialStore: IUserBonusState = {
            info: initial.info ?? undefined,
            levels: initial.levels ?? undefined,
            levelZero: initial.levels?.filter(el => el.level === 0)[0],
            loyalty: {
                amount: 0,
            },
        };
        if (bonusInfo) {
            initialStore.loyalty.amount = Math.floor(
                bonusInfo.totalCashback * 10
            );
        }
        storeRef.current = createUserBonusStore(initialStore);
    }

    return (
        <UserBonusStoreContext.Provider value={storeRef.current}>
            {children}
        </UserBonusStoreContext.Provider>
    );
};

export const useUserBonusStore = <T,>(
    selector: (store: UserBonusStore) => T
): T => {
    const userBonusStoreContext = useContext(UserBonusStoreContext);

    if (!userBonusStoreContext) {
        throw new Error(
            `useUserBonusStore must be use within UserBonusStoreProvider`
        );
    }

    return useStore(userBonusStoreContext, selector);
};
