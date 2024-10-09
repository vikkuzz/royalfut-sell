"use client";
import { useRef, useState } from "react";
import styles from "./coupon.module.scss";
import Link from "next/link";
import GradientBtn from "../../../components/GradientBtn";

const Coupon = () => {
    const promocode = useRef();
    let [copyText, setCopyText] = useState(false);

    const copy = () => {
        let copyText = promocode.current;
        copyText.select();
        document.execCommand("copy");
        setCopyText(true);
    };

    return (
        <div className={`${styles.offer_container}`}>
            <div className={`${styles.offer_content_height} `} onClick={copy}>
                <div className={`${styles.offer_content_text}`}>
                    <h3 className={`${styles.offer_title}`}>
                        Use this coupon to get a discount for your next order
                    </h3>
                    <div className={styles.wrapper_btns}>
                        <Link
                            href="/order"
                            type="button"
                            className={`${styles.goto}`}>
                            <GradientBtn>
                                <span className={`${styles.text_go}`}>
                                    Buy coins
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
                                    defaultValue={"tots24".toUpperCase()}
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
                    <span className={`${styles.offer_text}`}>
                        The promo code is valid until June 7th inclusive
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Coupon;
