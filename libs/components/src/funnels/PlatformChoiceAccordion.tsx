"use client";

import { useMemo, forwardRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Slot } from "@radix-ui/react-slot";
import { EPlatforms } from "@royalfut/enums";
import {
    PlayStationMonocolorIcon,
    XboxMonocolorIcon,
    PCMonocolorIcon,
    ArrowDownFilledIcon,
} from "@royalfut/icons";
import { Button } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps, ElementRef, ComponentProps } from "react";
import type { TPlatformSets, IPlatformInfo } from "@royalfut/interfaces";

const iconMap: Record<EPlatforms, FC<SVGProps<SVGSVGElement>>> = {
    [EPlatforms.PlayStation]: PlayStationMonocolorIcon,
    [EPlatforms.XBox]: XboxMonocolorIcon,
    [EPlatforms.PC]: PCMonocolorIcon,
};

const PlatformChoiceItem = forwardRef<
    ElementRef<"div">,
    IPlatformInfo & { asChild?: boolean } & ComponentProps<"div">
>(({ _id, name, asChild = false, className, ...props }, externalRef) => {
    const Comp = asChild ? Slot : "div";
    const Icon = iconMap[_id];

    return (
        <Comp
            className={cn("flex space-x-1 items-center relative", className)}
            {...props}
            ref={externalRef}>
            <div className="flex items-center justify-center relative flex-none">
                <Icon className="text-white w-6 h-6" />
            </div>
            <p className="text-base text-white font-semibold leading-5 w-max">
                {name}
            </p>
        </Comp>
    );
});
PlatformChoiceItem.displayName = "PlatformChoiceItem";

const PlatformChoiceAccordion: FC<{ sets: TPlatformSets }> = ({ sets }) => {
    const platform = useTransferSelectorStore.use.platform();
    const setPlatform = useTransferSelectorStore.use.setPlatform();

    const platformMap = useMemo(
        () => Object.keys(sets) as Array<EPlatforms>,
        [sets]
    );

    return (
        <Accordion.Root type="single" className="overflow-hidden" collapsible>
            <Accordion.Item className="ma" value={"platform"}>
                <Accordion.Header>
                    <Accordion.Trigger className="group flex justify-between w-full">
                        <PlatformChoiceItem {...sets[platform]} />
                        <ArrowDownFilledIcon className="text-white w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="w-full mt-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="flex flex-col h-max data-[state=closed]:absolute">
                        {platformMap.map(id => {
                            if (id === platform) return null;

                            return (
                                <Button
                                    as="button"
                                    onClick={() => setPlatform(id)}
                                    key={id}
                                    className="hover:bg-white-10 justify-start px-3 py-4 first:rounded-t-2xl last:rounded-b-2xl">
                                    <PlatformChoiceItem {...sets[id]} />
                                </Button>
                            );
                        })}
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default PlatformChoiceAccordion;
