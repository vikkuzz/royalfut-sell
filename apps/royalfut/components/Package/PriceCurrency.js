import React, { useMemo, useState } from "react";
import styles from "./CheckoutSticky.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDiscount, getPrice } from "../../utils/functions";
import {
    orderDiscount,
    orderPrice,
} from "../../redux/actions/royalfutOrderActions";
import flagLangs from "../../data-elements/countriesTwo";
import DropdownOrder from "../DropdownOrder";

const PriceCurrency = () => {
    const dispatch = useDispatch();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateNamePaymentMethod = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const statePromo = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const stateOrderPrice = useSelector(
        state => state.royalfutOrderReducer.order_price
    );
    const [localDisc, setLocalDisc] = useState(null);
    let platforms = {
        xbox: 0,
        xbox_one: 0,
        xbox_xs: 0,
        ps4: 1,
        ps5: 1,
        ps: 1,
        pc: 2,
    };

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
    return (
        <div className={`${styles.prices_wrapper}`}>
            <span className={`${styles.price_actual}`}>
                {stateCurrency?.currency}{" "}
                {/* {localDisc > 1
                    ? (stateOrderPrice - (stateOrderPrice / 100) * localDisc)
                          .toFixed(2)
                          .toLocaleString('ru-RU')
                    :  */}
                {Number(stateOrderPrice).toFixed(2)}
                <div className={`${styles.dd_wrapper}`}>
                    <DropdownOrder
                        title={stateCurrency.title}
                        value={flagLangs}
                    />
                </div>
            </span>
        </div>
    );
};

export default PriceCurrency;
