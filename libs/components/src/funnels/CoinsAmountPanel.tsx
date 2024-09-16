import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { CurrencyPickerDropdown } from "../locale";
import {
    UTDisplay,
    CCYDisplay,
    StartSellingButton,
} from "./TradeSummary.client";
import TradeSummaryPanel from "./TradeSummaryPanel";
import LoyaltyPointsIndicator from "./LoyaltyPointsIndicator";
import { cn } from "@royalfut/utils";

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
                showListCountryFlag
                className="px-2 items-center space-x-1"
                size="sm"
            />
        </div>
    );
};

interface ICoinsAmountInfoProps {
    display: {
        ut:
            | {
                  hide?: false;
                  title: string;
              }
            | {
                  hide: true;
              };
        ccy:
            | {
                  hide?: false;
                  title: string;
              }
            | {
                  hide: true;
              };
        loyality:
            | {
                  hide?: false;
              }
            | {
                  hide: true;
              };
    };
}

export const CoinsAmountInfo: FNCN<ICoinsAmountInfoProps> = ({
    className,
    display,
}) => {
    return (
        <div
            className={cn(
                "sm:rounded-2xl bg-transparent justify-between flex-wrap sm:bg-black-shape w-full sm:py-2 sm:px-3 flex sm:justify-start",
                className
            )}>
            <div className="flex">
                {!display.ut.hide && (
                    <SellSummarySection
                        className="mr-6"
                        cnWrapper="space-x-0.5 sm:space-x-1 items-center"
                        title={display.ut.title}
                        icon={
                            <UTCoinMonocolorIcon className="text-secondary w-6 h-6" />
                        }>
                        <UTDisplay />
                    </SellSummarySection>
                )}
                {!display.ccy.hide && (
                    <SellSummarySection
                        cnWrapper="space-x-3"
                        title={display.ccy.title}
                        icon={<CCYDisplay />}>
                        <CurrencySelection />
                    </SellSummarySection>
                )}
            </div>
            {!display.loyality.hide && (
                <SellSummarySection className={"sm:ml-9 self-end"} title={""}>
                    <LoyaltyPointsIndicator />
                </SellSummarySection>
            )}
        </div>
    );
};

export const TradeSummaryButton = StartSellingButton;

const CoinsAmountPanel: FNCNChildren = ({ className, children }) => {
    return (
        <TradeSummaryPanel.Root
            className={cn(
                "bg-black-shape sm:bg-transparent p-5 sm:p-0 sm:space-x-[3.75rem]",
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
