"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
import MainFunnel from "../../components/MainFunnel";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import Product from "../../components/Products/Products";
import FaqMain from "../../components/FaqMain";
import Offer from "../../components/Offer";
import SpecialOffer from "../../components/SpecialOffer/SpecialOffer";
import { getOffers, modalRedirect } from "../../redux/actions/royalfutActions";
import { orderStep } from "../../redux/actions/royalfutOrderActions";
import api from "../../Api/Api";
import Analitic from "../../Analitic/Analitic";
import { useWindowDimensions } from "../../utils/hooks";

import styles from "../../styles/App.module.scss";
import { useTranslations } from "next-intl";

const DynamicComponent = dynamic(
    () => import("../../components/TextBlockContainer")
);
const DynamicComponentInfo = dynamic(
    () => import("../../components/InfograficMain")
);
const DynamicComponentCarusel = dynamic(
    () => import("../../components/Carusel/Carusel")
);
const DynamicDeliverySteps = dynamic(
    () => import("../../components/DeliverySteps/DeliverySteps")
);
const DynamicReviewsGallery = dynamic(
    () => import("../../components/ReviewsGallery")
);
const DynamicMainLoyalty = dynamic(
    () => import("../../components/LoyaltyProgram/MainLoyalty")
);

const analitic = new Analitic();

const Index = ({ data, locale }) => {
    const t = useTranslations("home");
    const { reviews, offers } = data.data;
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const [scroll, setScroll] = useState(false);
    const [mouse, setMouse] = useState(false);

    const redirect = useCallback(() => {
        dispatch(modalRedirect(true));
    }, []);
    const onBuyCoinsClick = useCallback(() => {
        dispatch(orderStep(1));
        analitic.clickMainBuyCoins();
    }, []);

    const onScroll = () => {
        setScroll(true);
        window.removeEventListener("scroll", onScroll);
    };
    const onMouseMove = () => {
        setMouse(true);
        window.removeEventListener("mousemove", onMouseMove);
    };

    useEffect(() => {
        if (width > 1024) {
            setScroll(true);
            window.addEventListener("mousemove", onMouseMove);
        }
        if (typeof window != "undefined" && width <= 1024) {
            setMouse(true);
            window.addEventListener("scroll", onScroll);
        }
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [width]);

    useEffect(() => {
        if (offers) {
            dispatch(getOffers(offers));
        }
    }, [offers]);

    return (
        <div className={`${styles.app_main}`}>
            <MainFunnel />
            <div className={`${styles.info_numbers_wrapper}`}>
                <DynamicComponentInfo />
            </div>
            {scroll && mouse && (
                <>
                    <div>
                        <DynamicMainLoyalty />
                    </div>
                    <div
                        className={`${styles.info_numbers_wrapper} ${styles.cases_wrapper}`}>
                        <DynamicComponentCarusel locale={locale} />
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
                            <Link href={"/order"} legacyBehavior>
                                <a
                                    onClick={onBuyCoinsClick}
                                    className={`${styles.buy_btn_width}`}>
                                    <GradientBtn size={{ height: 64 }}>
                                        <span className={` ${styles.buy_btn}`}>
                                            {t("preorder.buy_coins")}
                                        </span>
                                    </GradientBtn>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`${styles.offer_wrapper} ${styles.padding_wrapper}`}>
                        <div
                            className={`${styles.offer_wrapper} ${styles.app_column}`}>
                            <h2 className={`${styles.h2}`}>{t(`seo12`)}</h2>
                            <div
                                className={`${styles.offer_wrapper} ${styles.row_768} ${
                                    stateBuyOff && "disabled"
                                }`}>
                                <div className={`${stateBuyOff && "disabled"}`}>
                                    <Product
                                        img={"/img/coins/buy_coins.webp"}
                                        h3={t(`headerlink.coin_bundles`)}
                                        text={t(`seo14`)}
                                        gradient={
                                            "linear-gradient(180deg, #5453B2 0%, rgba(84, 83, 178, 0) 127.71%)"
                                        }
                                        link={"/coins"}
                                    />
                                </div>
                                <Product
                                    img={
                                        width <= 1024
                                            ? "/img/SBS-Solver-mobile.webp"
                                            : "/img/SBS-Solver-desktop.webp"
                                    }
                                    h3={t(`blog.b_t`)}
                                    text={t(`blog.b_d`)}
                                    gradient={
                                        "background: linear-gradient(rgb(61 61 78) 0%, rgba(84, 83, 178, 0) 127.71%)"
                                    }
                                    link={"/blog"}
                                    // handler={redirect}
                                />
                            </div>
                        </div>
                        <Promo />
                    </div>
                    <DynamicComponent />
                    <FaqMain />
                    <Offer />
                </>
            )}
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
