import { SparkleAnimation } from "../animations";
import { cn } from "@royalfut/utils";

import type { FNCNChildren, FNCN } from "@royalfut/interfaces";

export const Root: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "flex relative w-full",
                "[--border-size:1.5px] [--rounded:1.75rem] [--color-illusion-linear-bg:theme(colors.black.background)] [--border-color:theme(colors.white.20)] [--color-illusion-shine-accent-1:theme(colors.primary)] [--color-illusion-shine-accent-2:theme(colors.secondary)]",
                className
            )}>
            {children}
        </div>
    );
};

export const Sparkle = () => {
    return (
        <div className="absolute w-full h-full z-[-1] right-0 flex md:hidden">
            <SparkleAnimation
                count={50}
                settings={{
                    size: {
                        min: 10,
                        max: 20,
                    },
                    pos: {
                        right: {
                            min: 0,
                            max: 90,
                            isPercent: true,
                        },
                        top: {
                            min: -30,
                            max: 30,
                        },
                    },
                    animate: {
                        delay: {
                            min: 1,
                            max: 3,
                        },
                        duration: {
                            min: 5,
                            max: 10,
                        },
                    },
                }}
            />
        </div>
    );
};

export const IllusionBorder: FNCN = ({ className }) => {
    return (
        <div className={cn("absolute left-0 top-0 w-full h-full", className)}>
            <div
                className={cn(
                    "relative h-full w-full gradient-illusion-border",
                    "after:absolute after:w-full after:h-full after:rounded-[var(--rounded)]"
                )}
            />
        </div>
    );
};

export const Body: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "relative flex m-[var(--border-size)] px-4 py-6 sm:py-6 sm:px-9 w-full rounded-[var(--rounded)] bg-linear-primary-dark",
                className
            )}>
            {children}
        </div>
    );
};
