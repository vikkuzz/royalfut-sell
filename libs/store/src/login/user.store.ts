import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { IUserProfile, IAPI } from "@royalfut/interfaces";

export interface IUserState {
    user: IUserProfile | null;
}

interface IUserActions {
    setUser: (user: IUserProfile | null) => void;
    setUserName: (name: string) => void;
    setAvatarImage: (image: string) => void;
    reset: () => void;
}

export type UserStore = IUserState & IUserActions;

const initialUserStore: IUserState = {
    user: null,
};

export const createUserStore = (initState: IUserState = initialUserStore) => {
    return createStore<UserStore>()(
        immer(set => ({
            ...initState,
            setUser: (user: IUserProfile | null) =>
                set(state => {
                    state.user = user;
                }),
            setAvatarImage: (img: string) =>
                set(state => {
                    if (state.user) {
                        state.user.avatar = img;
                    }
                }),
            setUserName: (name: string) =>
                set(state => {
                    if (state.user) {
                        state.user.username = name;
                    }
                }),
            reset: () => set(initialUserStore),
        }))
    );
};

export interface IUserBonusState {
    info: IAPI.Root.Bonus.Info.GET.Response.Body | null;
    loyalty: {
        balance: number;
    } | null;
}

interface IUserBonusActions {
    setProfileLoyaltyAmount: (amount: number) => void;
    clear: () => void;
}

export type TUserBonusStore = IUserBonusState & IUserBonusActions;

const initialUserBonusStore: IUserBonusState = {
    info: null,
    loyalty: null,
};

export const createUserBonusStore = (
    initState: IUserBonusState = initialUserBonusStore
) => {
    return createStore<TUserBonusStore>()(
        immer(set => ({
            ...initState,
            clear: () =>
                set({
                    info: null,
                    loyalty: {
                        balance: 0,
                    },
                }),
            setProfileLoyaltyAmount: amount =>
                set(state => {
                    if (!state.loyalty) {
                        state.loyalty = {
                            balance: amount,
                        };
                    } else {
                        state.loyalty.balance = amount;
                    }
                }),
        }))
    );
};
