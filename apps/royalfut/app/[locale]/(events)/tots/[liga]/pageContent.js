import React from "react";

import Coupon from "../../../fc-24-tots-events-schedule/coupon";

import styles from "./pageContent.module.scss";
import Image from "next/image";

const PageContent = ({ page }) => {
    return (
        <div className={styles.column}>
            <div className={styles.wrapper}>
                <div className={styles.h_wrapper}>
                    <h1 className={styles.h1}>{page.h1}</h1>
                    <h2>{page.h2}</h2>
                </div>
                <div className={styles.width_coupon}>
                    <Coupon />
                </div>
            </div>
            <div className={styles.grid}>
                {page.cards.map(el => (
                    <div className={styles.card_wrapper} key={el}>
                        <Image width={260} height={363} src={el} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageContent;
