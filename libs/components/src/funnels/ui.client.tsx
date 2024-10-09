"use client";

import { cn } from "@royalfut/utils";
import { LoyaltyPointsBadge } from "../badges";
import { useCurrencyStore } from "@royalfut/store";
import { useLoyaltyPointsCalc } from "@royalfut/hooks";
import { ccyCollection } from "@royalfut/collections";
import { formatCommaNumber } from "@royalfut/utils";

import type { FC } from "react";

interface ILoyaltyPointsIndicator {
    showPrice?: boolean;
}

export const LoyaltyPointsIndicator: FC<ILoyaltyPointsIndicator> = ({
    showPrice = true,
}) => {
    const loyalty = useLoyaltyPointsCalc();
    const ccy = useCurrencyStore(state => ccyCollection[state.currency].code);

    if (!loyalty) return null;

    return (
        <div
            className={cn("flex w-auto", {
                "py-0.5 pl-0.5 pr-2 items-center gap-1.5 rounded-3xl bg-white-10":
                    showPrice,
            })}>
            <LoyaltyPointsBadge
                amount={`+${formatCommaNumber(Math.floor(loyalty.points))}`}
                size="md"
            />
            {showPrice && (
                <div className="flex gap-1.5 text-white text-sm font-medium">
                    <span>≈</span>
                    <span>
                        {formatCommaNumber(+loyalty.pointsPrice.toFixed(2))}{" "}
                        {ccy}
                    </span>
                </div>
            )}
        </div>
    );
};
