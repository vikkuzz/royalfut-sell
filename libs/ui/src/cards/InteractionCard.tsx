import { BorderedBox } from "../box";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, FC } from "react";
import type { FNCNChildren, FNCN } from "@royalfut/interfaces";

export const BgCoins: FNCN<{ images: Array<string> }> = ({
    images,
    className,
}) => {
    return (
        <div
            className={cn(
                "absolute left-0 top-0 w-[calc(100%-var(--border-size,0%))] h-[calc(100%-var(--border-size,0%))] bg-no-repeat rounded-[var(--rounded)] overflow-hidden",
                className
            )}
            style={{
                backgroundImage: images
                    .map(url => `url(/image/${url})`)
                    .join(","),
                backgroundPosition: "0 0,100% 100%",
            }}
        />
    );
};

export const Root: FC<ComponentPropsWithoutRef<typeof BorderedBox>> = ({
    children,
    className,
    cnBox,
    design = { gradient: true },
    ...rest
}) => {
    return (
        <BorderedBox
            design={design}
            className={cn(
                "[--rounded:1.5rem] [--color-illusion-linear-bg:theme(colors.black.1)] backdrop-blur-3xl",
                className
            )}
            cnBox={cn(
                "relative py-12 px-8 flex-col justify-start items-center gap-1 inline-flex",
                cnBox
            )}
            {...rest}>
            {children}
        </BorderedBox>
    );
};

export const Body: FNCNChildren = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-5 w-full", className)}>
            {children}
        </div>
    );
};

export const Title: FNCN<{ label: string }> = ({ label, className }) => {
    return (
        <p
            className={cn(
                "w-full text-white text-2xl font-bold mb-5",
                className
            )}>
            {label}
        </p>
    );
};
