import React from "react";
import { useSelector } from "react-redux";

import styles from "./TrustScore.module.scss";
import Image from "next/legacy/image";

const TrustScore = () => {
    const stateStockRate = useSelector(
        state => state.royalfutReducer.stock.rate
    );

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.wrapper_img}`}>
                <Image
                    width={30}
                    height={30}
                    alt="logo"
                    src="/img/tpstar-logo.svg"
                />
            </div>
            <span>TrustScore {stateStockRate}</span>
        </div>
    );
};

export default TrustScore;
