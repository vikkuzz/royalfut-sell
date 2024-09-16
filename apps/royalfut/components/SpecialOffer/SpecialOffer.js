import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Countdown from "react-countdown";
import GradientBtn from "../GradientBtn/GradientBtn";

import styles from "../../styles/SpecialOffer.module.scss";
import { useTranslations } from "next-intl";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return "Offer off";
    } else {
        // Render a countdown
        return (
            <span className={`${styles.countdown}`}>
                <span className={`${styles.countdown_days}`}>{days}d</span>
                <span className={`${styles.countdown_timer}`}>
                    {String(hours).split("").length > 1 ? hours : "0" + hours}:
                    {String(minutes).split("").length > 1
                        ? minutes
                        : "0" + minutes}
                    :
                    {String(seconds).split("").length > 1
                        ? seconds
                        : "0" + seconds}
                </span>
            </span>
        );
    }
};

const SpecialOffer = () => {
    const t = useTranslations("mainblocks");
    const stateOffer = useSelector(state => state.royalfutReducer.offerCards);
    const router = useRouter();
    const promocode = useRef();
    const [copyText, setCopyText] = useState(false);
    const [currentPromo, setCurrentPromo] = useState();

    useEffect(() => {
        if (stateOffer.length > 0) {
            let promo = { ...stateOffer[stateOffer.length - 1] };
            let endTime = new Date(promo.endDate);
            promo.endDate = endTime.getTime() - Date.now();
            promo.title = JSON.parse(promo.title);
            promo.description = JSON.parse(promo.description);
            setCurrentPromo(promo);
        }
    }, [stateOffer]);

    const copy = () => {
        let copyText = promocode.current;
        copyText.select();
        document.execCommand("copy");
        setCopyText(true);
    };

    return (
        <div className={`${styles.offer_container}`}>
            <h2 className={`${styles.offer_h}`}>{t("aa0_1")}</h2>
            <div
                className={`${styles.offer_content} ${styles.offer_height_mobile}`}
                onClick={copy}>
                <div className={`${styles.offer_timer}`}>
                    <img
                        alt="item"
                        className={`${styles.timer_icon}`}
                        src={"/img/Subtract.svg"}
                    />
                    {currentPromo?.endDate && (
                        <Countdown
                            date={Date.now() + currentPromo.endDate}
                            renderer={renderer}
                        />
                    )}
                </div>
                <div className={`${styles.offer_cover}`}>
                    {currentPromo?.image && (
                        <img src={currentPromo.image} alt="cover" />
                    )}
                </div>
                <div className={`${styles.offer_content_text}`}>
                    {currentPromo?.title && (
                        <h3 className={`${styles.offer_title}`}>
                            {currentPromo?.title &&
                                currentPromo?.title[router.locale]}
                        </h3>
                    )}
                    <span className={`${styles.offer_text}`}>
                        {currentPromo &&
                            currentPromo?.description[router.locale]}
                    </span>
                    <div className={styles.wrapper_btns}>
                        <Link
                            href="/order"
                            type="button"
                            className={`${styles.goto}`}>
                            <GradientBtn>
                                <span className={`${styles.text_go}`}>
                                    {t("orderNow")}
                                </span>
                            </GradientBtn>
                        </Link>
                        <button
                            type="button"
                            name="copy"
                            className={`${styles.buy_btn} ${styles.calc_btn} ${copyText && styles.green}`}
                            onClick={copy}>
                            <label className={`${styles.promocode_text_label}`}>
                                <input
                                    ref={promocode}
                                    defaultValue={
                                        currentPromo &&
                                        currentPromo.promoCode.toUpperCase()
                                    }
                                    readOnly
                                    className={`${styles.promocode_text}`}></input>
                                <img
                                    alt="copy"
                                    src={`${!copyText ? `/img/content_copy.svg` : `/img/done_green.svg`}`}
                                    className={`${styles.copy_icon}`}
                                />
                            </label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;
