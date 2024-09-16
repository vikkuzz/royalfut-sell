import { useCallback, useEffect, useState } from "react";
import { Button, type IButton } from "@royalfut/ui";
import { ArrowLeftCircleTransparentIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { EmblaCarouselType } from "embla-carousel";

interface IUsePrevNextButtonsType {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
}

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): IUsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onSelect = useCallback((_emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!_emblaApi.canScrollPrev());
        setNextBtnDisabled(!_emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onSelect]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};

export const BaseButton: FC<IButton["Base"] & IButton["Native"]> = ({
    className,
    style = {},
    children,
    ...rest
}) => {
    return (
        <Button
            className={cn(
                "group inline-flex justify-center items-center p-0 appearance-none rounded-full touch-manipulation cursor-pointer border-none",
                className
            )}
            type="button"
            style={{
                WebkitTapHighlightColor: "hsla(var(--color-white-10), 0.5)",
                ...style,
            }}
            as="button"
            {...rest}>
            {children}
        </Button>
    );
};

export const PrevButton: FC<IButton["Base"] & IButton["Native"]> = props => {
    return (
        <BaseButton {...props}>
            <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11" />
        </BaseButton>
    );
};

export const NextButton: FC<IButton["Base"] & IButton["Native"]> = props => {
    return (
        <BaseButton {...props}>
            <ArrowLeftCircleTransparentIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11 rotate-180" />
        </BaseButton>
    );
};
