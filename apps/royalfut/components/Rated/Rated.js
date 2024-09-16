import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// import { Trans, t } from "@lingui/macro";
import SvgRating from "../SvgRating";
import styles from "./Rated.module.scss";
import { useTranslations } from "next-intl";

const Rated = ({ count }) => {
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const t = useTranslations("order");

    let [rate, setRate] = useState([
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 50,
            color2: 50,
        },
    ]);

    useEffect(() => {
        let result = [];
        let rateLength = stateStock.rate.split(".")[0];
        let rateLengthEmpty = (5 - stateStock.rate).toFixed(1);
        for (let i = 1; i <= rateLength; i++) {
            result.push({
                color1: 100,
                color2: 0,
            });
        }
        if (rateLength < 5) {
            result.push({
                color1: stateStock.rate.split(".")[1] * 10,
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

        setRate(result);
    }, [stateStock.rate]);

    return (
        <div className={`${styles.container}`}>
            <span className={`${styles.rating_title}`}>
                {/* <Trans>commentRated</Trans>  */}
                {t("commentRated")} {stateStock.rate} / 5
            </span>
            <div className={`${styles.rating}`}>
                {rate.map(el => {
                    return (
                        <div key={(count += 1)} className={`${styles.back}`}>
                            <SvgRating
                                classStyle={`${styles.aside_rate_svg}`}
                                colorPercent1={el.color1}
                                colorPercent2={el.color2}
                                id={`grad${(count += 1)}`}
                            />
                        </div>
                    );
                })}
            </div>
            <span className={`${styles.reviews}`}>
                {/* <Trans>a0_1</Trans>{' '} */}
                {t("a0_1")}
                <a
                    rel="nofollow noreferrer"
                    target="_blank"
                    href={t`locales.commentUrl`}
                    className={`${styles.reviews_a}`}>
                    {t(`a0_2`).replace("[X]", stateStock.reviews)}
                </a>
            </span>
            <div className={`${styles.logo_wrapper}`}>
                <img alt="logo" src="/img/trustpilot.svg"></img>
            </div>
            <div className={`${styles.wrapper_a}`}>
                <Link
                    href={t`locales.commentUrl`}
                    rel="nofollow"
                    target="_blank"
                    className={`${styles.rate_us_a}`}>
                    {/* <Trans>seo135</Trans> */}
                    {t("seo135")}
                </Link>
            </div>
        </div>
    );
};

export default Rated;
