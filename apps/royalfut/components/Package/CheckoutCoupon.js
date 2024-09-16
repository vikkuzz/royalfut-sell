import { useEffect, useMemo, useState } from "react";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import api from "../../Api/Api";
import {
    getPriceAction,
    showMessage,
    userCreateOrder,
} from "../../redux/actions/royalfutActions";
import { getCoef } from "../../utils/functions";
import { getPromoOrder } from "../../redux/actions/royalfutPromocodeAction";

import styles from "./CheckoutCoupon.module.scss";
import { useTranslations } from "next-intl";

const CheckoutCoupon = ({ coinsPage }) => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const statePromoData = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const data = useSelector(
        state => state.royalfutReducer.stock.deliveryMethods
    );
    const [promocode, setPromocode] = useState("");
    const [req, setReq] = useState({
        pending: false,
        fullfield: false,
        rejected: false,
    });

    const t = useTranslations("order");

    const changeTextInput = e => {
        setPromocode(e.target.value);
    };
    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };
    function showNotify(stateOrder) {
        if (stateOrder?.labels) {
            for (let i = 0; i < stateOrder.labels.length; i++) {
                const label = stateOrder.labels[i];

                if (label.toLowerCase() === "promo_out_of_date") {
                    // setTextError(`"Срок действия купона истек"`);
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t(`couponExpired`),
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                    localStorage.removeItem("promocode");
                    // setPromocode(null);
                } else if (label.toLowerCase() === "limit_exceeded") {
                    // setTextError(
                    //     `"Промокод использован максимальное кол-во раз"`
                    // );
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t(`couponLimit`),
                        })
                    );

                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                    localStorage.removeItem("promocode");
                    // setPromocode(null);
                } else if (label.toLowerCase() === "condition_not_met") {
                    // setTextError(
                    //     `"Сумма заказа не удовлетворяет минимальной для использования промокода"`
                    // );
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t(`couponCondition`),
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                    localStorage.removeItem("promocode");
                    // setPromocode(null);
                } else if (label.toLowerCase() === "promo_not_found") {
                    // setTextError(`"Промокод не найден"`);
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t(`invalidPromo`),
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                    localStorage.removeItem("promocode");
                    // setPromocode(null);
                }
            }
        }
    }
    useMemo(() => {
        let platform = statePlatform.ps ? "ps4" : "xbox";
        if (statePlatform.pc) {
            platform = "pc";
        }
        async function getPromoData(promoName) {
            let localMethod = stateMethod.easy ? "Easy" : "Manual";
            let coins = +stateOrderCoins;

            if (coinsPage === "order") {
                coins = +stateOrderCoins;
            }
            if (stateOrder?.id && stateUser?.token) {
                await api
                    .updateOrder(
                        stateOrder?.id,
                        stateUser.token,
                        platform,
                        localMethod,
                        Number(coins),
                        stateCurrency.title,
                        promoName,
                        getError
                    )
                    .then(res => {
                        let coins = +stateOrderCoins;

                        if (coinsPage === "order") {
                            coins = +stateOrderCoins;
                        }
                        let localMethod = stateMethod.easy ? "Easy" : "Manual";

                        if (coinsPage === "order") {
                            coins = +stateOrderCoins;
                        }
                        let currentCoef = getCoef(
                            stateCurrency.title,
                            localMethod,
                            platform,
                            data
                        );

                        let localPrice = (currentCoef * coins).toFixed(2);
                        let coinsData = {
                            fullprice: localPrice,
                            couponprice: (
                                +localPrice -
                                (+localPrice / 100) * res?.promoDiscount
                            ).toFixed(2),
                            discvalue: (
                                (localPrice / 100) *
                                res?.promoDiscount
                            ).toFixed(2),
                        };
                        let promodata = { ...res, ...coinsData };
                        if (res.promoCode) {
                            dispatch(getPromoOrder(promodata));
                        } else {
                            dispatch(getPromoOrder(null));
                        }

                        dispatch(getPriceAction(res?.overallPrice));
                    });
            }
        }

        let promotext = promocode ?? stateOrder?.promoCode;
        if (promotext) {
            getPromoData(promotext);
        } else if (statePromoData && statePromoData?.discount) {
            let coins = +stateOrderCoins;

            if (coinsPage === "order") {
                coins = +stateOrderCoins;
            }

            let currentCoef = getCoef(
                stateCurrency.title,
                stateMethod.easy ? "Easy" : "Manual",
                platform,
                data
            );

            let localPrice = (currentCoef * coins).toFixed(2);
            let coinsData = {
                fullprice: localPrice,
                couponprice: (
                    localPrice -
                    (localPrice / 100) * statePromoData?.discount
                ).toFixed(2),
                discvalue: (
                    (localPrice / 100) *
                    statePromoData?.discount
                ).toFixed(2),
            };
            let promodata = { ...statePromoData, ...coinsData };
            dispatch(getPromoOrder(promodata));
        }
    }, [statePlatform, stateMethod, stateCurrency, stateOrderCoins]);

    const sendPromo = async () => {
        let platform = statePlatform.ps ? "ps4" : "xbox";
        if (statePlatform.pc) {
            platform = "pc";
        }
        let coins = +stateOrderCoins;

        if (coinsPage === "order") {
            coins = +stateOrderCoins;
        }
        if (stateUser.token) {
            if (promocode) {
                setReq({
                    pending: true,
                    fullfield: false,
                    rejected: false,
                });
                let localMethod = stateMethod.easy ? "Easy" : "Manual";

                localStorage.setItem(
                    "promocode",
                    JSON.stringify({ promocode: promocode, url: pathname })
                );
                const currentOrder = await api.updateOrder(
                    stateOrder?.id,
                    stateUser.token,
                    platform,
                    localMethod,
                    coins,
                    stateCurrency.title,
                    promocode,
                    getError
                );
                showNotify(currentOrder);
                currentOrder.labels.length = 1;
                if (currentOrder.promoDiscount && currentOrder.promoCode) {
                    setReq({
                        fullfield: true,
                        pending: false,
                        rejected: false,
                    });
                }
                dispatch(userCreateOrder(currentOrder));
                dispatch(getPromoOrder(currentOrder));
                dispatch(getPriceAction(currentOrder?.overallPrice));
            }
        } else {
            setReq({
                pending: true,
                fullfield: false,
                rejected: false,
            });
            localStorage.setItem(
                "promocode",
                JSON.stringify({ promocode: promocode, url: pathname })
            );
            await api
                .checkPromo(promocode, coins)
                .then(res => {
                    let currentCoef = getCoef(
                        stateCurrency.title,
                        stateMethod.easy ? "Easy" : "Manual",
                        platform,
                        data
                    );

                    let localPrice = (currentCoef * coins).toFixed(2);
                    if (res.error.length === 0) {
                        let coinsData = {
                            fullprice: localPrice,
                            couponprice: (
                                localPrice -
                                (localPrice / 100) * res.discount
                            ).toFixed(2),
                            discvalue: (
                                (localPrice / 100) *
                                res.discount
                            ).toFixed(2),
                        };
                        res = { ...res, ...coinsData };
                        dispatch(getPromoOrder(res));
                        setReq({
                            pending: false,
                            fullfield: true,
                            rejected: false,
                        });
                    } else {
                        if (
                            res.error.toLowerCase() === "promocode is expired"
                        ) {
                            dispatch(
                                showMessage({
                                    status: "error",
                                    text: t(`couponExpired`),
                                })
                            );
                            setReq({
                                pending: false,
                                fullfield: false,
                                rejected: true,
                            });
                        } else if (
                            res.error.toLowerCase() ===
                            "promocode exceed quantity usage"
                        ) {
                            dispatch(
                                showMessage({
                                    status: "error",
                                    text: t(`couponLimit`),
                                })
                            );

                            setReq({
                                pending: false,
                                fullfield: false,
                                rejected: true,
                            });
                        } else if (
                            res.error.toLowerCase() ===
                            "min order coins sum not applicable for promocode"
                        ) {
                            dispatch(
                                showMessage({
                                    status: "error",
                                    text: t(`couponCondition`),
                                })
                            );
                            setReq({
                                pending: false,
                                fullfield: false,
                                rejected: true,
                            });
                        } else if (
                            res.error.toLowerCase() === "promocode not found"
                        ) {
                            dispatch(
                                showMessage({
                                    status: "error",
                                    text: t(`invalidPromo`),
                                })
                            );
                            setReq({
                                pending: false,
                                fullfield: false,
                                rejected: true,
                            });
                        }
                    }
                })
                .catch(er => {
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                });
        }
    };

    useEffect(() => {
        if (localStorage.getItem("promocode")) {
            setPromocode(
                JSON.parse(localStorage.getItem("promocode")).promocode
            );
        }
    }, []);
    useEffect(() => {
        if (stateOrder?.promoDiscount && stateOrder?.promoCode) {
            setReq({
                fullfield: true,
                pending: false,
                rejected: false,
            });
        }
    }, [stateOrder]);
    const resetCoupon = async () => {
        setReq({ pending: false, rejected: false, fullfield: false });
        // localStorage.removeItem("promocode");

        let coins = +stateOrderCoins;
        let localMethod = stateMethod.easy ? "Easy" : "Manual";

        let platform = statePlatform.ps ? "ps4" : "xbox";
        if (statePlatform.pc) {
            platform = "pc";
        }
        if (stateOrder?.id) {
            const currentOrder = await api.updateOrder(
                stateOrder?.id,
                stateUser.token,
                platform,
                localMethod,
                coins,
                stateCurrency.title,
                null,
                getError
            );

            currentOrder.labels.length = 1;
            // setPromocode("");
            dispatch(userCreateOrder(currentOrder));
        }
        dispatch(getPromoOrder(null));
    };
    return (
        <div className={`${styles.coupon_container}`}>
            <fieldset className={`${styles.coupon_fiildset}`}>
                {promocode?.length > 0 && (
                    <button
                        type="button"
                        className={`${styles.apply_btn} ${req?.pending && "disabled"}`}
                        onClick={sendPromo}>
                        {req.pending ? <Spin /> : t(`seo76`)}
                    </button>
                )}
                <input
                    className={`${styles.coupon_input}`}
                    type="text"
                    placeholder={t(`ab106`)}
                    value={promocode}
                    onChange={changeTextInput}></input>
                <div className={`${styles.icon}`}>
                    <Image
                        width={16}
                        height={16}
                        src={"/img/coupon_white.svg"}
                    />
                </div>
                <div
                    className={`${styles.fake_input} ${
                        (req?.fullfield || req?.rejected || req?.pending) &&
                        styles.index_back
                    }`}>
                    {(req?.fullfield || req?.rejected || req?.pending) && (
                        <div className={styles.status_interface}>
                            <div className={`${styles.status_wrapper}`}>
                                {(req?.fullfield || req?.rejected) && (
                                    <div className={`${styles.icon_status}`}>
                                        <Image
                                            width={16}
                                            height={16}
                                            src={
                                                req?.fullfield
                                                    ? "/img/done_green.svg"
                                                    : "/img/warning-circle.svg"
                                            }
                                        />
                                    </div>
                                )}
                                {req?.pending && (
                                    <div className={`${styles.icon_status}`}>
                                        <Image
                                            width={16}
                                            height={16}
                                            src={"/img/coupon_transparent.svg"}
                                        />
                                    </div>
                                )}
                                {req?.fullfield && (
                                    <div className={`${styles.green_text}`}>
                                        {`${
                                            statePromoData?.value?.toUpperCase() ||
                                            stateOrder?.promoCode?.toUpperCase()
                                        } (${statePromoData?.discount || stateOrder?.promoDiscount}%)`}
                                    </div>
                                )}
                                {req?.rejected && (
                                    <div className={`${styles.red_text}`}>
                                        {`${promocode?.toUpperCase()}`}
                                    </div>
                                )}
                                {req?.pending && (
                                    <div className={`${styles.gray_text}`}>
                                        {`${promocode?.toUpperCase()}`}
                                    </div>
                                )}
                                {/* <div
                                    className={`${
                                        req?.fullfield
                                            ? styles.green_text
                                            : styles.red_text
                                    }`}
                                >
                                    {req?.fullfield
                                        ? `${
                                              statePromoData?.value ||
                                              stateOrder?.promoCode
                                          } (${
                                              statePromoData?.discount ||
                                              stateOrder?.promoDiscount
                                          }%)`
                                        : t`locales.invalidPromo`}
                                </div> */}
                            </div>
                            <button
                                onClick={resetCoupon}
                                type="button"
                                className={styles.cancel_btn}>
                                {(req?.fullfield || req?.rejected) && (
                                    <div className={styles.cancel_btn_icon}>
                                        <Image
                                            alt="cancel"
                                            width={16}
                                            height={16}
                                            src={"/img/Cancel_16px_white.svg"}
                                        />
                                    </div>
                                )}
                                {req?.pending && (
                                    <div
                                        className={`${styles.cancel_btn_icon} ${styles.rotate}`}>
                                        <Image
                                            alt="loading"
                                            width={16}
                                            height={16}
                                            src={"/img/progress_activity.svg"}
                                        />
                                    </div>
                                )}
                            </button>
                        </div>
                    )}
                </div>
                {req?.rejected && (
                    <div className={styles.message_error_text}>
                        {/* <Trans>locales.invalidPromo</Trans> */}
                        {t("invalidPromo")}
                    </div>
                )}
            </fieldset>
        </div>
    );
};

export default CheckoutCoupon;
