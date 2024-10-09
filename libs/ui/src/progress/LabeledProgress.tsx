"use client";

import * as RXProgress from "@radix-ui/react-progress";
import { cn } from "@royalfut/utils";

import type { CSSProperties } from "react";
import type { FNCN } from "@royalfut/interfaces";

interface ILabeledProgressProps
    extends Omit<RXProgress.ProgressProps, "className"> {
    cnIndicator?: string;
    progress: number;
    label?: string;
}

const LabeledProgress: FNCN<ILabeledProgressProps> = ({
    className,
    cnIndicator,
    progress,
    label,
    ...props
}) => {
    return (
        <RXProgress.Root
            data-label={label ? label : `${progress}%`}
            className={cn(
                "relative overflow-hidden bg-black-dropdown rounded-full max-w-max h-2.5 translate-z",
                "after:absolute after:content-[attr(data-label)] after:text-white after:text-xs after:leading-tight after:font-bold after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
                className
            )}
            value={progress}
            {...props}>
            <RXProgress.Indicator
                className={cn(
                    `bg-linear-primary-simple-pan h-full w-11/12 transition-transform duration-700 ease-in-out`,
                    cnIndicator
                )}
                style={
                    {
                        transform: `translateX(-${100 - progress}%)`,
                    } as CSSProperties
                }
            />
        </RXProgress.Root>
    );
};

export default LabeledProgress;
