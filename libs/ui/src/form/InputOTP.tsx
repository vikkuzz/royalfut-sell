"use client";

import { forwardRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const InputOTP = forwardRef<
    ElementRef<typeof OTPInput>,
    ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            "flex items-center has-[:disabled]:opacity-50",
            containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const {
        char,
        hasFakeCaret = true,
        isActive,
    } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex items-center justify-center text-sm transition-all",
                // isActive && "z-10 ring-1 ring-ring",
                className
            )}
            {...props}>
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-primary duration-1000" />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        {/* <DashIcon /> */}
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export default {
    Root: InputOTP,
    Group: InputOTPGroup,
    Slot: InputOTPSlot,
    Separator: InputOTPSeparator,
};
