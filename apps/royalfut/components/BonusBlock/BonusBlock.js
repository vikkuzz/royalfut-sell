"use client";
import React from "react";

import styles from "./BonusBlock.module.scss";
import TransparentBtn from "../TransparentBtn/TransparentBtn";
// import { Trans } from '@lingui/macro'
import { useDispatch, useSelector } from "react-redux";
import { modalRedirect } from "../../redux/actions/royalfutActions";
import { useTranslations } from "next-intl";

const BonusBlock = () => {
    const t = useTranslations("boost");
    const stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        dispatch(modalRedirect(true));
    };

    return (
        <div className={`${styles.block_container}`}>
            <span className={`${styles.bonus_title}`}>{t("seo212")}</span>
            <span className={`${styles.bonus_text}`}>{t("seo213")}</span>
            <div
                className={`${styles.btn_wrapper} ${stateBuyOff && "disabled"}`}>
                <TransparentBtn
                    callback={handleButtonClick}
                    size={{ height: 64 }}>
                    <span className={`${styles.text_btn}`}>{t("seo214")}</span>
                </TransparentBtn>
            </div>
        </div>
    );
};

export default BonusBlock;
