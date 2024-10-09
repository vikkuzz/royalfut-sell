/* eslint-disable max-lines */

import { getTranslations } from "next-intl/server";
import {
    ContentWithAsideLayout,
    EmblaCarouselLayout,
    InteractionCard,
    LayoutViewportSectionFrame,
    Prose,
    SectionTitle,
} from "@royalfut/ui";
import {
    ClientTestimonials,
    PackageCardCoinCard,
    PlatformChoice,
    ReviewsGalleryCarousel,
    TrustScoreBanner,
} from "@royalfut/components";
import { FAQSnippet } from "../../../../src";
import { decodeFormattedShortView } from "@royalfut/utils";
import { StarIcon, PanelLockSecuredIcon } from "@royalfut/icons";
import { getTrustpilotReviews } from "@royalfut/actions";
import {
    AppCredentials,
    PlatformAppSets,
    PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import {
    CardCarouselBase,
    CardCarouselNavigationControls,
    EmblaApiProvider,
} from "../CardCarousel";
import { cardDatas } from "../data";
import { GuaranteesDeliveryCard, ProseCoinDetails } from "./ui.client";
import { NoticePanel, PurchaseGuaranteesCard } from "./ui";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

const Aside: FC<{
    coin: number;
    coinShortView: string;
    timeBought: number | null;
}> = ({ coin, coinShortView, timeBought }) => {
    return (
        <ContentWithAsideLayout.Aside className="block sm:hidden mt-6">
            <PackageCardCoinCard.Root
                amount={coin}
                className="[--size-card-px:theme(spacing.4)] [--size-card-header:theme(spacing.9)] sm:basis-[calc(50%-theme(spacing.4))] lg:basis-[calc(25%-theme(spacing.4))] flex-grow h-max">
                <PackageCardCoinCard.Header className="absolute z-10 pointer-events-none justify-start top-4">
                    {timeBought && (
                        <PackageCardCoinCard.BoughtTimeBadge
                            className="h-full"
                            size="md"
                            amount={timeBought}
                        />
                    )}
                    {/* <PlatformChoice.Badge className="bg-primary rounded-3.5xl h-full px-3 border border-[hsla(0,0%,100%,.2)]" /> */}
                </PackageCardCoinCard.Header>
                <PackageCardCoinCard.Body className="pt-[calc(var(--size-card-header)+theme(spacing.3))]">
                    <InteractionCard.BgCoins
                        images={["t/coin-card-3.png", "t/coin-card-4.png"]}
                        className="h-[calc(100%-var(--size-card-header))]"
                    />
                    <PackageCardCoinCard.TreasureShowcase className="relative gap-10 pb-10">
                        <div
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(247,188,74,.4) 20%, rgba(247,188,74,0) 100%)",
                            }}
                            className="absolute h-[70%] top-1/2 left-1/2 -translate-x-1/2 w-[70%] -translate-y-1/2 blur-[56px] pointer-events-none"
                        />
                        <PackageCardCoinCard.TreasureImage
                            scaleOnHover={false}
                        />
                        <PackageCardCoinCard.UTCoinText size="lg" />
                    </PackageCardCoinCard.TreasureShowcase>
                    <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-dropdown)] md:w-max px-[var(--size-card-px)] pb-8 [--basis-s:0]">
                        <PlatformChoice.Buttons
                            indicatorType="border"
                            sets={PlatformAppSets}
                            className="flex-row-reverse items-center gap-2 px-4.5 py-4.5"
                        />
                    </PlatformChoice.Root>
                </PackageCardCoinCard.Body>
                <PackageCardCoinCard.Footer>
                    <PackageCardCoinCard.CoinAmountInfoPanel />
                    <PackageCardCoinCard.ActionBtn
                        coins={coinShortView}
                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortView}/checkout`}
                    />
                </PackageCardCoinCard.Footer>
            </PackageCardCoinCard.Root>
        </ContentWithAsideLayout.Aside>
    );
};

const Content: FC<{ coinLabel: string; coin: number }> = async ({
    coinLabel,
    coin,
}) => {
    const [t1, t2] = await Promise.all([
        getTranslations("chris_coinBundles"),
        getTranslations("bailey_coinsAmount"),
    ]);

    return (
        <ContentWithAsideLayout.Content className="prose mt-12">
            <Prose.Paragraph>
                {t1("coinsAmount.p1", {
                    fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                })}
            </Prose.Paragraph>
            <ProseCoinDetails coinLabel={coinLabel} coin={coin} />
            <NoticePanel>{t1("noticePanel")}</NoticePanel>
            <Prose className="text-2.5xl font-bold" id="what-you-get">
                {t1("coinsAmount.h2.1")}
            </Prose>
            <Prose.List>
                <Prose.ListItem>
                    {t1("coinsAmount.list.3.item.1", {
                        amount: "70000",
                    })}
                </Prose.ListItem>
                <Prose.ListItem>{t2("list.3.item.2")}</Prose.ListItem>
                <Prose.ListItem>{t2("list.3.item.3")}</Prose.ListItem>
            </Prose.List>
            <Prose className="text-2.5xl font-bold" id="what-need">
                {t2("h2.2")}
            </Prose>
            <Prose.List>
                <Prose.ListItem>
                    <Prose.Strong>{t2("list.2.item.1.strong")}</Prose.Strong>{" "}
                    {t2("list.2.item.1.text", {
                        fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                    })}
                </Prose.ListItem>
                <Prose.ListItem>
                    <Prose.Strong>{t2("list.2.item.2.strong")}</Prose.Strong>{" "}
                    {t2("list.2.item.2.text")}
                </Prose.ListItem>
                <Prose.ListItem>
                    <Prose.Strong>{t2("list.2.item.3.strong")}</Prose.Strong>{" "}
                    {t2("list.2.item.3.text")}
                </Prose.ListItem>
            </Prose.List>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <PurchaseGuaranteesCard
                    className="text-system-success"
                    title={t2("guaranteesCard.1")}>
                    <PanelLockSecuredIcon className="w-12 h-12 sm:w-6 sm:h-6" />
                </PurchaseGuaranteesCard>
                <GuaranteesDeliveryCard coin={coin} />
                <PurchaseGuaranteesCard
                    className="text-white-65"
                    title={t2("guaranteesCard.3")}>
                    <StarIcon className="w-12 h-12 sm:w-6 sm:h-6" />
                </PurchaseGuaranteesCard>
            </div>
        </ContentWithAsideLayout.Content>
    );
};

const Page: FC<{ params: { coin: string } }> = async ({ params }) => {
    const coinShortView = params.coin.replace("_", ".");
    const coin = decodeFormattedShortView(coinShortView);
    const timeBought = null;
    // const formattedPrice = formatBySymbolNumber(price, " ");
    const [t1, t2, reviews] = await Promise.all([
        getTranslations("chris_coinBundles"),
        getTranslations("bailey_coinsAmount"),
        getTrustpilotReviews(),
    ]);

    return (
        <>
            <ContentWithAsideLayout.Root
                size="none"
                className="flex-row gap-20">
                <ContentWithAsideLayout.Body className="sm:flex-col mt-0 gap-0 sm:max-w-[50%] basis-3/5 flex-grow">
                    <ContentWithAsideLayout.Header
                        title={`${coinShortView} ${t1("coinsAmount.h1", { fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}` })}`}
                    />
                    <TrustScoreBanner className="justify-start pt-4" />
                    <Aside
                        coin={coin}
                        timeBought={timeBought}
                        coinShortView={params.coin}
                    />
                    <Content coinLabel={params.coin} coin={coin} />
                </ContentWithAsideLayout.Body>

                <ContentWithAsideLayout.Aside className="hidden sm:block mt-6 shrink-0 basis-[50%]">
                    <PackageCardCoinCard.Root
                        amount={coin}
                        className="[--size-card-px:theme(spacing.4)] [--size-card-header:theme(spacing.10)] hidden sm:block sm:basis-[calc(50%-theme(spacing.4))] lg:basis-[calc(25%-theme(spacing.4))] flex-grow h-max">
                        <PackageCardCoinCard.Header
                            className={cn(
                                "absolute z-10 pointer-events-none justify-between top-4.5",
                                {
                                    "justify-between": timeBought,
                                    "justify-end": !timeBought,
                                }
                            )}>
                            {timeBought && (
                                <PackageCardCoinCard.BoughtTimeBadge
                                    size="md"
                                    className="h-full"
                                    amount={timeBought}
                                />
                            )}
                            <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-dropdown)] md:w-max gap-2 [--basis-s:0]">
                                <PlatformChoice.Buttons
                                    size="sm"
                                    indicatorType="border"
                                    sets={PlatformAppSets}
                                    className="flex-row-reverse items-center px-2.5 py-3"
                                />
                            </PlatformChoice.Root>
                        </PackageCardCoinCard.Header>
                        <PackageCardCoinCard.Body className="pt-[calc(var(--size-card-header)+theme(spacing.3))] pb-4.5 rounded-3.5xl">
                            <InteractionCard.BgCoins
                                images={[
                                    "t/coin-card-5.png",
                                    "t/coin-card-6.png",
                                ]}
                                className="top-[calc(var(--size-card-header)+theme(spacing.4))] h-[calc(100%-var(--size-card-header)-30%)]"
                            />
                            <PackageCardCoinCard.TreasureShowcase className="w-[80%] mx-auto pb-0">
                                <div
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(247,188,74,.4) 20%, rgba(247,188,74,0) 100%)",
                                    }}
                                    className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-1/2 sm:left-[55%] -translate-x-1/2 sm:w-[70%] -translate-y-1/2 blur-[56px] pointer-events-none"
                                />
                                <PackageCardCoinCard.TreasureImage
                                    scaleOnHover={false}
                                />
                            </PackageCardCoinCard.TreasureShowcase>
                            <div className="flex flex-col gap-3 px-[var(--size-card-px)]">
                                <div className="flex justify-end items-end">
                                    <PackageCardCoinCard.CoinAmountInfoPanel
                                        ccyImageType="symbol"
                                        className="flex-col-reverse justify-start relative"
                                        css={{
                                            loyalty: {
                                                cnBox: "self-end absolute right-0 -top-[calc(100%+theme(spacing.1))]",
                                            },
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <PackageCardCoinCard.UTCoinText />
                                    <PackageCardCoinCard.ActionBtn
                                        coins={params.coin}
                                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${params.coin}/checkout`}
                                    />
                                </div>
                            </div>
                        </PackageCardCoinCard.Body>
                    </PackageCardCoinCard.Root>
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Root>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <ClientTestimonials.Root>
                    <ClientTestimonials.Header
                        title={{
                            label: t2("h2.3"),
                            cn: "",
                        }}>
                        <ClientTestimonials.Summary />
                    </ClientTestimonials.Header>
                    <ReviewsGalleryCarousel slides={reviews} />
                </ClientTestimonials.Root>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <FAQSnippet.Title>{t2("h2.4")}</FAQSnippet.Title>
                <FAQSnippet.QA />
                <FAQSnippet.CTA />
            </LayoutViewportSectionFrame>
            <EmblaApiProvider>
                <LayoutViewportSectionFrame className="flex flex-col mt-24">
                    <div className="flex justify-between items-center">
                        <SectionTitle>{t2("h2.5")}</SectionTitle>
                        <CardCarouselNavigationControls
                            className="hidden sm:flex"
                            showDots={false}
                        />
                    </div>
                    <div className="flex flex-col mt-2 gap-4">
                        <p className="text-base font-bold">{t1("platform")}</p>
                        <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-shape)] md:w-max [--basis-s:0]">
                            <PlatformChoice.Buttons
                                sets={PlatformAppSets}
                                className="flex-row-reverse items-center gap-2 px-4.5 py-4.5"
                            />
                        </PlatformChoice.Root>
                    </div>
                    <EmblaCarouselLayout.Root className="[--embla-slide-height:27rem] lg:[--embla-slide-size:26%] mt-12">
                        <CardCarouselBase
                            cards={cardDatas.filter(
                                card => card.amount !== coin
                            )}
                        />
                    </EmblaCarouselLayout.Root>
                </LayoutViewportSectionFrame>
            </EmblaApiProvider>
        </>
    );
};

export default Page;
