import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
// import { t, Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
import MainContainer from "../components/MainContainer";
import MainFunnel from "../components/MainFunnel";
import GradientBtn from "../components/GradientBtn/GradientBtn";
import Product from "../components/Products/Products";
import FaqMain from "../components/FaqMain";
import Offer from "../components/Offer";
import SpecialOffer from "../components/SpecialOffer/SpecialOffer";
import { getLoyaltyLevels } from "../redux/actions/royalfutLoyaltyActions";
import { getOffers, modalRedirect } from "../redux/actions/royalfutActions";
import { orderStep } from "../redux/actions/royalfutOrderActions";
import api from "../Api/Api";
import Analitic from "../Analitic/Analitic";
import { useWindowDimensions } from "../utils/hooks";

import styles from "../styles/App.module.scss";
import { useTranslations } from "next-intl";

const DynamicComponent = dynamic(
    () => import("../components/TextBlockContainer")
);
const DynamicComponentInfo = dynamic(
    () => import("../components/InfograficMain")
);
const DynamicComponentCarusel = dynamic(
    () => import("../components/Carusel/Carusel")
);
const DynamicDeliverySteps = dynamic(
    () => import("../components/DeliverySteps/DeliverySteps")
);
const DynamicReviewsGallery = dynamic(
    () => import("../components/ReviewsGallery")
);
const DynamicMainLoyalty = dynamic(
    () => import("../components/LoyaltyProgram/MainLoyalty")
);

const analitic = new Analitic();

const Index = ({ offers, stock, reviews: fbreviews, loyalty }) => {
    const t = useTranslations("home");
    const reviews = fbreviews.flat().filter((item, index, array) => {
        return array.findIndex(obj => obj.id === item.id) === index;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLoyalty = async () => {
            await api.getLoyaltyTable().then(result => {
                const sortedRes = result.sort((a, b) => a.level - b.level);

                dispatch(getLoyaltyLevels(sortedRes[0]));
            });
            if (offers) {
                dispatch(getOffers(offers));
            }
        };

        fetchLoyalty();
    }, []);

    return <IndexImpl stock={stock} reviews={reviews} />;
};

const IndexImpl = ({ stock, reviews }) => {
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const redirect = useCallback(() => {
        dispatch(modalRedirect(true));
    }, []);
    const onBuyCoinsClick = useCallback(() => {
        dispatch(orderStep(1));
        analitic.clickMainBuyCoins();
    }, []);

    const onProductClick = () => {};

    return (
        // <MainContainer
        //     keywords={', main page'}
        //     title={t`seo:root:title`}
        //     description={t`seo:root:description`}
        //     customStyle={styles.padding_top_100}
        // >
        <div className={`${styles.app_main}`}>
            <MainFunnel stock={stock} />
            <div className={`${styles.info_numbers_wrapper}`}>
                <DynamicComponentInfo />
            </div>
            <div>
                <DynamicMainLoyalty />
            </div>
            <div
                className={`${styles.info_numbers_wrapper} ${styles.cases_wrapper}`}>
                <DynamicComponentCarusel />
            </div>
            <div
                className={`${styles.info_numbers_wrapper} ${styles.cases_wrapper}`}>
                <DynamicDeliverySteps />
            </div>
            <div
                className={`${styles.info_numbers_wrapper} ${styles.reviews_wrapper}`}>
                <DynamicReviewsGallery reviews={reviews} />
                <div
                    className={`${styles.wrapper_buy_btn} ${stateBuyOff && "disabled"}`}>
                    <Link href={"/order"}>
                        <a
                            onClick={onBuyCoinsClick}
                            className={`${styles.buy_btn_width}`}>
                            <GradientBtn size={{ height: 64 }}>
                                <span className={` ${styles.buy_btn}`}>
                                    <Trans>seo1</Trans>
                                </span>
                            </GradientBtn>
                        </a>
                    </Link>
                </div>
            </div>
            <div
                className={`${styles.offer_wrapper} ${styles.padding_wrapper}`}>
                <div className={`${styles.offer_wrapper} ${styles.app_column}`}>
                    <h2 className={`${styles.h2}`}>{t`locales.tryThese`}</h2>
                    <div
                        className={`${styles.offer_wrapper} ${styles.row_768} ${stateBuyOff && "disabled"}`}>
                        <div className={`${stateBuyOff && "disabled"}`}>
                            <Product
                                img={"/img/coins/buy_coins.webp"}
                                h3={t`locales.pageCoinsBundles`}
                                text={t`locales.pack_descript`}
                                gradient={
                                    "linear-gradient(180deg, #5453B2 0%, rgba(84, 83, 178, 0) 127.71%)"
                                }
                                link={"/coins"}
                                handler={onProductClick}
                            />
                        </div>
                        <Product
                            img={
                                width <= 1024
                                    ? "/img/SBS-Solver-mobile.webp"
                                    : "/img/SBS-Solver-desktop.webp"
                            }
                            h3={t`sbc`}
                            text={t`locales.startSave`}
                            gradient={
                                "background: linear-gradient(rgb(61 61 78) 0%, rgba(84, 83, 178, 0) 127.71%)"
                            }
                            handler={redirect}
                        />
                    </div>
                </div>
                <Promo />
            </div>
            <DynamicComponent />
            <FaqMain />
            <Offer />
        </div>
    );
};

const Promo = () => {
    const stateOffer = useSelector(state => state.royalfutReducer.offerCards);
    const [promoTime, setPromoTime] = useState(0);

    useEffect(() => {
        if (stateOffer.length > 0) {
            let promo = { ...stateOffer[stateOffer.length - 1] };
            let endTime = new Date(promo.endDate || 0);
            promo.endDate = endTime.getTime() - Date.now();

            setPromoTime(promo.endDate);
        }
    }, [stateOffer]);

    return promoTime > 0 ? (
        <div className={`${styles.offer_wrapper}`}>
            <SpecialOffer />
        </div>
    ) : null;
};

export default Index;

export async function getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "public, max-age=3600");

    const [promo, stock, reviews, translation] = await Promise.all([
        api.getPromo(),
        api.getStock(),
        Promise.all([api.getReviews(), api.getReviews(), api.getReviews()]),
    ]);

    let offers = null;
    const lastPromoCard = promo.promoCards[promo.promoCards.length - 1];
    const currentDate = new Date();
    if (lastPromoCard && new Date(lastPromoCard.endDate) > currentDate) {
        offers = [lastPromoCard];
    }

    return {
        props: {
            offers,
            reviews,
            stock,
            translation,
        },
    };
}
