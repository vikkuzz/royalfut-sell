"use client";

import { useUserBonusStore } from "@royalfut/store";
import { LoyaltyPointsBadge } from "../badges";

import type { FC, ComponentPropsWithoutRef } from "react";

export const UserLoyaltyBtnBadge: FC<
    Omit<ComponentPropsWithoutRef<typeof LoyaltyPointsBadge>, "amount">
> = props => {
    const amount = useUserBonusStore(state => state.loyalty.amount);

    return <LoyaltyPointsBadge amount={String(amount)} {...props} />;
};
