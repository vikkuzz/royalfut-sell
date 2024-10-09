"use client";

import {
    LoyaltyTierCard,
    UnexpectedErrorCard,
    LoyaltyExchangePointRate,
} from "@royalfut/components";
import { useUserBonusStore, useRewardsStore } from "@royalfut/store";
import { useUserCurrentLoyaltyLevelId } from "@royalfut/hooks";
import { CrownIcon } from "@royalfut/icons";
import { isValueNonDefined } from "@royalfut/utils";

export const LoyaltyRanging = () => {
    const levelsByStatus = useRewardsStore(
        state => state.loyalty.levelsByStatus
    );
    const userLevel = useUserCurrentLoyaltyLevelId();
    const { boughtCoins } = useUserBonusStore(state => ({
        boughtCoins: state.info?.orderedCoins,
    }));

    if (
        isValueNonDefined(boughtCoins) ||
        isValueNonDefined(levelsByStatus, false)
    ) {
        return (
            <LoyaltyTierCard.Root
                boughtCoins={boughtCoins!}
                levels={levelsByStatus!}
                richedTierId={userLevel.id!}>
                <UnexpectedErrorCard />
            </LoyaltyTierCard.Root>
        );
    }

    return (
        <LoyaltyTierCard.Root
            boughtCoins={boughtCoins!}
            levels={levelsByStatus!}
            richedTierId={userLevel.id!}>
            <LoyaltyTierCard.Header />
            <LoyaltyTierCard.RankProgression />
            <LoyaltyTierCard.Balance />
            <LoyaltyTierCard.ProgressBar />
            <LoyaltyTierCard.Benefits />
        </LoyaltyTierCard.Root>
    );
};

export const LoyaltyBalanceSummary = () => {
    const { balance } = useUserBonusStore(state => ({
        balance: state.loyalty?.balance,
    }));

    if (isValueNonDefined(balance)) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-2.5">
                <span className="text-7xl font-bold">{balance}</span>
                <CrownIcon className="text-white w-16 h-16" />
            </div>
            <LoyaltyExchangePointRate.Root className="text-xl">
                <LoyaltyExchangePointRate.Point cnIcon="w-3 h-3" />
                <LoyaltyExchangePointRate.Equal />
                <LoyaltyExchangePointRate.Price cnPicker="bg-[hsla(0,0%,100%,.2)]" />
            </LoyaltyExchangePointRate.Root>
        </div>
    );
};
