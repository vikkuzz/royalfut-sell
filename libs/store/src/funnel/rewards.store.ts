import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
    IBonusLevelEntity,
    TLoyaltyProgramStatusedLevels,
} from "@royalfut/interfaces";

export interface IRewardsState {
    loyalty: {
        startingLevel: IBonusLevelEntity | null;
        levels: Array<IBonusLevelEntity>;
        levelsByStatus: TLoyaltyProgramStatusedLevels | null;
    };
}

interface IRewardsActions {
    setLoyaltyLevels: (levels: Array<IBonusLevelEntity>) => void;
}

export type TRewardsStore = IRewardsState & IRewardsActions;

const initialRewardsState: IRewardsState = {
    loyalty: {
        startingLevel: null,
        levels: [],
        levelsByStatus: null,
    },
};

export const createRewardsStore = (
    initState: IRewardsState = initialRewardsState
) => {
    return createStore<TRewardsStore>()(
        immer(set => ({
            ...initState,
            setLoyaltyLevels: levels =>
                set(state => {
                    state.loyalty.levels = levels;
                }),
        }))
    );
};
