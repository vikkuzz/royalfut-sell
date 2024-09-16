/* eslint-disable max-lines */
"use client";

import {
    forwardRef,
    useState,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { useComposedRef, useMount } from "@lilib/hooks";
import { Slot } from "@radix-ui/react-slot";
import { cn, excludeProps } from "@royalfut/utils";
import { inputAbleVariants } from "./textable.tail";

import type {
    InputHTMLAttributes,
    ForwardRefExoticComponent,
    RefAttributes,
    ChangeEventHandler,
    FocusEventHandler,
    ComponentType,
    ComponentPropsWithoutRef,
    ComponentProps,
} from "react";
import type { InputAbleVariantsProps } from "./textable.tail";

interface IInputIconProps extends ComponentProps<"svg"> {
    centered?: boolean;
}

interface IInputProps
    extends Omit<InputAbleVariantsProps, "disabled">,
        InputHTMLAttributes<HTMLInputElement> {
    vtype?: InputAbleVariantsProps["vtype"];
    mountedFocus?: boolean;
    mountedDisabledYet?: boolean;
    initialValue?: string;
    asChild?: boolean;
    icon?: {
        "<>": ComponentType<ComponentPropsWithoutRef<"svg">>;
        props: IInputIconProps;
    };
    borderType?: "default" | "box";
    native?: boolean;
    cnBox?: string;
    onBlurEffect?: (value: string) => void;
}
export type InputComponent = ForwardRefExoticComponent<
    IInputProps & RefAttributes<HTMLInputElement>
>;

const Input: InputComponent = forwardRef(function InputRef(
    {
        className,
        onChange,
        onBlur,
        onBlurEffect,
        vtype = "primary",
        icon = {},
        native = false,
        asChild = false,
        borderType = "default",
        cnBox,
        mountedDisabledYet = false,
        disabled = false,
        mountedFocus = false,
        initialValue = "",
        id,
        vsize = "md",
        ...rest
    },
    externalRef,
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
        (event) => {
            const {
                target: { value: _value },
            } = event;
            if (onChange) {
                onChange(event);
            }
            setInputValue(_value);
        },
        [onChange],
    );

    const handleOnBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            if (onBlur) {
                onBlur(e);
            }

            if (onBlurEffect) {
                onBlurEffect(e.target.value);
            }
        },
        [onBlur, onBlurEffect],
    );

    const inputEl = useMemo(
        () => (
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
                    className,
                )}
                ref={inputRef}
                {...rest}
            />
        ),
        [
            Comp,
            borderType,
            className,
            disabled,
            handleChangeValue,
            handleOnBlur,
            id,
            inputRef,
            inputValue,
            mountedDisabled,
            native,
            rest,
            vsize,
            vtype,
        ],
    );

    if (borderType === "box") {
        const Icon = icon["<>"] ? icon["<>"] : null;
        const iconProps = icon?.props ? icon.props : ({} as IInputIconProps);

        return (
            <div
                className={cn(
                    "[--bordered-box-linear-bg-1:hsla(var(--input-background,var(--color-black-background)),100%)] hover:[--bordered-box-linear-bg-1:hsla(var(--color-black-background),95%)] focus-within:[--bordered-box-linear-bg-1:hsla(var(--color-black-background),90%)]",
                    "relative group",
                    {
                        "opacity-50 cursor-not-allowed pointer-events-none":
                            disabled,
                    },
                    cnBox,
                )}
            >
                <div className="absolute left-0 right-0 top-0 bottom-0 h-full w-full">
                    <div className="relative rounded-xl w-full h-full from-white-60 to-white-60 p-px bg-gradient-to-r">
                        {/* <div className="relative rounded-xl w-full h-full transition-all duration-700 from-[#a1a2a8] to-[#a1a2a8] group-hover:from-[#6678E9] focus:from-[#6678E9] focus:to-[#A82DF9] group-hover:to-[#A82DF9] p-px bg-gradient-to-r"> */}
                        <div className=" rounded-xl h-full w-full bg-[var(--bordered-box-linear-bg-1)]" />
                    </div>
                    {Icon && (
                        <Icon
                            {...excludeProps(iconProps, [
                                "centered",
                                "className",
                            ])}
                            className={cn(
                                {
                                    "absolute top-1/2 translate-x-1/2 -translate-y-1/2 z-[2]":
                                        iconProps.centered,
                                    "pointer-events-none": disabled,
                                },
                                iconProps.className,
                            )}
                        />
                    )}
                </div>

                {inputEl}
            </div>
        );
    }

    return inputEl;
});

export default Input;
