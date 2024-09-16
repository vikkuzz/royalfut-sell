"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
// import { useRouter } from 'next/router';
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Trans } from '@lingui/macro';
import { ReviewCard } from "../ReviewsContent/ReviewsContent";
import Loader from "../Loader/Loader";
import { findObjectWithMaxHeight } from "../../utils/functions";
import RatedGallery from "./RatedGallery";

import styles from "./ReviewsGallery.module.scss";
import { useTranslations } from "next-intl";

const ReviewsGallery = ({ reviews, locale }) => {
    const t = useTranslations("order");
    const swiperContainer = useRef(null);
    // const router = useRouter();
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const [activeSlide, setActiveSlide] = useState(null);

    function resizeSwiper(prevSlide, activeSlide, nextSlide) {
        let prev = {
            height:
                prevSlide.getBoundingClientRect().bottom -
                prevSlide.getBoundingClientRect().top,
            id: prevSlide.dataset.id,
        };
        let current = {
            height:
                activeSlide.getBoundingClientRect().bottom -
                activeSlide.getBoundingClientRect().top,
            id: activeSlide.dataset.id,
        };
        let next = {
            height:
                nextSlide.getBoundingClientRect().bottom -
                nextSlide.getBoundingClientRect().top,
            id: nextSlide.dataset.id,
        };

        return findObjectWithMaxHeight([prev, current, next]);
    }

    useEffect(() => {
        if (activeSlide) {
            const prevSlide = document.querySelector(
                '.swiper-slide-prev[data-swiper="review"]'
            );
            const currentSlide = document.querySelector(
                '.swiper-slide-active[data-swiper="review"]'
            );
            const nextSlide = document.querySelector(
                '.swiper-slide-next[data-swiper="review"]'
            );

            const height = resizeSwiper(
                prevSlide,
                currentSlide,
                nextSlide
            ).height;
            if (swiperContainer) {
                swiperContainer.current.style.height = `${height}px`;
            }
        }
    }, [activeSlide]);
    return (
        <div className="column">
            <div className={`${styles.titles_wrapper}`}>
                <h2 className={`${styles.reviews_h2}`}>
                    {/* <Trans>mainblocks24</Trans> */}
                    {t("mainblocks24")}
                </h2>
                <div className={`${styles.rating_wrapper} column`}>
                    <h3 className={`${styles.h3_wrapper}`}>
                        Trustpilot
                        <RatedGallery count={3.5} />
                    </h3>
                    <div className={`${styles.wrapper_data_reviews}`}>
                        <span className={`${styles.span_widget}`}>
                            {/* <Trans>locales.commentRated</Trans>{' '} */}
                            {t("commentRated")}
                            {stateStock.rate} / 5
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            {/* <Trans>a0_1</Trans>{' '} */}
                            {t("a0_1")}
                            <Link
                                href={"/reviews"}
                                className={`${styles.link}`}>
                                {stateStock.reviews}{" "}
                                {/* <Trans>locales.reviews</Trans> */}
                                {t("reviews")}
                            </Link>
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            {/* <Trans>mainblocks27</Trans> */}
                            {t("mainblocks27")}
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            <span className={`${styles.icon_wrapper}`}>
                                <Image
                                    alt="icon"
                                    src={"/img/beenhere.svg"}
                                    width={16}
                                    height={16}
                                />
                            </span>
                            {/* <Trans>mainblocks28</Trans> */}
                            {t("mainblocks28")}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                {reviews ? (
                    <Swiper
                        ref={swiperContainer}
                        modules={[Autoplay]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        autoplay={{
                            delay: 5000,
                        }}
                        loop={true}
                        onSlideChange={swiper => {
                            if (locale == "ar") {
                                swiper.changeLanguageDirection("rtl");
                            }
                            setActiveSlide([
                                reviews[swiper.activeIndex - 1]?.id,
                                reviews[swiper.activeIndex]?.id,
                                reviews[swiper.activeIndex + 1]?.id,
                            ]);
                        }}
                        initialSlide={0}
                        centeredSlides={true}
                        className={`${styles["swiper2"]}`}>
                        {reviews?.map(el => {
                            return (
                                <SwiperSlide
                                    key={el.id}
                                    data-id={el.id}
                                    data-swiper={"review"}
                                    className={`${styles["swiper-slide"]}`}>
                                    <ReviewCard
                                        el={el}
                                        sizeHeight={"height_100"}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default ReviewsGallery;
