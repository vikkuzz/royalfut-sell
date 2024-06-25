"use client";
import { useEffect, useRef } from "react";
import countUp from "./countUp_old";

import styles from "./InfograficMain.module.scss";

const InfograficMain = () => {
    const countUpRef = useRef(null);
    let dataInfografic = [
        {
            id: 1,
            startText: "Our experience is",
            dataText: "7",
            dataAfterText: "+",
            endText: "years of experience in this field",
            grad: "first_card",
        },
        {
            id: 2,
            startText: "We transferred to our customers ",
            dataText: "100",
            dataAfterText: "B+",
            endText: "coins transferred to our customers accounts",
            grad: "two_card",
        },
        {
            id: 3,
            startText: "We delivered",
            dataText: "100",
            dataAfterText: "K+",
            endText: "successfully delivered orders",
            grad: "three_card",
        },
        {
            id: 4,
            startText: "Our service has been used by",
            dataText: "30",
            dataAfterText: "K+",
            endText: "players who have tried our service",
            grad: "four_card",
        },
        {
            id: 5,
            startText: "Less than",
            dataBeforeText: ">",
            dataText: "80",
            dataAfterText: `%`,
            endText:
                "of returning customers who have made a purchase at least twice",
            grad: "five_card",
        },
        {
            id: 6,
            startText: "According to polls we have",
            dataText: "97",
            dataAfterText: "%",
            endText:
                "customer satisfaction rate according to the polls results",
            grad: "six_card",
        },
    ];

    const ISSERVER = typeof window === "undefined";
    useEffect(() => {
        if (countUpRef?.current) {
            if (!ISSERVER) {
                const dataModules = [
                    ...document.querySelectorAll('[data-module="countup"]'),
                ];
                dataModules.forEach(element => {
                    element.dataset.module.split(" ").forEach(function () {
                        new countUp(element);
                    });
                });
            }
        }
    }, [countUpRef, ISSERVER]);

    const item = el => {
        return (
            <div className={`${styles.containerItem}`} key={el.id}>
                <span>
                    {el.dataBeforeText && (
                        <span className={`${styles.card_data_text}`}>
                            {el.dataBeforeText}
                        </span>
                    )}
                    <span
                        data-countup-number={`${el.dataText}`}
                        className={`${styles.card_data_text}`}>
                        {el.dataText}
                    </span>
                    <span className={`${styles.card_data_text}`}>
                        {el.dataAfterText}
                    </span>
                </span>
                <span className={`${styles.card_start_text}`}>
                    {el.endText}
                </span>
            </div>
        );
    };
    return (
        <div className={`px-4 md:px-8 ${styles.infografic_container}`}>
            <div
                ref={countUpRef}
                className={styles.info_items_wrapper}
                data-module="countup">
                {dataInfografic.map(el => {
                    return item(el);
                })}
            </div>
        </div>
    );
};

export default InfograficMain;
