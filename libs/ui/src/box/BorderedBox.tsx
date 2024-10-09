import { forwardRef } from "react";
import { ShapeSubtract2Icon } from "@royalfut/icons";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import type { FNCNChildren } from "@royalfut/interfaces";

const SubtractBox: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "absolute left-0 top-0 w-[calc(100%-var(--border-size))] h-[calc(100%-var(--border-size))] pointer-events-none rounded-[var(--rounded)] overflow-hidden opacity-10",
                className
            )}>
            {children}
        </div>
    );
};

interface IBorderedBoxProps {
    design?: {
        gradient?:
            | true
            | "accent-1"
            | "accent-2"
            | "accent-3"
            | "accent-4"
            | "accent-5"
            | "accent-5"
            | "accent-6";
        subtract?: {
            isEnable: boolean;
            cn?: string;
        };
    };
    cnBox?: string;
    asChild?: boolean;
}

const BorderedBox = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> & IBorderedBoxProps
>(
    (
        { className, children, design, cnBox, asChild = false, ...rest },
        externalRef
    ) => {
        const Comp = asChild ? Slot : "div";

        return (
            <div
                ref={externalRef}
                className={cn(
                    "relative min-h-0 break-inside-avoid",
                    {
                        "border border-white-20": !design?.gradient,
                        "[--border-size:1.5px] [--color-illusion-linear-bg:theme(colors.black.background)] [--border-color:theme(colors.white.20)] [--color-illusion-shine-accent-1:theme(colors.primary)] [--color-illusion-shine-accent-2:theme(colors.secondary)]":
                            design?.gradient,
                        "[--color-illusion-linear-bg-2:#A82DF9] [--color-illusion-shine-accent-1:#A82DF9] [--color-illusion-shine-accent-2:#A82DF9]":
                            design?.gradient === "accent-1",
                        "[--color-illusion-linear-bg-2:#CA636A] [--color-illusion-shine-accent-1:#CA636A] [--color-illusion-shine-accent-2:#CA636A]":
                            design?.gradient === "accent-2",
                        "[--color-illusion-linear-bg-2:#5EECA8] [--color-illusion-shine-accent-1:#5EECA8] [--color-illusion-shine-accent-2:#5EECA8]":
                            design?.gradient === "accent-3",
                        "[--color-illusion-linear-bg-2:#5398FF] [--color-illusion-shine-accent-1:#5398FF] [--color-illusion-shine-accent-2:#5398FF]":
                            design?.gradient === "accent-4",
                        "[--color-illusion-linear-bg-2:#FFEB3C] [--color-illusion-shine-accent-1:#FFEB3C] [--color-illusion-shine-accent-2:#FFEB3C]":
                            design?.gradient === "accent-5",
                        "[--color-illusion-linear-bg-2:#90CA63] [--color-illusion-shine-accent-1:#90CA63] [--color-illusion-shine-accent-2:#90CA63]":
                            design?.gradient === "accent-6",
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
                {design?.subtract?.isEnable && (
                    <SubtractBox
                        className={cn(
                            "m-[var(--border-size)]",
                            design.subtract.cn
                        )}>
                        <ShapeSubtract2Icon className="text-white absolute -left-[8%] -top-[15%] w-3/4 sm:w-1/3 h-auto pointer-events-none" />
                    </SubtractBox>
                )}
                {design?.subtract?.isEnable && (
                    <SubtractBox className={design.subtract.cn}>
                        <ShapeSubtract2Icon className="text-white absolute -right-[12%] -bottom-[20%] m-[var(--border-size)] w-3/4 sm:w-1/3 h-auto pointer-events-none" />
                    </SubtractBox>
                )}
                <Comp
                    className={cn(
                        "relative w-full h-full",
                        {
                            "m-[var(--border-size)] rounded-[var(--rounded)]":
                                design?.gradient,
                            "bg-black-shape rounded-[inherit]":
                                !design?.gradient,
                        },
                        cnBox
                    )}>
                    {children}
                </Comp>
            </div>
        );
    }
);

export default BorderedBox;
