"use client";

import { forwardRef } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { cn } from "@royalfut/utils";

import styles from "./styles.module.scss";
import type { FC, ElementRef, ComponentPropsWithoutRef } from "react";

const cnContent = `
    bg-black-dropdown border border-white-20 will-change-[opacity,transform] rounded-xl p-3 pointer-events-auto
    data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade
    data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade
    data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade
`;

export const Root: FC<ComponentPropsWithoutRef<typeof HoverCard.Root>> = ({
    openDelay = 400,
    children,
    ...props
}) => {
    return (
        <HoverCard.Root openDelay={openDelay} {...props}>
            {children}
        </HoverCard.Root>
    );
};

export const Trigger = forwardRef<
    ElementRef<typeof HoverCard.Trigger>,
    ComponentPropsWithoutRef<typeof HoverCard.Trigger> & { isOpen?: boolean }
>(({ className, isOpen, children, ...props }, externalRef) => {
    return (
        <HoverCard.Trigger
            className={cn("cursor-default", className)}
            data-state={
                isOpen === true
                    ? "open"
                    : isOpen === false
                      ? "closed"
                      : undefined
            }
            {...props}
            ref={externalRef}>
            {children}
        </HoverCard.Trigger>
    );
});

export const Content = forwardRef<
    ElementRef<typeof HoverCard.Content>,
    ComponentPropsWithoutRef<typeof HoverCard.Content> & { cnBox?: string }
>(({ children, cnBox, sideOffset = 10, className, ...props }, externalRef) => {
    return (
        <HoverCard.Portal>
            <div className={cn(styles["card-content-wrapper"], cnBox)}>
                <HoverCard.Content
                    className={cn(cnContent, className)}
                    sideOffset={sideOffset}
                    {...props}
                    ref={externalRef}>
                    {children}
                </HoverCard.Content>
            </div>
        </HoverCard.Portal>
    );
});

export const Arrow = HoverCard.Arrow;
