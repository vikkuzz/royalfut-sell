import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { Trans } from "@lingui/macro";
import api from "../../Api/Api";
import {
    getCalcFunnel,
    getPriceAction,
    showMessage,
    userCreateOrder,
} from "../../redux/actions/royalfutActions";
import { getCoef } from "../../utils/functions";
import { getPromoOrder } from "../../redux/actions/royalfutPromocodeAction";

import styles from "../../styles/PriceCouponRedesign.module.scss";

const PriceCouponRedesign = ({ customStyle, coinsPage }) => {
    const couponBtn = useRef(null);
    const dispatch = useDispatch();
    const stateCoins = useSelector(state => state.royalfutReducer.calcCoins);
    const stateCalcFunnel = useSelector(
        state => state.royalfutReducer.calcFunnel
    );
    const statePromoData = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const data = useSelector(
        state => state.royalfutReducer.stock.deliveryMethods
    );

    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const stateFunnel = useSelector(state => state.royalfutReducer.calcFunnel);
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const coinsPurchase = useSelector(
        state => state.royalfutReducer.data_coins_page
    );
    let [req, setReq] = useState({
        pending: false,
        fullfield: false,
        rejected: false,
    });
    let [hide, setHide] = useState(true);
    let [promocode, setPromocode] = useState(null);
    let [hideFieldset, setHideFieldset] = useState(false);

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useMemo(() => {
        async function getPromoData(promoName) {
            let localMethod = stateMethod.easy ? "Easy" : "Manual";
            let coins =
                coinsPage === "coins" ? +coinsPurchase?.coins : +stateCoins;
            if (coinsPage === "purchase") {
                localMethod = stateFunnel?.method.easy ? "Easy" : "Manual";
                coins = +stateFunnel.coins;
            }
            if (stateOrder.id && stateUser.token) {
                await api
                    .updateOrder(
                        stateOrder.id,
                        stateUser.token,
                        statePlatform.ps ? "ps4" : "xbox",
                        localMethod,
                        Number(coins),
                        stateCurrency.title,
                        promoName,
                        getError
                    )
                    .then(res => {
                        let coins =
                            coinsPage === "coins"
                                ? +coinsPurchase.coins
                                : +stateCoins;
                        let localMethod = stateMethod.easy ? "Easy" : "Manual";
                        if (coinsPage === "purchase") {
                            coins = +stateFunnel.coins;
                            localMethod = stateFunnel?.method.easy
                                ? "Easy"
                                : "Manual";
                        }
                        let currentCoef = getCoef(
                            stateCurrency.title,
                            localMethod,
                            statePlatform.ps ? "ps4" : "xbox",
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

        let promotext = promocode ?? stateOrder.promoCode;
        if (promotext) {
            getPromoData(promotext);
        } else if (statePromoData && statePromoData?.discount) {
            let coins =
                coinsPage === "coins" ? +coinsPurchase.coins : +stateCoins;
            if (coinsPage === "purchase") {
                coins = +stateFunnel.coins;
            }
            let currentCoef = getCoef(
                stateCurrency.title,
                stateMethod.easy ? "Easy" : "Manual",
                statePlatform.ps ? "ps4" : "xbox",
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
    }, [
        statePlatform,
        stateMethod,
        stateCurrency,
        coinsPurchase,
        stateCoins,
        stateFunnel,
    ]);

    const promoCodeTemplate = callback => {
        let coins = coinsPage === "coins" ? +coinsPurchase.coins : +stateCoins;
        if (coinsPage === "purchase") {
            coins = Number(stateFunnel.coins);
        }

        return stateUser?.token
            ? statePromoData && (
                  <>
                      <div
                          className={`${styles.payment_method__total_coupon_title} ${styles.redesign_promo}`}>
                          {statePromoData?.promoCode}{" "}
                          <img
                              alt="coupon"
                              className={`${styles.coupon_pic} ${styles.pic_promo}`}
                              src="/img/coupon.svg"></img>
                      </div>
                      <div
                          className={`${styles.payment_method__total_coupon_addon} ${styles.redesign_add}`}>
                          <span>
                              - {stateCurrency.currency}{" "}
                              {(
                                  (statePromoData?.overallPrice /
                                      (100 - statePromoData?.promoDiscount)) *
                                      100 -
                                  statePromoData?.overallPrice
                              ).toFixed(2)}{" "}
                              {`-${statePromoData?.promoDiscount}%`}
                          </span>
                          <button
                              className={`${styles.close_coupon}`}
                              onClick={() => {
                                  localStorage.removeItem("promocode");
                                  callback();
                                  setReq({
                                      pending: false,
                                      fullfield: false,
                                      rejected: false,
                                  });
                                  dispatch(getPromoOrder(null));
                                  setHide(true);
                              }}></button>
                      </div>
                  </>
              )
            : statePromoData && (
                  <div>
                      <div
                          className={`${styles.payment_method__total_coupon_title} ${styles.redesign_promo}`}>
                          {statePromoData?.value}{" "}
                          <img
                              alt="coupon"
                              className={`${styles.coupon_pic} ${styles.pic_promo}`}
                              src="/img/coupon.svg"></img>
                      </div>
                      <div
                          className={`${styles.payment_method__total_coupon_addon} ${styles.redesign_add}`}>
                          <span>{`-${stateCurrency.currency} ${statePromoData?.discvalue}`}</span>
                          <span>{`-${statePromoData?.discount}%`}</span>
                          <button
                              className={`${styles.close_coupon}`}
                              onClick={() => {
                                  setReq({
                                      pending: false,
                                      fullfield: false,
                                      rejected: false,
                                  });
                                  dispatch(getPromoOrder(null));
                                  setHide(true);
                              }}></button>
                      </div>
                  </div>
              );
    };

    useEffect(() => {
        if (stateOrder?.labels) {
            for (let i = 0; i < stateOrder.labels.length; i++) {
                const label = stateOrder.labels[i];

                if (label.toLowerCase() === "promo_out_of_date") {
                    // setTextError(`"Срок действия купона истек"`);
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t`locales.couponExpired`,
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                } else if (label.toLowerCase() === "limit_exceeded") {
                    // setTextError(
                    //     `"Промокод использован максимальное кол-во раз"`
                    // );
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t`locales.couponLimit`,
                        })
                    );

                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                } else if (label.toLowerCase() === "condition_not_met") {
                    // setTextError(
                    //     `"Сумма заказа не удовлетворяет минимальной для использования промокода"`
                    // );
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t`locales.couponCondition`,
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                } else if (label.toLowerCase() === "promo_not_found") {
                    // setTextError(`"Промокод не найден"`);
                    dispatch(
                        showMessage({
                            status: "error",
                            text: t`locales.invalidPromo`,
                        })
                    );
                    setReq({
                        pending: false,
                        fullfield: false,
                        rejected: true,
                    });
                }
            }
        }
        if (stateOrder?.promoCode || stateOrder?.value) {
            setReq({
                pending: false,
                fullfield: true,
                rejected: false,
            });
        } else {
            setReq({
                pending: false,
                fullfield: false,
                rejected: false,
            });
            // setHideFieldset(false);
        }
    }, [stateOrder]);

    const router = useRouter();

    const sendPromo = async () => {
        if (stateUser.token) {
            if (promocode) {
                setReq({
                    pending: true,
                    fullfield: false,
                    rejected: false,
                });
                let localMethod = stateMethod.easy ? "Easy" : "Manual";
                let coins =
                    coinsPage === "coins" ? +coinsPurchase.coins : +stateCoins;
                if (coinsPage === "purchase") {
                    coins = +stateFunnel.coins;
                    localMethod = stateCalcFunnel?.method.easy
                        ? "Easy"
                        : "Manual";
                }
                localStorage.setItem(
                    "promocode",
                    JSON.stringify({ promocode: promocode, url: router.asPath })
                );
                const currentOrder = await api.updateOrder(
                    stateOrder.id,
                    stateUser.token,
                    statePlatform.ps ? "ps4" : "xbox",
                    localMethod,
                    coins,
                    stateCurrency.title,
                    promocode,
                    getError
                );
                dispatch(userCreateOrder(currentOrder));
                dispatch(
                    getCalcFunnel({
                        ...stateFunnel,
                        price: currentOrder?.overallPrice,
                    })
                );
                dispatch(getPriceAction(currentOrder?.overallPrice));
                setHideFieldset(true);
            }
        } else {
            setReq({
                pending: true,
                fullfield: false,
                rejected: false,
            });
            let coins =
                coinsPage === "coins" ? +coinsPurchase.coins : +stateCoins;
            if (coinsPage === "purchase") {
                coins = +stateFunnel.coins;
            }
            localStorage.setItem(
                "promocode",
                JSON.stringify({ promocode: promocode, url: router.asPath })
            );
            await api
                .checkPromo(promocode, coins)
                .then(res => {
                    let currentCoef = getCoef(
                        stateCurrency.title,
                        stateMethod.easy ? "Easy" : "Manual",
                        statePlatform.ps ? "ps4" : "xbox",
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
                        setHideFieldset(true);
                    } else {
                        if (
                            res.error.toLowerCase() === "promocode is expired"
                        ) {
                            dispatch(
                                showMessage({
                                    status: "error",
                                    text: t`locales.couponExpired`,
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
                                    text: t`locales.couponLimit`,
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
                                    text: t`locales.couponCondition`,
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
                                    text: t`locales.invalidPromo`,
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
            // let block = document.querySelector('#paymentBtn');

            // if (block) {
            //     tremor(block);
            // }
            // dispatch(
            //     showMessage({
            //         status: 'error',
            //         text: t`seo93`,
            //     })
            // );
        }

        // setHide(true);
    };
    const handleChangePromo = e => {
        setPromocode(e.target.value);
    };

    const resetCoupon = async () => {
        let coins = coinsPage === "coins" ? +coinsPurchase.coins : +stateCoins;
        let localMethod = stateMethod.easy ? "Easy" : "Manual";
        if (coinsPage === "purchase") {
            coins = +stateFunnel.coins;
            localMethod = stateCalcFunnel?.method.easy ? "Easy" : "Manual";
        }
        if (stateOrder.id) {
            const currentOrder = await api.updateOrder(
                stateOrder.id,
                stateUser.token,
                statePlatform.ps === true ? "ps4" : "xbox",
                localMethod,
                coins,
                stateCurrency.title,
                null,
                getError
            );

            currentOrder.labels.length = 1;
            setPromocode("");
            dispatch(userCreateOrder(currentOrder));
        }
    };

    // useEffect(() => {
    //     if (req.fullfield === true) {
    //         if (stateUser?.token) {
    //             setTimeout(() => {
    //                 setHideFieldset(true);
    //             }, 3000);
    //         } else {
    //             setHideFieldset(true);
    //         }
    //     }
    // }, [req]);

    useEffect(() => {
        if (!statePromoData?.promoCode && !statePromoData?.value) {
            resetCoupon();
        }
    }, [statePromoData]);

    // useEffect(() => {
    //     if (stateUser?.token && stateOrder?.id && statePromoData?.promocode) {
    //         setTimeout(sendPromo, 1000);
    //     }
    // }, [stateUser?.token]);

    const onClickCouponBtn = () => {
        // if (stateUser?.token) {
        setHideFieldset(false);
        setHide(!hide);

        if (hide) {
            couponBtn.current.style.paddingBottom = "16px";
            window.scrollBy(0, 120);
        }
        if (!hide) {
            couponBtn.current.style.paddingBottom = "0px";
        }
        // } else {
        //     let block = document.querySelector('#paymentBtn');

        //     if (block) {
        //         tremor(block);
        //     }
        //     dispatch(
        //         showMessage({
        //             status: 'info',
        //             text: t`seo93`,
        //         })
        //     );
        // }
    };

    return stateOrder ? (
        <div
            className={`${styles.price} ${stateOrder?.promoCode && styles.row}`}>
            <div
                className={`${styles.price_payment_wrapper} ${
                    statePromoData?.promoCode && "hide"
                } ${statePromoData && "hide"} ${
                    customStyle === "paymentStage" && styles.payment_stage_btn
                }`}>
                <button
                    ref={couponBtn}
                    className={`${styles.coupon} ${
                        stateOrder?.promoCode && "hide"
                    } ${customStyle === "paymentStage" && styles.btn_padding}`}
                    onClick={onClickCouponBtn}>
                    <Trans>locales.pageCoinsCoupon</Trans>
                    <img
                        alt="coupon"
                        className={`${styles.coupon_pic}`}
                        src="/img/coupon.svg"></img>
                </button>
            </div>
            {hideFieldset || statePromoData ? (
                promoCodeTemplate(resetCoupon)
            ) : (
                <div
                    className={`${styles.coupon_container_content} ${
                        hide && styles.coupon_content_hide
                    }`}>
                    <fieldset
                        dir={stateDir}
                        className={`${styles.coupon_fieldset}  ${
                            stateOrder?.promoCode && styles.green
                        } ${req?.rejected && styles.failed}`}>
                        <input
                            className={`${styles.coupon_input} ${
                                stateOrder?.promoCode &&
                                styles.coupon_input_green
                            }`}
                            type={"text"}
                            onChange={handleChangePromo}
                            readOnly={
                                stateOrder.promoCode ? true : false
                            }></input>
                        {stateOrder?.promoCode && (
                            <img
                                alt="done"
                                className={`${styles.done}`}
                                src={`${`/img/done_green.svg`}`}
                            />
                        )}
                    </fieldset>

                    {req?.fullfield === false && (
                        <button
                            onClick={sendPromo}
                            className={`${styles.coupon_btn}`}
                            type="button"
                            dir={stateDir}>
                            {req?.pending ? <Spin /> : <Trans>seo76</Trans>}
                        </button>
                    )}
                </div>
            )}
        </div>
    ) : (
        <span></span>
    );
};

export default PriceCouponRedesign;