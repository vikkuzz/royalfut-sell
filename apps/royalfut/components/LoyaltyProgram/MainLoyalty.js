"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
// import { Trans } from '@lingui/macro';
import GradientBtn from "../GradientBtn";
import { modalLoyalty } from "../../redux/actions/royalfutActions";

import styles from "./MainLoyalty.module.scss";
import { useTranslations } from "next-intl";

const MainLoyalty = () => {
    const t = useTranslations("loyalty");
    const preorder = useTranslations("home.preorder");
    const dispatch = useDispatch();

    const getLoyaltyModal = () => {
        dispatch(modalLoyalty(true));
    };
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.pic_wrapper}`}>
                <div className={`${styles.center_pic}`}>
                    <Image
                        src={"/img/medals_desktop.webp"}
                        width={674}
                        height={373}
                        objectFit="contain"
                        quality={30}
                    />
                </div>
            </div>
            <div className={`${styles.text_block}`}>
                <h2 className={`${styles.h2}`}>
                    {/* {t('pl_upd14')} */}
                    {t("pl_upd14")}
                </h2>
                <span className={`${styles.text}`}>
                    {/* {t('pl_upd15')} */}
                    {t("pl_upd15")}
                </span>
            </div>
            <div className={`${styles.blocks_wrapper}`}>
                <div className={`${styles.border_block}`}>
                    <span className={`${styles.title}`}>22k+</span>
                    <span className={`${styles.descr}`}>
                        {/* {t('pl_upd16')} */}
                        {t("pl_upd16")}
                    </span>
                </div>
                <div className={`${styles.border_block}`}>
                    <span className={`${styles.title}`}>800k+</span>
                    <span className={`${styles.descr}`}>
                        {/* {t('pl_upd17')} */}
                        {t("pl_upd17")}
                    </span>
                </div>
            </div>
            <div className={`${styles.num_blocks_wrapper}`}>
                <div className={`${styles.num_block_wrapper}`}>
                    <div className={`${styles.num_block}`}>1</div>
                    <span className={`${styles.num_title}`}>
                        {preorder("buy_coins")}
                    </span>
                    <span className={`${styles.num_descr}`}>
                        {preorder("loyalty")}
                    </span>
                </div>
                <div className={`${styles.num_block_wrapper}`}>
                    <div className={`${styles.num_block}`}>2</div>
                    <span className={`${styles.num_title}`}>
                        {" "}
                        {t("pl_upd20")}
                    </span>
                    <span className={`${styles.num_descr}`}>
                        {t("pl_upd21")}
                    </span>
                </div>
                <div className={`${styles.num_block_wrapper}`}>
                    <div className={`${styles.num_block}`}>3</div>
                    <span className={`${styles.num_title}`}>
                        {t("pl_upd22")}
                    </span>
                    <span className={`${styles.num_descr}`}>
                        {t("pl_upd23")}
                    </span>
                </div>
            </div>
            <div className={`${styles.btns_wrapper}`}>
                <Link href={"/order"}>
                    <GradientBtn size={{ height: 56 }}>
                        <span className={`${styles.text_btn}`}>
                            {preorder("buy_coins")}
                        </span>
                    </GradientBtn>
                </Link>

                <button
                    onClick={getLoyaltyModal}
                    className={`${styles.btn_for_modal}`}>
                    {t("pl_upd25")}
                </button>
            </div>
        </div>
    );
};

export default MainLoyalty;
