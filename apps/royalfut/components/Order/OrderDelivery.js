import { useMemo, useState } from "react";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useDispatch, useSelector } from "react-redux";
import { getDiscount, getPrice } from "../../utils/functions";
import { changeMethod } from "../../redux/actions/royalfutActions";

import styles from "./OrderDelivery.module.scss";

const OrderDelivery = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderCoinsAmount = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );
    const platforms_data = [
        {
            id: 1,
            title: "PlayStation",
        },
        {
            id: 2,
            title: "Xbox",
        },
        {
            id: 3,
            title: "PC",
        },
    ];
    const [methods, setMethods] = useState({ easy: true, manual: false });
    const [manualPrice, setManualPrice] = useState(null);
    let platforms = {
        xbox: 0,
        xbox_one: 0,
        xbox_xs: 0,
        ps4: 1,
        ps5: 1,
        ps: 1,
        pc: 2,
    };

    const handleMethodClick = e => {
        e.target.dataset.id === "easy"
            ? dispatch(changeMethod("easy"))
            : dispatch(changeMethod("manual"));
    };

    useMemo(() => {
        stateMethod.easy
            ? setMethods({ easy: true, manual: false })
            : setMethods({ easy: false, manual: true });
    }, [stateMethod]);
    useMemo(() => {
        let platform =
            stateOrderPlatform === "ps4"
                ? { ps: true, xbox: false }
                : { ps: false, xbox: true };
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
        let percentDisc = getDiscount(sortedDiscounts, stateOrderCoinsAmount);

        let easyPrice = getPrice(
            platform,
            { easy: true },
            stateOrderCoinsAmount,
            stateCurrency,
            stateStock.deliveryMethods
        );
        let totalManualPrice = getPrice(
            platform,
            { manual: true },
            stateOrderCoinsAmount,
            stateCurrency,
            stateStock.deliveryMethods
        );
        if (percentDisc > 1) {
            let totalEasyPrice = easyPrice - (easyPrice / 100) * percentDisc;
            let total = totalManualPrice - totalEasyPrice;
            setManualPrice(total.toFixed(2));
        } else {
            let total = totalManualPrice - easyPrice;
            setManualPrice(total.toFixed(2));
        }
        if (stateOrderCoinsAmount > 1000000) {
            dispatch(changeMethod("easy"));
        }
    }, [stateOrderPlatform, stateOrderCoinsAmount, stateStock, stateCurrency]);
    return (
        <div className={`${styles.container}`}>
            <h3 className={`${styles.order_delivery_h3}`}>
                <Trans>seo48</Trans>
            </h3>
            <div className={`${styles.delivery_section}`}>
                <button
                    data-id={"easy"}
                    onClick={handleMethodClick}
                    className={`${styles.btn_method} ${
                        methods.easy && styles.method_btn_active
                    }`}>
                    <div
                        data-id={"easy"}
                        className={`${styles.method_item_header}`}>
                        <div
                            data-id={"easy"}
                            className={`${styles.method_item_icon_wrapper} ${
                                methods.manual && styles.item_icon_active
                            }`}>
                            <Image
                                data-id={"easy"}
                                src={"/img/iconComfortTrade.svg"}
                                width={16}
                                height={16}
                            />
                        </div>
                        <span
                            data-id={"easy"}
                            className={`${styles.method_item_title} ${
                                methods.manual && styles.item_icon_active
                            }`}>
                            <Trans>a56</Trans>
                        </span>
                        <div
                            data-id={"easy"}
                            className={`${styles.method_item_label} ${
                                methods.easy && styles.item_label_active
                            }`}>
                            <Trans>seo52</Trans>
                        </div>
                    </div>
                    <div
                        data-id={"easy"}
                        className={`${styles.method_item_text} ${
                            methods.manual && styles.item_icon_active
                        }`}>
                        <Trans>seo53</Trans>
                    </div>
                </button>
                <button
                    data-id={"manual"}
                    onClick={handleMethodClick}
                    className={`${styles.btn_method} ${
                        methods.manual && styles.method_btn_active
                    } ${stateOrderCoinsAmount > 1000000 && styles.disabled}`}
                    disabled={stateOrderCoinsAmount > 1000000}>
                    <div
                        data-id={"manual"}
                        className={`${styles.method_item_header}`}>
                        <div
                            data-id={"manual"}
                            className={`${styles.method_item_icon_wrapper} ${
                                methods.easy && styles.item_icon_active
                            }`}>
                            <Image
                                data-id={"manual"}
                                src={"/img/iconPlayerAuction.svg"}
                                width={16}
                                height={16}
                            />
                        </div>
                        <span
                            data-id={"manual"}
                            className={`${styles.method_item_title} ${
                                methods.easy && styles.item_icon_active
                            }`}>
                            <Trans>a100</Trans>
                        </span>
                        {stateOrderCoinsAmount <= 1000000 ? (
                            <div
                                data-id={"manual"}
                                className={`${styles.method_item_label} ${
                                    methods.manual && styles.item_label_active
                                }`}>
                                +{stateCurrency.currency} {manualPrice}
                            </div>
                        ) : (
                            <div
                                data-id={"manual"}
                                className={`${styles.method_item_label}`}>
                                <Trans>ab105</Trans>
                            </div>
                        )}
                    </div>
                    <div
                        data-id={"manual"}
                        className={`${styles.method_item_text} ${
                            methods.easy && styles.item_icon_active
                        }`}>
                        <Trans>seo56</Trans>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default OrderDelivery;
