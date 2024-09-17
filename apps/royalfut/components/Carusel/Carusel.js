import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { orderStep } from "../../redux/actions/royalfutOrderActions";

import styles from "./Carusel.module.scss";
import { useTranslations } from "next-intl";

const Slide = ({ slide }) => {
    const t = useTranslations("home");
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const stateBuyOff = useSelector(state => state.royalfutReducer.buy_off);

    useEffect(() => {
        if (videoRef) {
            if (videoRef.current) {
                if (slide.active) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
        }
    });

    const goToOrder = () => {
        dispatch(orderStep(1));
    };

    return (
        <div className={`${styles.slide}`} data-id={slide.id}>
            <div className={`${styles.video_wrapper}`} data-id={slide.id}>
                <video
                    data-id={slide.id}
                    ref={videoRef}
                    className={`${styles.video}`}
                    loop={true}
                    controls={false}
                    muted={true}
                    playsInline={true}
                    width={"100%"}
                    height={"auto"}
                    src={slide.url}
                    type="video/mp4"
                    preload="false"></video>
            </div>
            <div
                data-id={slide.id}
                className={`${styles.text_content} ${!slide.active && styles.no_gap}`}>
                <span
                    data-id={slide.id}
                    className={`${styles.title_cards} ${!slide.active && styles.not_active_title}`}>
                    {slide.title}
                </span>
                <span
                    data-id={slide.id}
                    className={`${styles.text} ${!slide.active && styles.not_active_text}`}>
                    {slide.description}
                </span>
                <div
                    data-id={slide.id}
                    className={`${styles.wrapper_btn} ${stateBuyOff && "disabled"}`}>
                    <Link
                        href="/order"
                        data-id={slide.id}
                        className={`${styles.button_slide}`}
                        type="button"
                        name="buy"
                        onClick={goToOrder}>
                        {/* {t("headerdropdown.buy_coins")} */}
                        {t("preorder.buy_coins")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Carusel = ({ locale }) => {
    const t = useTranslations("mainblocks");
    const preorder = useTranslations("home.preorder");
    const dataSlides = [
        {
            id: 0,
            url: "/video/1.mp4",
            active: true,
            title: t(`mainblocks6`),
            description: t(`mainblocks7`),
        },
        {
            id: 1,
            url: "/video/2.mp4",
            title: preorder(`build`),
            description: preorder(`experiment`),
        },
        {
            id: 2,
            url: "/video/3.mp4",
            title: t(`mainblocks4`),
            description: t(`mainblocks5`),
        },
        {
            id: 3,
            url: "/video/4.mp4",
            title: t(`mainblocks2`),
            description: t(`mainblocks3`),
        },
        {
            id: 4,
            url: "/video/5.mp4",
            title: t(`mainblocks8`),
            description: t(`mainblocks9`),
        },
        {
            id: 5,
            url: "/video/1.mp4",
            title: t(`mainblocks6`),
            description: t(`mainblocks7`),
        },
        {
            id: 6,
            url: "/video/2.mp4",
            title: t(`mainblocks0`),
            description: t(`mainblocks1`),
        },
        {
            id: 7,
            url: "/video/3.mp4",
            title: t(`mainblocks4`),
            description: t(`mainblocks5`),
        },
        {
            id: 8,
            url: "/video/4.mp4",
            title: t(`mainblocks2`),
            description: t(`mainblocks3`),
        },
        {
            id: 9,
            url: "/video/5.mp4",
            title: t(`mainblocks8`),
            description: t(`mainblocks9`),
        },
    ];
    const [activeSlide, setActiveSlide] = useState(null);
    const [stateSlides, setStateSlides] = useState(dataSlides);

    useMemo(() => {
        let t_slides = stateSlides.map(el => {
            if (el.id == activeSlide) {
                return { ...el, active: true };
            }
            return { ...el, active: false };
        });
        setStateSlides(t_slides);
    }, [activeSlide]);

    useEffect(() => {
        setStateSlides(dataSlides);
    }, []);

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={"auto"}
                navigation
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                }}
                loop={true}
                initialSlide={1}
                centeredSlides={true}
                className={`${styles["swiper-wrapper"]}`}
                onSlideChange={swiper => {
                    if (locale == "ar") {
                        swiper.changeLanguageDirection("rtl");
                    }
                    setActiveSlide(swiper?.realIndex);
                }}
                onClick={swiper => {
                    swiper.slideTo(swiper.clickedIndex);
                }}>
                {stateSlides.map(el => {
                    return (
                        <SwiperSlide
                            key={el.id}
                            data-id={el.id}
                            className={`${styles["swiper-slide"]}`}>
                            <Slide slide={el} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Carusel;
