import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";
import type { FNCNChildren, IBoxInnerProps } from "@royalfut/interfaces";

interface IBaseBoxProps
    extends ComponentPropsWithoutRef<"div">,
        IBoxInnerProps {
    asChild?: boolean;
}

export const BaseBox = forwardRef<ElementRef<"div">, IBaseBoxProps>(
    (
        {
            asChild = false,
            size = "md",
            asSize = false,
            screen = "square",
            rounded = true,
            className,
            children,
            ...props
        },
        externalRef
    ) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                className={cn(
                    size === "xs" && {
                        "rounded-lg": rounded,
                        "px-2 py-2": screen === "square" && !asSize,
                        "w-9 h-9": screen === "square" && asSize,
                        "px-6 py-2.5": screen === "landscape" && !asSize,
                        "w-16 h-9": screen === "landscape" && asSize,
                    },
                    size === "sm" && {
                        "rounded-lg": rounded,
                        "px-3 py-3": screen === "square" && !asSize,
                        "w-12 h-12": screen === "square" && asSize,
                        "px-7 py-3": screen === "landscape" && !asSize,
                        "w-20 h-12": screen === "landscape" && asSize,
                    },
                    size === "md" && {
                        "rounded-xl": rounded,
                        "px-4 py-4": screen === "square" && !asSize,
                        "w-16 h-16": screen === "square" && asSize,
                        "px-8 py-3": screen === "landscape" && !asSize,
                        "w-24 h-14": screen === "landscape" && asSize,
                    },
                    size === "lg" && {
                        "rounded-2xl": rounded,
                        "px-4.5 py-4.5": screen === "square" && !asSize,
                        "w-20 h-20": screen === "square" && asSize,
                        "px-9 py-2.5": screen === "landscape" && !asSize,
                        "w-29 h-16": screen === "landscape" && asSize,
                    },
                    className
                )}
                {...props}
                ref={externalRef}>
                {children}
            </Comp>
        );
    }
);

export const StickyCardsBox: FNCNChildren = ({ children }) => {
    return (
        <div className="sticky -mt-[var(--size-layout-header)] top-0 h-max w-full pointer-events-none">
            <div className="pt-[var(--size-layout-header)] pointer-events-none">
                <div className="pointer-events-auto">{children}</div>
            </div>
        </div>
    );
};
