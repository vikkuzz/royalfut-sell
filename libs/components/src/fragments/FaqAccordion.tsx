"use client";

import { forwardRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { CrossSimpleIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const Item = forwardRef<
    ElementRef<typeof Accordion.Item>,
    ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={cn(
            "mt-4 overflow-hidden first:mt-0 focus-within:relative focus-within:z-10 rounded-3xl border border-white-10",
            className
        )}
        {...props}
        ref={forwardedRef}>
        {children}
    </Accordion.Item>
));
Item.displayName = Accordion.Item.displayName;

const Trigger = forwardRef<
    ElementRef<typeof Accordion.Trigger>,
    ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={cn(
                "text-white group flex flex-1 cursor-default items-center p-2 justify-between bg-black-1  text-2xl font-bold leading-none outline-none",
                className
            )}
            {...props}
            ref={forwardedRef}>
            <div className="w-full h-full group-hover:bg-white/5 text-left transition-colors duration-300 flex rounded-2xl px-6 py-4 justify-between items-center">
                {children}
                <CrossSimpleIcon className="text-white flex-none group-data-[state=open]:rotate-[315deg] transition-transform duration-500 w-8 h-8" />
            </div>
            {/* <ChevronDownIcon
          className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        /> */}
        </Accordion.Trigger>
    </Accordion.Header>
));
Trigger.displayName = Accordion.Trigger.displayName;

const Content = forwardRef<
    ElementRef<typeof Accordion.Content>,
    ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={cn(
            "text-white-60 bg-black-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-base font-medium",
            className
        )}
        {...props}
        ref={forwardedRef}>
        <div className="pt-1.5 pb-4 px-8">{children}</div>
    </Accordion.Content>
));
Content.displayName = Accordion.Content.displayName;

const Root = forwardRef<
    ElementRef<typeof Accordion.Root>,
    ComponentPropsWithoutRef<typeof Accordion.Root>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Root
        className={cn("w-full rounded-md", className)}
        {...props}
        ref={forwardedRef}>
        {children}
    </Accordion.Root>
));
Root.displayName = Accordion.Root.displayName;

export { Item, Trigger, Content, Root };
