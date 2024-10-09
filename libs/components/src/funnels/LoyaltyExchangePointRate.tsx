"use client";

import { useMemo } from "react";
import { CrownIcon } from "@royalfut/icons";
import { CurrencyPickerDropdown } from "../locale";
import {
    useTransferSelectorStore,
    useCurrencyStore,
    useStocksStore,
} from "@royalfut/store";
import { cn, caclulateLoyaltyPerPoint } from "@royalfut/utils";

import type { FNCN, FNCNChildren } from "@royalfut/interfaces";
import type { FC } from "react";

export const Root: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2 text-2xl text-white leading-normal font-semibold",
                className
            )}>
            {children}
        </div>
    );
};

export const Point: FC<{ cnIcon?: string }> = ({ cnIcon }) => {
    return (
        <div className="flex items-center gap-1">
            <span>1</span>
            <CrownIcon className={cn("text-white w-4 h-4", cnIcon)} />
        </div>
    );
};

export const Equal: FC<{ type?: "exact" | "approx" }> = ({
    type = "approx",
}) => {
    if (type === "approx") {
        return <span>&asymp;</span>;
    }

    return <span>=</span>;
};

export const Price: FNCN<{ cnTxt?: string; cnPicker?: string }> = ({
    cnTxt,
    cnPicker,
}) => {
    const use = useTransferSelectorStore.use;
    const platform = use.platform();
    const method = use.method();
    const ccy = useCurrencyStore(state => state.currency);
    const stocks = useStocksStore(state => state.stocks);
    const price = caclulateLoyaltyPerPoint(
        method,
        platform,
        ccy,
        stocks ?? undefined
    );

    const pickerEl = useMemo(
        () => (
            <CurrencyPickerDropdown
                className="px-2 items-center space-x-1"
                size="sm"
            />
        ),
        []
    );

    return (
        <div className="flex items-center gap-1">
            <span className={cnTxt}>{Number(price).toFixed(2)}</span>
            <div
                className={cn(
                    "flex h-auto items-center bg-black-dropdown rounded-md self-stretch",
                    cnPicker
                )}>
                {pickerEl}
            </div>
        </div>
    );
};
