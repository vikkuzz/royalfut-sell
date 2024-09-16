"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// import { Trans } from '@lingui/macro';
import GradientBtn from "../GradientBtn/GradientBtn";
import TransparentBtn from "../TransparentBtn/TransparentBtn";

import styles from "../../styles/StickyBlock.module.scss";
import { useTranslations } from "next-intl";

const StickyBlock = () => {
    const t = useTranslations("order");
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const router = useRouter();

    const goToFunnel = () => {
        router.push("/order");
    };

    const goToMain = () => {
        router.push("/");
    };

    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.sticky_h}`}>
                {/* <Trans>seo146</Trans> */}
                {t("seo146")}
            </h2>

            <div className={`${styles.buttons_wrapper}`}>
                <div className={`${stateBuyOff && "disabled"}`}>
                    <GradientBtn callback={goToFunnel} size={{ height: 64 }}>
                        <span className={`${styles.text_btn}`}>
                            {/* <Trans>seo1</Trans> */}
                            {t("seo1")}
                        </span>
                    </GradientBtn>
                </div>
                <TransparentBtn callback={goToMain} size={{ height: 64 }}>
                    <span className={`${styles.text_btn}`}>
                        {/* <Trans>seo148</Trans> */}
                        {t("seo148")}
                    </span>
                </TransparentBtn>
            </div>
        </div>
    );
};

export default StickyBlock;
