/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import Image from "next/legacy/image";
import { Pagination } from "swiper/modules";
// import { useRouter } from 'next/router';
// import { t, Trans } from '@lingui/macro';
import flagLangs from "../../data-elements/countriesTwo";
import DropdownOrder from "../DropdownOrder";
// import api from '../../Api/Api';
// import { getLoyaltyAllLevels } from '../../redux/actions/royalfutLoyaltyActions';

import styles from "./ModalLoyaltyComponent.module.scss";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const ModalLoyaltyComponent = ({ locale }) => {
    const t = useTranslations("modal");
    let levelsData = [
        {
            id: 0,
            img: "/img/bronze_level.png",
            title: "Bronze",
            locale_title: "Bronze",
        },
        {
            id: 1,
            img: "/img/silver_medal.png",
            title: "Silver",
            locale_title: "Silver",
        },
        {
            id: 2,
            img: "/img/gold_medal.png",
            title: "Gold",
            locale_title: "Gold",
        },
        {
            id: 3,
            img: "/img/inform_medal.png",
            title: "Inform",
            locale_title: "Inform",
        },
        {
            id: 4,
            img: "/img/hero_medal.png",
            title: "Hero",
            locale_title: "Hero",
        },
        {
            id: 5,
            img: "/img/icon_medal.png",
            title: "Icon",
            locale_title: "Icon",
        },
    ];
    // const dispatch = useDispatch();
    // const router = useRouter();
    const pathname = usePathname();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateLevel = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_levels
    );
    const stateAllLevels = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_all_levels
    );
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const [pricePoint, setPricePoint] = useState(null);
    const [localStateAllLevels, setLocalStateAllLevels] = useState(null);

    // useEffect(async () => {
    //     // await api.getLoyaltyTable().then((result) => {
    //     //     const sorted = result.sort((a, b) => a.level - b.level);
    //     //     dispatch(getLoyaltyAllLevels(sorted));
    //     // });
    // }, []);

    useEffect(() => {
        levelsData = [
            {
                ...levelsData[0],
                locale_title: t(`pl_upd53`),
            },
            {
                ...levelsData[1],
                locale_title: t(`pl_upd54`),
            },
            {
                ...levelsData[2],
                locale_title: t(`pl_upd55`),
            },
            {
                ...levelsData[3],
                locale_title: t(`pl_upd56`),
            },
            {
                ...levelsData[4],
                locale_title: t(`pl_upd57`),
            },
            {
                ...levelsData[5],
                locale_title: t(`pl_upd58`),
            },
        ];
        if (stateAllLevels && stateLevel) {
            const updatedState = updateData(
                stateAllLevels,
                levelsData,
                stateLevel
            );
            setLocalStateAllLevels(updatedState);
        }
    }, [stateAllLevels, stateLevel, pathname]);

    useEffect(() => {
        const delivery = "0";
        let platform = 1; // ps4

        if (statePlatform.xbox) {
            platform = 0; // xbox
        } else if (statePlatform.pc) {
            platform = 2; // pc
        }

        let priceUsd =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap.USD;

        let priceCurrentCurrency =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap[stateCurrency?.title];
        let priceForPoint = (priceCurrentCurrency / priceUsd) * 0.1;

        const dotIndex = String(priceForPoint).indexOf(".");

        priceForPoint = String(priceForPoint).slice(0, dotIndex + 3);
        setPricePoint(priceForPoint);
    }, [stateStock, stateCurrency, statePlatform]);

    const updateData = (arr1, arr2, data) => {
        let newLevelsData = arr1.map(el => {
            return { ...el };
        });
        newLevelsData = newLevelsData.map((el, i) => {
            if (el.level == data.level) {
                el.active = true;
            }

            el = { ...el, ...arr2[i] };
            return el;
        });

        return newLevelsData;
    };

    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.h2}`}>
                {/* <Trans>pl_upd37</Trans> */}
                {t("pl_upd37")}
            </h2>
            <p className={`${styles.modal_text}`}>
                {/* <Trans>pl_upd38</Trans> */}
                {t("pl_upd38")}
            </p>
            <div className={`${styles.bonus_value}`}>
                1
                <div className={`${styles.crown_wrapper}`}>
                    <Image
                        width={16}
                        height={16}
                        src={"/img/white_crown.svg"}
                    />
                </div>
                = {pricePoint}
                <DropdownOrder title={stateCurrency.title} value={flagLangs} />
            </div>
            <span className={`${styles.title}`}>
                {/* <Trans>pl_upd39</Trans> */}
                {t("pl_upd39")}
            </span>
            <div className={`${styles.swiper_wrapper}`}>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    pagination={{
                        clickable: true,
                    }}
                    // loop={true}
                    onSlideChange={swiper => {
                        if (locale == "ar") {
                            swiper.changeLanguageDirection("rtl");
                        }
                    }}
                    initialSlide={0}
                    className={`${styles["swiper3"]}`}
                    // centeredSlides={true}
                >
                    {localStateAllLevels?.map(el => {
                        return (
                            <SwiperSlide
                                // key={el.id}
                                // data-id={el.id}
                                // data-swiper={'review'}
                                className={`${styles["swiper-slide"]}`}>
                                <div
                                    className={`${styles["swiper-slide_card"]}`}>
                                    <div className={`${styles.header_card}`}>
                                        <span
                                            className={`${styles.header_status_card} ${
                                                styles[
                                                    `${el.title.toLowerCase()}`
                                                ]
                                            }`}>
                                            {el.locale_title}
                                        </span>
                                        {el.active && (
                                            <div
                                                className={`${styles.widget_status}`}>
                                                <div
                                                    className={`${styles.widget_icon}`}>
                                                    <Image
                                                        width={12}
                                                        height={12}
                                                        src={
                                                            "/img/white_done.svg"
                                                        }
                                                    />
                                                </div>
                                                <span
                                                    className={`${styles.widget_text}`}>
                                                    {/* <Trans>pl_upd40</Trans> */}
                                                    {t("pl_upd40")}
                                                </span>
                                            </div>
                                        )}
                                        <div
                                            className={`${styles.medal_wrapper}`}>
                                            <Image
                                                width={40}
                                                height={40}
                                                src={el.img}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.options_wrapper}`}>
                                        <div
                                            className={`${styles.options_section}`}>
                                            <span
                                                className={`${styles.options_title}`}>
                                                {/* <Trans>pl_upd41</Trans> */}
                                                {t("pl_upd41")}
                                            </span>
                                            <span
                                                className={`${styles.text_wrapper}`}>
                                                {el.level == 0 && (
                                                    <span
                                                        className={`${styles.options_text}`}>
                                                        {t(`pl_upd42`)
                                                            .replace(
                                                                "[x]",
                                                                el.minOrders
                                                            )
                                                            .replace(
                                                                "покупки",
                                                                "покупок"
                                                            )}
                                                    </span>
                                                )}
                                                {el.level != 0 && (
                                                    <span
                                                        className={`${styles.options_text}`}>
                                                        {t(`pl_upd42`).replace(
                                                            "[x]",
                                                            el.minOrders
                                                        )}
                                                    </span>
                                                )}
                                                <span
                                                    className={`${styles.options_text}`}>
                                                    {t(`pl_upd43`).replace(
                                                        "[x]",
                                                        el.coins.toLocaleString(
                                                            "ru-Ru"
                                                        )
                                                    )}
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.options_section}`}>
                                            <span
                                                className={`${styles.options_title}`}>
                                                {/* <Trans>pl_upd44</Trans> */}
                                                {t("pl_upd44")}
                                            </span>
                                            <span
                                                className={`${styles.text_wrapper}`}>
                                                <span
                                                    className={`${styles.options_text}`}>
                                                    {t(`pl_upd45`).replace(
                                                        "[x]",
                                                        el.cashbackPercent
                                                    )}
                                                </span>
                                                {el.bonusPartPercent != 0 && (
                                                    <span
                                                        className={`${styles.options_text}`}>
                                                        {t(`pl_upd46`).replace(
                                                            "[x]",
                                                            el.bonusPartPercent
                                                        )}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default ModalLoyaltyComponent;
