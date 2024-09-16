import { forwardRef } from "react";
import Image from "next/image";
import { ArrowDownFilledIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

interface IPickerTriggerProps {
    size: "sm" | "md";
    showFlag?: boolean;
    label: string;
    image: {
        flag: string;
        alt?: string;
    };
}

const PickerTrigger = forwardRef<
    ElementRef<"button">,
    ComponentPropsWithoutRef<"button"> & IPickerTriggerProps
>(
    (
        { size, className, showFlag = true, label, image, ...props },
        externalRef
    ) => {
        return (
            <button
                className={cn("group h-full flex justify-between", className)}
                ref={externalRef}
                {...props}>
                {showFlag && (
                    <div
                        className={cn("relative", {
                            "w-6 h-6": size === "md",
                            "w-4 h-4": size === "sm",
                        })}>
                        <Image src={image.flag} alt={image.alt || label} fill />
                    </div>
                )}
                <span
                    className={cn({
                        "text-xs font-bold": size === "sm",
                        "text-xl font-semibold": size === "md",
                    })}>
                    {label}
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
    }
);
PickerTrigger.displayName = "PickerTrigger";

export default PickerTrigger;
