"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultCoinsCount from "../../../../data-elements/coinsCards";
import Aside from "../../../../components/Aside";
import IdCard from "../../../../components/Package/IdCard";
import GaranteeRowCoinsPage from "../../../../components/Package/GaranteeRowCoinsPage";
import ReviewsGallery from "../../../../components/ReviewsGallery";
import FaqMain from "../../../../components/FaqMain";
import PlatformChanger from "../../../../components/Package/PlatformChanger";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import PackageCard from "../../../../components/Package/PackageCard";
import api from "../../../../Api/Api";
import { getDeliveryTime } from "../../../../utils/functions";

import styles from "./CoinPage.module.scss";
import { useTranslations } from "next-intl";

export default function PackagePageContent({ query, locale }) {
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stock = useSelector(state => state.royalfutReducer.stock);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const loyalty = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_levels
    );

    const [cardCoef, setCardCoef] = useState(null);

    const [card, setCard] = useState(null);
    const [cardTime, setCardTime] = useState(null);
    const [reviews, setReviews] = useState(null);

    const t = useTranslations("order");

    useEffect(() => {
        async function getReviews() {
            const reviews = await Promise.all([
                api.getReviews(),
                api.getReviews(),
                api.getReviews(),
            ]);
            const allReviews = reviews
                .flat()
                .filter(
                    (item, index, array) =>
                        array.findIndex(obj => obj.id === item.id) === index
                );
            return allReviews;
        }
        getReviews().then(res => setReviews(res));
    }, []);

    useEffect(() => {
        let result = defaultCoinsCount.filter(
            el => el.limitSumView === query
        )[0];

        if (result) {
            setCard(result);
        }
    }, [query]);

    useEffect(() => {
        let t_pl = statePlatform.ps ? 1 : 0;
        if (statePlatform.pc) {
            t_pl = 2;
        }
        const t_coef =
            stock.deliveryMethods[0].data[t_pl].pricePerCurrencyMap[
                stateCurrency.title
            ];
        setCardCoef(t_coef);

        let platform = null;

        if (t_pl == 0) {
            platform = "xbox";
        }
        if (t_pl == 1) {
            platform = "ps4";
        }
        if (t_pl == 2) {
            platform = "pc";
        }
        if (card) {
            let time = getDeliveryTime(
                card?.limitSumCoins,
                "easy",
                platform,
                false
            );
            setCardTime(time);
        }
    }, [stateCurrency, stock, statePlatform, card]);

    // const getDataToPurchase = () => {
    //     const data = {
    //         currency: stateCurrency,
    //         method: stateMethod,
    //         coins: card?.limitSumCoins,
    //     };

    //     localStorage.setItem('coins_purchase', JSON.stringify(data));
    //     dispatch(getDataCoinsPage(data));
    //     let priceEur = (
    //         stock.deliveryMethods[stateMethod.easy ? 0 : 1].data[1]
    //             .pricePerCurrencyMap.EUR * card?.limitSumCoins
    //     ).toFixed(2); //stock task!
    //     analitic.clickBuyCoinsPack(priceEur);
    // };

    return (
        <div className={`${styles.container}`}>
            <div className="column from-375-to-1024">
                <h1 className={`${styles.page_h}`}>
                    {t(`coins_page18`).replace("[X]", query)}
                </h1>

                <div className={`${styles.reviews_wrapper}`}>
                    <Aside stock={stock} />
                </div>
            </div>

            <div className={`${styles.wrapper}`}>
                <div className={`${styles.text_content}`}>
                    <div className="column from-1025-to-1900">
                        <h1 className={`${styles.page_h}`}>
                            {t(`coins_page18`).replace("[X]", query)}
                        </h1>

                        <div className={`${styles.reviews_wrapper}`}>
                            <Aside stock={stock} />
                        </div>
                    </div>

                    <p className={`${styles.text_p}`}>{t("coins_page19")}</p>
                    <p className={`${styles.text_p}`}>
                        {t(`coins_page20`)
                            .replaceAll("[X]", query)
                            .replace(
                                "[Y]",
                                (cardCoef * card?.limitSumCoins).toFixed(2)
                            )
                            .replace("[C]", stateCurrency?.title)
                            .replace("[A]", cardTime?.time[0])
                            .replace("[B]", cardTime?.time[1])
                            .replace(
                                "[T]",
                                cardTime?.translates == "m" ? "min" : `hours`
                            )}
                    </p>
                    <p className={`${styles.important_p}`}>
                        {card?.limitSumCoins < 999000 && t(`coins_page15`)}
                        {card?.limitSumCoins >= 1000000 &&
                            card?.limitSumCoins < 9999000 &&
                            t(`coins_page16`)}
                        {card?.limitSumCoins >= 10000000 && t(`coins_page17`)}
                    </p>
                    <div className={`${styles.p}`}>
                        <h3 className={`${styles.h3}`}>{t("coins_page21")}</h3>
                        <ul className={`${styles.ul}`}>
                            <li className={`${styles.ul_li}`}>
                                &#8729;{" "}
                                {t(`coins_page22`).replace("300k", query)}
                            </li>
                            <li className={`${styles.ul_li}`}>
                                {t("coins_page23")}
                            </li>
                            <li className={`${styles.ul_li}`}>
                                {t("coins_page26")}
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.p}`}>
                        <h3 className={`${styles.h3}`}>{t("coins_page27")}</h3>
                        <ul className={`${styles.ul} ${styles.ul_gap}`}>
                            <li className={`${styles.ul_li}`}>
                                &#8729; <strong>{t("coins_page28")}</strong>{" "}
                                {t("coins_page29")}
                            </li>
                            <li className={`${styles.ul_li}`}>
                                &#8729; <strong>{t("coins_page30")}</strong>{" "}
                                {t("coins_page31")}
                            </li>
                            <li className={`${styles.ul_li}`}>
                                &#8729; <strong>{t("coins_page32")}</strong>{" "}
                                {t("coins_page33")}
                            </li>
                        </ul>
                    </div>
                    <p className={`${styles.p}`}>
                        <GaranteeRowCoinsPage coins={card?.limitSumCoins} />
                    </p>
                </div>
                <IdCard coins={card?.limitSumCoins} loyalty={loyalty} />
            </div>

            {reviews && (
                <div className={`${styles.reviews_comp_wrapper}`}>
                    <ReviewsGallery reviews={reviews} locale={locale} />
                </div>
            )}

            <div className={`${styles.faq_section_wrapper}`}>
                <FaqMain />
            </div>

            <div className={`${styles.gallery_wrapper}`}>
                <h2 className={`${styles.h2}`}>{t("coins_page37")}</h2>
                <h3 className={`${styles.h3_platform}`}>{t("seo28")}</h3>
                <div className={`${styles.changer_wrapper}`}>
                    <PlatformChanger />
                </div>
                <div
                    className={`${styles.gallery_wrapper} ${styles.gallery_padding}`}>
                    <Swiper
                        spaceBetween={8}
                        freeMode={true}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                        }}
                        slidesPerView={"auto"}
                        modules={[Scrollbar, FreeMode]}>
                        {defaultCoinsCount.map(el => {
                            return (
                                <SwiperSlide
                                    key={el.discountPercent}
                                    className={`${styles.slide}`}>
                                    <PackageCard coins={el.limitSumCoins} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
