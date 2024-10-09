/* eslint-disable max-lines */
import { forwardRef } from "react";
import { Button, LinkButton } from "../../buttons";
import { BaseBox } from "../../box";
import {
    ArrowChevronRightIcon,
    ArrowChevronLeftIcon,
    ArrowDoubleChevronLeftIcon,
    ArrowDoubleChevronRightIcon,
    MoreHorizontalIcon,
} from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type {
    ComponentProps,
    ComponentPropsWithoutRef,
    ElementRef,
    FC,
} from "react";

export const Root: FC<ComponentProps<"nav">> = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center no-print", className)}
        {...props}
    />
);
Root.displayName = "Pagination";

export const Content = forwardRef<
    ElementRef<"ul">,
    ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
Content.displayName = "PaginationContent";

export const Item = forwardRef<
    ElementRef<"li">,
    ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
Item.displayName = "PaginationItem";

interface IPaginationNavigatorProps {
    isActive?: boolean;
}

type TNavigatorPolymorphism =
    | ({ asLink?: true } & ComponentPropsWithoutRef<typeof LinkButton>)
    | ({ asLink?: false } & ComponentPropsWithoutRef<typeof Button>);

export const Navigator: FC<
    IPaginationNavigatorProps &
        TNavigatorPolymorphism &
        ComponentPropsWithoutRef<typeof BaseBox>
> = ({
    className,
    isActive = false,
    size = "xs",
    screen = "square",
    asSize = true,
    children,
    asLink,
    ...props
}) => {
    const Comp = asLink ? LinkButton : Button;

    return (
        <BaseBox
            size={size}
            screen={screen}
            asSize={asSize}
            asChild
            className={cn(
                "font-semibold text-base",
                {
                    "pointer-events-none cursor-default text-white": isActive,
                    "text-white-65 hover:text-white": !isActive,
                },
                className
            )}>
            <Comp
                aria-current={isActive ? "page" : undefined}
                vsize="none"
                vtype={isActive ? "primary-gradient" : "secondary"}
                {...(props as any)}>
                {children}
            </Comp>
        </BaseBox>
    );
};
Navigator.displayName = "PaginationLink";

interface INavigatorProps {
    withLabel?: boolean;
    isHidden?: boolean;
    direction: "prev" | "next";
    label?: string;
}

const NavigatorStepActions: FC<
    Omit<ComponentPropsWithoutRef<typeof Navigator>, "children" | "asChild"> &
        INavigatorProps &
        TNavigatorPolymorphism
> = ({
    className,
    withLabel = false,
    isHidden = false,
    direction,
    label,
    ...props
}) => {
    if (isHidden) return null;

    return (
        <Navigator
            asSize={!withLabel}
            className={cn("gap-1", className)}
            {...props}>
            {direction === "next" && (
                <>
                    <span
                        className={cn("leading-none", {
                            "sr-only": !withLabel,
                        })}>
                        {label}
                    </span>
                    <ArrowChevronRightIcon className="text-white h-5 w-5" />
                </>
            )}
            {direction === "prev" && (
                <>
                    <ArrowChevronLeftIcon className="text-white h-5 w-5" />
                    <span
                        className={cn("leading-none", {
                            "sr-only": !withLabel,
                        })}>
                        {label}
                    </span>
                </>
            )}
        </Navigator>
    );
};

export const Previous: FC<
    Omit<ComponentProps<typeof NavigatorStepActions>, "direction"> &
        TNavigatorPolymorphism
> = ({ className, label = "Previous", ...props }) => {
    return (
        <NavigatorStepActions
            direction="prev"
            label={label}
            aria-label="Go to previous page"
            {...props}
        />
    );
};
Previous.displayName = "PaginationPrevious";

export const Next: FC<
    Omit<ComponentProps<typeof NavigatorStepActions>, "direction"> &
        TNavigatorPolymorphism
> = ({ className, label = "Next", ...props }) => {
    return (
        <NavigatorStepActions
            direction="next"
            label={label}
            aria-label="Go to next page"
            {...props}
        />
    );
};
Next.displayName = "PaginationNext";

interface IEllipsisProps {
    isJumpEnabled?: boolean;
    direction: "next" | "prev";
}

export const Ellipsis: FC<
    Omit<ComponentPropsWithoutRef<typeof Navigator>, "children" | "asChild"> &
        TNavigatorPolymorphism &
        IEllipsisProps
> = ({ className, isJumpEnabled = true, direction, ...props }) => {
    return (
        <Navigator
            aria-hidden
            className={cn(
                "group relative flex justify-center items-center",
                className
            )}
            {...props}>
            <MoreHorizontalIcon
                className={cn("absolute bottom-1.5 text-white-65 h-4 w-4", {
                    "group-hover:opacity-0 transition-opacity duration-200":
                        isJumpEnabled,
                })}
            />
            {isJumpEnabled && direction === "next" && (
                <ArrowDoubleChevronRightIcon className="opacity-0 ivisible text-white h-3 w-3 group-hover:opacity-100 transition-opacity duration-200" />
            )}
            {isJumpEnabled && direction === "prev" && (
                <ArrowDoubleChevronLeftIcon className="opacity-0 text-white h-3 w-3 group-hover:opacity-100 transition-opacity duration-200" />
            )}
            <span className="sr-only">More pages</span>
        </Navigator>
    );
};
Ellipsis.displayName = "PaginationEllipsis";
