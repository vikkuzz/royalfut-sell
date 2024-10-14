/* eslint-disable max-lines */
"use client";

import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { useI18nRouter } from "@royalfut/hooks";
import {
    useTransferSelectorStore,
    usePopupDialogStore,
    useAuthStore,
    useUISheetStore,
    useCurrencyStore,
    useI18nStore,
    useTransferActualPrice,
} from "@royalfut/store";
import { useIsMounted, useLoyaltyPointsCalc } from "@royalfut/hooks";
import {
    CCYUIDisplay,
    CoinsAmountPanel,
    CryptoSellAmountInput,
    TradeOptionsPanel,
} from "@royalfut/components";
import { createOrder, preparePaymentRequest } from "@royalfut/actions";
import {
    Button,
    Sheet,
    LayoutViewportSectionFrame,
    GradientButton,
    ErrorCollapsibleText,
} from "@royalfut/ui";
import {
    ArrowChevronRightIcon,
    PencilMonocolorIcon,
    UTPackageIcon,
} from "@royalfut/icons";
import {
    ECCYIDs,
    EPaymentCollectionGroups,
    EPaymentFBPage,
    ESEOPlatforms,
    EUIDialogsNames,
} from "@royalfut/enums";
import { analitic, cn, formatBySymbolNumber } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";
import type { FNCN } from "@royalfut/interfaces";
import { useUpdate } from "@lilib/hooks";
import { useTranslations } from "next-intl";

const cnCoinCalculatorTrigger = {
    btn: "w-8 h-8 center relative rounded-full transition-colors duration-300 bg-white-10 hover:bg-[hsla(var(--color-secondary),.5)]",
    icon: "w-3.5 h-4 text-white",
};

const CoinCalculatorSheet = () => {
    return (
        <Sheet.Root>
            <Button
                aria-label="Open Menu"
                asChild
                className={cn(cnCoinCalculatorTrigger.btn, "flex md:hidden")}>
                <Sheet.Trigger>
                    <PencilMonocolorIcon
                        className={cnCoinCalculatorTrigger.icon}
                    />
                </Sheet.Trigger>
            </Button>
            <Sheet.Content
                closeBtnView="rounded"
                side="bottom"
                className="w-full flex flex-col md:hidden justify-between rounded-t-[1.75rem] border-t border-white-20 w-full p-0 bg-black-shape">
                <LayoutViewportSectionFrame className="flex flex-col w-full py-12 pb-6">
                    <div className="flex flex-col w-full gap-6">
                        <div className="w-full flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
                            <p className="font-bold text-3xl sm:text-xl">
                                Choose your own amount
                            </p>
                        </div>
                        <CryptoSellAmountInput
                            // FIXME: Temporary to prevent autofocus
                            tabIndex={-1}
                        />
                    </div>
                    <CoinsAmountPanel.Root className="mt-6 sm:mt-10 sm:relative sm:space-x-0 bg-transparent p-0 py-5 sm:py-0 bg-transparent backdrop-blur-sm sm:backdrop-blur-none">
                        <CoinsAmountPanel.Info className="sm:bg-transparent sm:px-0 sm:py-0 sm:gap-9">
                            <CoinsAmountPanel.InfoGroup>
                                <CoinsAmountPanel.CCY />
                            </CoinsAmountPanel.InfoGroup>
                            <CoinsAmountPanel.Loyalty />
                        </CoinsAmountPanel.Info>
                    </CoinsAmountPanel.Root>
                </LayoutViewportSectionFrame>
            </Sheet.Content>
        </Sheet.Root>
    );
};

export const CoinBundleDisplay = () => {
    const isMounted = useIsMounted();
    const { setPopup } = usePopupDialogStore();
    const coinUT = useTransferSelectorStore.use.coinUT();
    const price = useTransferSelectorStore.use.labelPrice();

    // TODO: make isMountedLogic optional
    return (
        <div className="flex justify-between items-center">
            <div
                className={cn("flex items-center gap-4", {
                    "animate-pulse": !isMounted,
                })}>
                <UTPackageIcon className="text-secondary w-9 h-9" />
                <div
                    className={cn(
                        "flex transition-opacity duration-300 flex-col gap-1",
                        {
                            "invisible opacity-0": !isMounted,
                            "visible opacity-100": isMounted,
                        }
                    )}>
                    <span className="text-white font-medium text-base inline-block leading-none">
                        {formatBySymbolNumber(coinUT, " ")} EA FC coins
                    </span>
                    <CCYUIDisplay
                        label={price}
                        imageType="symbol"
                        whitespace={false}
                        className="text-base font-semibold text-secondary"
                    />
                </div>
            </div>
            <CoinCalculatorSheet />
            <Button
                onClick={() => setPopup(EUIDialogsNames.COIN_CALCULATION)}
                className={cn(cnCoinCalculatorTrigger.btn, "hidden md:flex")}>
                <PencilMonocolorIcon className={cnCoinCalculatorTrigger.icon} />
            </Button>
        </div>
    );
};

export const RoyalPointsPopupBtn: FC<
    Omit<ComponentPropsWithoutRef<typeof Button>, "onClick">
> = ({ children, ...props }) => {
    const { setPopup } = usePopupDialogStore();

    return (
        <Button
            onClick={() => setPopup(EUIDialogsNames.ROYAL_POINTS)}
            {...props}>
            {children}
        </Button>
    );
};

export const PriceCard: FNCN<{
    asCard?: boolean;
    mountedDisabledYet?: boolean;
}> = ({ asCard = true, mountedDisabledYet = false, className }) => {
    const t = useTranslations("sage_pages.order");
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isMounted = useIsMounted();
    const loyalty = useLoyaltyPointsCalc();

    return (
        <TradeOptionsPanel
            className={cn(
                "gap-3",
                {
                    "bg-transparent !p-0 rounded-none": !asCard,
                    "animate-pulse": mountedDisabledYet && !isMounted,
                },
                className
            )}>
            <CoinsAmountPanel.CCY
                title={t("h5.7")}
                imageType="image"
                className={cn("transition-opacity duration-300", {
                    "invisible opacity-0": mountedDisabledYet && !isMounted,
                    "visible opacity-100": mountedDisabledYet && isMounted,
                })}
            />
            {loyalty && (
                <div
                    className={cn(
                        "flex flex-row sm:flex-col gap-1.5 items-center sm:items-start transition-opacity duration-300",
                        {
                            "invisible opacity-0":
                                mountedDisabledYet && !isMounted,
                            "visible opacity-100":
                                mountedDisabledYet && isMounted,
                        }
                    )}>
                    <CoinsAmountPanel.Loyalty className="justify-start self-start flex-none" />
                    <span className="text-white-40 text-xs font-medium whitespace-pre-wrap ml-auto">
                        {isLoggedIn ? t("notify.3") : t("notify.2")}
                    </span>
                </div>
            )}
        </TradeOptionsPanel>
    );
};

/*
const processModulebankPaymentFormSubmission = (data: IAPI.WWW.Payment.PrepareModule.POST.Response.IModuleBankEntity) => {
    const paymentData = excludeProps(data, ["acquiringLink"]);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.acquiringLink;

    Object.entries(paymentData).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}
*/

export const PayBtn: FNCN<{ fbPage: EPaymentFBPage }> = ({
    className,
    fbPage,
}) => {
    const t = useTranslations("sage_pages.order");
    const params = useParams();
    const router = useI18nRouter();
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const [isPaymentFailure, setIsPaymentFailure] = useState(false);
    const [failedMsg, setFailedMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const { price: priceEUR } = useTransferActualPrice({
        forceCCYID: ECCYIDs.EUR,
    });
    const isMounted = useIsMounted();
    const use = useTransferSelectorStore.use;
    const bonuses = use.bonuses();
    const lng = useI18nStore(state => state.i18n);
    const ccy = useCurrencyStore(state => state.currency);
    const hasError = use.hasError();
    const coinUT = use.coinUT();
    const method = use.method();
    const platform = use.platform();
    const payment = use.payment();
    const { setOpen } = useUISheetStore();

    useUpdate(() => {
        if (!isLoggedIn) {
            setIsPaymentFailure(false);
            setFailedMsg("");
        }
    }, [isLoggedIn]);

    const onPay = useCallback(async () => {
        setLoading(true);
        setIsPaymentFailure(false);
        setFailedMsg("");
        try {
            const order = await createOrder({
                coinCount: coinUT,
                currency: ccy,
                deliveryMethod: method,
                platform,
                promoCode: bonuses.coupon?.code ?? null,
            });

            if (!order) throw new Error();

            switch (payment) {
                case EPaymentCollectionGroups.APPLE_PAY: {
                    throw new Error("");
                }
                case EPaymentCollectionGroups.GOOGLE_PAY: {
                    throw new Error("");
                }
                default: {
                    const prepareRes = await preparePaymentRequest({
                        coinsUT: coinUT,
                        currency: ccy,
                        deliveryMethod: method,
                        lng,
                        orderId: order.id,
                        fbPage,
                        paymentMethod: payment,
                        coupon: bonuses.coupon?.code ?? null,
                        platform: params?.platform
                            ? (params.platform as ESEOPlatforms)
                            : platform,
                        price: {
                            [ECCYIDs.EUR]: priceEUR,
                        },
                    });
                    analitic.clickPayNow(priceEUR);

                    if (!prepareRes) throw new Error();
                    router.push(prepareRes.acquiringLink);
                    break;
                }
            }
        } catch (e) {
            setFailedMsg(
                "Oops, something went wrong! Please try again or reach out to support."
            );
            setIsPaymentFailure(true);
        } finally {
            setLoading(false);
        }
    }, [
        coinUT,
        ccy,
        method,
        platform,
        bonuses.coupon?.code,
        payment,
        lng,
        fbPage,
        params.platform,
        priceEUR,
        router,
    ]);
    const openAuthMenu = () => {
        setOpen(true);
    };

    return (
        <div className="w-full">
            <GradientButton
                type="button"
                onClick={isLoggedIn ? onPay : openAuthMenu}
                loading={loading}
                disabled={!!hasError || !isMounted}
                className={cn("group h-14 gap-2 w-full rounded-xl", className)}>
                <span className="text-lg font-semibold">
                    {isLoggedIn ? t("btn.text.1") : t("btn.text.2")}
                </span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
            <ErrorCollapsibleText
                className="[--collapsible-h:theme(spacing.6)]"
                show={isPaymentFailure}>
                {failedMsg}
            </ErrorCollapsibleText>
        </div>
    );
};
