import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { Trans, t } from "@lingui/macro";
import GradientBtn from "../GradientBtn";
import { useWindowDimensions } from "../../utils/hooks";
import { getDiscount, getPrice } from "../../utils/functions";
import {
    orderPrice,
    orderDiscount,
    orderPriceAfterDiscount,
} from "../../redux/actions/royalfutOrderActions";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import OrderInfo from "./OrderInfo";
import api from "../../Api/Api";
import {
    loginModal,
    registrationClick,
    showMessage,
    userCreateOrder,
} from "../../redux/actions/royalfutActions";
import { onGooglePaymentButtonClicked } from "../../utils/google_unlimint";
import Analitic from "../../Analitic/Analitic";
import CheckoutCoupon from "../Package/CheckoutCoupon";
import PointsBlock from "../LoyaltyProgram/PointsBlock";

import styles from "./StickySecondStep.module.scss";

const analitic = new Analitic();

const StickySecondStep = ({ loyalty }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const submit = useRef(null);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    const statePromo = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const stateOrderReducer = useSelector(state => state.royalfutOrderReducer);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateLoyaltyData = useSelector(
        state => state.royalfutLoyaltyReducer.all_order_loyal_data
    );
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateNamePaymentMethod = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );
    const stateOrderDiscount = useSelector(
        state => state.royalfutOrderReducer.order_discount
    );
    const stateOrderPriceAfterDiscount = useSelector(
        state => state.royalfutOrderReducer.order_price_after_discount
    );
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrderPrice = useSelector(
        state => state.royalfutOrderReducer.order_price
    );
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const { width } = useWindowDimensions();
    const [size, setSize] = useState({
        width: 320,
        height: 56,
    });
    const [localDisc, setLocalDisc] = useState(null);
    const [modulData, setModulData] = useState(null);
    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };
    let platforms = {
        xbox: 0,
        xbox_one: 0,
        xbox_xs: 0,
        ps4: 1,
        ps5: 1,
        ps: 1,
        pc: 2,
    };

    const aproovePayment = () => {
        if (stateUser.token) {
            if (stateNamePaymentMethod === "apple") {
                onApplePayButtonClicked(
                    stateOrder?.id,
                    stateCurrency.title,
                    stateOrderPriceAfterDiscount,
                    stateUser?.token
                );
            } else {
                let t_platform = "ps4";
                if (stateOrderPlatform.includes("ps")) {
                    t_platform = "ps4";
                } else if (stateOrderPlatform.includes("xbox")) {
                    t_platform = "xbox";
                } else {
                    t_platform = "pc";
                }
                const paymentOrder = async () => {
                    const currentOrder = await api.updateOrder(
                        stateOrder.id,
                        stateUser.token,
                        t_platform,
                        stateMethod.easy ? "Easy" : "Manual",
                        Math.round(stateOrderCoins),
                        stateCurrency.title,
                        stateOrder.promoCode || null,
                        getError
                    );

                    currentOrder.labels.length = 1;

                    dispatch(userCreateOrder(currentOrder));

                    if (stateNamePaymentMethod === "gPay") {
                        onGooglePaymentButtonClicked(
                            stateOrder?.id,
                            stateUser?.token,
                            stateCurrency.title,
                            currentOrder?.overallPrice
                        );
                    } else {
                        if (
                            stateNamePaymentMethod == "acquiring" &&
                            stateCurrency.title == "RUB"
                        ) {
                            let priceInEur = (
                                stateStock.deliveryMethods[
                                    stateMethod.easy ? 0 : 1
                                ].data[platforms[stateOrderPlatform]]
                                    .pricePerCurrencyMap.EUR * stateOrderCoins
                            ).toFixed(2);
                            let priceInEurAfterDiscount =
                                stateOrderDiscount > 1
                                    ? (
                                          priceInEur -
                                          (priceInEur / 100) *
                                              stateOrderDiscount
                                      ).toFixed(2)
                                    : priceInEur;
                            await api
                                .prePayModul(
                                    stateNamePaymentMethod,
                                    stateUser.token,
                                    stateOrder?.id,
                                    stateLocale?.title.toLowerCase(),
                                    stateOrderPlatform,
                                    stateMethod.easy ? "Easy" : "Manual",
                                    priceInEurAfterDiscount, // stock_task!
                                    stateOrderCoins,
                                    stateOrder?.promoCode || null,
                                    stateUser.email,
                                    "order",
                                    getError,
                                    null,
                                    null,
                                    null
                                )
                                .then(res => {
                                    setModulData(Object.entries(res));
                                })
                                .then(() => {
                                    let priceInEur = (
                                        stateStock.deliveryMethods[
                                            stateMethod.easy ? 0 : 1
                                        ].data[platforms[stateOrderPlatform]]
                                            .pricePerCurrencyMap.EUR *
                                        stateOrderCoins
                                    ).toFixed(2);
                                    let priceInEurAfterDiscount =
                                        stateOrderDiscount > 1
                                            ? (
                                                  priceInEur -
                                                  (priceInEur / 100) *
                                                      stateOrderDiscount
                                              ).toFixed(2)
                                            : priceInEur;
                                    analitic.gotoAcquiring(
                                        String(priceInEurAfterDiscount),
                                        stateOrderPlatform,
                                        stateMethod.easy ? "Easy" : "Manual"
                                    );
                                    submit.current.click();
                                });
                        } else {
                            let priceInEur = (
                                stateStock.deliveryMethods[
                                    stateMethod.easy ? 0 : 1
                                ].data[platforms[stateOrderPlatform]]
                                    .pricePerCurrencyMap.EUR * stateOrderCoins
                            ).toFixed(2);
                            let priceInEurAfterDiscount =
                                stateOrderDiscount > 1
                                    ? (
                                          priceInEur -
                                          (priceInEur / 100) *
                                              stateOrderDiscount
                                      ).toFixed(2)
                                    : priceInEur;
                            await api
                                .prePay(
                                    stateNamePaymentMethod,
                                    stateUser.token,
                                    stateOrder?.id,
                                    stateLocale?.title.toLowerCase(),
                                    stateOrderPlatform,
                                    stateMethod.easy ? "Easy" : "Manual",
                                    priceInEurAfterDiscount, // stock_task!
                                    stateOrderCoins,
                                    stateOrder?.promoCode || null,
                                    stateUser.email,
                                    "order",
                                    getError,
                                    null,
                                    null,
                                    null
                                )
                                .then(res => {
                                    let priceInEur = (
                                        stateStock.deliveryMethods[
                                            stateMethod.easy ? 0 : 1
                                        ].data[platforms[stateOrderPlatform]]
                                            .pricePerCurrencyMap.EUR *
                                        stateOrderCoins
                                    ).toFixed(2);
                                    let priceInEurAfterDiscount =
                                        stateOrderDiscount > 1
                                            ? (
                                                  priceInEur -
                                                  (priceInEur / 100) *
                                                      stateOrderDiscount
                                              ).toFixed(2)
                                            : priceInEur;
                                    localStorage.setItem(
                                        "/order",
                                        JSON.stringify(stateOrderReducer)
                                    );
                                    analitic.gotoAcquiring(
                                        String(priceInEurAfterDiscount),
                                        stateOrderPlatform,
                                        stateMethod.easy ? "Easy" : "Manual"
                                    );
                                    router.push(res.acquiringLink);
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

    useMemo(() => {
        if (stateOrderDiscount > 1) {
            let t_price = (
                stateOrderPrice -
                (stateOrderPrice / 100) * stateOrderDiscount
            ).toFixed(2);
            dispatch(orderPriceAfterDiscount(t_price));
        }
    }, [stateOrderDiscount]);

    useMemo(() => {
        let platform =
            stateOrderPlatform === "ps4"
                ? { ps: true, xbox: false, pc: false }
                : { ps: false, xbox: true, pc: false };
        if (platforms[stateOrderPlatform] == 0) {
            platform = { ps: false, xbox: true, pc: false };
        } else if (platforms[stateOrderPlatform] == 1) {
            platform = { ps: true, xbox: false, pc: false };
        } else if (platforms[stateOrderPlatform] == 2) {
            platform = { ps: false, xbox: false, pc: true };
        }
        let sortedDiscounts = [...stateStock.discount].sort(
            (a, b) => a.limitSumCoins - b.limitSumCoins
        );
        let percentDisc = getDiscount(sortedDiscounts, stateOrderCoins);
        let price = getPrice(
            platform,
            stateMethod,
            stateOrderCoins,
            stateCurrency,
            stateStock.deliveryMethods
        );

        let disc = 0;
        if (stateNamePaymentMethod == "crypto") {
            disc = 3;
        }

        if (!statePromo?.value && !statePromo?.promoCode) {
            if (percentDisc > 1) {
                setLocalDisc(+percentDisc + disc);
                dispatch(orderPrice(price));
                // dispatch(orderDiscount(+percentDisc + disc));
            } else {
                setLocalDisc(disc);
                dispatch(orderPrice(price));
                // dispatch(orderDiscount(disc));
            }
        } else if (statePromo?.value) {
            setLocalDisc(+statePromo.discount + disc);
            dispatch(orderPrice(price));
            // dispatch(orderDiscount(+statePromo.discount + disc));
        } else if (statePromo?.promoCode) {
            setLocalDisc(+statePromo.promoDiscount + disc);
            dispatch(orderPrice(price));
            // dispatch(orderDiscount(+statePromo.promoDiscount + disc));
        }
    }, [
        stateStock?.deliveryMethods,
        stateOrderCoins,
        stateOrderPlatform,
        stateCurrency,
        stateMethod,
        statePromo,
        stateNamePaymentMethod,
    ]);

    useMemo(() => {
        if (width < 1024) {
            setSize({
                width: 320,
                height: 48,
            });
        }
    }, [width]);
    return (
        <div className={`${styles.sticky_block}`}>
            {width > 1024 && <OrderInfo />}
            <div className={styles.toggle_row}>
                <div className={`${styles.price_values}`}>
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            <Trans>ab111</Trans>
                        </span>
                        <div className={`${styles.prices_wrapper}`}>
                            <span className={`${styles.price_actual}`}>
                                {stateCurrency?.currency}{" "}
                                {Number(stateOrderPrice)
                                    .toFixed(2)
                                    .toLocaleString("ru-RU") || 0}
                                {/* {localDisc > 1
                                    ? (
                                          stateOrderPrice -
                                          (stateOrderPrice / 100) * localDisc
                                      ).toFixed(2)
                                    : Number(stateOrderPrice).toFixed(2)} */}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency.title}
                                        value={flagLangs}
                                    />
                                </div>
                            </span>
                            {/* {localDisc > 1 && (
                                <span className={`${styles.price_not_actual}`}>
                                    {stateCurrency?.currency}{' '}
                                    {Number(stateOrderPrice).toFixed(2) || 0}
                                </span>
                            )} */}
                        </div>
                    </div>
                    {/* {localDisc > 1 && (
                        <div className={`${styles.price_all}`}>
                            <span className={`${styles.price_all_title}`}>
                                <Trans>ab99</Trans>
                            </span>
                            <div>
                                <span className={`${styles.price_actual}`}>
                                    {localDisc}%
                                </span>
                            </div>
                        </div>
                    )} */}
                </div>{" "}
                {stateLoyaltyData?.userPointsAdd > 0 && (
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            <Trans>cashback</Trans>
                        </span>
                        <PointsBlock
                            coins={stateOrderCoins}
                            full={true}
                            loyalty={loyalty}
                        />
                    </div>
                )}
                <div className={`${styles.wrapper_coupon}`}>
                    <CheckoutCoupon coinsPage={"order"} />
                </div>
                <div className={`${styles.wrapper_btn} ${styles.margin_top}`}>
                    {stateCurrency.title == "RUB" &&
                        stateNamePaymentMethod == "acquiring" && (
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
                                                    typeof el[1] == "string"
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
                    <GradientBtn size={size} callback={aproovePayment}>
                        <span className={`${styles.btn_text_wrapper}`}>
                            <span className={`${styles.btn_text}`}>
                                {stateUser.token
                                    ? t`locales.payNow`
                                    : t`locales.authToPay`}
                            </span>
                            <span className={`${styles.arrow_wrapper}`}>
                                <Image
                                    src="/img/arrow_right_checkout.svg"
                                    width={24}
                                    height={24}
                                />
                            </span>
                        </span>
                    </GradientBtn>
                </div>
            </div>
        </div>
    );
};

export default StickySecondStep;
