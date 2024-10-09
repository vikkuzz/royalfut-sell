/* eslint-disable max-lines */

"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";
import { useComposedRef, useMount } from "@lilib/hooks";
import { inputAbleVariants } from "./textable.tail";

import type {
    FC,
    ComponentPropsWithoutRef,
    InputHTMLAttributes,
    ForwardRefExoticComponent,
    RefAttributes,
    ChangeEventHandler,
    FocusEventHandler,
} from "react";
import type { InputAbleVariantsProps } from "./textable.tail";

interface IRootProps {
    disabled?: boolean;
}

export const Root: FC<ComponentPropsWithoutRef<"div"> & IRootProps> = ({
    className,
    children,
    disabled,
    ...props
}) => {
    return (
        <div
            className={cn(
                "group relative [--rounded:theme(borderRadius.lg)]",
                "[--bordered-box-linear-bg-1:hsl(var(--input-background,var(--color-black-shape)))] data-[editable='true']:hover:[--bordered-box-linear-bg-1:hsla(var(--color-black-shape),95%)] data-[editable='true']:focus-within:[--bordered-box-linear-bg-1:hsla(var(--color-black-shape),90%)]",
                {
                    "opacity-50 cursor-not-allowed pointer-events-none":
                        disabled,
                },
                className
            )}
            {...props}>
            {children}
        </div>
    );
};

interface IFrameProps {
    bordered?: boolean;
}

export const Frame: FC<ComponentPropsWithoutRef<"div"> & IFrameProps> = ({
    className,
    children,
    bordered = true,
}) => {
    return (
        <div
            className={cn(
                "absolute left-0 right-0 top-0 bottom-0 h-full w-full",
                className
            )}>
            <div
                className={cn(
                    "relative rounded-[var(--rounded)] w-full h-full p-px bg-gradient-to-r transition-colors duration-200",
                    {
                        "group-data-[active=true]:from-white-40 group-data-[active=true]:to-white-40 group-data-[active=false]:from-white-10 group-data-[active=false]:to-white-10":
                            bordered,
                    }
                )}>
                <div className="rounded-[var(--rounded)] h-full w-full bg-[var(--bordered-box-linear-bg-1)]" />
            </div>
            {children}
        </div>
    );
};

interface IIconProps {
    centered?: boolean;
}

export const Icon: FC<ComponentPropsWithoutRef<"svg"> & IIconProps> = ({
    centered = true,
    className,
    children,
}) => {
    return (
        <Slot
            className={cn(
                "group-disabled:pointer-events-none h-4 w-4 relative",
                {
                    "top-1/2 translate-x-1/2 -translate-y-1/2 z-[2]": centered,
                },
                className
            )}>
            {children}
        </Slot>
    );
};

interface IInputProps
    extends Omit<InputAbleVariantsProps, "disabled">,
        InputHTMLAttributes<HTMLInputElement> {
    vtype?: InputAbleVariantsProps["vtype"];
    mountedFocus?: boolean;
    mountedDisabledYet?: boolean;
    initialValue?: string;
    asChild?: boolean;
    borderType?: "default" | "box";
    native?: boolean;
    onBlurEffect?: (value: string) => void;
}

type InputComponent = ForwardRefExoticComponent<
    IInputProps & RefAttributes<HTMLInputElement>
>;

export const Comp: InputComponent = forwardRef(function InputRef(
    {
        className,
        onChange,
        onBlur,
        onBlurEffect,
        vtype = "primary",
        native = false,
        asChild = false,
        borderType = "default",
        mountedDisabledYet = false,
        disabled = false,
        mountedFocus = false,
        initialValue = "",
        id,
        vsize = "md",
        ...rest
    },
    externalRef
) {
    const Comp = asChild ? Slot : "input";
    const [inputValue, setInputValue] = useState(initialValue);
    const [mountedDisabled, setMountedDisabledDisabled] =
        useState(mountedDisabledYet);
    const libRef = useRef<HTMLInputElement>(null);
    const inputRef = useComposedRef(libRef, externalRef);

    useEffect(() => {
        if (libRef.current && mountedFocus) {
            libRef.current.focus();
        }
    }, [mountedFocus]);

    useMount(() => {
        setMountedDisabledDisabled(disabled);
    });

    const handleChangeValue: ChangeEventHandler<HTMLInputElement> = useCallback(
        event => {
            const {
                target: { value: _value },
            } = event;
            if (onChange) {
                onChange(event);
            }
            setInputValue(_value);
        },
        [onChange]
    );

    const handleOnBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (onBlur) {
                onBlur(e);
            }

            if (onBlurEffect) {
                onBlurEffect(e.target.value);
            }
        },
        [onBlur, onBlurEffect]
    );

    return (
        <Comp
            id={id}
            onChange={handleChangeValue}
            tabIndex={disabled ? -1 : 0}
            value={inputValue}
            name={id}
            onBlur={handleOnBlur}
            disabled={disabled || mountedDisabled}
            className={cn(
                !native &&
                    inputAbleVariants({
                        vtype,
                        vsize,
                        disabled:
                            borderType === "box"
                                ? false
                                : disabled || mountedDisabled,
                        vborder: borderType,
                    }),
                "rounded-[var(--rounded)]",
                className
            )}
            ref={inputRef}
            {...rest}
        />
    );
});
Comp.displayName = "Input";
