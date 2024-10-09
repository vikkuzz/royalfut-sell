import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import NextLink from "../Link";
import { MoreHorizontalIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, FC } from "react";

const Breadcrumb = forwardRef<
    HTMLElement,
    ComponentPropsWithoutRef<"nav"> & {
        separator?: React.ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<
    HTMLOListElement,
    ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-1.5 break-words text-sm text-white sm:gap-2.5",
            className
        )}
        {...props}
    />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<
    HTMLLIElement,
    ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<
    HTMLAnchorElement,
    ComponentPropsWithoutRef<typeof NextLink> & {
        asChild?: boolean;
    }
>(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : NextLink;

    return (
        <Comp
            ref={ref}
            className={cn(
                "transition-colors text-white font-medium text-base hover:underline hover:underline-offset-8",
                className
            )}
            {...props}
        />
    );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
    HTMLSpanElement,
    ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-medium text-base text-white-40", className)}
        {...props}
    />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator: FC<ComponentPropsWithoutRef<"li">> = ({
    children,
    className,
    ...props
}) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("text-white text-base -mx-1 font-medium", className)}
        {...props}>
        {children ?? "/"}
    </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis: FC<ComponentPropsWithoutRef<"span">> = ({
    className,
    ...props
}) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}>
        <MoreHorizontalIcon className="h-4 w-4 text-white" />
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

const Root = Breadcrumb;
const List = BreadcrumbList;
const Item = BreadcrumbItem;
const Link = BreadcrumbLink;
const Page = BreadcrumbPage;
const Separator = BreadcrumbSeparator;
const Ellipsis = BreadcrumbEllipsis;

export { Root, List, Item, Link, Page, Separator, Ellipsis };
