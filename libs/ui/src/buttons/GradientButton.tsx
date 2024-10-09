import { forwardRef } from "react";
import { cn } from "@royalfut/utils";
import Button from "./Button";
import { PrimaryGradientBox } from "../box";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const GradientButton = forwardRef<
    ElementRef<"button">,
    ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, externalRef) => {
    return (
        <PrimaryGradientBox asChild>
            <Button
                ref={externalRef}
                className={cn(
                    "border border-white-20 rounded-xl font-semibold text-xl flex justify-center items-center text-center",
                    className
                )}
                {...props}>
                {children}
            </Button>
        </PrimaryGradientBox>
    );
});

export default GradientButton;
