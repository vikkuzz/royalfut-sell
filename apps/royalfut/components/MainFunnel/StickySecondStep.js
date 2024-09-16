import { useMemo, useRef, useState } from "react";

import styles from "./StickySecondStep.module.scss";
import GradientBtn from "../GradientBtn";
import Image from "next/legacy/image";
import { useDispatch, useSelector } from "react-redux";
import { orderPriceAfterDiscount } from "../../redux/actions/royalfutOrderActions";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import Link from "next/link";
import PointsBlock from "../LoyaltyProgram/PointsBlock";
import { useTranslations } from "next-intl";
import { useWindowDimensions } from "apps/royalfut/utils/hooks";

const StickySecondStep = () => {
    const t = useTranslations("order");
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const submit = useRef(null);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateNamePaymentMethod = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const stateOrderDiscount = useSelector(
        state => state.royalfutOrderReducer.order_discount
    );
    const stateOrderReducer = useSelector(state => state.royalfutOrderReducer);

    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrderPrice = useSelector(
        state => state.royalfutOrderReducer.order_price
    );
    const stateLoyaltyOrderData = useSelector(
        state => state.royalfutLoyaltyReducer.all_order_loyal_data
    );
    const [modulData, setModulData] = useState(null);

    useMemo(() => {
        if (stateOrderDiscount > 1) {
            let t_price = (
                stateOrderPrice -
                (stateOrderPrice / 100) * stateOrderDiscount
            ).toFixed(2);
            dispatch(orderPriceAfterDiscount(t_price));
        }
    }, [stateOrderDiscount]);

    const buyCoins = () => {
        const stateOrder = { ...stateOrderReducer };
        stateOrder.order_step = 2;
        localStorage.setItem("/order", JSON.stringify(stateOrder));
    };

    return (
        <div className={`${styles.sticky_block}`}>
            <div className={styles.toggle_row}>
                <div className={`${styles.price_values}`}>
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            {t("ab111")}
                        </span>
                        <div className={`${styles.prices_wrapper}`}>
                            <span className={`${styles.price_actual}`}>
                                {stateCurrency?.currency}{" "}
                                {Number(stateLoyaltyOrderData?.orderPrice)
                                    .toFixed(2)
                                    .toLocaleString("ru-RU")}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency.title}
                                        value={flagLangs}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <PointsBlock
                        coins={stateOrderCoins}
                        full={true}
                        mobile={width <= 1024}
                    />
                </div>{" "}
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
                                            ? t`payNow`
                                            : t`authToPay`
                                    }
                                    readOnly
                                />
                            </form>
                        )}
                    <Link
                        href={"/order"}
                        className={styles.a_btn_wrppr}
                        onClick={buyCoins}>
                        <GradientBtn size={{ height: 56 }}>
                            <span className={`${styles.btn_text_wrapper}`}>
                                <span className={`${styles.btn_text}`}>
                                    {t("ab94")}
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
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StickySecondStep;
