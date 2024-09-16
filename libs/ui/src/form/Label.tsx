"use client";

import { forwardRef } from "react";
import { FormLabelProps } from "@radix-ui/react-form";
import { Root as RadixLabelRoot } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { FC, ElementRef, ComponentPropsWithoutRef } from "react";

const lbCn = "block text-base font-normal font-sans leading-6 text-white w-max";

export interface ILabelProps extends FormLabelProps {
    required?: boolean;
    provider?: "radix" | "radix-form" | "base";
    asChild?: boolean;
}

export const ComplexLabel = RadixLabelRoot;

const Label: FC<ILabelProps> = forwardRef<
    ElementRef<"label">,
    Omit<ComponentPropsWithoutRef<"label">, keyof ILabelProps> & ILabelProps
>(
    (
        {
            className,
            required = true,
            children,
            provider = "radix-form",
            asChild = false,
            ...rest
        },
        externalRef,
    ) => {
        const Comp = asChild ? Slot : "label";

        return (
            <Comp
                aria-required={required}
                className={cn(lbCn, className)}
                ref={externalRef}
                {...rest}
            >
                {children}
            </Comp>
        );
    },
);

export default Label;
