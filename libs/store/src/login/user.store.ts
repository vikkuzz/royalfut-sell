import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
    IUserProfile,
    IAPI,
    IBonusLevelEntity,
} from "@royalfut/interfaces";

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
        immer((set) => ({
            ...initState,
            setUser: (user: IUserProfile | null) =>
                set((state) => {
                    state.user = user;
                }),
            setAvatarImage: (img: string) =>
                set((state) => {
                    if (state.user) {
                        state.user.avatar = img;
                    }
                }),
            setUserName: (name: string) =>
                set((state) => {
                    if (state.user) {
                        state.user.username = name;
                    }
                }),
            reset: () => set(initialUserStore),
        })),
    );
};

export interface IUserBonusState {
    info?: IAPI.Root.Bonus.Info.GET.Response.Body;
    levels?: Array<IBonusLevelEntity>;
    levelZero?: IBonusLevelEntity;
    loyalty: {
        amount: number;
    };
}

interface IUserBonusActions {
    setProfileLoyaltyAmount: (amount: number) => void;
}

export type UserBonusStore = IUserBonusState & IUserBonusActions;

const initialUserBonusStore: IUserBonusState = {
    loyalty: {
        amount: 0,
    },
};

export const createUserBonusStore = (
    initState: IUserBonusState = initialUserBonusStore
) => {
    return createStore<UserBonusStore>()(
        immer(set => ({
            ...initState,
            setProfileLoyaltyAmount: amount =>
                set(state => {
                    state.loyalty.amount = amount;
                }),
        }))
    );
};
