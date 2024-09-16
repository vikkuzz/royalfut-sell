"use client";

import { forwardRef, useCallback } from "react";
import { Input } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";
// import { TransferValidationErrorMsgScheme } from "@royalfut/scheme";

import type {
    ElementRef,
    ComponentPropsWithoutRef,
    FocusEventHandler,
    ChangeEventHandler,
} from "react";

interface IUTCoinInputProps {
    onChange?: (value: string) => void;
}

const UTCoinInput = forwardRef<
    ElementRef<"input">,
    Omit<ComponentPropsWithoutRef<"input">, "onChange"> & IUTCoinInputProps
>(
    (
        {
            className,
            onBlur: onExternalBlur,
            onFocus: onExternalFocus,
            onChange: onExternalChange,
            ...props
        },
        externalRef,
    ) => {
        const use = useTransferSelectorStore.use;
        const hasError = use.hasError();
        const value = use.labelUT();
        const setValue = use.setUTCoin();
        const resetIfInvalid = use.resetIfInvalid();
        // const msgError = hasError
        //     ? TransferValidationErrorMsgScheme[hasError]
        //     : "";

        const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(
            (event) => {
                resetIfInvalid();
                onExternalBlur?.(event);
            },
            [onExternalBlur, resetIfInvalid],
        );

        const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(
            (event) => {
                const target = event.target;
                const selectionRange = {
                    start: target.selectionStart,
                    end: target.selectionEnd,
                    direction: target.selectionDirection ?? undefined,
                };

                const inputLen = target.value.length;
                target.focus();
                setTimeout(
                    () =>
                        target.setSelectionRange(
                            selectionRange.start || inputLen,
                            selectionRange.end || inputLen,
                            selectionRange.direction,
                        ),
                    0,
                );
                onExternalFocus?.(event);
            },
            [onExternalFocus],
        );

        const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
            (event) => {
                setValue(event.target.value);
                onExternalChange?.(event.target.value);
            },
            [onExternalChange, setValue],
        );

        return (
            <Input
                className={cn(
                    "bg-transparent focus-within:outline-none caret-primary",
                    {
                        "text-system-error": !!hasError,
                        "text-white": !hasError,
                    },
                    className,
                )}
                value={value}
                native
                onChange={onChange}
                size={7}
                inputMode="numeric"
                spellCheck="false"
                onFocus={onFocus}
                onBlur={onBlur}
                ref={externalRef}
                {...props}
            />
        );
    },
);
UTCoinInput.displayName = "UTCoinInput";

export default UTCoinInput;
