/* eslint-disable max-lines */

import {
    OrderBoxTitle,
    PaymentMethodChoice,
    PlatformChoiceAccordion,
    OrderProcessManager,
    TradeOptionsPanel,
    BonusRedemptionCard,
    LoyaltyPointsBadge,
    TransferCoinsEditableInputCard,
} from "@royalfut/components";
import { Text } from "@royalfut/ui";
import {
    CoinBundleDisplay,
    RoyalPointsPopupBtn,
    PriceCard as PriceCardUI,
    PayBtn as PayBtnUI,
} from "./ui.client";
import {
    WWW_OrderProcessingStepsInfo,
    PaymentMethodsCashGroupSets,
    PlatformAppSets,
} from "@royalfut/collections";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { ArrowChevronRightIcon, InfoRoundedFillIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";
import { getTranslations } from "next-intl/server";

export const Step: FC<PropsWithChildren> = ({ children }) => {
    return (
        <OrderProcessManager
            title="Secure checkout"
            steps={{
                active: EOrderProcessingStepIds.WWW_CHECKOUT,
                availableSteps:
                    WWW_OrderProcessingStepsInfo[
                        EOrderProcessingStepIds.WWW_CHECKOUT
                    ]!.allowSteps,
            }}>
            {children}
        </OrderProcessManager>
    );
};

export const Root: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row sm:justify-between sm:w-full sm:self-center sm:space-x-10",
                className
            )}>
            {children}
        </div>
    );
};

export const LeftArea: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "flex flex-col w-full sm:flex-none basis-[140%] sm:w-[23.25rem] sm:max-w-[23.25rem] mb-0.5 sm:mb-0 gap-8",
                className
            )}>
            {children}
        </div>
    );
};

export const RightArea: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "flex flex-col w-full mb-6 sm:mb-0 space-y-4",
                className
            )}>
            {children}
        </div>
    );
};

export const PaymentMethodCard: FNCN = async ({ className }) => {
    const t = await getTranslations("greer_pages.order");
    return (
        <div className={className}>
            <OrderBoxTitle>{t("h5.3")}</OrderBoxTitle>
            <PaymentMethodChoice sets={PaymentMethodsCashGroupSets} />
        </div>
    );
};

export const EditableCoinsInputCard: FNCN<{
    variant?: "inline" | "dialog";
}> = async ({ variant = "inline", className }) => {
    const t = await getTranslations("greer_pages.order");
    if (variant === "inline") {
        return (
            <TransferCoinsEditableInputCard
                title={t("h5.4")}
                className={cn(
                    "[--bg:theme(colors.black.shape)] sm:[--bg:theme(colors.black.1)] py-3 sm:py-6",
                    className
                )}
            />
        );
    }

    if (variant === "dialog") {
        return (
            <div className="flex flex-col w-full h-max rounded-2xl px-4 py-6 transition-colors duration-300 bg-black-1">
                <OrderBoxTitle>{t("h5.4")}</OrderBoxTitle>
                <CoinBundleDisplay />
            </div>
        );
    }

    return null;
};

export const PlatformCard: FNCN = async ({ className }) => {
    const t = await getTranslations("greer_pages.order");
    return (
        <TradeOptionsPanel className={cn(className)}>
            <OrderBoxTitle className="mb-2">{t("h5.1")}</OrderBoxTitle>
            <PlatformChoiceAccordion sets={PlatformAppSets} />
        </TradeOptionsPanel>
    );
};

export const BonusCard = BonusRedemptionCard;
export const PriceCard = PriceCardUI;
export const PayBtn = PayBtnUI;

export const DetailsCards = async () => {
    const t = await getTranslations("sage_pages.order");
    return (
        <div className="flex flex-col w-full gap-6 !mt-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                    <InfoRoundedFillIcon className="text-system-info w-3.5 h-3.5" />
                    <span className="text-white text-xs font-bold">
                        {t("h5.9")}
                    </span>
                </div>
                <span className="inline-block text-xs font-medium text-white-40">
                    {t("info.text.1")}
                </span>
            </div>
            <TradeOptionsPanel
                asChild
                className={cn(
                    "group relative bg-transparent h-max gap-4 justify-between items-start justify-start text-left overflow-unset",
                    "[--bordered-box-linear-bg-1:hsl(var(--color-black-background))] hover:[--bordered-box-linear-bg-1:hsla(var(--color-black-background),85%)] before:transition-colors before:duration-300 before:absolute before:border before:border-transparent before:-top-0.5 before:-left-0.5 before:-right-0.5 before:-bottom-0.5 before:-z-[1] before:rounded-xl before:bordered-box-linear-accent-1"
                )}>
                <RoyalPointsPopupBtn>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <LoyaltyPointsBadge
                                size="none"
                                className="center w-5 h-5"
                            />
                            <span className="text-white text-xs font-bold">
                                Royal Points
                            </span>
                        </div>
                        <span className="inline-block text-xs font-medium text-white-40">
                            {t("info.text.2")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <Text.Gradient className="font-medium text-xs">
                            {t("info.button.text")}
                        </Text.Gradient>
                        <ArrowChevronRightIcon className="text-primary w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
                    </div>
                </RoyalPointsPopupBtn>
            </TradeOptionsPanel>
        </div>
    );
};
