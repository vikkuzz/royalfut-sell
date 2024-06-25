"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import {
    useTransferSelectorStore,
    useCurrencyStore,
    useActualPrice,
} from "@royalfut/store";
import { useIsMounted } from "@royalfut/hooks";
import { GradientButtonRegular } from "@royalfut/ui";
import { ccyCollection } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import type { FNCNChildren, FNCN } from "@royalfut/interfaces";

export const OrderBoxTitle = forwardRef<
    ElementRef<"h5">,
    ComponentPropsWithoutRef<"h5"> & { asChild?: boolean }
>(({ className, children, asChild = false }, externalRef) => {
    const Comp = asChild ? Slot : "h5";

    return (
        <Comp
            ref={externalRef}
            className={cn("text-xs font-bold text-white mb-4", className)}>
            {children}
        </Comp>
    );
});
OrderBoxTitle.displayName = "OrderBoxTitle";

export const UTDisplay = () => {
    const label = useTransferSelectorStore.use.labelUT();

    return (
        <span className="text-white text-2.5xl font-bold whitespace-nowrap">
            {label}
        </span>
    );
};

export const CCYDisplay: FNCN<{
    imageType?: "symbol" | "image";
    decimalPlaces?: number;
}> = ({ className, imageType = "symbol", decimalPlaces }) => {
    const { label } = useActualPrice({ priceDecimalPlaces: decimalPlaces });
    const { id } = useCurrencyStore(state => ({ id: state.currency }));
    const ccy = ccyCollection[id];

    return (
        <span
            className={cn(
                "flex items-center text-white text-2.5xl font-bold whitespace-nowrap",
                className
            )}>
            {imageType === "symbol" && `${ccy.symbol} `}
            {imageType === "image" && (
                <span className="mr-2 h-6 w-6 relative flex-none">
                    <Image alt={ccy.name} src={ccy.image.symbol} fill />
                </span>
            )}
            {label}
        </span>
    );
};

export const StartSellingButton: FNCNChildren<
    ComponentPropsWithoutRef<typeof GradientButtonRegular>
> = ({ className, children, disabled = false, ...props }) => {
    const isMounted = useIsMounted();
    const disable = useTransferSelectorStore.use.hasError();

    return (
        <GradientButtonRegular
            disabled={!!disable || !isMounted || disabled}
            className={cn(
                "whitespace-nowrap py-5 sm:py-[auto] px-14 border border-none",
                className
            )}
            {...props}>
            {children}
        </GradientButtonRegular>
    );
};
