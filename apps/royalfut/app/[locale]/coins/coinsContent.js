"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/legacy/image";
import { FreeMode, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Trans, t } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../../utils/useLinguiInit';
// import MainContainer from '../../components/MainContainer';
// import { seoTags } from '../../data-elements/seoTags';
import Aside from "../../../components/Aside";
import styles from "../../../styles/Package.module.scss";
import PlatformChanger from "../../../components/Package/PlatformChanger";
import PackageCard from "../../../components/Package/PackageCard";
import { useWindowDimensions } from "../../../utils/hooks";
import defaultCoinsCount from "../../../data-elements/coinsCards";
import CoinsChanger from "../../../components/Order/CoinsChanger";
import Product from "../../../components/Products/Products";
import GradientBtn from "../../../components/GradientBtn";
import DropdownOrder from "../../../components/DropdownOrder";
import flagLangs from "../../../data-elements/countriesTwo";
import currency from "../../../data-elements/currency";
import { modalRedirect } from "../../../redux/actions/royalfutActions";
import Analitic from "../../../Analitic/Analitic";
// import api from '../../Api/Api';
import CardPoints from "../../../components/LoyaltyProgram/CardPoints/CardPoints";
// import { getLoyaltyLevels } from '../../redux/actions/royalfutLoyaltyActions';
import { useTranslations } from "next-intl";

const analitic = new Analitic();

// export async function getServerSideProps(context) {
//     const cookiesToken = context.req.cookies['auth-token'];

//     const [stock, loyalty, translation] = await Promise.all([
//         api.getStock(),
//         api.getLoyaltyTable(cookiesToken),
//         loadCatalog(context.locale)
//     ]);

//     let loyaltyData = null;
//     if (cookiesToken) {
//         loyaltyData = loyalty[0];
//     } else {
//         loyaltyData = loyalty.find((el) => el.level === 0);
//     }

//     return { props: { stock, loyalty: loyaltyData, translation } };
// }

const CoinsContent = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    const t = useTranslations("order");
    const dispatch = useDispatch();
    // const router = useRouter();
    // const seo = seoTags[router.locale];
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrderReducer = useSelector(state => state.royalfutOrderReducer);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const loyalty = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_levels
    );
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const [cardCurrency, setCardCurrency] = useState(null);
    const [cardCoef, setCardCoef] = useState(null);
    const { width } = useWindowDimensions();

    // useEffect(() => {
    //     const handleApi = async () => {
    //         await api.getLoyaltyTable().then((result) => {
    //             const sortedRes = result.sort((a, b) => a.level - b.level);

    //             dispatch(getLoyaltyLevels(sortedRes[0]));
    //         });
    //     };

    //     handleApi();
    // }, []);

    useEffect(() => {
        let t_curr = currency.filter(el => el.title === stateCurrency.title)[0];
        if (t_curr) {
            setCardCurrency(t_curr.url);
        }
        let t_pl = statePlatform.ps ? 1 : 0;
        if (statePlatform.pc) {
            t_pl = 2;
        }
        let t_coef =
            stateStock.deliveryMethods[0].data[t_pl].pricePerCurrencyMap[
                stateCurrency.title
            ];
        setCardCoef(t_coef);

        // if (t_pl == 0) {
        //     setCardPlatform({ name: 'Xbox', url: '/img/xbox_icon.svg' });
        // } else if (t_pl == 1) {
        //     setCardPlatform({ name: 'PlayStation', url: '/img/ps_icon.svg' });
        // } else {
        //     setCardPlatform({ name: 'PC', url: '/img/Origin.svg' });
        // }
    }, [stateCurrency, stateStock, statePlatform]);

    const redirect = () => {
        dispatch(modalRedirect(true));
    };
    const handleBuyPack = () => {
        let t_pl = statePlatform.ps ? "ps" : "xbox";
        if (statePlatform.pc) {
            t_pl = "pc";
        }
        analitic.clickBuyCoinsPack(
            (cardCoef * stateOrderCoins).toFixed(2),
            t_pl
        );
        localStorage.setItem(
            "/coins",
            JSON.stringify({
                ...stateOrderReducer,
                order_coins_amount: stateOrderCoins,
            })
        );
    };

    return (
        // <MainContainer
        //     title={seo.coins.title}
        //     description={seo.coins.description}
        //     customStyle="."
        //     noBread={true}
        // >
        <div className="column">
            <div className={`${styles.h_wrapper}`}>
                <h1 className={`${styles.h1}`}>
                    {/* <Trans>locales.pagePaymentMethodTitle</Trans> */}
                    {t("pagePaymentMethodTitle")}
                </h1>
                <div className={`${styles.aside_wrapper}`}>
                    <Aside stock={stateStock} />
                </div>
            </div>
            <div className={`${styles.platform_block_wrapper}`}>
                <h3 className={`${styles.h3}`}>
                    {/* <Trans>locales.platform</Trans> */}
                    {t("platform")}
                </h3>
                <div>
                    <PlatformChanger />
                </div>
            </div>

            {width < 1024 && (
                <div className="column">
                    <div className={`${styles.gallery_wrapper}`}>
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
                                    <SwiperSlide className={`${styles.slide}`}>
                                        <PackageCard
                                            coins={el.limitSumCoins}
                                            loyalty={loyalty}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className={`${styles.calc_container}`}>
                        <div
                            className={`${styles.title_platform_coins_wrapper}`}>
                            <span className={`${styles.title_coins_changer}`}>
                                {/* <Trans>a19</Trans> */}
                                {t("a19")}
                            </span>
                            <div>
                                <PlatformChanger />
                            </div>
                        </div>
                        <CoinsChanger title={false} />
                        <div className={`${styles.card_btns}`}>
                            <div className={`${styles.price_currency}`}>
                                <div className={`${styles.img_wrapper}`}>
                                    {cardCurrency && (
                                        <Image
                                            src={cardCurrency}
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                </div>
                                {(cardCoef * stateOrderCoins).toFixed(2)}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency?.title}
                                        value={flagLangs}
                                    />
                                </div>
                                <CardPoints
                                    coins={stateOrderCoins}
                                    full={true}
                                    loyalty={loyalty}
                                />
                            </div>
                            <div className={`${styles.buy_btn_wrapper}`}>
                                <Link
                                    href={`/coins/purchase`}
                                    onClick={handleBuyPack}>
                                    <GradientBtn size={{ height: 64 }}>
                                        <span className={`${styles.text_btn}`}>
                                            {/* <Trans>mainblocks10</Trans> */}
                                            {t("mainblocks10")}
                                        </span>
                                    </GradientBtn>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.product_wrapper}`}>
                        <Product
                            img={
                                width <= 1024
                                    ? "/img/SBS-Solver-desktop.webp"
                                    : "/img/SBS-Solver-mobile.webp"
                            }
                            h3={t(`sbc`)}
                            text={t(`startSave`)}
                            gradient={
                                "linear-gradient(180deg, #353054 0%, rgba(53, 48, 84, 0.00) 161.55%);"
                            }
                            handler={redirect}
                            button
                        />
                    </div>
                </div>
            )}

            {width >= 1024 && (
                <div className="column">
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={100000} loyalty={loyalty} />
                        <PackageCard coins={200000} loyalty={loyalty} />
                        <PackageCard coins={300000} loyalty={loyalty} />
                        <PackageCard coins={400000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.calc_bonus_wrapper}`}>
                        <div className={`${styles.calc_container}`}>
                            <div>
                                <span
                                    className={`${styles.title_coins_changer}`}>
                                    {/* <Trans>a19</Trans> */}
                                    {t("a19")}
                                </span>
                                <div>
                                    <PlatformChanger />
                                </div>
                            </div>
                            <CoinsChanger title={false} />
                            <div className={`${styles.card_btns}`}>
                                <div className={`${styles.price_currency}`}>
                                    <div className={`${styles.img_wrapper}`}>
                                        {cardCurrency && (
                                            <Image
                                                src={cardCurrency}
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                    </div>
                                    {(cardCoef * stateOrderCoins).toFixed(2)}
                                    <div className={`${styles.dd_wrapper}`}>
                                        <DropdownOrder
                                            title={stateCurrency?.title}
                                            value={flagLangs}
                                        />
                                    </div>
                                    <CardPoints
                                        coins={stateOrderCoins}
                                        full={true}
                                        loyalty={loyalty}
                                    />
                                </div>
                                <div className={`${styles.buy_btn_wrapper}`}>
                                    <Link
                                        href={`/coins/purchase`}
                                        onClick={handleBuyPack}>
                                        <GradientBtn size={{ height: 64 }}>
                                            <span
                                                className={`${styles.text_btn}`}>
                                                {/* <Trans>mainblocks10</Trans> */}
                                                {t("mainblocks10")}
                                            </span>
                                        </GradientBtn>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.product_wrapper}`}>
                            <Product
                                img={
                                    width <= 1024
                                        ? "/img/SBS-Solver-desktop.webp"
                                        : "/img/SBS-Solver-mobile.webp"
                                }
                                h3={t(`sbc`)}
                                text={t(`startSave`)}
                                gradient={
                                    "linear-gradient(180deg, #353054 0%, rgba(53, 48, 84, 0.00) 161.55%);"
                                }
                                handler={redirect}
                                button
                            />
                        </div>
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={500000} loyalty={loyalty} />
                        <PackageCard coins={600000} loyalty={loyalty} />
                        <PackageCard coins={700000} loyalty={loyalty} />
                        <PackageCard coins={800000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={900000} loyalty={loyalty} />
                        <PackageCard coins={1000000} loyalty={loyalty} />
                        <PackageCard coins={1500000} loyalty={loyalty} />
                        <PackageCard coins={2000000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={2500000} loyalty={loyalty} />
                        <PackageCard coins={3000000} loyalty={loyalty} />
                        <PackageCard coins={4000000} loyalty={loyalty} />
                        <PackageCard coins={5000000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={6000000} loyalty={loyalty} />
                        <PackageCard coins={7000000} loyalty={loyalty} />
                        <PackageCard coins={8000000} loyalty={loyalty} />
                        <PackageCard coins={9000000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={10000000} loyalty={loyalty} />
                        <PackageCard coins={15000000} loyalty={loyalty} />
                        <PackageCard coins={20000000} loyalty={loyalty} />
                        <PackageCard coins={30000000} loyalty={loyalty} />
                    </div>
                    <div className={`${styles.gallery_wrapper}`}>
                        <PackageCard coins={40000000} loyalty={loyalty} />
                        <PackageCard coins={50000000} loyalty={loyalty} />
                        <PackageCard coins={60000000} loyalty={loyalty} />
                        <PackageCard coins={70000000} loyalty={loyalty} />
                    </div>
                </div>
            )}
        </div>
        /* </MainContainer> */
    );
};

export default CoinsContent;
