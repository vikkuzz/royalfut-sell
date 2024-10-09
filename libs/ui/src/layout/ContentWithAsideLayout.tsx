"use client";

import {
    useUIContentWithAsideLayoutlStore,
    UIContentWithAsideLayoutStoreProvider,
} from "@royalfut/store";
import { StickyCardsBox } from "../box";
import { PageTitle } from "../typography";
import { LayoutViewportSectionFrame } from "./Section";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { FNCNChildren, PropsWithClassName } from "@royalfut/interfaces";
import type { IUIContentWithAsideLayoutState } from "@royalfut/store";

const initialSize: IUIContentWithAsideLayoutState["size"] = "70-30";

export const Root: FNCNChildren<IUIContentWithAsideLayoutState> = ({
    className,
    children,
    size = initialSize,
    aside,
    header,
}) => {
    const provider = { aside, header, size };

    return (
        <UIContentWithAsideLayoutStoreProvider initial={provider}>
            <LayoutViewportSectionFrame
                className={cn("flex flex-col", className)}
                asChild>
                <div>{children}</div>
            </LayoutViewportSectionFrame>
        </UIContentWithAsideLayoutStoreProvider>
    );
};

interface ILayoutHeaderProps extends PropsWithClassName {
    title: string;
}

export const Header: FC<ILayoutHeaderProps> = ({ className, title }) => {
    return <PageTitle className={className}>{title}</PageTitle>;
};

export const Body: FNCNChildren = ({ className, children }) => {
    return (
        <div className={cn("flex flex-col gap-8 sm:flex-row mt-12", className)}>
            {children}
        </div>
    );
};

export const Content: FNCNChildren = ({ className, children }) => {
    const { size, isFull } = useUIContentWithAsideLayoutlStore(state => ({
        size: state.size ?? initialSize,
        isFull: state.aside?.isHidden,
    }));

    return (
        <div
            className={cn(
                isFull
                    ? "basis-full"
                    : {
                          "basis-2/5": size === "40-60",
                          "basis-1/2": size === "50-50",
                          "basis-3/5": size === "60-40",
                          "basis-3/4": size === "75-25",
                          "basis-[70%]": size === "70-30",
                      },
                className
            )}>
            {children}
        </div>
    );
};

export const Aside: FNCNChildren = ({ className, children }) => {
    const { aside, size } = useUIContentWithAsideLayoutlStore(state => ({
        size: state.size ?? initialSize,
        aside: state.aside,
    }));

    if (aside?.isHidden) {
        return null;
    }

    return (
        <aside
            className={cn(
                "no-print relative",
                {
                    "basis-3/5": size === "40-60",
                    "basis-1/2": size === "50-50",
                    "basis-2/5": size === "60-40",
                    "basis-1/4": size === "75-25",
                    "basis-[30%]": size === "70-30",
                },
                className
            )}>
            <StickyCardsBox>
                <div className="flex flex-col space-y-4">{children}</div>
            </StickyCardsBox>
        </aside>
    );
};
