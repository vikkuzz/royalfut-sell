import { LoyaltyPointsBadge } from "../badges";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface ILoyaltyPointsIndicator {
    showPrice?: boolean;
}

const LoyaltyPointsIndicator: FC<ILoyaltyPointsIndicator> = ({
    showPrice = true,
}) => {
    return (
        <div
            className={cn("flex w-auto", {
                "py-0.5 pl-0.5 pr-2 items-center gap-1.5 rounded-3xl bg-white-10":
                    showPrice,
            })}>
            <LoyaltyPointsBadge amount="+10" size="md" />
            {showPrice && (
                <div className="flex gap-1.5 text-white text-sm font-medium">
                    <span>≈</span>
                    <span>1 USD</span>
                </div>
            )}
        </div>
    );
};

export default LoyaltyPointsIndicator;
