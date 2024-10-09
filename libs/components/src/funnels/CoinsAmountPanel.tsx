import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { CurrencyPickerDropdown } from "../locale";
import { UTDisplay, CCYDisplay, TriggerButton } from "./TradeSummary.client";
import { TradeSummaryPanel } from "./ui";
import { LoyaltyPointsIndicator } from "./ui.client";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, FC } from "react";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";

interface ISummaryBoxProps {
    title?: string;
    cnWrapper?: string;
}

const SummaryBox: FNCNChildren<ISummaryBoxProps> = ({
    title = "",
    className,
    cnWrapper,
    children,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col h-max justify-end",
                {
                    "self-end": !title || !title.length,
                },
                className
            )}>
            <p className="text-xs font-bold">{title}</p>
            <div className={cn("flex", cnWrapper)}>{children}</div>
        </div>
    );
};

const CurrencySelection: FNCN = ({ className }) => {
    return (
        <div
            className={cn(
                "flex h-auto items-center bg-black-dropdown rounded-md",
                className
            )}>
            <CurrencyPickerDropdown
                showListCountryFlag
                className="px-2 items-center space-x-1"
                size="sm"
            />
        </div>
    );
};

type TSummarProps = Omit<
    ComponentPropsWithoutRef<typeof SummaryBox>,
    "children"
>;

const UTSummarySection: FC<Omit<TSummarProps, "icon">> = ({
    className,
    cnWrapper,
    ...props
}) => {
    return (
        <SummaryBox
            className={cn("mr-6", className)}
            cnWrapper={cn("space-x-0.5 sm:space-x-1 items-center", cnWrapper)}
            {...props}>
            <UTCoinMonocolorIcon className="text-secondary w-6 h-6" />
            <UTDisplay />
        </SummaryBox>
    );
};

const CCYSummarySection: FC<
    Omit<TSummarProps, "icon"> &
        Pick<ComponentPropsWithoutRef<typeof CCYDisplay>, "imageType">
> = ({ cnWrapper, imageType, ...props }) => {
    return (
        <SummaryBox cnWrapper={cn("space-x-3", cnWrapper)} {...props}>
            <CCYDisplay imageType={imageType} />
            <CurrencySelection />
        </SummaryBox>
    );
};

const LoyaltySummarySection: FC<Omit<TSummarProps, "icon">> = ({
    ...props
}) => {
    return (
        <SummaryBox {...props}>
            <LoyaltyPointsIndicator />
        </SummaryBox>
    );
};

const SummaryGroup: FC<ComponentPropsWithoutRef<"div">> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={cn("flex items-end", className)} {...props}>
            {children}
        </div>
    );
};

const CoinsAmountInfo: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "sm:rounded-2xl bg-transparent justify-between flex-wrap sm:bg-black-shape w-full sm:py-2 sm:px-3 flex sm:justify-start",
                className
            )}>
            {children}
        </div>
    );
};

const TradeSummaryButton = TriggerButton;

const CoinsAmountPanel: FNCNChildren = ({ className, children }) => {
    return (
        <TradeSummaryPanel
            className={cn(
                "bg-black-shape sm:bg-transparent p-5 sm:p-0 sm:space-x-[3.75rem]",
                className
            )}>
            {children}
        </TradeSummaryPanel>
    );
};

const Root = CoinsAmountPanel;
const InfoBox = SummaryBox;
const UT = UTSummarySection;
const CCY = CCYSummarySection;
const Loyalty = LoyaltySummarySection;
const InfoGroup = SummaryGroup;
const Info = CoinsAmountInfo;
const Button = TradeSummaryButton;

export {
    Root,
    InfoBox,
    UT,
    CurrencySelection,
    CCY,
    Loyalty,
    InfoGroup,
    Info,
    Button,
};
