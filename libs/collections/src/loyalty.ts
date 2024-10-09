import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";

interface ILoyaltyAchievementEntity {
    requirements: Array<string>;
    benefits: Array<string>;
    image: {
        src: string;
    };
}

export const loyaltyTierTitleMap: Record<
    ELoyaltyProgrammaAchievementIDs,
    string
> = {
    [ELoyaltyProgrammaAchievementIDs.BRONZE]: "Bronze",
    [ELoyaltyProgrammaAchievementIDs.SILVER]: "Silver",
    [ELoyaltyProgrammaAchievementIDs.GOLD]: "Gold",
    [ELoyaltyProgrammaAchievementIDs.INFORM]: "Inform",
    [ELoyaltyProgrammaAchievementIDs.HERO]: "Hero",
    [ELoyaltyProgrammaAchievementIDs.ICON]: "Icon",
};

export const loyaltyAchievementDataMap: Record<
    ELoyaltyProgrammaAchievementIDs,
    ILoyaltyAchievementEntity
> = {
    [ELoyaltyProgrammaAchievementIDs.BRONZE]: {
        requirements: ["0 purchases on the website", "0 coins bought in total"],
        benefits: ["1% of cashback received from every purchase"],
        image: {
            src: "/image/loyalty/sm/bronze_medal.png",
        },
    },
    [ELoyaltyProgrammaAchievementIDs.SILVER]: {
        requirements: [
            "2 purchases on the website",
            "2 000 000 coins bought in total",
        ],
        benefits: [
            "3% of cashback received from every purchase",
            "Up to 10% of the order price can be paid with ROYAL Points",
        ],
        image: {
            src: "/image/loyalty/sm/silver_medal.png",
        },
    },
    [ELoyaltyProgrammaAchievementIDs.GOLD]: {
        requirements: [
            "2 purchases on the website",
            "6 000 000 coins bought in total",
        ],
        benefits: [
            "5% of cashback received from every purchase",
            "Up to 15% of the order price can be paid with ROYAL Points",
        ],
        image: {
            src: "/image/loyalty/sm/gold_medal.png",
        },
    },
    [ELoyaltyProgrammaAchievementIDs.INFORM]: {
        requirements: [
            "3 purchases on the website",
            "15 000 000 coins bought in total",
        ],
        benefits: [
            "7% of cashback received from every purchase",
            "Up to 25% of the order price can be paid with ROYAL Points",
        ],
        image: {
            src: "/image/loyalty/sm/inform_medal.png",
        },
    },
    [ELoyaltyProgrammaAchievementIDs.HERO]: {
        requirements: [
            "4 purchases on the website",
            "30 000 000 coins bought in total",
        ],
        benefits: [
            "10% of cashback received from every purchase",
            "Up to 50% of the order price can be paid with ROYAL Points",
        ],
        image: {
            src: "/image/loyalty/sm/hero_medal.png",
        },
    },
    [ELoyaltyProgrammaAchievementIDs.ICON]: {
        requirements: [
            "4 purchases on the website",
            "70 000 000 coins bought in total",
        ],
        benefits: [
            "15% of cashback received from every purchase",
            "Up to 75% of the order price can be paid with ROYAL Points",
        ],
        image: {
            src: "/image/loyalty/sm/icon_medal.png",
        },
    },
};
