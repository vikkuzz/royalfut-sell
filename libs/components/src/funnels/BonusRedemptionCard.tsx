/* eslint-disable max-lines */
"use client";

import { useUpdate } from "@lilib/hooks";
import { TradeOptionsPanel } from "./ui";
import { PoorTabs, HoverCard, Button } from "@royalfut/ui";
import { LoyaltyPointsBadge } from "../badges";
import CouponForm from "./CouponForm";
import {
    useAuthStore,
    useCurrencyStore,
    usePopupDialogStore,
    useTransferActualPrice,
    useTransferSelectorStore,
    useUserBonusStore,
} from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";
import { OrderBoxTitle } from "./TradeSummary.client";
import { ccyCollection } from "@royalfut/collections";
import { cn, isValueNonDefined } from "@royalfut/utils";
import { useIsMounted, useLoyaltyDiscountCalculation } from "@royalfut/hooks";

import type { FC, PropsWithChildren, ComponentPropsWithoutRef } from "react";

const enum ELoyaltyPointsRedemptionIds {
    DONT_USE,
    USE,
}

const LoyaltyPointsUseTabBtn: FC<
    Omit<ComponentPropsWithoutRef<typeof PoorTabs.Item>, "value"> & {
        points: ReturnType<typeof useLoyaltyDiscountCalculation>;
    }
> = ({ className, disabled, points, ...props }) => {
    const isMounted = useIsMounted();
    const setBonuses = useTransferSelectorStore.use.setBonuses();
    const { value } = PoorTabs.use();

    useUpdate(() => {
        if (
            value === ELoyaltyPointsRedemptionIds.USE &&
            !isValueNonDefined(points?.priceEquivalentForPoints) &&
            points?.priceEquivalentForPoints
        ) {
            setBonuses("loyalty", {
                type: "asis",
                value: +points?.priceEquivalentForPoints,
            });
        } else {
            setBonuses("loyalty", null);
        }
    }, [value]);

    return (
        <PoorTabs.Item
            value={ELoyaltyPointsRedemptionIds.USE}
            className={cn(
                "space-x-1 sm:max-w-[7rem]",
                {
                    "animate-pulse": !isMounted,
                },
                className
            )}
            disabled={disabled}
            {...props}>
            <span className="group-data-[state=inactive]:text-white-40 group-data-[state=active]:text-white transition">
                Use
            </span>
            <LoyaltyPointsBadge
                amount={String(points?.loyaltyPointsUsed ?? 0)}
                size="sm"
                // view="none"
                className={cn("py-0", {
                    "bg-white-20": disabled,
                    "group-data-[state=inactive]:!opacity-40": !disabled,
                    "invisible opacity-0": !isMounted,
                    "visible opacity-100": isMounted,
                    // "group-data-[state=inactive]:bg-white-20 group-data-[state=inactive]:!opacity-40 group-data-[state=active]:bg-linear-primary-simple-pan": !disabled
                })}
            />
        </PoorTabs.Item>
    );
};

const Coupon = () => {
    const { value } = PoorTabs.use();

    if (value !== ELoyaltyPointsRedemptionIds.DONT_USE) {
        return null;
    }

    return <CouponForm />;
};

const LoyalPointsDiscount: FC<{
    price: string | undefined;
    ccySymbol: string;
}> = ({ price, ccySymbol }) => {
    const { value } = PoorTabs.use();

    if (value !== ELoyaltyPointsRedemptionIds.USE || !price) {
        return null;
    }

    return (
        <div className="flex items-center justify-between font-medium text-sm sm:text-xs text-white">
            <div className="flex items-center gap-1">
                <LoyaltyPointsBadge
                    size="none"
                    className="center w-3.5 h-3.5"
                />
                <span>Royal Points discount</span>
            </div>
            <span>
                -{ccySymbol}
                {price}
            </span>
        </div>
    );
};

interface IOrderCostDetailsProps {
    ccySymbol: string;
    subtotal: {
        show: boolean;
        price: string;
    };
    loyalty: ReturnType<typeof useLoyaltyDiscountCalculation>;
}

const OrderCostDetails: FC<IOrderCostDetailsProps> = ({
    ccySymbol,
    subtotal,
    loyalty,
}) => {
    const { value } = PoorTabs.use();

    if (
        !subtotal.show &&
        (!loyalty?.loyaltyPointsUsed ||
            value === ELoyaltyPointsRedemptionIds.DONT_USE)
    )
        return null;

    return (
        <div className="flex flex-col gap-1.5">
            {subtotal.show && (
                <div className="flex items-center justify-between font-medium text-sm sm:text-xs text-white">
                    <span>Subtotal</span>
                    <span>
                        {ccySymbol}
                        {subtotal.price}
                    </span>
                </div>
            )}
            <LoyalPointsDiscount
                ccySymbol={ccySymbol}
                price={loyalty?.priceEquivalentForPoints}
            />
        </div>
    );
};

const Revalidate = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const { setValue } = PoorTabs.use();

    useUpdate(() => {
        if (!isLoggedIn) {
            setValue(ELoyaltyPointsRedemptionIds.DONT_USE);
        }
    }, [isLoggedIn]);

    return null;
};

interface IBonusRedemptionCardProps {
    showSubtotal?: boolean;
    showTitle?: boolean;
}

const BonusRedemptionCard: FC<PropsWithChildren<IBonusRedemptionCardProps>> = ({
    children,
    showSubtotal = true,
    showTitle = false,
}) => {
    const { setPopup } = usePopupDialogStore();
    const { originalPrice } = useTransferActualPrice();
    const ccy = useCurrencyStore(state => ccyCollection[state.currency]);
    const userLoyaltyBalance = useUserBonusStore(
        state => state.loyalty?.balance ?? 0
    );
    const loyaltyPointsUse = useLoyaltyDiscountCalculation();
    const isLoyaltyPointsEnabled = userLoyaltyBalance !== 0;

    return (
        <PoorTabs.Provider
            initial={{ value: ELoyaltyPointsRedemptionIds.DONT_USE }}>
            <Revalidate />
            <TradeOptionsPanel className="gap-8">
                {showTitle && (
                    <OrderBoxTitle className="-mb-6">Bonuses</OrderBoxTitle>
                )}
                <div className="flex flex-col gap-4">
                    {showSubtotal || loyaltyPointsUse?.loyaltyPointsUsed ? (
                        <OrderCostDetails
                            ccySymbol={ccy.symbol}
                            subtotal={{
                                show: showSubtotal,
                                price: originalPrice.label,
                            }}
                            loyalty={loyaltyPointsUse}
                        />
                    ) : null}
                    <div className="flex flex-col gap-3">
                        <PoorTabs.Root>
                            <PoorTabs.Item
                                value={ELoyaltyPointsRedemptionIds.DONT_USE}>
                                Don&apos;t use
                            </PoorTabs.Item>
                            {isLoyaltyPointsEnabled ? (
                                <LoyaltyPointsUseTabBtn
                                    disabled={false}
                                    points={loyaltyPointsUse}
                                />
                            ) : (
                                <HoverCard.Root openDelay={400}>
                                    <HoverCard.Trigger className="flex-1 justify-center flex">
                                        <LoyaltyPointsUseTabBtn
                                            disabled
                                            points={loyaltyPointsUse}
                                        />
                                    </HoverCard.Trigger>
                                    <HoverCard.Content
                                        cnBox="[--z-index-picker-card:30]"
                                        className="flex flex-col items-center border-none gap-2 shadow-xl"
                                        sideOffset={-5}
                                        side="top">
                                        <span className="text-xs font-semibold text-center">
                                            Buy more coins to unlock
                                        </span>
                                        <Button
                                            onClick={() =>
                                                setPopup(
                                                    EUIDialogsNames.ROYAL_POINTS
                                                )
                                            }
                                            className="bg-white-10 hover:bg-white-20 transition-colors duration-300 rounded-lg px-2 py-1 font-semibold text-xs">
                                            Learn more
                                        </Button>
                                        <HoverCard.Arrow className="fill-black-dropdown w-5 h-4" />
                                    </HoverCard.Content>
                                </HoverCard.Root>
                            )}
                        </PoorTabs.Root>
                    </div>
                    <Coupon />
                </div>
                {children}
            </TradeOptionsPanel>
        </PoorTabs.Provider>
    );
};

export default BonusRedemptionCard;
