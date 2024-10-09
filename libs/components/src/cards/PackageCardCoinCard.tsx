/* eslint-disable max-lines */
"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import Image from "next/image";
import * as Separator from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import { Link } from "@royalfut/ui";
import {
    useCurrencyStore,
    useStocksStore,
    useTransferSelectorStore,
    useTransferStore,
} from "@royalfut/store";
import { LoyaltyPointsBadge } from "../badges";
import { CoinsAmountPanel, CCYUIDisplay } from "../funnels";
import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { useLoyaltyPointsCashbackPerc, useI18nRouter } from "@royalfut/hooks";
import { CalculationCredentials } from "@royalfut/collections";
import {
    cn,
    decodeFormattedShortView,
    calculatePrice,
    formatCommaNumber,
    roundAndFormatFloat,
    formatBySymbolNumber,
    calculateLoyaltyPoint,
} from "@royalfut/utils";

import type {
    ComponentPropsWithoutRef,
    FC,
    PropsWithChildren,
    MouseEventHandler,
} from "react";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";

interface ICardContextProps {
    amount: number;
    treasureType: ECoinsTreasureTypes;
}

const CardContext = createContext<ICardContextProps | undefined>(undefined);

const CardProvider: FC<PropsWithChildren & ICardContextProps> = ({
    children,
    amount,
    treasureType,
}) => {
    return (
        <CardContext.Provider value={{ amount, treasureType }}>
            {children}
        </CardContext.Provider>
    );
};

const useCardContext = () => {
    const context = useContext(CardContext);
    if (!context)
        throw new Error("useCardContext must be used within a CardProvider");
    return context;
};

export const BoughtTimeBadge: FNCN<{ amount: number; size?: "sm" | "md" }> = ({
    className,
    amount,
    size = "sm",
}) => {
    return (
        <div
            className={cn(
                "flex items-center bg-black-dropdown rounded-3.5xl px-3 backdrop-blur-sm",
                className
            )}>
            <span
                className={cn("font-bold text-extra-bonus", {
                    "text-base": size === "sm",
                    "text-xl": size === "md",
                })}>
                x{amount}
            </span>
            <Separator.Root
                orientation="vertical"
                className="bg-white-10 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-2"
            />
            <span className="text-sm text-xs font-semibold text-white-40">
                already bought
            </span>
        </div>
    );
};

const enum ECoinsTreasureTypes {
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
    "2XL" = "2xl",
    "3XL" = "3xl",
}

const imgMap: Record<ECoinsTreasureTypes, string> = {
    [ECoinsTreasureTypes.SM]: `/image/offers/treasures/treasure-${ECoinsTreasureTypes.SM}.png`,
    [ECoinsTreasureTypes.MD]: `/image/offers/treasures/treasure-${ECoinsTreasureTypes.MD}.png`,
    [ECoinsTreasureTypes.LG]: `/image/offers/treasures/treasure-${ECoinsTreasureTypes.LG}.png`,
    [ECoinsTreasureTypes.XL]: `/image/offers/treasures/treasure-${ECoinsTreasureTypes.XL}.png`,
    [ECoinsTreasureTypes["2XL"]]:
        `/image/offers/treasures/treasure-${ECoinsTreasureTypes["2XL"]}.png`,
    [ECoinsTreasureTypes["3XL"]]:
        `/image/offers/treasures/treasure-${ECoinsTreasureTypes["3XL"]}.png`,
};

const getTreasureTypeByAmount = (amount: number) => {
    if (amount < 300_000) return ECoinsTreasureTypes.SM;
    else if (amount < 800_000) return ECoinsTreasureTypes.MD;
    else if (amount < 3_000_000) return ECoinsTreasureTypes.LG;
    else if (amount < 5_000_000) return ECoinsTreasureTypes.XL;
    else if (amount < 10_000_000) return ECoinsTreasureTypes["2XL"];
    else return ECoinsTreasureTypes["3XL"];
};

export const UTCoinText: FNCN<{ size?: "md" | "lg" }> = ({
    className,
    size = "md",
}) => {
    const { amount } = useCardContext();

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            <UTCoinMonocolorIcon
                className={cn("text-secondary", {
                    "w-8 h-8": size === "md",
                    "w-11 h-11": size === "lg",
                })}
            />
            <span
                className={cn("font-bold", {
                    "text-4xl": size === "md",
                    "text-5xl": size === "lg",
                })}>
                {formatBySymbolNumber(amount, " ")}
            </span>
        </div>
    );
};

export const Root: FNCNChildren<{ amount: number }> = ({
    className,
    children,
    amount,
}) => {
    const treasureType = getTreasureTypeByAmount(amount);

    return (
        <CardProvider amount={amount} treasureType={treasureType}>
            <div className={cn("relative h-auto w-full", className)}>
                {children}
            </div>
        </CardProvider>
    );
};

export const Header: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "absolute w-full flex flex-grow flex-shrink top-3 px-[var(--size-card-px)] h-[var(--size-card-header)]",
                className
            )}>
            {children}
        </div>
    );
};

export const Body: FNCNChildren<{ asChild?: boolean }> = ({
    className,
    children,
    asChild = false,
}) => {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            className={cn(
                "group relative overflow-hidden block rounded-t-3.5xl bg-black-shape h-full",
                className
            )}>
            {children}
        </Comp>
    );
};

export const Footer: FNCNChildren<{ isSticky?: boolean }> = ({
    isSticky = false,
    className,
    children,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col w-full bg-black-dropdown h-max rounded-b-3.5xl px-[var(--size-card-px,theme(spacing[2.5]))] py-4 gap-3",
                {
                    "sticky bottom-0 left-0": isSticky,
                },
                className
            )}>
            {children}
        </div>
    );
};

export const TreasureImage: FNCN<{ scaleOnHover?: boolean }> = ({
    className,
    scaleOnHover = true,
}) => {
    const { treasureType } = useCardContext();

    return (
        <div className={cn("h-auto w-full aspect-[6/2] flex-1", className)}>
            <div className={cn("relative h-full w-full")}>
                <Image
                    src={imgMap[treasureType]}
                    alt=""
                    className={cn(
                        "object-contain transition-transform duration-400",
                        {
                            "!h-[140%] !-top-[35%]":
                                treasureType === ECoinsTreasureTypes["2XL"],
                            "!h-[120%] !-top-[15%]":
                                treasureType === ECoinsTreasureTypes["3XL"],
                            "group-hover:scale-125": scaleOnHover,
                        }
                    )}
                    fill
                />
            </div>
        </div>
    );
};

export const TreasureShowcase: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "center flex-col justify-between h-full gap-7 pb-8 pt-12",
                className
            )}>
            {children}
        </div>
    );
};

export const CoinAmountInfoPanel: FNCN<{
    ccyImageType?: ComponentPropsWithoutRef<typeof CCYUIDisplay>["imageType"];
    css?: { loyalty?: { cnBox?: string; safeLayoutShift?: boolean } };
}> = ({ className, ccyImageType = "image", css = {} }) => {
    const { amount } = useCardContext();
    const { id } = useCurrencyStore(state => ({ id: state.currency }));
    const stocks = useStocksStore(state => state.stocks ?? undefined);
    const use = useTransferSelectorStore.use;
    const platform = use.platform();
    const method = use.method();
    const cashbackPerc = useLoyaltyPointsCashbackPerc();

    const { price, points } = useMemo(() => {
        const price = calculatePrice(method, platform, id, amount, stocks);
        const formattedPrice = formatCommaNumber(roundAndFormatFloat(price));
        let points = null;

        if (cashbackPerc) {
            const loyalty = calculateLoyaltyPoint(
                price,
                method,
                platform,
                id,
                cashbackPerc,
                stocks
            );
            points = Math.floor(loyalty.points);
            points = points === 0 ? null : points;
        }

        return { price: formattedPrice, points };
    }, [method, platform, amount, id, cashbackPerc, stocks]);

    return (
        <CoinsAmountPanel.InfoGroup
            className={cn("justify-between flex-wrap gap-2", className)}>
            <CoinsAmountPanel.InfoBox cnWrapper="space-x-3">
                <CCYUIDisplay imageType={ccyImageType} label={price} />
                <CoinsAmountPanel.CurrencySelection className="bg-white-10" />
            </CoinsAmountPanel.InfoBox>
            <CoinsAmountPanel.InfoBox
                className={cn(
                    "self-stretch justify-stretch h-auto justify-center",
                    {
                        "absolute left-[var(--size-card-px,theme(spacing[2.5]] top-3 h-[var(--size-card-header)] z-10":
                            css.loyalty?.safeLayoutShift &&
                            points &&
                            price.length + `+${points}`.length >= 9,
                    },
                    css.loyalty?.cnBox
                )}>
                {points && (
                    <LoyaltyPointsBadge
                        size="md"
                        className={cn("w-max flex h-full items-center")}
                        amount={`+${points}`}
                    />
                )}
            </CoinsAmountPanel.InfoBox>
        </CoinsAmountPanel.InfoGroup>
    );
};

export const ActionBtn: FC<{ href: string; coins: string }> = ({
    href,
    coins,
}) => {
    const router = useI18nRouter();

    const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        event => {
            event.preventDefault();
            const coinShortView = coins.replace("_", ".");
            let utCoins = decodeFormattedShortView(coinShortView);

            if (utCoins > CalculationCredentials["MAX_UT_COINS"]) {
                utCoins = CalculationCredentials["MAX_UT_COINS"];
            }

            useTransferStore.getState().setUTCoin(String(utCoins));
            router.push(href);
        },
        [coins, href, router]
    );

    return (
        <CoinsAmountPanel.Button
            asChild
            onClick={onClick}
            className="group items-center space-x-2 sm:py-4">
            <Link href={href} scroll={true}>
                Buy Now
            </Link>
        </CoinsAmountPanel.Button>
    );
};
