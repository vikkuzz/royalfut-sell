import { forwardRef } from "react";
import Image from "next/image";
import { ArrowDownFilledIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";
import type { ICCYCollectionEntity } from "@royalfut/interfaces";

interface ICurrencyPickerTriggerProps {
    size: "sm" | "md";
    ccy: ICCYCollectionEntity;
}

const CurrencyPickerTrigger = forwardRef<
    ElementRef<"button">,
    ComponentPropsWithoutRef<"button"> & ICurrencyPickerTriggerProps
>(({ size, className, ccy, ...props }, externalRef) => {
    return (
        <button
            className={cn("group h-full flex justify-between", className)}
            ref={externalRef}
            {...props}>
            <div
                className={cn("relative", {
                    "w-6 h-6": size === "md",
                    "w-4 h-4": size === "sm",
                })}>
                <Image src={ccy.image.flag} alt={ccy.currency} fill />
            </div>
            <span
                className={cn({
                    "text-xs font-bold": size === "sm",
                    "text-xl font-semibold": size === "md",
                })}>
                {ccy.code}
            </span>
            <ArrowDownFilledIcon
                className={cn(
                    "text-white transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0",
                    {
                        "w-6": size === "md",
                        "w-4": size === "sm",
                    }
                )}
            />
        </button>
    );
});
CurrencyPickerTrigger.displayName = "CurrencyPickerTrigger";

export default CurrencyPickerTrigger;
