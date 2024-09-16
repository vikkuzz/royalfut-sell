"use client";
import React from "react";
import styles from "./Newpages.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import GradientBtn from "../../../components/GradientBtn/GradientBtn";
import { useTranslations } from "next-intl";
// import { notFound, useRouter } from 'next/navigation';

export default function NewPages({ params }) {
    console.log(params);
    const t = useTranslations(`${params.newpages}`);

    return (
        <div className={`${styles.newpages_content}`}>
            <div className={styles.wrapper_img}>
                <Image
                    width={241}
                    height={192}
                    src={"/img/blur_ellipse.png"}></Image>
            </div>

            <div className={styles.text_content}>
                <h1 className={styles.h1}>{t("title")}</h1>
                <p className={styles.p}>{t("p1")}</p>
                <p className={styles.p}>
                    {t("p2")}
                    <strong className={styles.strong}>HEY5</strong>
                </p>
                <Link href={"/order"} className={styles.btn_wrapper}>
                    <GradientBtn size={{ height: 64 }}>
                        <span className={styles.text_btn}>Buy coins</span>
                    </GradientBtn>
                </Link>
            </div>
        </div>
    );
}
