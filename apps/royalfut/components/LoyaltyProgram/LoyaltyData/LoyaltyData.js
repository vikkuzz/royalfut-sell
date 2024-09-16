/* eslint-disable */

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrderLoyalData } from "../../../redux/actions/royalfutLoyaltyActions";
import { getPriceWithDiscount } from "../../../utils/functions";

import styles from "./LoyaltyData.module.scss";

const LoyaltyData = () => {
    const dispatch = useDispatch();

    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateNamePaymentMethod = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const stateOrder = useSelector(state => state.royalfutOrderReducer);
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const stateLoyaltyUser = useSelector(
        state => state.royalfutLoyaltyReducer.user_loyalty
    ); //
    const stateLoyaltyLevel = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_levels
    ); //
    const stateLoyaltyUse = useSelector(
        state => state.royalfutLoyaltyReducer.use_points
    );
    const statePromoOrder = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );

    // const [points, setPoints] = useState(null);
    const [orderPrice, setOrderPrice] = useState(null);
    const [orderPriceUSD, setOrderPriceUSD] = useState(null);
    // const [priceCash, setPriceCash] = useState(null);
    // const [priceActual, setPriceActual] = useState(null);
    // const [pricePoints, setPricePoints] = useState(null);
    // const [customPoints, setCustomPoints] = useState(null);
    // const [customPointsPrice, setCustomPointsPrice] = useState(null);
    const [loyalOrderData, setLoyalOrderData] = useState(null);

    useMemo(() => {
        const delivery = "0"; // Easy
        const platform = 1; // ps4

        const priceCurrencyPerCoin =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap[stateCurrency?.title]; // цена монеты в текущей валюте

        const priceCurrencyOrder =
            priceCurrencyPerCoin * stateOrder?.order_coins_amount;

        const promoDisc =
            statePromoOrder?.discount || statePromoOrder?.promoDiscount;

        let priceOrder = priceCurrencyOrder;
        let cryptoDisc = null;
        if (stateNamePaymentMethod === "crypto") {
            cryptoDisc = 3;
        }
        /// ////////////////////////////////////////////////////////////////////////////

        if (cryptoDisc && promoDisc) {
            priceOrder = getPriceWithDiscount(
                priceCurrencyOrder,
                cryptoDisc + promoDisc
            ); // цена заказа в текущей валюте со скидкой по крипте+промо
        } else if (cryptoDisc) {
            priceOrder = getPriceWithDiscount(priceCurrencyOrder, cryptoDisc); // цена заказа в текущей валюте со скидкой по крипте
        } else if (promoDisc) {
            priceOrder = getPriceWithDiscount(priceCurrencyOrder, promoDisc); // цена заказа в текущей валюте со скидкой по промокоду
        }

        setOrderPrice(priceOrder.toFixed(2)); // актуальная конечная цена со скидками\без скидок

        /// ////////////////////////////////////////////////////////////////////////////////
    }, [
        stateOrder?.order_coins_amount,
        stateNamePaymentMethod,
        statePromoOrder,
        stateCurrency,
        stateStock,
    ]);

    useEffect(() => {
        const delivery = "0"; // Easy
        const platform = 1; // ps4

        const priceUsdPerCoin =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap.USD; // цена монеты в USD

        const priceCurrencyPerCoin =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap[stateCurrency?.title]; // цена монеты в текущей валюте

        const exchangeRate = priceUsdPerCoin / priceCurrencyPerCoin;

        let priceInDollars = orderPrice * exchangeRate;

        setOrderPriceUSD(priceInDollars.toFixed(2));
    }, [orderPrice, stateStock]);

    useEffect(() => {
        const resultData = {
            points: 0,
            pricePoints: 0,
            priceCash: 0,
            priceActual: 0,
            orderPrice: 0,
            customPoints: 0,
            customPointsPrice: 0,
        };
        const delivery = "0"; // Easy
        const platform = 1; // ps4

        const priceUsdPerCoin =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap.USD; // цена монеты в USD

        const priceCurrencyPerCoin =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap[stateCurrency?.title]; // цена монеты в текущей валюте

        const exchangeRate = priceUsdPerCoin / priceCurrencyPerCoin;

        let loyaltyLevel = {};

        if (stateLoyaltyUser) {
            loyaltyLevel = { ...stateLoyaltyUser };
        } else if (stateLoyaltyLevel) {
            loyaltyLevel = { ...stateLoyaltyLevel };
        }

        if (loyaltyLevel && !loyaltyLevel?.totalCashback) {
            loyaltyLevel.totalCashback = 0;
        }

        let priceCash = orderPriceUSD * (loyaltyLevel?.cashbackPercent / 100); // размер кб в USD
        let points = Math.floor(priceCash * 10); // кб баллы за заказ
        let pricePoints = (points / 10).toFixed(2); // округляем цену за баллы

        let pricePointsCurrency = (pricePoints / exchangeRate).toFixed(2); // размер кб в текущей валюте

        let maxPoints = Math.floor(loyaltyLevel?.totalCashback * 10); // накопленные баллы
        let priceMaxPoints = (maxPoints / 10 / exchangeRate).toFixed(2);

        let cashPrice = orderPriceUSD * (loyaltyLevel?.bonusPartPercent / 100);

        let pointsValue = Math.floor(cashPrice * 10); // кол-во баллов которые можем списать
        let customPointsPrice = (pointsValue / 10 / exchangeRate).toFixed(2);

        if (maxPoints >= pointsValue) {
            // setCustomPoints(pointsValue);
            // setCustomPointsPrice(customPointsPrice);
            resultData.customPoints = pointsValue;
            resultData.customPointsPrice = customPointsPrice;
        } else if (pointsValue >= maxPoints) {
            // setCustomPoints(maxPoints);
            // setCustomPointsPrice(priceMaxPoints);
            resultData.customPoints = maxPoints;
            resultData.customPointsPrice = priceMaxPoints;
        } else {
            // setCustomPoints(0);
            // setCustomPointsPrice(0);
            resultData.customPoints = 0;
            resultData.customPointsPrice = 0;
        }

        // setPriceCash(pricePointsCurrency);
        // setPoints(points);
        // setPricePoints(pricePoints);
        resultData.priceCash = pricePointsCurrency;
        resultData.points = points;
        resultData.pricePoints = pricePoints;
        resultData.orderPrice = (+orderPrice).toFixed(2);

        if (stateLoyaltyUse == "true") {
            // setPriceActual(orderPrice - loyalOrderData.customPointsPrice);
            resultData.priceActual =
                orderPrice - loyalOrderData.customPointsPrice;
        } else {
            // setPriceActual(orderPrice);
            resultData.priceActual = orderPrice;
        }

        setLoyalOrderData(resultData);
    }, [
        orderPriceUSD,
        stateLoyaltyUser,
        stateLoyaltyLevel,
        stateUser,
        orderPrice,
        stateCurrency,
        stateLoyaltyUse,
    ]);

    // useEffect(() => {
    //     if (stateLoyaltyUse == 'true') {
    //         //setPriceActual(orderPrice - loyalOrderData.customPointsPrice);
    //         loyalOrderData.priceActual =(orderPrice - loyalOrderData.customPointsPrice);

    //     } else {
    //         //setPriceActual(orderPrice);
    //         loyalOrderData.priceActual =(orderPrice );
    //     }
    // }, [stateLoyaltyUse, loyalOrderData?.customPointsPrice, orderPrice]);

    // const allData = useMemo(
    //     () => ({
    //         points: points,
    //         pricePoints: pricePoints,
    //         priceCash: priceCash,
    //         priceActual: priceActual,
    //         orderPrice: (+orderPrice).toFixed(2),
    //         customPoints: customPoints,
    //         customPointsPrice: customPointsPrice,
    //     }),
    //     [points, pricePoints, orderPrice, priceActual, customPoints, customPointsPrice, priceCash]
    // );
    // useEffect(() => {
    //     setLoyalOrderData(allData);
    // }, [setLoyalOrderData, allData]);

    useMemo(() => {
        dispatch(allOrderLoyalData(loyalOrderData));
    }, [loyalOrderData]);

    return (
        <>
            <div
                // className={`column`}
                className={`${styles.visual_hide} column`}>
                <span>
                    Актуальная цена заказа: {loyalOrderData?.orderPrice}
                </span>
                <span>
                    Актуальная цена заказа USD: {loyalOrderData?.orderPriceUSD}
                </span>
                <span>Начислим баллов: {loyalOrderData?.points}</span>
                <span>Сколько это в USD: {loyalOrderData?.pricePoints}</span>
                <span>
                    Сколько это в текущей валюте: {loyalOrderData?.priceCash}
                </span>
                <span>
                    Цена с примененным купоном и с вычетом Кешбэка:{" "}
                    {loyalOrderData?.priceActual}
                </span>
                <span>
                    Сколько баллов можно списать: {loyalOrderData?.customPoints}
                </span>
                <span>
                    Размер кешбэка который можно списать:{" "}
                    {loyalOrderData?.customPointsPrice}
                </span>
            </div>
        </>
    );
};

export default LoyaltyData;
