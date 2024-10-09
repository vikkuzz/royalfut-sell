"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createRewardsStore } from "./rewards.store";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import type { TRewardsStore, IRewardsState } from "./rewards.store";

const RewardsStoreContext = createContext<StoreApi<TRewardsStore> | null>(null);

interface IRewardsStoreProviderProps {
    children: ReactNode;
    initial: {
        loyalty: Pick<IRewardsState["loyalty"], "levels" | "levelsByStatus">;
    };
}

export const RewardsStoreProvider = ({
    children,
    initial,
}: IRewardsStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TRewardsStore>>();

    if (!storeRef.current) {
        const levels = initial.loyalty.levels;
        const initialStore: IRewardsState = {
            loyalty: {
                startingLevel: levels.find(bonus => bonus.level === 0) ?? null,
                levels: levels,
                levelsByStatus: initial.loyalty.levelsByStatus,
            },
        };
        storeRef.current = createRewardsStore(initialStore);
    }

    return (
        <RewardsStoreContext.Provider value={storeRef.current}>
            {children}
        </RewardsStoreContext.Provider>
    );
};

export const useRewardsStore = <T,>(
    selector: (store: TRewardsStore) => T
): T => {
    const userBonusStoreContext = useContext(RewardsStoreContext);

    if (!userBonusStoreContext) {
        throw new Error(
            `useRewardsStore must be use within RewardsStoreProvider`
        );
    }

    return useStore(userBonusStoreContext, selector);
};
