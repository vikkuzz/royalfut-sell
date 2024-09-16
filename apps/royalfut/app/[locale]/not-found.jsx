"use client";
import Link from "next/link";
import GradientBtn from "../../components/GradientBtn/GradientBtn";

import styles from "./NotFound.module.scss";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations("404");
    return (
        <div className={`${styles.not_found_container}`}>
            <div className={`${styles.wrapper_pic}`}>
                <img alt="404" src="/img/coins/404.webp"></img>
            </div>

            <div className={`${styles.not_found__group}`}>
                <div className={`${styles.not_found__text}`}>
                    {/* <Trans>seo100</Trans> */}
                    {t("h1")}
                </div>
                <div className={`${styles.description}`}>
                    {t("description")}
                    {/* <Trans>seo101</Trans> */}
                </div>

                <Link href="/" className="center auto">
                    <GradientBtn size={{ height: 64, width: 275 }}>
                        <span className="center">
                            {/* <Trans>seo102</Trans> */}
                            {t("gohome")}
                        </span>
                    </GradientBtn>
                </Link>
            </div>
        </div>
    );
}
