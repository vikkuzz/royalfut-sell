import { useCallback, useEffect, useState } from "react";

import type { EmblaCarouselType } from "embla-carousel";

interface IUseDotButtonType {
    selectedIndex: number;
    scrollSnaps: Array<number>;
    onDotButtonClick: (index: number) => void;
}

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined
): IUseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<Array<number>>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onInit = useCallback((_emblaApi: EmblaCarouselType) => {
        setScrollSnaps(_emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((_emblaApi: EmblaCarouselType) => {
        setSelectedIndex(_emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi
            .on("reInit", onInit)
            .on("reInit", onSelect)
            .on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};
