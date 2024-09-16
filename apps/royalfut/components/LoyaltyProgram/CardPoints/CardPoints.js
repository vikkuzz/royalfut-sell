import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CardPoints.module.scss";
import Image from "next/legacy/image";
import { loyaltyPrice } from "../../../redux/actions/royalfutLoyaltyActions";

const CardPoints = ({ coins = 0, full = false, loyalty }) => {
    const dispatch = useDispatch();
    // const userLoyaltyPercent = 0.1;
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const [userLoyaltyPercent, setUserLoyaltyPercent] = useState(
        loyalty?.cashbackPercent / 100 || 0.01
    );
    const [points, setPoints] = useState(null);
    const [pointsPrice, setPointsPrice] = useState(null);

    useEffect(() => {
        if (loyalty) {
            setUserLoyaltyPercent(loyalty?.cashbackPercent / 100);
        }
    }, [loyalty]);

    useEffect(() => {
        const delivery = "0";
        let platform = 1; // ps4
        let pointsValue = null;

        if (statePlatform.xbox) {
            platform = 0; // xbox
        } else if (statePlatform.pc) {
            platform = 2; // pc
        }

        let price = (
            coins *
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap.USD
        ).toFixed(2); // цена общая в долларах

        let priceValue = (price * userLoyaltyPercent).toFixed(2); // размер кэшбека в долларах

        pointsValue = priceValue * 10; // количество баллов в зависимости от уровня лояльности

        // if (stateCurrency?.title != 'USD') {
        //     let priceUsd =
        //     stateStock.deliveryMethods[delivery].data[platform]
        //         .pricePerCurrencyMap.USD;

        // let priceCurrentCurrency =
        //     stateStock.deliveryMethods[delivery].data[platform]
        //         .pricePerCurrencyMap[stateCurrency?.title];
        // let priceForPoint = (priceUsd / priceCurrentCurrency) * 0.1*pointsValue // цена в выбранной валюте за полученные баллы
        // }

        // const dotIndex = String(pointsValue).indexOf('.');

        pointsValue = Math.floor(pointsValue);
        priceValue = (pointsValue / 10).toFixed(2);
        // pointsValue = String(pointsValue).slice(0, dotIndex + 3);

        // let dotPriceIndex = String(pointsValue * 0.1).indexOf('.');
        // let priceValue = String(pointsValue / 10).slice(0, dotPriceIndex + 3);

        if (stateCurrency?.title != "USD") {
            let dotPriceIndex = "";
            let priceUsd =
                stateStock.deliveryMethods[delivery].data[platform]
                    .pricePerCurrencyMap.USD;

            let priceCurrentCurrency =
                stateStock.deliveryMethods[delivery].data[platform]
                    .pricePerCurrencyMap[stateCurrency?.title];

            let priceForPoints =
                (priceCurrentCurrency / priceUsd) * 0.1 * pointsValue;

            dotPriceIndex = String(
                (priceUsd / priceCurrentCurrency) * 0.1 * pointsValue
            ).indexOf(".");

            priceValue = String(priceForPoints).slice(0, dotPriceIndex + 3);
        }

        setPointsPrice(priceValue);
        dispatch(loyaltyPrice(priceValue));
        setPoints(pointsValue);
    }, [coins, statePlatform, stateStock, userLoyaltyPercent, stateCurrency]);

    return userLoyaltyPercent && points > 0 ? (
        <div className={`${styles.container} ${full && styles.full}`}>
            <div className={styles.points_block}>
                <div className={`${styles.points}`}>+{points}</div>
                <div className={`${styles.points_icon}`}>
                    <Image width={12} height={12} src={"/img/crown_icon.svg"} />
                </div>
            </div>
            {full && (
                <div className={`${styles.points_price_wrapper}`}>
                    <span>≈</span>
                    <span>
                        {pointsPrice || 0} {stateCurrency?.title}
                    </span>
                </div>
            )}
        </div>
    ) : (
        ""
    );
};

export default CardPoints;
