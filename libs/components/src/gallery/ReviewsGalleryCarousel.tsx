"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselLayout, ReviewCard } from "@royalfut/ui";

import type { FC } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import type { ITrustpilotReviewEntity } from "@royalfut/interfaces";

interface IReviewsGalleryCarousel {
    slides: Array<ITrustpilotReviewEntity>;
    options?: EmblaOptionsType;
}

const ReviewsGalleryCarousel: FC<IReviewsGalleryCarousel> = ({
    slides,
    options = { loop: true },
}) => {
    const [emblaRef] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: true, speed: 1 }),
    ]);

    return (
        <EmblaCarouselLayout.Root className="[--embla-slide-height:20rem] sm:[--embla-slide-height:23rem]">
            <EmblaCarouselLayout.Body ref={emblaRef}>
                {slides.map(review => (
                    <EmblaCarouselLayout.Item key={review.id}>
                        <ReviewCard className="w-full" review={review} />
                    </EmblaCarouselLayout.Item>
                ))}
            </EmblaCarouselLayout.Body>
        </EmblaCarouselLayout.Root>
    );
};

export default ReviewsGalleryCarousel;
