import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../utils/useLinguiInit";
import MainContainer from "../../components/MainContainer";
import defaultCoinsCount from "../../data-elements/coinsCards";
import Aside from "../../components/Aside";
import { seoTags } from "../../data-elements/seoTags";
import IdCard from "../../components/Package/IdCard";
import GaranteeRowCoinsPage from "../../components/Package/GaranteeRowCoinsPage";
import ReviewsGallery from "../../components/ReviewsGallery";
import FaqMain from "../../components/FaqMain";
import PlatformChanger from "../../components/Package/PlatformChanger";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import PackageCard from "../../components/Package/PackageCard";
import api from "../../Api/Api";
import { getDeliveryTime } from "../../utils/functions";

import styles from "../../styles/CoinPage.module.scss";

export async function getServerSideProps(context) {
    const cookiesToken = context.req.cookies["auth-token"];
    const [stock, loyalty, reviews, translation] = await Promise.all([
        api.getStock(),
        api.getLoyaltyTable(cookiesToken),
        Promise.all([api.getReviews(), api.getReviews(), api.getReviews()]),
        loadCatalog(context.locale),
    ]);

    let loyaltyData = cookiesToken
        ? loyalty[0]
        : loyalty.find(el => el.level === 0);

    const allReviews = reviews
        .flat()
        .filter(
            (item, index, array) =>
                array.findIndex(obj => obj.id === item.id) === index
        );

    return {
        props: {
            reviews: allReviews,
            stock,
            loyalty: loyaltyData,
            translation,
        },
    };
}

export default function CoinPage({ reviews, stock, loyalty }) {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];
    const { query } = useRouter();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const [cardCoef, setCardCoef] = useState(null);

    const [card, setCard] = useState(null);
    const [cardTime, setCardTime] = useState(null);

    const [textTitle, setTextTitle] = useState("");
    const [textDescription, setTextDescription] = useState("");
    // const [loyalty, setLoyalty] = useState(null);

    // useEffect(async () => {
    //     if (!stateUser?.token) {
    //         let localLoyalty = await api.getLoyaltyTable();
    //         localLoyalty = localLoyalty.filter((el) => el.level == 0)[0];
    //         if (localLoyalty) {
    //             setLoyalty(localLoyalty);
    //         }
    //     } else {
    //         let localLoyalty = await api.getLoyaltyTable();
    //         localLoyalty = localLoyalty.filter((el) => el.level == 4)[0];
    //         if (localLoyalty) {
    //             setLoyalty(localLoyalty);
    //         }
    //     }
    // }, [stateUser]);

    useEffect(() => {
        let result = defaultCoinsCount.filter(
            el => el.limitSumView === query.id
        )[0];

        if (result) {
            if (result.limitSumCoins < 1000000) {
                setTextTitle(
                    seo.idk.title
                        .replace("100K", result.limitSumView.toUpperCase())
                        .replace("100K", result.limitSumView.toUpperCase())
                );
                setTextDescription(
                    seo.idk.description.replace(
                        "100K",
                        result.limitSumView.toUpperCase()
                    )
                );
            } else {
                setTextTitle(
                    seo.idm.title
                        .replace("1", result.limitSumCoins / 1000000)
                        .replace("1000K", result.limitSumView.toUpperCase())
                );
                setTextDescription(
                    seo.idm.description
                        .replace("1000K", result.limitSumView.toUpperCase())
                        .replace("1", result.limitSumCoins / 1000000)
                );
            }

            setCard(result);
        } else {
            router.push("/404");
        }
    }, [query]);

    useEffect(() => {
        let t_pl = statePlatform.ps ? 1 : 0;
        if (statePlatform.pc) {
            t_pl = 2;
        }
        const t_coef =
            stateStock.deliveryMethods[0].data[t_pl].pricePerCurrencyMap[
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
    }, [stateCurrency, stateStock, statePlatform, card]);

    // const getDataToPurchase = () => {
    //     const data = {
    //         currency: stateCurrency,
    //         method: stateMethod,
    //         coins: card?.limitSumCoins,
    //     };

    //     localStorage.setItem('coins_purchase', JSON.stringify(data));
    //     dispatch(getDataCoinsPage(data));
    //     let priceEur = (
    //         stateStock.deliveryMethods[stateMethod.easy ? 0 : 1].data[1]
    //             .pricePerCurrencyMap.EUR * card?.limitSumCoins
    //     ).toFixed(2); //stock task!
    //     analitic.clickBuyCoinsPack(priceEur);
    // };

    return (
        <MainContainer
            customStyle={"."}
            title={textTitle}
            description={textDescription}>
            <div className={`${styles.container}`}>
                <div className="column from-375-to-1024">
                    <h1 className={`${styles.page_h}`}>
                        {t`coins_page18`.replace("[[X]]", query.id)}
                    </h1>

                    <div className={`${styles.reviews_wrapper}`}>
                        <Aside stock={stock} />
                    </div>
                </div>

                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.text_content}`}>
                        <div className="column from-1025-to-1900">
                            <h1 className={`${styles.page_h}`}>
                                {t`coins_page18`.replace("[[X]]", query.id)}
                            </h1>

                            <div className={`${styles.reviews_wrapper}`}>
                                <Aside stock={stock} />
                            </div>
                        </div>

                        <p className={`${styles.text_p}`}>
                            <Trans>coins_page19</Trans>
                        </p>
                        <p className={`${styles.text_p}`}>
                            {t`coins_page20`
                                .replaceAll("[[X]]", query.id)
                                .replace(
                                    "[[Y]]",
                                    (cardCoef * card?.limitSumCoins).toFixed(2)
                                )
                                .replace("[[C]]", stateCurrency?.title)
                                .replace("[[A]]", cardTime?.time[0])
                                .replace("[[B]]", cardTime?.time[1])
                                .replace(
                                    "[[T]]",
                                    cardTime?.translates == "m"
                                        ? t`minutes`
                                        : t`hours`
                                )}
                        </p>
                        <p className={`${styles.important_p}`}>
                            {card?.limitSumCoins < 999000 && t`coins_page15`}
                            {card?.limitSumCoins >= 1000000 &&
                                card?.limitSumCoins < 9999000 &&
                                t`coins_page16`}
                            {card?.limitSumCoins >= 10000000 && t`coins_page17`}
                        </p>
                        <div className={`${styles.p}`}>
                            <h3 className={`${styles.h3}`}>
                                <Trans>coins_page21</Trans>
                            </h3>
                            <ul className={`${styles.ul}`}>
                                <li className={`${styles.ul_li}`}>
                                    &#8729;{" "}
                                    {t`coins_page22`.replace("300k", query?.id)}
                                </li>
                                <li className={`${styles.ul_li}`}>
                                    &#8729; <Trans>coins_page23</Trans>
                                </li>
                                {/* <li className={`${styles.ul_li}`}>
                                    &#8729;{' '}
                                    <Trans>coins_page24</Trans>
                                </li>
                                <li className={`${styles.ul_li}`}>
                                    &#8729;{' '}
                                    <Trans>coins_page25</Trans>
                                </li> */}
                                <li className={`${styles.ul_li}`}>
                                    &#8729; <Trans>coins_page26</Trans>
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.p}`}>
                            <h3 className={`${styles.h3}`}>
                                <Trans>coins_page27</Trans>
                            </h3>
                            <ul className={`${styles.ul} ${styles.ul_gap}`}>
                                <li className={`${styles.ul_li}`}>
                                    &#8729;{" "}
                                    <strong>
                                        <Trans>coins_page28</Trans>
                                    </strong>{" "}
                                    <Trans>coins_page29</Trans>
                                </li>
                                <li className={`${styles.ul_li}`}>
                                    &#8729;{" "}
                                    <strong>
                                        <Trans>coins_page30</Trans>
                                    </strong>{" "}
                                    <Trans>coins_page31</Trans>
                                </li>
                                <li className={`${styles.ul_li}`}>
                                    &#8729;{" "}
                                    <strong>
                                        <Trans>coins_page32</Trans>
                                    </strong>{" "}
                                    <Trans>coins_page33</Trans>
                                </li>
                            </ul>
                        </div>
                        <p className={`${styles.p}`}>
                            <GaranteeRowCoinsPage coins={card?.limitSumCoins} />
                        </p>
                    </div>
                    <IdCard coins={card?.limitSumCoins} loyalty={loyalty} />
                </div>

                <div className={`${styles.reviews_comp_wrapper}`}>
                    <ReviewsGallery reviews={reviews} />
                </div>

                <div className={`${styles.faq_section_wrapper}`}>
                    <FaqMain />
                </div>

                <div className={`${styles.gallery_wrapper}`}>
                    <h2 className={`${styles.h2}`}>
                        <Trans>coins_page37</Trans>
                    </h2>
                    <h3 className={`${styles.h3_platform}`}>
                        <Trans>locales.platform</Trans>
                    </h3>
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
        </MainContainer>
    );
}
