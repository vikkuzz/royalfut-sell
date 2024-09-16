import { useEffect, useRef } from "react";
import countUp from "../../utils/countUp_old";

import styles from "./InfograficMain.module.scss";
import { useTranslations } from "next-intl";

const InfograficMain = () => {
    const t = useTranslations("delivery");
    const countUpRef = useRef(null);
    let dataInfografic = [
        {
            id: 1,
            startText: t(`a148`),
            dataText: "7",
            dataAfterText: "+",
            endText: t(`ab2`),
            grad: "first_card",
        },
        {
            id: 2,
            startText: t(`a151`),
            dataText: "100",
            dataAfterText: "B+",
            endText: t(`ab4`),
            grad: "two_card",
        },
        {
            id: 3,
            startText: t(`a154`),
            dataText: "100",
            dataAfterText: "K+",
            endText: t(`ab6`),
            grad: "three_card",
        },
        {
            id: 4,
            startText: t(`a157`),
            dataText: "30",
            dataAfterText: "K+",
            endText: t(`ab8`),
            grad: "four_card",
        },
        {
            id: 5,
            startText: t(`a160`),
            dataBeforeText: ">",
            dataText: "80",
            dataAfterText: `%`,
            endText: t(`ab10`),
            grad: "five_card",
        },
        {
            id: 6,
            startText: t(`a163`),
            dataText: "97",
            dataAfterText: "%",
            endText: t(`ab11`),
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
    }, [countUpRef?.current]);

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
        <div className={`${styles.infografic_container}`}>
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
