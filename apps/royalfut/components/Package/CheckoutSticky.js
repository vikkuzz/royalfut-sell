import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";
// import { Trans, t } from '@lingui/macro';
import { useWindowDimensions } from "../../utils/hooks";
import { getDiscount, getPrice } from "../../utils/functions";
import {
    orderPrice,
    orderDiscount,
} from "../../redux/actions/royalfutOrderActions";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import GradientBtn from "../GradientBtn";
import api from "../../Api/Api";
import {
    loginModal,
    modalLoyalty,
    registrationClick,
    showMessage,
    userCreateOrder,
} from "../../redux/actions/royalfutActions";
import { onGooglePaymentButtonClicked } from "../../utils/google_unlimint";
import Analitic from "../../Analitic/Analitic";
import CheckoutCoupon from "./CheckoutCoupon";
import PointsBlock from "../LoyaltyProgram/PointsBlock";
import { usePoints } from "../../redux/actions/royalfutLoyaltyActions";

import styles from "./CheckoutSticky.module.scss";
import { useTranslations } from "next-intl";
import { getPromoOrder } from "apps/royalfut/redux/actions/royalfutPromocodeAction";

const analitic = new Analitic();

const CheckoutSticky = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
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
    const stateLoyaltyLevels = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_levels
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateUsePoints = useSelector(
        state => state.royalfutLoyaltyReducer.use_points
    );
    const stateNamePaymentMethod = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
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
    const statePromoOrder = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const stateLoyaltyAllData = useSelector(
        state => state.royalfutLoyaltyReducer.all_order_loyal_data
    );
    const { width } = useWindowDimensions();
    const [size, setSize] = useState({
        width: 240,
        height: 56,
    });
    const [promocode, setPromocode] = useState(false);
    const [localDisc, setLocalDisc] = useState(null);
    const [modulData, setModulData] = useState(null);

    const t = useTranslations("order");

    const showModal = () => {
        dispatch(modalLoyalty(true));
    };

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
                console.log(statePlatform);
                let t_platform = "ps4";
                if (statePlatform.ps) {
                    t_platform = "ps4";
                } else if (statePlatform.xbox) {
                    t_platform = "xbox";
                } else {
                    t_platform = "pc";
                }
                const page = pathname.includes("coins") ? "coins" : "order";
                let cashback =
                    stateUsePoints == "false"
                        ? 0
                        : Number(stateLoyaltyAllData?.customPointsPrice);
                const paymentOrder = async () => {
                    const currentOrder = await api.updateOrder(
                        stateOrder.id,
                        stateUser.token,
                        t_platform,
                        stateMethod.easy ? "Easy" : "Manual",
                        Math.round(stateOrderCoins),
                        stateCurrency.title,
                        stateOrder.promoCode || null,
                        getError,
                        null,
                        cashback
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
                                ].data[platforms[t_platform]]
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
                                    t_platform,
                                    stateMethod.easy ? "Easy" : "Manual",
                                    priceInEurAfterDiscount, // stock_task!
                                    stateOrderCoins,
                                    stateOrder?.promoCode || null,
                                    stateUser.email,
                                    page,
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
                                        ].data[platforms[t_platform]]
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
                                        t_platform,
                                        stateMethod.easy ? "Easy" : "Manual"
                                    );
                                    submit.current.click();
                                });
                        } else {
                            let priceInEur = (
                                stateStock.deliveryMethods[
                                    stateMethod.easy ? 0 : 1
                                ].data[platforms[t_platform]]
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
                            console.log(
                                stateNamePaymentMethod,
                                stateUser.token,
                                stateOrder?.id,
                                stateLocale?.title.toLowerCase(),
                                t_platform,
                                stateMethod.easy ? "Easy" : "Manual",
                                priceInEurAfterDiscount, // stock_task!
                                stateOrderCoins,
                                stateOrder?.promoCode || null,
                                stateUser.email,
                                page
                            );
                            await api
                                .prePay(
                                    stateNamePaymentMethod,
                                    stateUser.token,
                                    stateOrder?.id,
                                    stateLocale?.title.toLowerCase(),
                                    t_platform,
                                    stateMethod.easy ? "Easy" : "Manual",
                                    priceInEurAfterDiscount, // stock_task!
                                    stateOrderCoins,
                                    stateOrder?.promoCode || null,
                                    stateUser.email,
                                    page,
                                    getError,
                                    null,
                                    null,
                                    null
                                )
                                .then(res => {
                                    let priceInEur = (
                                        stateStock.deliveryMethods[
                                            stateMethod.easy ? 0 : 1
                                        ].data[platforms[t_platform]]
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
                                    console.log("local");
                                    localStorage.setItem(
                                        "/coins",
                                        JSON.stringify(stateOrderReducer)
                                    );
                                    localStorage.setItem(
                                        "/order",
                                        JSON.stringify(stateOrderReducer)
                                    );
                                    analitic.gotoAcquiring(
                                        String(priceInEurAfterDiscount),
                                        t_platform,
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

    useEffect(() => {
        if (stateOrder.promoCode) {
            setPromocode(true);
        } else if (statePromoOrder) {
            setPromocode(true);
        } else {
            setPromocode(false);
        }
    }, [stateOrder, statePromoOrder]);

    useMemo(() => {
        let sortedDiscounts = [...stateStock.discount].sort(
            (a, b) => a.limitSumCoins - b.limitSumCoins
        );
        let percentDisc = getDiscount(sortedDiscounts, stateOrderCoins);
        let price = getPrice(
            statePlatform,
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
        statePlatform,
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
        } else {
            setSize({
                width: 240,
                height: 48,
            });
        }
    }, [width]);

    const handleClickUsePoints = async e => {
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
            dispatch(userCreateOrder(currentOrder));
        }
        dispatch(getPromoOrder(null));
        dispatch(usePoints(e.target.dataset.id));
    };
    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.toggle_row}>
                <div className={`${styles.subtotal_wrapper}`}>
                    <div>
                        <span className={`${styles.title}`}>
                            {/* <Trans>locales.pageCoinsSubtotal</Trans> */}
                            {t("pageCoinsSubtotal")}
                        </span>
                        <span className="width_auto">
                            <span className={`${styles.title}`}>
                                {stateCurrency?.currency}
                            </span>
                            <span className={`${styles.title}`}>
                                {stateOrderPrice?.toFixed(2)}
                            </span>
                        </span>
                    </div>
                    <div className={`${styles.wrapper_btns}`}>
                        <button
                            className={`${styles.btn} ${stateUsePoints == "false" && styles.active_btn}`}
                            type="button"
                            onClick={handleClickUsePoints}
                            data-id="false">
                            {/* <Trans>pl_upd31</Trans> */}
                            {t("pl_upd31")}
                        </button>
                        <div
                            className={`${styles.transparent} ${
                                (!stateLoyaltyAllData?.customPoints ||
                                    stateLoyaltyAllData?.customPoints == 0) &&
                                styles.for_notice
                            }`}>
                            <div className={`${styles.notice}`}>
                                <span className={`${styles.title_note}`}>
                                    {t("buymorecoins")}
                                </span>
                                <button
                                    className={`${styles.btn_details}`}
                                    onClick={showModal}>
                                    {t("pl_upd29")}
                                </button>
                            </div>
                            <button
                                className={`${styles.btn} ${stateUsePoints == "true" && styles.active_btn}`}
                                type="button"
                                onClick={handleClickUsePoints}
                                data-id="true"
                                disabled={
                                    !stateLoyaltyAllData?.customPoints ||
                                    stateLoyaltyAllData?.customPoints == 0
                                }>
                                {t("pl_upd32")}
                                <div
                                    data-id="true"
                                    className={`${styles.custom_points_block} ${
                                        stateUsePoints == "true" &&
                                        styles.active_points
                                    }`}>
                                    {stateLoyaltyAllData?.customPoints}
                                    <div
                                        data-id="true"
                                        className={styles.crown_pic_wrapper}>
                                        <Image
                                            data-id="true"
                                            width={16}
                                            height={16}
                                            src={"/img/white_crown.svg"}
                                        />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {stateUsePoints == "true" ? (
                    <div className={`${styles.coupon_wrapper}`}>
                        <span className={`${styles.title}`}>
                            <div className={`${styles.crown_wrapper}`}>
                                <Image
                                    src={"/img/white_crown.svg"}
                                    width={16}
                                    height={16}
                                />
                            </div>
                            {t("pl_upd36")}
                        </span>
                        <span className="width_auto">
                            <span className={`${styles.title}`}>
                                {stateCurrency?.currency}
                            </span>
                            <span className={`${styles.title}`}>
                                {stateLoyaltyAllData?.customPointsPrice || 0}
                            </span>
                        </span>
                    </div>
                ) : (
                    <div
                        className={`${styles.coupon_wrapper} ${stateUsePoints == "true" && "disabled"}`}>
                        <CheckoutCoupon />
                    </div>
                )}
            </div>
            <div className={`${styles.stick} ${styles.zindex}`}>
                <div className={`${styles.price_values}`}>
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            {t("ab111")}
                        </span>
                        <div className={`${styles.prices_wrapper}`}>
                            <span className={`${styles.price_actual}`}>
                                {stateCurrency?.currency}{" "}
                                {(+stateLoyaltyAllData?.priceActual)?.toFixed(
                                    2
                                )}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency.title}
                                        value={flagLangs}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                {stateUsePoints == "false" &&
                    stateLoyaltyAllData?.points > 0 && (
                        <div className={`${styles.wrapper_points}`}>
                            <PointsBlock coins={stateOrderCoins} full={true} />
                            <span className={`${styles.description}`}>
                                {stateUser?.token && t(`pl_upd35`)}
                                {!stateUser?.token && t(`pl_upd34`)}
                            </span>
                        </div>
                    )}

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
                                            ? t(`payNow`)
                                            : t(`authToPay`)
                                    }
                                    readOnly
                                />
                            </form>
                        )}
                    <GradientBtn size={size} callback={aproovePayment}>
                        <span className={`${styles.btn_text_wrapper}`}>
                            <span className={`${styles.btn_text}`}>
                                {stateUser.token ? t(`payNow`) : t(`authToPay`)}
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

export default CheckoutSticky;
