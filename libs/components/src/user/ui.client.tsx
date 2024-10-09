"use client";

import { useUserBonusStore } from "@royalfut/store";
import { isValueNonDefined } from "@royalfut/utils";
import { LoyaltyPointsBadge } from "../badges";

import type { FC, ComponentPropsWithoutRef } from "react";

export const UserLoyaltyBtnBadge: FC<
    Omit<ComponentPropsWithoutRef<typeof LoyaltyPointsBadge>, "amount">
> = props => {
    const amount = useUserBonusStore(state => state.loyalty?.balance);

    if (isValueNonDefined(amount)) return null;

    return <LoyaltyPointsBadge amount={String(amount)} {...props} />;
};
