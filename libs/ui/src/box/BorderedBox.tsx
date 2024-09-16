import { forwardRef } from "react";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

interface IBorderedBoxProps {
    design?: {
        gradient?: true;
    };
    cnBox?: string;
}

const BorderedBox = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> & IBorderedBoxProps
>(({ className, children, design, cnBox, ...rest }, externalRef) => {
    return (
        <div
            ref={externalRef}
            className={cn(
                "relative min-h-0 break-inside-avoid",
                {
                    "border border-white-20": !design?.gradient,
                    "[--border-size:1.5px] [--color-illusion-linear-bg:theme(colors.black.background)] [--border-color:theme(colors.white.20)] [--color-illusion-shine-accent-1:theme(colors.primary)] [--color-illusion-shine-accent-2:theme(colors.secondary)]":
                        design?.gradient,
                },
                className
            )}
            {...rest}>
            {design?.gradient && (
                <div className="absolute left-0 top-0 w-full h-full">
                    <div
                        className={cn(
                            "relative h-full w-full gradient-illusion-border",
                            "after:absolute after:w-full after:h-full after:rounded-[var(--rounded)]"
                        )}
                    />
                </div>
            )}
            <div
                className={cn(
                    "relative w-full h-full",
                    {
                        "m-[var(--border-size)] rounded-[var(--rounded)]":
                            design?.gradient,
                        "bg-black-shape rounded-[inherit]": !design?.gradient,
                    },
                    cnBox
                )}>
                {children}
            </div>
        </div>
    );
});

export default BorderedBox;
