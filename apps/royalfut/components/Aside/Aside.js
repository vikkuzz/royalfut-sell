import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/Aside.module.scss";
import { useTranslations } from "next-intl";

const Aside = ({ stock }) => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const t = useTranslations("order");

    const [compState, setCompState] = useState(null);

    useEffect(() => {
        setCompState(stock || stateStock);
    }, [stock, stateStock]);

    useEffect(() => {
        if (compState) {
            let result = [];
            let rateLength = compState.rate.split(".")[0];
            let rateLengthEmpty = (5 - compState.rate).toFixed(1);
            for (let i = 1; i <= rateLength; i++) {
                result.push({
                    color1: 100,
                    color2: 0,
                });
            }
            if (rateLength < 5) {
                result.push({
                    color1: compState.rate.split(".")[1] * 10,
                    color2: 0,
                });
            }
            if (rateLengthEmpty > 1) {
                let empty = rateLengthEmpty.split(".")[0];
                for (let i = 1; i <= empty; i++) {
                    result.push({
                        color1: 0,
                        color2: 0,
                    });
                }
            }
        }
    }, [compState]);

    return compState ? (
        <aside dir={stateDir} className={`${styles.aside}`}>
            <a
                rel="nofollow noreferrer"
                target="_blank"
                className={`${styles.aside_wrapper}`}
                href={t(`commenturl`)}>
                <div className={`${styles.aside_header_wrapper}`}>
                    <div className={`${styles.aside_content}`}>
                        <div className={`${styles.aside_rate_text}`}>
                            <img
                                alt="logo"
                                className={`${styles.aside_logo}`}
                                src={"/img/tpstar-logo.svg"}></img>
                            TrustScore <b>{compState.rate}</b> |{" "}
                            <div className={`${styles.aside_reviews}`}>
                                <b className={`${styles.aside_ab}`}>
                                    {compState.reviews}{" "}
                                    {/* <Trans>reviews</Trans> */}
                                    {t("reviews")}
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </aside>
    ) : (
        ""
    );
};

export default Aside;
