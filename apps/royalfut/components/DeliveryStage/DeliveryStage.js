"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import styles from "../../styles/DeliveryStage.module.scss";
import Link from "next/link";
// import { Trans, t } from '@lingui/macro';
import Analitic from "../../Analitic/Analitic";
import { useDispatch } from "react-redux";
import { getPromoOrder } from "../../redux/actions/royalfutPromocodeAction";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const DeliveryStage = ({
    backToPayment,
    successPayment,
    successUrl,
    failUrl,
}) => {
    const t = useTranslations("order");
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    let [currentPath, setCurrentPath] = useState("");
    let [timer, setTimer] = useState(10);
    useEffect(() => {
        let status = searchParams.get("status");
        if (status == "from-acquiring-successfully") {
            let params = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            analitic.successPaymentCoinsPack(
                params?.priceEur,
                params?.payMethod,
                params?.coupon,
                params?.id,
                "ps4",
                params?.method
            );
            setCurrentPath("from-acquiring-successfully");
            dispatch(getPromoOrder(null));
        }
        if (status == "from-acquiring-failed") {
            setCurrentPath("from-acquiring-failed");
        }
    }, [pathname]);

    useEffect(() => {
        if (currentPath === "from-acquiring-successfully") {
            if (successPayment) {
                successPayment();
            }
            let succUrl = successUrl.includes("funnel")
                ? "&page=funnel"
                : "&page=coins";
            for (let i = 0; i <= timer; i++) {
                (function (i) {
                    setTimeout(() => {
                        setTimer(timer - i);
                        if (i === 10) {
                            router.push(
                                `/profile?tab=orders&status=from-acquiring-successfully${succUrl}`
                            );
                        }
                    }, i * 1000);
                })(i);
            }
        }
    }, [currentPath]);

    if (currentPath == "from-acquiring-successfully") {
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.img_wrapper}`}>
                    <img
                        alt="coins"
                        className={`${styles.pic}`}
                        src="/img/coins/futcoins.webp"></img>
                </div>
                <div className={`${styles.title_wrapper}`}>
                    <span className={`${styles.title}`}>
                        {/* <Trans>seo79</Trans> */}
                        {t("seo79")}
                    </span>
                </div>
                <div className={`${styles.text_wrapper}`}>
                    <span className={`${styles.text}`}>
                        {/* <Trans>seo80</Trans> */}
                        {t("seo80")}
                    </span>
                </div>
                <div className={`${styles.btn_wrapper}`}>
                    <Link
                        href={successUrl}
                        rel="nofollow"
                        className={`${styles.btn}`}>
                        {/* <Trans>seo81</Trans> */}
                        {t("seo81")}
                    </Link>
                </div>
                <div className={`${styles.time_wrapper}`}>
                    <span className={`${styles.time_message}`}>
                        {t(`seo82`).replace("[X]", timer)}
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.img_wrapper}`}>
                    <img
                        alt="coins"
                        className={`${styles.pic}`}
                        src="/img/coins/futcoins_failed.webp"></img>
                </div>
                <div className={`${styles.title_wrapper}`}>
                    <span className={`${styles.title}`}>
                        {/* <Trans>seo175</Trans> */}
                        {t("seo175")}
                    </span>
                </div>
                <div className={`${styles.text_wrapper}`}>
                    <span className={`${styles.text}`}>
                        {/* <Trans>seo176</Trans> */}
                        {t("seo176")}
                    </span>
                </div>
                <div className={`${styles.btn_wrapper}`}>
                    <Link
                        href={failUrl}
                        rel="nofollow"
                        onClick={backToPayment}
                        className={`${styles.btn}`}>
                        {t(`seo86`)}
                    </Link>
                </div>
            </div>
        );
    }
};

export default DeliveryStage;
