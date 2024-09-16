import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useSelector } from "react-redux";
// import { Trans } from '@lingui/macro';
import DropdownOrder from "../DropdownOrder";
import RoyalRanging from "./RoyalRanging";
import PointsHistory from "./PointsHistory";
import flagLangs from "../../data-elements/countriesTwo";

import styles from "./RoyalPoints.module.scss";
import { useTranslations } from "next-intl";

const RoyalPoints = () => {
    const stateLoyaltyUser = useSelector(
        state => state.royalfutLoyaltyReducer.user_loyalty
    );
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const t = useTranslations("profile");

    const [pricePoint, setPricePoint] = useState(null);
    useEffect(() => {
        const delivery = "0";
        let platform = 1; // ps4

        if (statePlatform.xbox) {
            platform = 0; // xbox
        } else if (statePlatform.pc) {
            platform = 2; // pc
        }

        let priceUsd =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap.USD;

        let priceCurrentCurrency =
            stateStock.deliveryMethods[delivery].data[platform]
                .pricePerCurrencyMap[stateCurrency?.title];
        let priceForPoint = (priceCurrentCurrency / priceUsd) * 0.1;

        const dotIndex = String(priceForPoint).indexOf(".");

        priceForPoint = String(
            Math.floor(stateLoyaltyUser?.totalCashback * 10) * priceForPoint
        ).slice(0, dotIndex + 3);
        setPricePoint(priceForPoint);
    }, [stateStock, stateCurrency, statePlatform, stateLoyaltyUser]);
    return (
        <div className={`${styles.container}`}>
            <div className={styles.points_score_container}>
                <h3 className={styles.h3}>
                    {/* <Trans>pl_upd50</Trans> */}
                    {t("pointsbalance")}
                </h3>
                <div className={styles.score_wrapper}>
                    {Math.floor(stateLoyaltyUser?.totalCashback * 10)}{" "}
                    <div className={styles.icon_wrapper}>
                        <Image
                            src={"/img/white_crown.svg"}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
                <div className={styles.score_wrapper_price}>
                    {Math.floor(stateLoyaltyUser?.totalCashback * 10)}
                    <div className={styles.icon_wrapper_mini}>
                        <Image
                            src={"/img/white_crown.svg"}
                            width={16}
                            height={16}
                        />
                    </div>
                    <span className={styles.char}>≈</span>{" "}
                    {(+pricePoint).toFixed(2)}
                    <DropdownOrder
                        title={stateCurrency.title}
                        value={flagLangs}
                    />
                </div>
                <div className={styles.text}>
                    {/* <Trans>pl_upd51</Trans> */}
                    {t("cover")}
                </div>
            </div>
            <div>
                <RoyalRanging />
            </div>
            <div>
                <PointsHistory />
            </div>
        </div>
    );
};

export default RoyalPoints;
