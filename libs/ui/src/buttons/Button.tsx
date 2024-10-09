import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Link } from "../navs";
import { LoadingFormBtn } from "./LoadingBtn";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import type { VariantProps } from "class-variance-authority";

export type ButtonVariantProps = VariantProps<typeof btnVariants>;
const btnVariants = cva(
    [
        "relative cursor-pointer text-sm",
        "inline-flex items-center justify-center outline-offset-2 transition active:transition-none",
    ],
    {
        variants: {
            vtype: {
                none: "",
                primary: `
                    flex bg-primary
                    text-white text-base font-normal leading-snug
                    hover:shadow-btnLight
                `,
                "primary-gradient": `
                    flex bg-linear-primary-simple-pan
                    text-white text-base font-semibold leading-snug
                `,
                secondary: `
                    bg-black-shape hover:ring-1 hover:ring-white active:ring-1 active:ring-white
                    text-white text-base font-semibold leading-snug box-border hover:bg-black-dropdown
                    duration-300
                `,
                bordered: `
                    text-zinc-900 active:text-zinc-900/60 dark:text-zinc-300 dark:active:text-zinc-50/70
                    ring-1 ring-consistent hover:ring-consistent-accent
                `,
                blured: `
                    text-black/10 backdrop-blur-lg
                `,
                "bordered-shadow": `
                    border bg-transparent border-extra-stereo overflow-hidden
                    hover:bg-linear-primary-stereo hover:shadow-stereo duration-300
                `,
                combobox: `
                    ring-inset
                    rounded-2xl border border-consistent inline-flex justify-start items-center
                    focus:outline-none focus:border-consistent-accent hover:border-consistent-accent
                    bg-input-background text-typography-text-light
                `,
            },
            vsize: {
                none: "",
                md: "py-2 px-3 rounded-md",
                lg: "px-5 py-3.5 rounded-3xl",
                "3xl": "px-16 py-5",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed pointer-events-none",
            },
            clickable: {
                true: "cursor-pointer pointer-events-auto",
                false: "cursor-default",
            },
        },
        defaultVariants: {
            clickable: true,
            vtype: "none",
            vsize: "none",
            disabled: null,
        },
        compoundVariants: [
            {
                clickable: true,
                disabled: true,
                className: "cursor-not-allowed pointer-events-none",
            },
        ],
    }
);

export type LoadingVariantProps = VariantProps<typeof loadingVariants>;
const loadingVariants = cva("", {
    variants: {
        loading: {
            default: "",
            true: `animate-spin`,
        },
    },
});

export type ButtonBaseProps = ButtonVariantProps &
    LoadingVariantProps & {
        asChild?: boolean;
    };

const Button = forwardRef<
    ElementRef<"button">,
    ComponentPropsWithoutRef<"button"> & ButtonBaseProps
>(function ButtonRef(
    {
        vtype,
        vsize,
        disabled,
        clickable,
        className,
        loading,
        children,
        asChild = false,
        ...props
    },
    externalRef
) {
    const _cn = cn(
        btnVariants({
            vtype,
            clickable: disabled ? false : clickable,
            disabled: loading ? true : disabled,
            vsize,
        }),
        className
    );
    const Comp = asChild ? Slot : "button";

    if (loading) {
        return (
            <div tabIndex={-1} className={_cn}>
                <LoadingFormBtn className="absolute" />
                <Comp className="invisible">{children}</Comp>
            </div>
        );
    }

    return (
        <Comp
            ref={externalRef}
            tabIndex={disabled ? -1 : 0}
            className={_cn}
            {...props}>
            {children}
        </Comp>
    );
});

export const LinkButton = forwardRef<
    ElementRef<typeof Link>,
    Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> &
        ButtonBaseProps
>(
    (
        {
            children,
            vtype,
            vsize,
            disabled,
            clickable,
            className,
            loading,
            ...props
        },
        externalRef
    ) => {
        return (
            <Button
                asChild
                vtype={vtype}
                vsize={vsize}
                disabled={disabled!}
                clickable={clickable}
                className={className}
                loading={loading}>
                <Link {...props} ref={externalRef}>
                    {children}
                </Link>
            </Button>
        );
    }
);

export default Button;
