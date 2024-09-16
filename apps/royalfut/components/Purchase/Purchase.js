import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Trans, t } from "@lingui/macro";
import api from "../../Api/Api";
import {
    getCalcFunnel,
    loginModal,
    modalFunnelCalc,
    registrationClick,
    showMessage,
    userCreateOrder,
} from "../../redux/actions/royalfutActions";
import { getDiscount, getPrice } from "../../utils/functions";
import Garantee from "../Garantee/Garantee";
import PriceCouponRedesign from "../PriceCouponRedesign/PriceCouponRedesign";
import Payments from "../Payments/Payments";
import { onGooglePaymentButtonClicked } from "../../utils/google_unlimint";
import onApplePayButtonClicked from "../../utils/applepay";

import styles from "../../styles/Purchase.module.scss";

const Purchase = () => {
    const stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const statePromoData = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const purchase_btn = useRef(null);
    const submit = useRef(null);
    const stateFunnel = useSelector(state => state.royalfutReducer.calcFunnel);
    const stateCreateOrder = useSelector(
        state => state.royalfutReducer.createOrder
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const data = useSelector(
        state => state.royalfutReducer.stock.deliveryMethods
    );

    const statePayment = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const discounts = useSelector(
        state => state.royalfutReducer.stock.discount
    );
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    let sortedDiscounts = [...discounts].sort(
        (a, b) => a.limitSumCoins - b.limitSumCoins
    );

    // let [funnel, setFunnel] = useState(stateFunnel);
    let [payment, setPayment] = useState(statePayment);
    let [modulData, setModulData] = useState(null);
    let [dis, setDis] = useState(false);

    useEffect(() => {
        if (dis === true) {
            setTimeout(() => setDis(false), 3000);
        }
    }, [dis]);

    const dispatch = useDispatch();
    const router = useRouter();

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    async function getLocaleData() {
        if (router.asPath.includes("applepay")) {
            return {
                coins: 100000,
                method: {
                    easy: true,
                    manual: false,
                },
                platform: {
                    xbox: false,
                    ps: true,
                },
                currency: {
                    currency: "$",
                    title: "USD",
                    id: "0",
                    country: "",
                },
                discount: 1,
                price: "106.30",
            };
        }
        return await JSON.parse(localStorage.getItem("/purchase"));
    }

    useEffect(() => {
        if (getLocaleData()) {
            getLocaleData().then(res => {
                res?.coins && dispatch(getCalcFunnel(res));
            });
        }
        return () => {
            localStorage.setItem("/purchase", JSON.stringify(stateFunnel));
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("/purchase", JSON.stringify(stateFunnel));
    }, [stateFunnel]);

    useEffect(() => {
        if (statePayment === "acquiring") {
            setPayment({
                img: "By card.svg",
                name: "card",
                text: t`a136`,
            });
        } else if (statePayment === "apple") {
            setPayment({
                img: "apple_pay_full.svg",
                name: "apple",
                text: t`a136`,
            });
        } else if (statePayment === "bitcoin") {
            setPayment({
                img: "bitcoin.svg",
                name: "Bitcoin",
                text: t`a138`,
            });
        } else if (statePayment === "etherium") {
            setPayment({
                img: "etherium.svg",
                name: "Etherium",
                text: t`a138`,
            });
        } else if (statePayment === "usdt") {
            setPayment({
                img: "Tether.svg",
                name: "Tether USDT",
                text: t`a138`,
            });
        } else if (statePayment === "eubanktransfer") {
            setPayment({
                img: "tink_flags_column.svg",
                name: "Bank",
                text: t`a137`,
            });
        } else if (statePayment === "unionPay") {
            setPayment({
                img: "UnionPay36x36.svg",
                name: "UnionPay",
                text: t`a136`,
            });
        } else if (statePayment === "gPay") {
            setPayment({
                img: "google_pay_full.svg",
                name: "Google Pay",
                text: t`a136`,
            });
        } else if (statePayment === "crypto") {
            setPayment({
                img: "all_crypto.svg",
                name: "By Crypto",
                text: t`a138`,
            });
        } else {
            setPayment({
                img: "By card.svg",
                name: "card",
                text: t`a136`,
            });
        }
    }, [statePayment, router]);

    useEffect(() => {
        if (stateFunnel?.coins && stateFunnel.method) {
            let localFunnel = { ...stateFunnel };
            if (stateFunnel?.method?.easy === true) {
                if (+stateFunnel?.coins < 100000) {
                    localFunnel.coins = 100000;
                }
                if (+stateFunnel?.coins > 20000000) {
                    localFunnel.coins = 20000000;
                }
                if (stateFunnel?.coins < 0) {
                    localFunnel.coins = 0;
                }
            } else if (stateFunnel?.method?.manual === true) {
                if (+stateFunnel?.coins < 100000) {
                    localFunnel.coins = 100000;
                }
                if (+stateFunnel?.coins > 1000000) {
                    localFunnel.coins = 1000000;
                }
                if (stateFunnel?.coins < 0) {
                    localFunnel.coins = 0;
                }
            }
            let priceWithoutDisc = getPrice(
                stateFunnel?.platform,
                stateFunnel?.method,
                stateFunnel?.coins,
                stateFunnel?.currency,
                data
            );
            let percentDiscount = getDiscount(
                sortedDiscounts,
                stateFunnel?.coins
            );
            let fullPrice = priceWithoutDisc.toFixed(2);
            if (percentDiscount > 1) {
                fullPrice = (
                    priceWithoutDisc -
                    (priceWithoutDisc / 100) * percentDiscount
                ).toFixed(2);
            }
            localFunnel.discount = percentDiscount;
            localFunnel.price = fullPrice;
            dispatch(getCalcFunnel(localFunnel));
        }
    }, [
        stateFunnel?.coins,
        stateFunnel?.method,
        stateFunnel?.platform,
        stateFunnel?.currency,
        stateStock,
    ]);

    const onPurchaseClick = async e => {
        if (stateUser.token) {
            if (!stateCreateOrder?.id) {
                return;
            }

            setDis(true);

            if (statePayment === "apple") {
                onApplePayButtonClicked(
                    stateCreateOrder?.id,
                    stateFunnel?.currency.title,
                    statePromoData?.overallPrice ?? stateFunnel?.price,
                    stateUser?.token
                );
            } else {
                const paymentOrder = async () => {
                    const currentOrder = await api.updateOrder(
                        stateCreateOrder?.id,
                        stateUser?.token,
                        stateFunnel?.platform.ps ? "ps4" : "xbox",
                        stateFunnel?.method.easy ? "Easy" : "Manual",
                        +stateFunnel?.coins,
                        stateFunnel?.currency.title,
                        stateCreateOrder?.promoCode || null,
                        getError
                    );
                    if (currentOrder && currentOrder?.labels) {
                        currentOrder.labels.length = 1;
                    }

                    dispatch(userCreateOrder(currentOrder));

                    if (statePayment === "gPay") {
                        onGooglePaymentButtonClicked(
                            currentOrder?.id,
                            stateUser?.token,
                            stateCurrency.title,
                            currentOrder?.overallPrice
                        );
                    } else {
                        localStorage.setItem(
                            "/purchase",
                            JSON.stringify(stateFunnel)
                        );
                        if (
                            statePayment == "acquiring" &&
                            stateFunnel.currency.title == "RUB"
                        ) {
                            await api
                                .prePayModul(
                                    statePayment,
                                    stateUser?.token,
                                    stateCreateOrder?.id,
                                    stateLocale?.title.toLowerCase(),
                                    stateFunnel?.platform.ps ? "ps4" : "xbox",
                                    stateFunnel?.method.easy
                                        ? "Easy"
                                        : "Manual",
                                    data[stateFunnel?.method.easy ? 0 : 1]
                                        .data[1].pricePerCurrencyMap.EUR,
                                    +stateFunnel?.coins,
                                    stateOrder?.promoCode || null,
                                    stateUser?.email,
                                    "purchase",
                                    getError
                                )
                                .then(res => {
                                    setModulData(Object.entries(res));
                                })
                                .then(() => submit.current.click());
                        } else {
                            await api
                                .prePay(
                                    statePayment,
                                    stateUser?.token,
                                    stateCreateOrder?.id,
                                    stateLocale?.title.toLowerCase(),
                                    stateFunnel?.platform.ps ? "ps4" : "xbox",
                                    stateFunnel?.method.easy
                                        ? "Easy"
                                        : "Manual",
                                    data[stateFunnel?.method.easy ? 0 : 1]
                                        .data[1].pricePerCurrencyMap.EUR,
                                    +stateFunnel?.coins,
                                    stateOrder?.promoCode || null,
                                    stateUser?.email,
                                    "purchase",
                                    getError
                                )
                                .then(res => {
                                    router.push(res?.acquiringLink);
                                });
                        }
                    }
                };
                paymentOrder();
            }
        }
        if (!stateUser.token) {
            dispatch(loginModal(true));
            dispatch(registrationClick());
        }
    };

    return stateFunnel && stateFunnel?.currency && stateFunnel?.method ? (
        <ErrorBoundary fallback={"Technical error. Please contact support"}>
            <div className={`${styles.container}`}>
                <div className={`${styles.block_wrapper}`}>
                    <h2 id="pay-method" className={`${styles.purchase_h}`}>
                        <Trans>seo153</Trans>
                    </h2>
                    <div className={`${styles.order_wrapper}`}>
                        <div className={`${styles.order_row}`}>
                            <img
                                alt="coins"
                                src="/img/Fut coin.svg"
                                className={`${styles.fut_icon}`}
                            />
                            <div className={`${styles.info_order_wrapper}`}>
                                <div className={`${styles.info_row}`}>
                                    <span>
                                        {Number(
                                            stateFunnel?.coins
                                        ).toLocaleString("ru-RU")}{" "}
                                        <Trans>locales.pageCoinsFifa</Trans>
                                    </span>
                                    <span></span>
                                </div>
                                <div className={`${styles.info_row}`}>
                                    <span
                                        className={`${styles.price_gold}`}>{`${stateFunnel?.currency?.currency} ${stateFunnel?.price}`}</span>
                                    <span
                                        className={`${styles.price_line_through} ${
                                            stateFunnel?.discount < 3 && "hide"
                                        } `}>
                                        {stateFunnel?.currency.currency}{" "}
                                        {(
                                            (stateFunnel?.price /
                                                (100 - stateFunnel?.discount)) *
                                            100
                                        )
                                            .toFixed(2)
                                            .toLocaleString("ru-RU")}
                                    </span>
                                    <div
                                        className={`${styles.disc} ${stateFunnel?.discount < 3 && "hide"}`}>
                                        {`-${stateFunnel?.discount}%`}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.order_btns_wrapper}`}>
                                <button
                                    className={`${styles.edit_btn}`}
                                    onClick={() =>
                                        dispatch(modalFunnelCalc(true))
                                    }>
                                    <img alt="edit" src="/img/edit.svg" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column from-1025-to-1900 gap_8 margin_top_8">
                        <h2 className={`${styles.purchase_h}`}>
                            <Trans>seo30</Trans>
                        </h2>
                        <div className={`${styles.order_wrapper}`}>
                            <div className={`${styles.block_wrapper}`}>
                                {/* <div className={`${styles.order_wrapper}`}> */}
                                <ErrorBoundary
                                    fallback={
                                        "Technical error. Please contact support"
                                    }>
                                    <Payments />
                                </ErrorBoundary>
                                {/* </div> */}
                                <div
                                    className={`from-375-to-1024 ${styles.coupon_wrapper}`}>
                                    <ErrorBoundary
                                        fallback={
                                            "Technical error. Please contact support"
                                        }>
                                        <PriceCouponRedesign
                                            coinsPage={"purchase"}
                                        />
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.for_desk_wrapper}`}>
                    <div className={`${styles.block_wrapper} from-375-to-1024`}>
                        <h2 className={`${styles.purchase_h}`}>
                            <Trans>seo30</Trans>
                        </h2>
                        {/* <div className={`${styles.order_wrapper}`}> */}
                        <ErrorBoundary
                            fallback={
                                "Technical error. Please contact support"
                            }>
                            <Payments />
                        </ErrorBoundary>
                        {/* </div> */}
                        <div
                            className={`from-375-to-1024 ${styles.coupon_wrapper}`}>
                            <ErrorBoundary
                                fallback={
                                    "Technical error. Please contact support"
                                }>
                                <PriceCouponRedesign coinsPage={"purchase"} />
                            </ErrorBoundary>
                        </div>
                    </div>

                    <div className={styles.details_wrapper}>
                        <h2
                            className={`${styles.purchase_h} from-1025-to-1900`}>
                            <Trans>seo155</Trans>
                        </h2>
                        <div className={`${styles.pay_desk_wrapper}`}>
                            <div className={`${styles.sticky_block}`}>
                                <div className={`${styles.wrapper_price_step}`}>
                                    {statePromoData &&
                                    statePromoData.fullprice &&
                                    statePromoData.couponprice ? (
                                        <div
                                            className={`${styles.price_step_wrapper}`}>
                                            <span
                                                className={`${styles.price_line_through} ${
                                                    stateFunnel.discount < 3 &&
                                                    !statePromoData &&
                                                    styles.hide
                                                } `}>
                                                {stateCurrency.currency}{" "}
                                                {Number(
                                                    statePromoData?.fullprice
                                                )
                                                    .toFixed(2)
                                                    .toLocaleString("ru-RU")}
                                            </span>
                                            <span
                                                className={`${styles.price_total} `}>
                                                {stateCurrency.currency}{" "}
                                                {Number(
                                                    statePromoData?.couponprice
                                                )
                                                    .toFixed(2)
                                                    .toLocaleString("ru-RU")}
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            className={`${styles.price_step_wrapper}`}>
                                            <span
                                                className={`${styles.price_line_through} ${
                                                    styles.purchase_disc
                                                } ${stateFunnel.discount < 3 && styles.hide} `}>
                                                {stateFunnel?.currency.currency}{" "}
                                                {(
                                                    (stateFunnel?.price /
                                                        (100 -
                                                            stateFunnel?.discount)) *
                                                    100
                                                )
                                                    .toFixed(2)
                                                    .toLocaleString("ru-RU")}
                                            </span>
                                            <span
                                                className={`${styles.price_total} `}>
                                                <span
                                                    className={`${styles.price_gold} ${styles.gold_price}`}>{`${stateFunnel?.currency?.currency} ${
                                                    statePromoData?.overallPrice ??
                                                    stateFunnel?.price
                                                }`}</span>
                                            </span>
                                        </div>
                                    )}
                                    <div className={`${styles.pay_method}`}>
                                        <a
                                            className={`${styles.pay_method_a}`}
                                            href="#pay-method">
                                            <span
                                                className={`${styles.text_pay_name}`}>{`${payment?.text}`}</span>
                                            <img
                                                className={`${styles.payment_img}`}
                                                alt="pay"
                                                src={`/img/${payment?.img}`}></img>
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.coupon_desc_wrapper} from-1025-to-1900`}>
                                    <ErrorBoundary
                                        fallback={
                                            "Technical error. Please contact support"
                                        }>
                                        <PriceCouponRedesign
                                            coinsPage={"purchase"}
                                        />
                                    </ErrorBoundary>
                                </div>
                                {stateCurrency.title == "RUB" &&
                                    statePayment == "acquiring" && (
                                        <form
                                            className={`${styles.hidden_form}`}
                                            method="post"
                                            action="https://pay.modulbank.ru/pay">
                                            {modulData?.map(el => {
                                                if (el[0] != "acquiringLink") {
                                                    return (
                                                        <input
                                                            key={el[0]}
                                                            type="hidden"
                                                            name={el[0]}
                                                            value={
                                                                typeof el[1] ==
                                                                "string"
                                                                    ? el[1].replaceAll(
                                                                          "&amp;",
                                                                          "&"
                                                                      )
                                                                    : el[1]
                                                            }
                                                        />
                                                    );
                                                }
                                            })}

                                            <input
                                                ref={submit}
                                                className={`hidden `}
                                                type="submit"
                                                value={
                                                    stateUser.token
                                                        ? t`locales.payNow`
                                                        : t`locales.authToPay`
                                                }
                                                readOnly
                                            />
                                        </form>
                                    )}
                                <button
                                    id={"paymentBtn"}
                                    ref={purchase_btn}
                                    className={`${styles.purchase_btn} ${
                                        stateBuyOff &&
                                        !router.asPath.includes("applepay") &&
                                        "disabled"
                                    } ${dis && "disabled"}`}
                                    onClick={onPurchaseClick}>
                                    {dis ? (
                                        <span className="loader">
                                            <Spin />
                                        </span>
                                    ) : stateUser.token ? (
                                        t`locales.payNow`
                                    ) : (
                                        t`locales.authToPay`
                                    )}
                                </button>
                            </div>
                            <div className="from-1025-to-1900">
                                <ErrorBoundary
                                    fallback={
                                        "Technical error. Please contact support"
                                    }>
                                    <Garantee />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </div>
                    <div className="from-375-to-1024">
                        <ErrorBoundary
                            fallback={
                                "Technical error. Please contact support"
                            }>
                            <Garantee />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    ) : (
        <ErrorBoundary fallback={"Technical error. Please contact support"}>
            <div className="column">
                <Trans>a11</Trans>
                <div className={`${styles.spin_bckgr}`}>
                    <Spin />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Purchase;
