"use client";
import React from "react";

import styles from "./PointsDisplay.module.scss";
import Image from "next/legacy/image";

const PointsDisplay = ({ order }) => {
    if (
        order.status.toLowerCase() == "error_payment" ||
        order.status.toLowerCase() == "waiting_payment"
    ) {
        return <></>;
    } else if (order?.cashback || order?.cashbackUsed) {
        if (order?.cashback > 0) {
            return (
                <div className={styles.violet_block}>
                    +{Math.round(order?.cashback * 10)}{" "}
                    <span className={styles.icon_wrapper}>
                        <Image
                            width={16}
                            height={16}
                            src={"/img/white_crown.svg"}
                        />
                    </span>
                </div>
            );
        } else if (order?.cashbackUsed > 0) {
            return (
                <div className={styles.bordered_block}>
                    -{Math.round(order?.cashbackUsed * 10)}
                    <span className={styles.icon_wrapper}>
                        <Image
                            width={16}
                            height={16}
                            src={"/img/white_crown.svg"}
                        />
                    </span>
                </div>
            );
        }
    } else {
        return <></>;
    }
};

export default PointsDisplay;
