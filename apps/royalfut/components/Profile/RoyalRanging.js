import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import { Trans, t } from '@lingui/macro';
import { translations } from "../../locales/translations";
import { getLoyaltyAllLevels } from "../../redux/actions/royalfutLoyaltyActions";
import api from "../../Api/Api";
import { useWindowDimensions } from "../../utils/hooks";

import styles from "./RoyalRanging.module.scss";
import { useTranslations } from "next-intl";

const RoyalRanging = () => {
    const dispatch = useDispatch();

    const t = useTranslations("profile");

    const { width } = useWindowDimensions();

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const stateLoyaltyAllLevels = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_all_levels
    );
    const stateLoyaltyUser = useSelector(
        state => state.royalfutLoyaltyReducer.user_loyalty
    );
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );

    const [activeLevel, setActiveLevel] = useState(0);
    const [header, setHeader] = useState("");
    const [widthpb, setWidthpb] = useState(0);

    useEffect(() => {
        // const getLoyaltyTable = async () => {
        //     await api.getLoyaltyTable().then((result) => {
        //         dispatch(getLoyaltyAllLevels(result));
        //     });
        // };
        // getLoyaltyTable();
    }, []);

    useEffect(() => {
        // setActiveLevel(stateLoyaltyUser?.level);
        let coef = (
            stateLoyaltyUser?.orderedCoins /
            stateLoyaltyAllLevels?.filter(el => el.level == activeLevel + 1)[0]
                ?.coins
        ).toFixed(2);
        if (coef >= 1) {
            setWidthpb(100);
        }
        if (coef < 1) {
            setWidthpb(coef * 100);
        }
    }, [stateLoyaltyUser, stateLoyaltyAllLevels, activeLevel]);

    useEffect(() => {
        setHeader(
            translations[stateLocale?.title][`rangeHeader${activeLevel}`]
        );
    }, [stateLocale, activeLevel]);

    return stateLoyaltyAllLevels ? (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3
                    className={`${styles.h3_title} ${styles[`title${activeLevel}`]}`}>
                    {header}
                </h3>
                {stateLoyaltyUser?.level <= activeLevel && (
                    <div className={`${styles.notify_widget}`}>
                        <div className={styles.lock_done_wrapper}>
                            <Image
                                src={
                                    stateLoyaltyUser?.level >= activeLevel
                                        ? "/img/done_white.svg"
                                        : "/img/lock_transparent.svg"
                                }
                                width={12}
                                height={12}
                            />
                        </div>
                        {stateLoyaltyUser?.level >= activeLevel
                            ? t("tier")
                            : t("makemore")}
                    </div>
                )}
                <div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={width > 1024 ? 100 : 18}
                        slidesPerView={"auto"}
                        onInit={swiper => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        onSlideChange={swiper => {
                            if (stateLocale?.title === "ar") {
                                swiper.changeLanguageDirection("rtl");
                            }
                            setActiveLevel(swiper?.realIndex);
                        }}
                        initialSlide={stateLoyaltyUser?.level}
                        centeredSlides={true}>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div
                                className={`${styles.lock}  ${styles[`back${0}`]}`}>
                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${0}`]}  ${
                                        activeLevel !== 0 && styles.opacity
                                    }`}>
                                    <Image
                                        src="/img/Image_Bronze.png"
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.desc_purch_wrapper} from-1025-to-1900`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div className={`${styles.steps_wrapper}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${styles.divider_maxi} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 0 ||
                                                    (stateLoyaltyUser?.level ===
                                                        0 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${styles.divider_mini} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level > 0 ||
                                                    (stateLoyaltyUser?.level ===
                                                        0 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${styles.divider_maxi} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {activeLevel == 0 && (
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.mobi_purchases} from-375-to-1024`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div
                                        className={`${styles.steps_wrapper} ${styles.mobi_steps_first}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider_stretch} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 0 ||
                                                    (stateLoyaltyUser?.level ===
                                                        0 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level > 0 ||
                                                    (stateLoyaltyUser?.level ===
                                                        0 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        0 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        0 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div className={`${styles[`back${1}`]}`}>
                                <div
                                    className={`${styles.lock} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        styles.show_lock
                                    }`}></div>

                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${1}`]} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        activeLevel === 1 &&
                                        styles.opacity
                                    } ${activeLevel !== 1 && styles.opacity}`}>
                                    <Image
                                        src="/img/Image_Silver.png"
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.purchases_wrapper} ${styles.desc_purch_wrapper} from-1025-to-1900`}>
                                <span className={`${styles.purchases_title}`}>
                                    {t("needed")}
                                </span>
                                <div className={`${styles.steps_wrapper}`}>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 1 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 1 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 1 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 1 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}>
                                            1
                                            {(stateLoyaltyUser?.level > 1 ||
                                                (stateLoyaltyUser?.level === 1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.second_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 1 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 1 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 1 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 1 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}>
                                            2
                                            {(stateLoyaltyUser?.level > 1 ||
                                                (stateLoyaltyUser?.level === 1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 1 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 1 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}></div>
                                    </div>
                                </div>
                            </div>
                            {activeLevel == 1 && (
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.mobi_purchases} from-375-to-1024`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div
                                        className={`${styles.steps_wrapper} ${styles.mobi_steps_second}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        1 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        1 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 1 ||
                                                    (stateLoyaltyUser?.level ===
                                                        1 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        1 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        1 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level > 1 ||
                                                    (stateLoyaltyUser?.level ===
                                                        1 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        1 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        1 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div className={`${styles[`back${2}`]}`}>
                                <div
                                    className={`${styles.lock} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        styles.show_lock
                                    }`}></div>
                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${2}`]} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        activeLevel === 2 &&
                                        styles.opacity
                                    } ${activeLevel !== 2 && styles.opacity}`}>
                                    <Image
                                        src="/img/Image_Gold.png"
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.purchases_wrapper} ${styles.desc_purch_wrapper} from-1025-to-1900`}>
                                <span className={`${styles.purchases_title}`}>
                                    {t("needed")}
                                </span>
                                <div className={`${styles.steps_wrapper}`}>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}>
                                            1
                                            {(stateLoyaltyUser?.level > 2 ||
                                                (stateLoyaltyUser?.level === 2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}>
                                            2
                                            {(stateLoyaltyUser?.level > 2 ||
                                                (stateLoyaltyUser?.level === 2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.second_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}>
                                            3
                                            {(stateLoyaltyUser?.level > 2 ||
                                                (stateLoyaltyUser?.level === 2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 2 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 2 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}></div>
                                    </div>
                                </div>
                            </div>
                            {activeLevel == 2 && (
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.mobi_purchases} from-375-to-1024`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div
                                        className={`${styles.steps_wrapper} ${styles.mobi_steps_second}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 2 ||
                                                    (stateLoyaltyUser?.level ===
                                                        2 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level > 2 ||
                                                    (stateLoyaltyUser?.level ===
                                                        2 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}>
                                                3
                                                {(stateLoyaltyUser?.level > 2 ||
                                                    (stateLoyaltyUser?.level ===
                                                        2 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            3)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        2 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        2 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div className={`${styles[`back${3}`]}`}>
                                <div
                                    className={`${styles.lock} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        styles.show_lock
                                    }`}></div>
                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${3} `]} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        activeLevel === 3 &&
                                        styles.opacity
                                    } ${activeLevel !== 3 && styles.opacity}`}>
                                    <Image
                                        src="/img/Image_Inform.png"
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.purchases_wrapper} ${styles.desc_purch_wrapper} from-1025-to-1900`}>
                                <span className={`${styles.purchases_title}`}>
                                    {t("needed")}
                                </span>
                                <div className={`${styles.steps_wrapper}`}>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}>
                                            1
                                            {(stateLoyaltyUser?.level > 3 ||
                                                (stateLoyaltyUser?.level === 3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}>
                                            2
                                            {(stateLoyaltyUser?.level > 3 ||
                                                (stateLoyaltyUser?.level === 3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}>
                                            3
                                            {(stateLoyaltyUser?.level > 3 ||
                                                (stateLoyaltyUser?.level === 3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.second_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}>
                                            4
                                            {(stateLoyaltyUser?.level > 3 ||
                                                (stateLoyaltyUser?.level === 3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 3 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 3 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}></div>
                                    </div>
                                </div>
                            </div>
                            {activeLevel == 3 && (
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.mobi_purchases} from-375-to-1024`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div
                                        className={`${styles.steps_wrapper} ${styles.mobi_steps_second}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 3 ||
                                                    (stateLoyaltyUser?.level ===
                                                        3 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level > 3 ||
                                                    (stateLoyaltyUser?.level ===
                                                        3 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}>
                                                3
                                                {(stateLoyaltyUser?.level > 3 ||
                                                    (stateLoyaltyUser?.level ===
                                                        3 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            3)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}>
                                                4
                                                {(stateLoyaltyUser?.level > 3 ||
                                                    (stateLoyaltyUser?.level ===
                                                        3 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            4)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        3 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        3 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div className={`${styles[`back${4}`]}`}>
                                <div
                                    className={`${styles.lock} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        styles.show_lock
                                    }`}></div>
                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${4} `]} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        activeLevel === 4 &&
                                        styles.opacity
                                    } ${activeLevel !== 4 && styles.opacity}`}>
                                    <Image
                                        src="/img/Image_Hero.png"
                                        width={200}
                                        height={200}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.purchases_wrapper} ${styles.desc_purch_wrapper} from-1025-to-1900`}>
                                <span className={`${styles.purchases_title}`}>
                                    {t("needed")}
                                </span>
                                <div className={`${styles.steps_wrapper}`}>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    1 &&
                                                styles.done
                                            }`}>
                                            1
                                            {(stateLoyaltyUser?.level > 4 ||
                                                (stateLoyaltyUser?.level === 4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    2 &&
                                                styles.done
                                            }`}>
                                            2
                                            {(stateLoyaltyUser?.level > 4 ||
                                                (stateLoyaltyUser?.level === 4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.first_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    3 &&
                                                styles.done
                                            }`}>
                                            3
                                            {(stateLoyaltyUser?.level > 4 ||
                                                (stateLoyaltyUser?.level === 4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.block_step} ${styles.second_step}`}>
                                        <div
                                            className={`${styles.divider} ${styles.divider_mini} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}></div>
                                        <div
                                            className={`${styles.step} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}>
                                            4
                                            {(stateLoyaltyUser?.level > 4 ||
                                                (stateLoyaltyUser?.level === 4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4)) && (
                                                <div
                                                    className={`${styles.icon_wrapper}`}>
                                                    <Image
                                                        src="/img/white_done.svg"
                                                        width={12}
                                                        height={12}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`${styles.divider} ${styles.divider_maxi} ${
                                                stateLoyaltyUser?.level > 4 &&
                                                styles.done
                                            } ${
                                                stateLoyaltyUser?.level === 4 &&
                                                stateLoyaltyUser?.ordersCount >=
                                                    4 &&
                                                styles.done
                                            }`}></div>
                                    </div>
                                </div>
                            </div>
                            {activeLevel == 4 && (
                                <div
                                    className={`${styles.purchases_wrapper} ${styles.mobi_purchases} from-375-to-1024`}>
                                    <span
                                        className={`${styles.purchases_title}`}>
                                        {t("needed")}
                                    </span>
                                    <div
                                        className={`${styles.steps_wrapper} ${styles.mobi_steps_last}`}>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        1 &&
                                                    styles.done
                                                }`}>
                                                1
                                                {(stateLoyaltyUser?.level > 4 ||
                                                    (stateLoyaltyUser?.level ===
                                                        4 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            1)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        2 &&
                                                    styles.done
                                                }`}>
                                                2
                                                {(stateLoyaltyUser?.level >
                                                    activeLevel ||
                                                    (stateLoyaltyUser?.level ===
                                                        4 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            2)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.first_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        3 &&
                                                    styles.done
                                                }`}>
                                                3
                                                {(stateLoyaltyUser?.level > 4 ||
                                                    (stateLoyaltyUser?.level ===
                                                        4 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            3)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.block_step} ${styles.second_step}`}>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}></div>
                                            <div
                                                className={`${styles.step} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}>
                                                4
                                                {(stateLoyaltyUser?.level > 4 ||
                                                    (stateLoyaltyUser?.level ===
                                                        4 &&
                                                        stateLoyaltyUser?.ordersCount >=
                                                            4)) && (
                                                    <div
                                                        className={`${styles.icon_wrapper}`}>
                                                        <Image
                                                            src="/img/white_done.svg"
                                                            width={12}
                                                            height={12}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${styles.divider} ${
                                                    stateLoyaltyUser?.level >
                                                        4 && styles.done
                                                } ${
                                                    stateLoyaltyUser?.level ===
                                                        4 &&
                                                    stateLoyaltyUser?.ordersCount >=
                                                        4 &&
                                                    styles.done
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                        <SwiperSlide className={`${styles["swiper-slide"]}`}>
                            <div className={`${styles[`back${5}`]}`}>
                                <div
                                    className={`${styles.lock} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        styles.show_lock
                                    }`}></div>
                                <div
                                    className={`${styles.wrapper_rang_cover} ${styles[`shadow_glow${5}`]} ${
                                        stateLoyaltyUser?.level < activeLevel &&
                                        activeLevel == 5 &&
                                        styles.opacity
                                    } ${activeLevel != 5 && styles.opacity}`}>
                                    <Image
                                        src="/img/Image_Icon.png"
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <div className={styles.prev_btn} ref={prevRef}></div>
                        <div className={styles.next_btn} ref={nextRef}></div>
                    </Swiper>
                </div>

                <div className={`${styles.total_coins}`}>
                    <span className={`${styles.total_coins_title}`}>
                        {/* <Trans>pl_upd60</Trans> */}
                        {t("total")}
                    </span>
                    <div className={`${styles.wrapper_value_coins}`}>
                        <span className={styles.total_coins_bought}>
                            {stateLoyaltyUser?.orderedCoins.toLocaleString(
                                "ru-Ru"
                            )}
                        </span>
                        {activeLevel < 5 && (
                            <span className={styles.total_coins_need}>
                                /
                                {stateLoyaltyAllLevels &&
                                    stateLoyaltyAllLevels
                                        ?.filter(
                                            el => el.level === activeLevel + 1
                                        )[0]
                                        ?.coins.toLocaleString("ru-Ru")}
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.wrapper_pb}>
                    <span
                        className={`${styles.pb_title} ${styles[`title${activeLevel}`]}`}>
                        {header}
                    </span>
                    <div className={`${styles.pb_bar_container}`}>
                        <div
                            className={`${styles.pb_progress} ${widthpb > 0 && styles.shadow}`}
                            style={{ width: `${widthpb}%` }}></div>
                        <span className={styles.percent}>
                            {stateLoyaltyUser?.level < 5
                                ? `${Math.round(widthpb)}%`
                                : "MAX"}
                        </span>
                    </div>
                    <span
                        className={`${styles.pb_title} ${styles[`title${activeLevel + 1}`]}`}>
                        {
                            translations[stateLocale?.title][
                                `rangeHeader${activeLevel + 1}`
                            ]
                        }
                    </span>
                </div>
                <div className={`${styles.cash_block}`}>
                    <div className={styles.percent_cash}>
                        <div className={styles.also_wrapper}>
                            <div className={styles.user_percent}>
                                <span className={styles.percent_value}>
                                    {
                                        stateLoyaltyAllLevels?.filter(
                                            el => el.level === activeLevel
                                        )[0]?.cashbackPercent
                                    }
                                    %
                                </span>
                                <div
                                    className={`${styles.violet_icon_wrapper}`}>
                                    <Image
                                        src={"/img/white_crown.svg"}
                                        width={30}
                                        height={30}
                                    />
                                </div>
                            </div>
                            {stateLoyaltyUser?.level <= activeLevel && (
                                <div
                                    className={`${styles.notify_widget} ${styles.no_margin}`}>
                                    <Image
                                        src={
                                            stateLoyaltyUser?.level >=
                                            activeLevel
                                                ? "/img/done_white.svg"
                                                : "/img/lock_transparent.svg"
                                        }
                                        width={12}
                                        height={12}
                                    />
                                    {stateLoyaltyUser?.level >= activeLevel
                                        ? t("benefits")
                                        : t("locked")}
                                </div>
                            )}
                        </div>
                        <span className={styles.description_text}>
                            {/* <Trans>pl_upd62</Trans> */}
                            {t("ofcash")}
                        </span>
                    </div>
                    <div className={styles.percent_cash}>
                        <div className={styles.also_wrapper}>
                            <div className={styles.user_percent}>
                                <span className={styles.percent_value}>
                                    {
                                        stateLoyaltyAllLevels?.filter(
                                            el => el.level === activeLevel
                                        )[0]?.bonusPartPercent
                                    }
                                    %
                                </span>
                            </div>
                            {stateLoyaltyUser?.level <= activeLevel && (
                                <div
                                    className={`${styles.notify_widget} ${styles.no_margin}`}>
                                    <Image
                                        src={
                                            stateLoyaltyUser?.level >=
                                            activeLevel
                                                ? "/img/done_white.svg"
                                                : "/img/lock_transparent.svg"
                                        }
                                        width={12}
                                        height={12}
                                    />
                                    {stateLoyaltyUser?.level >= activeLevel
                                        ? t("benefits")
                                        : t("locked")}
                                </div>
                            )}
                        </div>
                        <span className={styles.description_text}>
                            {/* <Trans>pl_upd65</Trans> */}
                            {t("ofprice")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default RoyalRanging;
