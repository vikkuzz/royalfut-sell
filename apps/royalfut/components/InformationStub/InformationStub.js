import Link from "next/link";
// import { Trans } from '@lingui/macro';
import GradientBtn from "../GradientBtn";

import styles from "./InformationStub.module.scss";
import { useTranslations } from "next-intl";

const InformationStub = () => {
    const t = useTranslations("profile");
    return (
        <div className={`${styles.info_container}`}>
            <div className={`${styles.info_cover_wrapper}`}>
                <img
                    alt="noorder"
                    className={`${styles.info_cover}`}
                    src="/img/No_coins/dontHaveOrders.webp"
                />
            </div>
            <div className={`${styles.info_text_wrapper}`}>
                <span className={`${styles.info_title}`}>
                    {/* <Trans>a20</Trans> */}
                    {t("noorders")}
                </span>
                <span className={`${styles.info_text}`}>
                    {/* <Trans>a21</Trans> */}
                    {t("norders_text")}
                </span>
            </div>
            <div className={`${styles.info_wrapper_btn}`}>
                <Link href={"/"} className={`${styles.info_link_wrapper}`}>
                    <GradientBtn size={{ height: 48, width: 290 }}>
                        <span className={`${styles.info_btn_text}`}>
                            {/* <Trans>a22</Trans> */}
                            {t("goback")}
                        </span>
                    </GradientBtn>
                </Link>
            </div>
        </div>
    );
};

export default InformationStub;
