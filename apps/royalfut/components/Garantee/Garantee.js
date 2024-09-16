import React, { useEffect, useState } from "react";

import styles from "../../styles/Garantee.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getDeliveryTime } from "../../utils/functions";
import { Trans, t } from "@lingui/macro";
import { ErrorBoundary } from "react-error-boundary";

const Garantee = ({ row, page }) => {
    const router = useRouter();

    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const stateCalcCoins = useSelector(
        state => state.royalfutReducer.calcCoins
    );
    const stateCalcFunnel = useSelector(
        state => state.royalfutReducer.calcFunnel
    );

    const [textTime, setTextTime] = useState("");

    useEffect(() => {
        let objTime = getDeliveryTime(
            Number(stateCalcFunnel?.coins),
            stateMethod.easy ? "easy" : "manual",
            "ps4"
        );
        if (page === "funnel") {
            objTime = getDeliveryTime(
                stateCalcCoins,
                stateMethod.easy ? "easy" : "manual",
                "ps4"
            );
        }
        let string = `- ${t`seom`}`;
        if (objTime) {
            string = `${objTime.time[0]}-${objTime.time[1]}${
                "ar, es, pt, nl,sw, no, ch, pl, tr".includes(router.locale)
                    ? " "
                    : ""
            }${objTime.type === "deliveryMinutes" ? t`seom` : t`seoh`}`;
        }
        setTextTime(string);
    }, [
        stateOrder?.coinCount,
        stateMethod,
        statePlatform,
        stateCalcCoins,
        stateCalcFunnel?.coins,
        router.locale,
    ]);

    return (
        <ErrorBoundary fallback={"erorr"}>
            <div className={`${styles.container} ${row && "row"}`}>
                <div className={`${styles.row}`}>
                    <img
                        alt="lock"
                        className={`${styles.pic}`}
                        src="/img/green_lock.svg"></img>
                    <span className={`${styles.green_color}`}>
                        {t`locales.pagePaymentMethodSafe`.toLowerCase()}
                    </span>
                </div>
                <div className={`${styles.row}`}>
                    <img
                        alt="star"
                        className={`${styles.pic}`}
                        src="/img/star_icon.svg"></img>
                    <span className={`${styles.grey_color} ${styles.text3}`}>
                        <Trans>seo72</Trans>
                    </span>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Garantee;
