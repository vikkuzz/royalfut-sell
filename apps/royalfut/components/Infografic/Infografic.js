"use client";
import { useEffect, useRef } from "react";
// import { Trans, t } from '@lingui/macro';
import countUp from "../../utils/countUp_old";

import styles from "./Infografic.module.scss";
import { useTranslations } from "next-intl";

const Infografic = () => {
    const t = useTranslations("delivery");
    const countUpRef = useRef(null);
    let dataInfografic = [
        {
            id: 1,
            startText: t(`a148`),

            dataBeforeText: t(`a149_1`),
            dataText: t(`a149_2`),
            dataAfterText: t(`a149_3`),
            endText: t(`a150`),
            grad: "first_card",
        },
        {
            id: 2,
            startText: t(`a151`),
            dataBeforeText: t(`a152_1`),
            dataText: t(`a152_2`),
            dataAfterText: t(`a152_3`),
            endText: t(`a153`),
            grad: "two_card",
        },
        {
            id: 3,
            startText: t(`a154`),
            dataBeforeText: t(`a155_1`),
            dataText: t(`a155_2`),
            dataAfterText: t(`a155_3`),
            endText: t(`a156`),
            grad: "three_card",
        },
        {
            id: 4,
            startText: t(`a157`),
            dataBeforeText: t(`a158_1`),
            dataText: t(`a158_2`),
            dataAfterText: t(`a158_3`),
            endText: t(`a159`),
            grad: "four_card",
        },
        {
            id: 5,
            startText: t(`a160`),
            dataBeforeText: t(`a161_1`),
            dataText: t(`a161_2`),
            dataAfterText: t(`a161_3`),
            endText: t(`a162`),
            grad: "five_card",
        },
        {
            id: 6,
            startText: t(`a163`),
            dataText: "97",
            dataAfterText: "%",
            endText: t(`a165`),
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
            <div
                className={`${styles.containerItem} ${styles[el.grad]}`}
                key={el.id}>
                {el.startText && (
                    <span className={`${styles.card_start_text}`}>
                        {el.startText}
                    </span>
                )}
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
            <h2 className={`${styles.infografic_h2}`}>
                {/* <Trans>a147</Trans> */}
                {t("a147")}
            </h2>
            <div
                ref={countUpRef}
                className={styles.info_items_wrapper}
                data-module="countup">
                {dataInfografic.map(el => {
                    return item(el);
                })}
            </div>
            <span className={`${styles.infografic_after_text}`}>
                {/* <Trans>a166</Trans> */}
                {t("a166")}
            </span>
        </div>
    );
};

export default Infografic;
