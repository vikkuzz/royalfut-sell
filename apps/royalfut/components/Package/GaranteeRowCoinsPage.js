import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Trans, t } from "@lingui/macro";
import { getDeliveryTime } from "../../utils/functions";

import styles from "./GaranteeRowCoinsPage.module.scss";
import { useTranslations } from "next-intl";

const GaranteeRowCoinsPage = ({ row, coins }) => {
    const t = useTranslations("order");
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateOrder = useSelector(state => state.royalfutReducer.createOrder);
    const [textTime, setTextTime] = useState("");

    useEffect(() => {
        let objTime = getDeliveryTime(
            coins,
            stateMethod.easy ? "easy" : "manual",
            "ps4"
        );
        const string = `${objTime?.time[0]}-${objTime?.time[1]} ${
            objTime?.type === "deliveryMinutes" ? t(`seom`) : t(`seoh`)
        }`;
        setTextTime(string);
    }, [stateOrder?.coinCount, stateMethod, statePlatform, coins]);

    return (
        <div className={`${styles.container} ${row && "row"}`}>
            <div className={`${styles.row}`}>
                <img
                    alt="lock"
                    className={`${styles.pic}`}
                    src="/img/green_lock.svg"></img>
                <span className={`${styles.green_color}`}>
                    {/* <Trans>seo70</Trans> */}
                    {t("seo70")}
                </span>
            </div>
            {stateMethod.easy && (
                <div className={`${styles.row}`}>
                    <img
                        alt="clock"
                        className={`${styles.pic}`}
                        src="/img/clock.svg"></img>
                    <span className={`${styles.gray_color}`}>
                        {t(`seo71`).replace("[HH]", textTime)}
                    </span>
                </div>
            )}
            <div className={`${styles.row}`}>
                <img
                    alt="star"
                    className={`${styles.pic}`}
                    src="/img/star_icon.svg"></img>
                <span className={`${styles.gray_color}`}>
                    {/* <Trans>seo72</Trans> */}
                    {t("seo72")}
                </span>
            </div>
        </div>
    );
};

export default GaranteeRowCoinsPage;
