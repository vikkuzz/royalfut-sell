"use client";
import Link from "next/link";
import Image from "next/legacy/image";
// import RatedGallery from "./RatedGallery";

import styles from "./ReviewsGallery.module.scss";
import Rating from "./RatedGallery";
import Reviews from "./Reviews";

const ReviewsGallery = () => {
    return (
        <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col md:flex-row justify-between md:items-end">
                <h2 className="w-96 text-6xl font-bold text-white mb-6 md:mb-0">
                    What our clients say
                </h2>
                <div className="flex flex-col gap-4 md:gap-2">
                    <h3 className="flex text-3xl font-bold gap-3 md:justify-end md:text-2xl">
                        Trustpilot
                        <Rating rating={4.6} />
                    </h3>
                    <div className="flex flex-wrap gap-y-2">
                        <span className={`${styles.span_widget}`}>
                            Rated 4.6/ 5
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            Based on
                            <Link
                                href={"/reviews"}
                                className={`${styles.link}`}>
                                546 reviews
                            </Link>
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            Excellent
                        </span>
                        <span className={`${styles.divider}`}></span>
                        <span
                            className={`${styles.span_widget} ${styles.color_gray}`}>
                            <span className={`${styles.icon_wrapper}`}>
                                <Image
                                    alt="icon"
                                    src={"/image/beenhere.svg"}
                                    width={16}
                                    height={16}
                                />
                            </span>
                            Verified company
                        </span>
                    </div>
                </div>
            </div>
            <Reviews />
        </div>
    );
};

export default ReviewsGallery;
