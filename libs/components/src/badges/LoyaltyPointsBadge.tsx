import { CrownIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface ILoyaltyPointsBadgeProps {
    size?: "sm" | "md" | "none";
    view?: "bg" | "border" | "none";
}

type TLoyaltyPointsBadgeProps =
    | {
          amount: string;
      }
    | {};

const LoyaltyPointsBadge: FNCN<
    ILoyaltyPointsBadgeProps & TLoyaltyPointsBadgeProps
> = ({ className, size = "sm", view = "bg", ...props }) => {
    return (
        <div
            className={cn(
                "flex justify-center items-center gap-1 rounded-3xl",
                {
                    "py-px px-2": size === "sm",
                    "py-0.5 px-2 sm:px-3": size === "md",
                    "bg-linear-primary-simple-pan": view === "bg",
                    "relative bg-transparent before:absolute before:border before:border-transparent before:-top-0.5 before:-left-0.5 before:-right-0.5 before:-bottom-0.5 before:rounded-3xl before:bordered-box-linear-accent-1":
                        view === "border",
                },
                className
            )}>
            {"amount" in props ? (
                <span
                    className={cn("font-semibold relative", {
                        "text-base": size === "sm",
                        "text-lg leading-normal": size === "md",
                    })}>
                    {props.amount}
                </span>
            ) : null}
            <CrownIcon
                className={cn("text-white", {
                    "w-2/3 h-2/3": size === "none",
                    "w-3 h-3": size === "sm",
                    "w-3.5 h-3.5 sm:w-4 sm:h-4": size === "md",
                })}
            />
        </div>
    );
};

export default LoyaltyPointsBadge;
