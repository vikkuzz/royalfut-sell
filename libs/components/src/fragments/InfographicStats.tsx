"use client";

import { useRef } from "react";
import { useMount } from "@lilib/hooks";
import { useUIGlobalStore } from "@royalfut/store";
import CountUp from "./CountUp";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, FC } from "react";
import type { IInfographicStatsItem } from "@royalfut/interfaces";

interface IInfographicTextProps
    extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
    text: string;
    variant: "main" | "description";
    showZeroAsInitial?: boolean;
}

const InfographicText: FC<IInfographicTextProps> = ({
    text,
    variant,
    showZeroAsInitial = false,
    ...props
}) => (
    <span
        className={cn("w-auto", {
            "text-xl font-semibold lg:text-4xl lg:font-bold":
                variant === "main",
            "text-white-60 text-xs font-normal text-center":
                variant === "description",
        })}
        {...props}>
        {showZeroAsInitial ? 0 : text}
        {showZeroAsInitial && <span className="sr-only">{text}</span>}
    </span>
);

interface IInfographicCardProps {
    item: IInfographicStatsItem;
}

const InfographicCard: FC<IInfographicCardProps> = ({ item }) => (
    <div
        className={cn(
            "relative flex flex-col items-center gap-2 basis-28 md:basis-20 grow lg:gap-7",
            "before:w-3 before:h-full before:bg-transparent before:border-l before:border-l-white-20 before:absolute before:-left-3 lg:before:w-9 lg:before:-left-8",
            "first:before:!hidden max-[414px]:[&:nth-child(3n+1)]:before:hidden max-[414px]:[&:nth-child(4n+1)]:before:block max-[515px]:[&:nth-child(4n+1)]:before:hidden"
        )}>
        <span className="flex w-full justify-center">
            {item.prefixText && (
                <InfographicText variant="main" text={item.prefixText} />
            )}
            <InfographicText
                variant="main"
                text={item.mainValue}
                data-countup-number={item.mainValue}
                showZeroAsInitial
            />
            <InfographicText variant="main" text={item.suffixText} />
        </span>
        <InfographicText variant="description" text={item.description.label} />
    </div>
);

const InfographicStats = () => {
    const countUpRef = useRef<HTMLDivElement>(null);
    const infographicItems = useUIGlobalStore(
        state => state.pages.home.inforgraphic
    );

    useMount(() => {
        countUpRef.current?.dataset.module?.split(" ").forEach(() => {
            new CountUp(countUpRef.current!);
        });
    });

    return (
        <div
            ref={countUpRef}
            className="flex flex-wrap gap-6 lg:gap-16"
            data-module="countup">
            {infographicItems.map((item, idx) => (
                <InfographicCard key={idx} item={item} />
            ))}
        </div>
    );
};

export default InfographicStats;
