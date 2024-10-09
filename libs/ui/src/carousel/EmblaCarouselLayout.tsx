import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";

const Item: FNCNChildren<{ asChild?: boolean; cnBox?: string }> = ({
    className,
    children,
    cnBox,
    asChild = false,
}) => {
    const Comp = asChild ? Slot : "div";

    return (
        <div
            className={cn(
                "translate-x-0 translate-y-0 flex-[0_0_var(--embla-slide-size)] min-w-0 pl-[var(--embla-slide-spacing)]",
                cnBox
            )}>
            <Comp
                className={cn(
                    "flex relative select-none h-[var(--embla-slide-height)]",
                    className
                )}>
                {children}
            </Comp>
        </div>
    );
};

const Body = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
    ({ children, className, ...rest }, externalRef) => {
        return (
            <div
                className={cn("overflow-hidden", className)}
                ref={externalRef}
                {...rest}>
                <div
                    className={cn(
                        "flex ml-[calc(var(--embla-slide-spacing)*-1)] carousel-touch",
                        "[--border-size:1.5px] [--rounded:1.75rem] [--color-illusion-linear-bg:theme(colors.black.background)] [--border-color:theme(colors.white.20)] [--color-illusion-shine-accent-1:theme(colors.primary)] [--color-illusion-shine-accent-2:theme(colors.secondary)]"
                    )}>
                    {children}
                </div>
            </div>
        );
    }
);

const Root: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "[--embla-slide-height:29rem] [--embla-slide-spacing:1.5rem] [--embla-slide-size:75%] sm:[--embla-slide-size:30%] lg:[--embla-slide-size:28%] w-full mx-auto",
                className
            )}>
            {children}
        </div>
    );
};

const ProgressBar: FNCN<{ progress: number }> = ({ className, progress }) => {
    return (
        <div
            className={cn(
                "w-full overflow-hidden relative justify-self-end self-center",
                className
            )}>
            <div
                className="absolute w-full top-0 bottom-0 -left-full bg-[var(--bar-thumb-bg)] rounded-r-full"
                style={{ transform: `translate3d(${progress}%,0px,0px)` }}
            />
        </div>
    );
};

export { Root, Body, Item, ProgressBar };
