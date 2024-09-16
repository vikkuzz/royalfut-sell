"use client";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useDispatch } from "react-redux";
// import { Trans, t } from "@lingui/macro";
import { modalRedirect } from "../../redux/actions/royalfutActions";

import styles from "./RedirectModal.module.scss";
import { useTranslations } from "next-intl";

const RedirectModal = () => {
    const t = useTranslations("modal");
    const dispatch = useDispatch();
    const [time, setTime] = useState(4);
    let interval = null;

    useEffect(() => {
        if (time > 0) {
            interval = setTimeout(() => setTime(prev => prev - 1), 1000);
        }
        if (time === 0) {
            dispatch(modalRedirect(false));
            window.open(
                "https://sbcsolver.com/?referrer=k4q3g74nytsdhb9epoc1mk4x",
                "_ blank"
            );
        }
        return () => {
            clearInterval(interval);
        };
    }, [time]);
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.wrapper_img}`}>
                <Image
                    layout="fill"
                    objectFit="cover"
                    className={`${styles.cover_img}`}
                    src="/img/Redirect-image.webp"></Image>
            </div>
            <span className={`${styles.text_modal}`}>
                {/* <Trans>a128</Trans> */}
                {t("a128")}
                <span className={`${styles.text_modal_descr}`}>
                    {/* <Trans>a129</Trans> */}
                    {t("a129")}{" "}
                    <span className={`${styles.time_text}`}>
                        {t(`a130`).replace("[X]", time)}
                    </span>
                </span>
            </span>
        </div>
    );
};

export default RedirectModal;
