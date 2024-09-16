import React from "react";

import styles from "./DeliverySteps.module.scss";
import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const DeliverySteps = () => {
    const t = useTranslations("mainblocks");
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.title_wrapper}`}>
                <span className={`${styles.title}`}>{t("process")}</span>
                <span className={`${styles.description}`}>
                    <span className={`${styles.what_img_wrapper}`}>
                        <Image
                            alt="what"
                            src={"/img/what-question.svg"}
                            width={24}
                            height={24}
                        />
                    </span>
                    <span className={`${styles.descr_text}`}>{t("ab90")}</span>
                </span>
            </div>
            <div className={`${styles.container_content}`}>
                <div className={`${styles.container_item} ${styles.distance}`}>
                    <span className={`${styles.img_wrapper}`}>
                        <Image
                            alt="first step"
                            src={"/img/delivery_item1.png"}
                            width={246}
                            height={246}
                        />
                    </span>
                    <div className={`${styles.text_wrapper}`}>
                        <span className={`${styles.item_title}`}>
                            {t("ab82")}
                        </span>
                        <span className={`${styles.item_text}`}>
                            {t("ab83")}
                        </span>
                    </div>
                </div>
                <div
                    dir={stateDir}
                    className={`${styles.container_item} ${styles.spiral}`}>
                    <span className={`${styles.img_wrapper}`}>
                        <Image
                            alt="second step"
                            src={"/img/delivery_item2.png"}
                            width={246}
                            height={246}
                        />
                    </span>
                    <div className={`${styles.text_wrapper}`}>
                        <span className={`${styles.item_title}`}>
                            {t("ab84")}
                        </span>
                        <span className={`${styles.item_text}`}>
                            {t("ab85")} {t("ab86")}
                            {t("ab87")}
                        </span>
                    </div>
                </div>
                <div
                    dir={stateDir}
                    className={`${styles.container_item} ${styles.spiral}`}>
                    <span className={`${styles.img_wrapper}`}>
                        <Image
                            alt="third step"
                            src={"/img/delivery_item3.png"}
                            width={246}
                            height={246}
                        />
                    </span>
                    <div className={`${styles.text_wrapper}`}>
                        <span className={`${styles.item_title}`}>
                            {t("ab88")}
                        </span>
                        <span className={`${styles.item_text}`}>
                            {t("ab89")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliverySteps;
