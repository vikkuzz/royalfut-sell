import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";
import { CurrencyPickerDropdown } from "../ccy";
import {
    UTDisplay,
    CCYDisplay,
    StartSellingButton,
} from "./TradeSummary.client";
import TradeSummaryPanel from "./TradeSummaryPanel";

import type { ReactNode } from "react";
import type { FNCNChildren, FNCN } from "@royalfut/interfaces";

interface ISellSummarySectionProps {
    title: string;
    icon?: ReactNode;
    cnWrapper?: string;
}

const SellSummarySection: FNCNChildren<ISellSummarySectionProps> = ({
    title,
    className,
    cnWrapper,
    icon = null,
    children,
}) => {
    return (
        <div className={cn("flex flex-col justify-start", className)}>
            <p className="text-xs font-bold">{title}</p>
            <div className={cn("flex", cnWrapper)}>
                {icon}
                {children}
            </div>
        </div>
    );
};

const CurrencySelection = () => {
    return (
        <div className="flex h-auto items-center bg-black-dropdown rounded-md">
            <CurrencyPickerDropdown
                showCountryFlag
                className="px-2 items-center space-x-1"
                size="sm"
            />
        </div>
    );
};

export const CoinsAmountInfo: FNCN = ({ className }) => {
    return (
        <div
            className={cn(
                "sm:rounded-2xl bg-transparent flex-wrap sm:bg-black-shape w-full sm:py-2 sm:px-3 flex justify-start",
                className
            )}>
            <SellSummarySection
                className="mr-6"
                cnWrapper="space-x-0.5 sm:space-x-1 items-center"
                title="You're about to sell"
                icon={
                    <UTCoinMonocolorIcon className="text-secondary w-6 h-6" />
                }>
                <UTDisplay />
            </SellSummarySection>
            <SellSummarySection
                cnWrapper="space-x-3"
                title="For this much"
                icon={<CCYDisplay />}>
                <CurrencySelection />
            </SellSummarySection>
        </div>
    );
};

export const TradeSummaryButton = StartSellingButton;

const CoinsAmountPanel: FNCNChildren = ({ className, children }) => {
    return (
        <TradeSummaryPanel.Root
            className={cn(
                "bg-black-shape sm:bg-transparent sm:space-x-[3.75rem] p-5 sm:p-0",
                className
            )}>
            {children}
        </TradeSummaryPanel.Root>
    );
};

export default {
    Root: CoinsAmountPanel,
    Info: CoinsAmountInfo,
    Button: TradeSummaryButton,
};
