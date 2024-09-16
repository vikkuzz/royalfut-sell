import { CrownIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

const LoyaltyPointsBadge: FNCN<{ amount: string; size?: "sm" | "md" }> = ({
    className,
    amount,
    size = "sm",
}) => {
    return (
        <div
            className={cn(
                "flex justify-center items-center gap-1 rounded-3xl bg-linear-primary-simple-pan",
                {
                    "py-px px-2": size === "sm",
                    "py-0.5 px-2 sm:px-3": size === "md",
                },
                className
            )}>
            <span
                className={cn("font-semibold", {
                    "text-base": size === "sm",
                    "text-lg leading-normal": size === "md",
                })}>
                {amount}
            </span>
            <div>
                <CrownIcon
                    className={cn("text-white", {
                        "w-3 h-3": size === "sm",
                        "w-3.5 h-3.5 sm:w-4 sm:h-4": size === "md",
                    })}
                />
            </div>
        </div>
    );
};

export default LoyaltyPointsBadge;
