"use client";

import { useState } from "react";
import Image from "next/image";
import { useProjectGlobalStore } from "@royalfut/store";
import { Link, HoverCard } from "@royalfut/ui";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDownFilledIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type {
    FNCN,
    TProjectGlobalNavExpanded,
    TProjectGlobalNavLink,
    ProjectGlobalNavItems,
} from "@royalfut/interfaces";

const NavLink: FNCN<Omit<TProjectGlobalNavLink, "type">> = ({
    href,
    label,
    icon,
    className,
}) => {
    return (
        <Link
            key={href}
            href={href}
            className={cn(
                "group flex items-center justify-center text-xl text-center font-semibold transition-colors duration-200 text-white hover:text-white-60",
                className
            )}>
            {label}
            {icon && (
                <div className="ml-2 group-hover:opacity-60 transition-opacity duration-200">
                    <Image
                        width={icon.width}
                        alt={label}
                        height={24}
                        src={icon.src}
                    />
                </div>
            )}
        </Link>
    );
};

const AccordionNavLink: FC<Omit<TProjectGlobalNavLink, "type" | "icon">> = ({
    label,
    href,
}) => {
    return (
        <Link
            href={href}
            className="flex items-center justify-center w-full py-1.5 px-4.5 text-base text-center font-semibold transition-colors duration-200 rounded-lg text-white-60 hover:text-white">
            {label}
        </Link>
    );
};

const AccordionNavItem: FNCN<TProjectGlobalNavExpanded> = ({
    className,
    ...nav
}) => {
    return (
        <Accordion.Root
            className={cn("w-full rounded-md justify-center", className)}
            type="multiple">
            <Accordion.Item
                className="overflow-hidden focus-within:relative focus-within:z-10"
                value={nav.label}>
                <Accordion.Header className="flex justify-center">
                    <Accordion.Trigger className="group flex justify-center sm:justify-between space-x-3 cursor-pointer text-xl text-center font-semibold transition-colors duration-200 text-white">
                        <span>{nav.label}</span>
                        <ArrowDownFilledIcon className="w-6 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="flex flex-col items-center pt-2">
                        {nav.content.map(content => (
                            <AccordionNavLink
                                key={content.href}
                                href={content.href}
                                label={content.label}
                            />
                        ))}
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );
};

const HeaderDropdownNavItem: FNCN<TProjectGlobalNavExpanded> = ({
    className,
    ...nav
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <HoverCard.Root key={nav.href} open={isOpen} onOpenChange={setIsOpen}>
            <HoverCard.Trigger
                className={cn(
                    "group flex justify-center sm:justify-between space-x-3 cursor-pointer text-xl text-center font-semibold transition-colors duration-200 text-white",
                    className
                )}
                isOpen={isOpen}
                onClick={() => setIsOpen(prev => !prev)}
                asChild>
                <Link key={nav.href} href={nav.href}>
                    <span>{nav.label}</span>
                    <ArrowDownFilledIcon className="w-6 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0" />
                </Link>
            </HoverCard.Trigger>
            <HoverCard.Content className="flex flex-col">
                {nav.content.map(content => (
                    <NavLink
                        key={content.href}
                        className="flex items-center justify-start py-1.5 px-4.5 text-base rounded-lg text-white-60 hover:text-white hover:bg-white-10"
                        {...content}
                    />
                ))}
            </HoverCard.Content>
        </HoverCard.Root>
    );
};

export const SheetNavigationItems: FNCN<{ links: ProjectGlobalNavItems }> = ({
    className,
    links,
}) => {
    return (
        <nav className={cn("flex flex-col space-y-5", className)}>
            {links.map(item => {
                if (item.type === "link") {
                    return <NavLink key={item.href} {...item} />;
                }

                if (item.type === "expanded") {
                    return <AccordionNavItem key={item.href} {...item} />;
                }

                return null;
            })}
        </nav>
    );
};

export const HeaderNavigationLinks: FNCN = ({ className }) => {
    const links = useProjectGlobalStore(state => state.header.nav);

    return (
        <nav
            className={cn(
                "flex flex-row space-x-5 space-y-0 capitalize",
                className
            )}>
            {links.map(item => {
                if (item.type === "link") {
                    return <NavLink key={item.href} {...item} />;
                }

                if (item.type === "expanded") {
                    return <HeaderDropdownNavItem key={item.href} {...item} />;
                }

                return null;
            })}
        </nav>
    );
};
