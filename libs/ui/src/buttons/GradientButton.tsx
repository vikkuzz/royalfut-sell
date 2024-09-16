import { forwardRef } from "react";
import { clsx } from "clsx";
import { cn } from "@royalfut/utils";
import Button from "./Button";
import { PrimaryGradientBox } from "../box";

import type { ElementRef, PropsWithoutRef } from "react";
import type {
    INativeButtonProps,
    ButtonBaseProps,
    ButtonProps,
} from "./Button";

const cnBtn = clsx(
    "border border-white-20 rounded-xl font-semibold text-xl flex justify-center items-center text-center",
);

const GradientButton = forwardRef<
    ElementRef<"button">,
    Omit<INativeButtonProps & ButtonBaseProps, "as">
>(({ className, children, ...props }, externalRef) => {
    return (
        <PrimaryGradientBox asChild>
            <Button
                as="button"
                ref={externalRef}
                className={cn(cnBtn, className)}
                {...props}
            >
                {children}
            </Button>
        </PrimaryGradientBox>
    );
});

export const GradientButtonRegular = forwardRef<
    HTMLButtonElement | HTMLLinkElement,
    PropsWithoutRef<ButtonProps>
>(({ className, children, ...props }, externalRef) => {
    return (
        <PrimaryGradientBox asChild>
            <Button
                ref={externalRef}
                className={cn(cnBtn, className)}
                {...props}
            >
                {children}
            </Button>
        </PrimaryGradientBox>
    );
});

export default GradientButton;
