/* eslint-disable max-lines */
import { getTranslations } from "next-intl/server";
import {
    CoinsAmountPanel,
    CryptoSellAmountInput,
    PlatformChoice,
    TrustScoreBanner,
    CalculationCoinsPanel,
    InteractiveOptionCard,
    PackageCardCoinCard,
} from "@royalfut/components";
import {
    Link,
    LayoutViewportSectionFrame,
    PageTitle,
    EmblaCarouselLayout,
    InteractionCard,
} from "@royalfut/ui";
import {
    DefaultAppSettings,
    EXTERNAL_LINKS,
    PlatformAppSets,
} from "@royalfut/collections";
import { EUIOptionCardIDs } from "@royalfut/enums";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import CardCarousel from "./CardCarousel";
import { CoinsAmountPanelAction } from "../../../src";
import { cn, formatNumberShortView } from "@royalfut/utils";
import { cardDatas } from "./data";

const Page = async () => {
    const t = await getTranslations("chris_coinBundles");

    return (
        <div className="flex flex-col">
            <LayoutViewportSectionFrame className="flex flex-col items-start sm:items-center gap-6">
                <PageTitle>{t("h1")}</PageTitle>
                <TrustScoreBanner
                    className="w-full md:w-auto"
                    cnLink="text-xl md:text-base h-auto py-4 md:py-3"
                    rate={DefaultAppSettings.trustScore.rate}
                    reviews={DefaultAppSettings.trustScore.reviews}
                />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-12 sm:mt-24 gap-4">
                <p className="text-base font-bold">{t("platform")}</p>
                <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-shape)] md:w-max">
                    <PlatformChoice.Buttons
                        sets={PlatformAppSets}
                        className="flex-row-reverse items-center gap-2 px-4.5 py-4.5"
                    />
                </PlatformChoice.Root>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="block sm:hidden pr-0 mt-12">
                <EmblaCarouselLayout.Root>
                    <CardCarousel cards={cardDatas} />
                </EmblaCarouselLayout.Root>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="mt-12 hidden sm:block">
                <div className="flex gap-4 flex-wrap">
                    {cardDatas.slice(0, 4).map(card => {
                        const coinShortLabelView = formatNumberShortView(
                            card.amount
                        ).replace(".", "_");
                        return (
                            <PackageCardCoinCard.Root
                                key={card.amount}
                                amount={card.amount}
                                className="[--size-card-px:theme(spacing[2.5])] [--size-card-header:theme(spacing[7.5])] hidden sm:block sm:basis-[calc(50%-theme(spacing.4))] lg:basis-[calc(25%-theme(spacing.4))] flex-grow h-max">
                                <PackageCardCoinCard.Header
                                    className={cn(
                                        "absolute z-10 pointer-events-none",
                                        {
                                            "justify-between": card.timeBought,
                                            "justify-end": !card.timeBought,
                                        }
                                    )}>
                                    {card.timeBought && (
                                        <PackageCardCoinCard.BoughtTimeBadge
                                            className="h-full"
                                            amount={card.timeBought}
                                        />
                                    )}
                                    <PlatformChoice.Badge className="bg-primary rounded-3.5xl h-full px-3 border border-[hsla(0,0%,100%,.2)]" />
                                </PackageCardCoinCard.Header>
                                <PackageCardCoinCard.Body
                                    className="pt-[calc(var(--size-card-header)+theme(spacing.3))]"
                                    asChild>
                                    <Link
                                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortLabelView}`}>
                                        <InteractionCard.BgCoins
                                            images={[
                                                "t/coin-card-3.png",
                                                "t/coin-card-4.png",
                                            ]}
                                            className="top-[var(--size-card-header)] h-[calc(100%-var(--size-card-header))]"
                                        />
                                        <PackageCardCoinCard.TreasureShowcase className="">
                                            <PackageCardCoinCard.TreasureImage />
                                            <PackageCardCoinCard.UTCoinText />
                                        </PackageCardCoinCard.TreasureShowcase>
                                    </Link>
                                </PackageCardCoinCard.Body>
                                <PackageCardCoinCard.Footer>
                                    <PackageCardCoinCard.CoinAmountInfoPanel
                                        css={{
                                            loyalty: { safeLayoutShift: true },
                                        }}
                                    />
                                    <PackageCardCoinCard.ActionBtn
                                        coins={coinShortLabelView}
                                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortLabelView}/checkout`}
                                    />
                                </PackageCardCoinCard.Footer>
                            </PackageCardCoinCard.Root>
                        );
                    })}
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col md:flex-row mt-12 gap-4 px-0 sm:px-4">
                <CalculationCoinsPanel.Root className="w-full md:w-3/5 [--rounded:0rem] sm:[--rounded:1.75rem]">
                    <CalculationCoinsPanel.IllusionBorder className="hidden sm:block" />
                    <CalculationCoinsPanel.Body className="pb-0 sm:pb-6">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full gap-6">
                                <div className="w-full flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
                                    <p className="font-bold text-3xl sm:text-xl">
                                        {t("calc.title")}
                                    </p>
                                    <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-shape)] w-full sm:w-auto gap-4 sm:gap-2 [--basis-s:0]">
                                        <PlatformChoice.Buttons
                                            indicatorType="border"
                                            sets={PlatformAppSets}
                                            className="flex-row-reverse items-center gap-2 py-4 px-2.5 sm:py-2.5"
                                        />
                                    </PlatformChoice.Root>
                                </div>
                                <CryptoSellAmountInput />
                            </div>
                            <CoinsAmountPanel.Root className="mt-6 sm:mt-12 sm:relative sm:space-x-0 bg-transparent p-0 py-5 sm:py-0 bg-transparent backdrop-blur-sm sm:backdrop-blur-none">
                                <CoinsAmountPanel.Info className="sm:bg-transparent sm:px-0 sm:py-0 sm:gap-9">
                                    <CoinsAmountPanel.InfoGroup>
                                        <CoinsAmountPanel.CCY />
                                    </CoinsAmountPanel.InfoGroup>
                                    <CoinsAmountPanel.Loyalty />
                                </CoinsAmountPanel.Info>
                                <CoinsAmountPanelAction
                                    href={
                                        PROJECT_PUBLIC_WWW_ROUTES[
                                            "COINS_PURCHASE"
                                        ]
                                    }
                                />
                            </CoinsAmountPanel.Root>
                        </div>
                    </CalculationCoinsPanel.Body>
                </CalculationCoinsPanel.Root>
                <div className="flex w-full md:w-2/5 px-4 sm:px-0">
                    <InteractiveOptionCard
                        className="basis-full sm:basis-full"
                        card={{
                            type: "sponsor",
                            id: EUIOptionCardIDs.SBC_SOLVER,
                            desc: t("optionCard.desc"),
                            title: t("optionCard.title"),
                            url: `${EXTERNAL_LINKS.SBC_SOLVER}?referrer=k4q3g74nytsdhb9epoc1mk4x`,
                        }}
                    />
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="hidden sm:block sm:mt-12">
                <div className="flex gap-4 flex-wrap">
                    {cardDatas.slice(4).map(card => {
                        const coinShortLabelView = formatNumberShortView(
                            card.amount
                        ).replace(".", "_");

                        return (
                            <PackageCardCoinCard.Root
                                key={card.amount}
                                amount={card.amount}
                                className="[--size-card-px:theme(spacing[2.5])] [--size-card-header:theme(spacing[7.5])] hidden sm:block sm:basis-[calc(50%-theme(spacing.4))] lg:basis-[calc(25%-theme(spacing.4))] flex-grow h-max">
                                <PackageCardCoinCard.Header
                                    className={cn(
                                        "absolute z-10 pointer-events-none",
                                        {
                                            "justify-between": card.timeBought,
                                            "justify-end": !card.timeBought,
                                        }
                                    )}>
                                    {card.timeBought && (
                                        <PackageCardCoinCard.BoughtTimeBadge
                                            className="h-full"
                                            amount={card.timeBought}
                                        />
                                    )}
                                    <PlatformChoice.Badge className="bg-primary rounded-3.5xl h-full px-3 border border-[hsla(0,0%,100%,.2)]" />
                                </PackageCardCoinCard.Header>
                                <PackageCardCoinCard.Body
                                    className="pt-[calc(var(--size-card-header)+theme(spacing.3))]"
                                    asChild>
                                    <Link
                                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortLabelView}`}>
                                        <InteractionCard.BgCoins
                                            images={[
                                                "t/coin-card-3.png",
                                                "t/coin-card-4.png",
                                            ]}
                                            className="top-[var(--size-card-header)] h-[calc(100%-var(--size-card-header))]"
                                        />
                                        <PackageCardCoinCard.TreasureShowcase className="">
                                            <PackageCardCoinCard.TreasureImage />
                                            <PackageCardCoinCard.UTCoinText />
                                        </PackageCardCoinCard.TreasureShowcase>
                                    </Link>
                                </PackageCardCoinCard.Body>
                                <PackageCardCoinCard.Footer>
                                    <PackageCardCoinCard.CoinAmountInfoPanel
                                        css={{
                                            loyalty: { safeLayoutShift: true },
                                        }}
                                    />
                                    <PackageCardCoinCard.ActionBtn
                                        coins={coinShortLabelView}
                                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortLabelView}/checkout`}
                                    />
                                </PackageCardCoinCard.Footer>
                            </PackageCardCoinCard.Root>
                        );
                    })}
                </div>
            </LayoutViewportSectionFrame>
        </div>
    );
};

export default Page;
