"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { useUpdate } from "@lilib/hooks";
import { createUserStore, createUserBonusStore } from "./user.store";
import { useTransferSelectorStore } from "../funnel";
import { useAuthStore } from "./auth.provider";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type {
    MakeRequiredAndNonNullableProps,
    WithRequiredProperty,
} from "@royalfut/interfaces";
import type {
    UserStore,
    IUserState,
    IUserBonusState,
    TUserBonusStore,
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

const UserStoreBridges = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const setBonuses = useTransferSelectorStore.use.setBonuses();
    const clear = useUserBonusStore(state => state.clear);

    useUpdate(() => {
        if (!isLoggedIn) {
            clear();
            setBonuses("loyalty", null);
        }
    }, [isLoggedIn]);

    return null;
};

const UserBonusStoreContext = createContext<StoreApi<TUserBonusStore> | null>(
    null
);

interface IUserBonusStoreProviderProps {
    children: ReactNode;
    initial: {
        info: WithRequiredProperty<IUserBonusState, "info">["info"] | null;
    };
}

export const UserBonusStoreProvider = ({
    children,
    initial,
}: IUserBonusStoreProviderProps) => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const storeRef = useRef<StoreApi<TUserBonusStore>>();

    if (!storeRef.current) {
        const bonusInfo = initial.info;
        const initialStore: MakeRequiredAndNonNullableProps<
            IUserBonusState,
            "loyalty"
        > = {
            info: initial.info,
            loyalty: {
                balance: 0,
            },
        };

        if (bonusInfo) {
            initialStore.loyalty.balance = Math.floor(
                bonusInfo.totalCashback * 10
            );
        }

        storeRef.current = createUserBonusStore(initialStore);
    }

    useUpdate(() => {
        const bonusInfo = initial.info;
        const initialStore: MakeRequiredAndNonNullableProps<
            IUserBonusState,
            "loyalty"
        > = {
            info: initial.info,
            loyalty: {
                balance: 0,
            },
        };

        if (bonusInfo) {
            initialStore.loyalty.balance = Math.floor(
                bonusInfo.totalCashback * 10
            );
        }

        if (!storeRef.current) {
            storeRef.current = createUserBonusStore(initialStore);
        } else if (isLoggedIn && bonusInfo) {
            storeRef.current.setState({
                info: bonusInfo,
                loyalty: { balance: Math.floor(bonusInfo.totalCashback * 10) },
            });
        } else {
            storeRef.current.setState({
                info: null,
                loyalty: { balance: 0 },
            });
        }
    }, [isLoggedIn, initial.info]);

    return (
        <UserBonusStoreContext.Provider value={storeRef.current}>
            <UserStoreBridges />
            {children}
        </UserBonusStoreContext.Provider>
    );
};

export const useUserBonusStore = <T,>(
    selector: (store: TUserBonusStore) => T
): T => {
    const userBonusStoreContext = useContext(UserBonusStoreContext);

    if (!userBonusStoreContext) {
        throw new Error(
            `useUserBonusStore must be use within UserBonusStoreProvider`
        );
    }

    return useStore(userBonusStoreContext, selector);
};
