import type { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";

export interface IBonusLevelEntity {
    level: number;
    coins: number;
    minOrders: number;
    cashbackPercent: number;
    bonusPartPercent: number;
}

export type TLoyaltyProgramStatusedLevels = Record<
    ELoyaltyProgrammaAchievementIDs,
    {
        _id: ELoyaltyProgrammaAchievementIDs;
        nextLevelId: ELoyaltyProgrammaAchievementIDs | null;
        level: number;
        requirements: {
            purchases: number; // minOrders
            coins: number;
        };
        benefits: {
            cashbackPerc: number; // cashbackPercent
            bonusPartPerc: number;
        };
    }
>;
