/* eslint-disable max-lines */
"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
    Link,
    Button,
    EmblaCarouselLayout,
    EmblaBaseButton,
} from "@royalfut/ui";
import { useUpdate, useMount } from "@lilib/hooks";
import {
    PlayPlayerIcon,
    PausePlayerIcon,
    ArrowLeftCircleTransparentIcon,
} from "@royalfut/icons";
import { useEmblaScrollSnaps, useEmblaPrevNextButtons } from "@royalfut/hooks";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type {
    EmblaOptionsType,
    EmblaCarouselType,
    EmblaEventType,
} from "embla-carousel";
import type { ICarouselPromoCards } from "@royalfut/interfaces";

const OPTIONS: EmblaOptionsType = { loop: true };
const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max);

interface IPropType {
    slides: Array<ICarouselPromoCards>;
    options?: EmblaOptionsType;
}

interface ICardSlideProps {
    card: ICarouselPromoCards;
    isActive: boolean;
}

const CardSlide: FC<ICardSlideProps> = ({ card, isActive }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const playVideo = useCallback((play: boolean) => {
        if (play) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, []);

    useUpdate(() => {
        playVideo(isActive);
    }, [isActive]);

    useMount(() => {
        playVideo(isActive);
    });

    return (
        <EmblaCarouselLayout.Item
            className={cn(
                "transition-opacity duration-300 rounded-3xl embla__slide__number",
                {
                    "opacity-100": isActive,
                    "opacity-50": !isActive,
                }
            )}>
            <div className="absolute left-0 top-0 w-full h-full">
                <div
                    className={cn(
                        "relative h-full w-full gradient-illusion-border",
                        "after:absolute after:w-full after:h-full after:rounded-[var(--rounded)]"
                    )}
                />
            </div>
            <div className="relative flex flex-col justify-between pb-5 overflow-hidden m-[var(--border-size)] w-full rounded-[var(--rounded)] bg-[#353054]">
                <div className="flex flex-col w-full">
                    <div className="w-full h-52 overflow-hidden">
                        <video
                            ref={videoRef}
                            data-id={card.id}
                            className="w-full object-cover"
                            loop={true}
                            controls={false}
                            muted={true}
                            playsInline={true}
                            autoPlay={false}
                            width={"100%"}
                            height={"auto"}
                            preload="false">
                            <source src={card.url} type="video/mp4" />
                        </video>
                    </div>
                    <div className="flex flex-col gap-2 px-5">
                        <h4 className="text-white text-2xl font-bold leading-tight">
                            {card.title}
                        </h4>
                        <span className="text-sm text-white-70 font-semibold">
                            {card.description}
                        </span>
                    </div>
                </div>
                <div className="px-5">
                    <Button
                        asChild
                        vtype="secondary"
                        vsize="lg"
                        className="rounded-xl w-max bg-black-2">
                        <Link href={PROJECT_PUBLIC_WWW_ROUTES["ORDER"]}>
                            {card.action.title}
                        </Link>
                    </Button>
                </div>
            </div>
        </EmblaCarouselLayout.Item>
    );
};

const PromoCardCarousel: FC<IPropType> = ({ slides, options = OPTIONS }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 5000 }),
    ]);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<Array<HTMLElement>>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useEmblaScrollSnaps(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = useEmblaPrevNextButtons(emblaApi);

    const setTweenNodes = useCallback((_emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = _emblaApi.slideNodes().map(slideNode => {
            return slideNode.querySelector(
                ".embla__slide__number"
            ) as HTMLElement;
        });
    }, []);

    const setTweenFactor = useCallback((_emblaApi: EmblaCarouselType) => {
        tweenFactor.current =
            TWEEN_FACTOR_BASE * _emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback(
        (_emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = _emblaApi.internalEngine();
            const scrollProgress = _emblaApi.scrollProgress();
            const slidesInView = _emblaApi.slidesInView();
            const isScrollEvent = eventName === "scroll";
            _emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress;
                const slidesInSnap = engine.slideRegistry[snapIndex];

                slidesInSnap.forEach(slideIndex => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex))
                        return;
                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach(loopItem => {
                            const target = loopItem.target();

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target);

                                if (sign === -1) {
                                    diffToTarget =
                                        scrollSnap - (1 + scrollProgress);
                                }
                                if (sign === 1) {
                                    diffToTarget =
                                        scrollSnap + (1 - scrollProgress);
                                }
                            }
                        });
                    }

                    const tweenValue =
                        1 - Math.abs(diffToTarget * tweenFactor.current);
                    const scale = numberWithinRange(
                        tweenValue,
                        0,
                        1
                    ).toString();
                    const tweenNode = tweenNodes.current[slideIndex];
                    tweenNode.style.transform = `scale(${scale})`;
                });
            });
        },
        []
    );

    const onButtonAutoplayClick = useCallback(
        (callback: () => void) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;

            const resetOrStop =
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    const toggleAutoplay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
        playOrStop();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setIsPlaying(autoplay.isPlaying());
        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenScale)
            .on("scroll", tweenScale)
            .on("slideFocus", tweenScale)
            .on("autoplay:play", () => setIsPlaying(true))
            .on("autoplay:stop", () => setIsPlaying(false))
            .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
    }, [emblaApi, setTweenFactor, setTweenNodes, tweenScale]);

    return (
        <EmblaCarouselLayout.Root>
            <EmblaCarouselLayout.Body ref={emblaRef}>
                {slides.map((card, idx) => (
                    <CardSlide
                        isActive={idx === selectedIndex}
                        card={card}
                        key={card.id}
                    />
                ))}
            </EmblaCarouselLayout.Body>

            <div className="flex gap-5 mt-7 relative justify-center">
                <div className="flex gap-5 items-center">
                    <EmblaBaseButton
                        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}>
                        <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11" />
                    </EmblaBaseButton>
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
                    <EmblaBaseButton
                        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}>
                        <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11 rotate-180" />
                    </EmblaBaseButton>
                </div>
                <EmblaBaseButton
                    className="absolute right-0 top-1/2 opacity-30 hover:opacity-100 transition-opacity duration-200 -translate-y-1/2"
                    onClick={toggleAutoplay}
                    type="button">
                    <PlayPlayerIcon
                        className={cn({
                            "block w-5 h-5 text-white": !isPlaying,
                            hidden: isPlaying,
                        })}
                    />
                    <PausePlayerIcon
                        className={cn({
                            "block w-5 h-5 text-white": isPlaying,
                            hidden: !isPlaying,
                        })}
                    />
                </EmblaBaseButton>
            </div>
        </EmblaCarouselLayout.Root>
    );
};

export default PromoCardCarousel;
