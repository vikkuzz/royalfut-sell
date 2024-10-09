/* eslint-disable max-lines */
"use client";

import {
    useState,
    useCallback,
    useEffect,
    createContext,
    useContext,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PackageCardCoinCard, PlatformChoice } from "@royalfut/components";
import {
    Link,
    EmblaBaseButton,
    EmblaCarouselLayout,
    InteractionCard,
} from "@royalfut/ui";
import { useEmblaScrollSnaps, useEmblaPrevNextButtons } from "@royalfut/hooks";
import { ArrowLeftCircleTransparentIcon } from "@royalfut/icons";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import { cn, formatNumberShortView } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import type { FNCN } from "@royalfut/interfaces";
import type { UseEmblaCarouselType } from "embla-carousel-react";

export const CardCarouselUI: FC<{
    card: { amount: number; timeBought?: number };
}> = ({ card }) => {
    const coinShortLabelView = formatNumberShortView(card.amount).replace(
        ".",
        "_"
    );

    return (
        <EmblaCarouselLayout.Item
            asChild
            className="flex flex-col [--size-card-px:theme(spacing[2.5])] [--size-card-header:theme(spacing[7.5])]">
            <PackageCardCoinCard.Root key={card.amount} amount={card.amount}>
                <PackageCardCoinCard.Header
                    className={cn("absolute z-10", {
                        "justify-between": card.timeBought,
                        "justify-end": !card.timeBought,
                    })}>
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
                            images={["t/coin-card-3.png", "t/coin-card-4.png"]}
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
                        css={{ loyalty: { safeLayoutShift: true } }}
                    />
                    <PackageCardCoinCard.ActionBtn
                        coins={coinShortLabelView}
                        href={`${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortLabelView}/checkout`}
                    />
                </PackageCardCoinCard.Footer>
            </PackageCardCoinCard.Root>
        </EmblaCarouselLayout.Item>
    );
};

const EmblaApiContext = createContext<UseEmblaCarouselType | null>(null);

export const EmblaApiProvider: FC<PropsWithChildren> = ({ children }) => {
    const embla = useEmblaCarousel({ dragFree: true });

    return (
        <EmblaApiContext.Provider value={embla}>
            {children}
        </EmblaApiContext.Provider>
    );
};

export const useEmblaApiContext = () => {
    const context = useContext(EmblaApiContext);
    if (!context) {
        throw new Error(
            "useEmblaApiContext must be used within a EmblaApiProvider"
        );
    }
    return context;
};

export const CardCarouselNavigationControls: FNCN<{ showDots?: boolean }> = ({
    className,
    showDots = true,
}) => {
    const [, emblaApi] = useEmblaApiContext();
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useEmblaScrollSnaps(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = useEmblaPrevNextButtons(emblaApi);

    return (
        <div
            className={cn(
                "flex gap-5 relative justify-center items-center",
                className
            )}>
            <EmblaBaseButton
                onClick={() => onPrevButtonClick()}
                disabled={prevBtnDisabled}>
                <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11" />
            </EmblaBaseButton>
            {showDots && (
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <EmblaBaseButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={cn(
                                "p-1 bg-black-2 transition-all duration-200",
                                {
                                    "scale-150 bg-white":
                                        index === selectedIndex,
                                }
                            )}
                        />
                    ))}
                </div>
            )}
            <EmblaBaseButton
                onClick={() => onNextButtonClick()}
                disabled={nextBtnDisabled}>
                <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11 rotate-180" />
            </EmblaBaseButton>
        </div>
    );
};

export const CardCarouselBase: FC<{
    cards: Array<{ amount: number; timeBought?: number }>;
}> = ({ cards }) => {
    const [emblaRef] = useEmblaApiContext();

    return (
        <>
            <EmblaCarouselLayout.Body ref={emblaRef}>
                {cards.map(card => (
                    <CardCarouselUI key={card.amount} card={card} />
                ))}
            </EmblaCarouselLayout.Body>
            <CardCarouselNavigationControls
                className="mt-7 sm:hidden"
                showDots
            />
        </>
    );
};

const CardCarousel: FC<{
    cards: Array<{ amount: number; timeBought?: number }>;
}> = ({ cards }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
    const [scrollProgress, setScrollProgress] = useState(0);

    const onScroll = useCallback((_emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, _emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onScroll(emblaApi);
        emblaApi
            .on("reInit", onScroll)
            .on("scroll", onScroll)
            .on("slideFocus", onScroll);
    }, [emblaApi, onScroll]);

    return (
        <>
            <EmblaCarouselLayout.Body ref={emblaRef} className="pr-4">
                {cards.map(card => (
                    <CardCarouselUI key={card.amount} card={card} />
                ))}
            </EmblaCarouselLayout.Body>
            <EmblaCarouselLayout.ProgressBar
                progress={scrollProgress}
                className="w-[calc(100%-theme(spacing.4))] h-2 rounded-full mt-6 [--bar-thumb-bg:theme(colors.white.DEFAULT)] bg-white-20"
            />
        </>
    );
};

export default CardCarousel;
