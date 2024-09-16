import Link from "next/link";
import React from "react";

import styles from "../../styles/Delivery.module.scss";
import StickyBlock from "../StickyBlock/StickyBlock";
import Infografic from "../Infografic";
import { useTranslations } from "next-intl";
// import { Trans } from "@lingui/macro";

const DeliveryContent = () => {
    const t = useTranslations("delivery");
    return (
        <div className="content">
            <div className={`${styles.delivery_content_wrapper}`}>
                <p>
                    {/* <Trans>a141</Trans> */}
                    {t("a141")}
                </p>
                <p className={`${styles.block}`}>
                    {/* <Trans>a142</Trans> */}
                    {t("a142")}{" "}
                    <Link
                        href={
                            "https://msng.link/o?live:.cid.93b9278a908ded55=sk"
                        }
                        className={`${styles.linear_link}`}
                        target="_blank">
                        {" "}
                        {/* <Trans>a143</Trans> */}
                        {t("a143")}{" "}
                    </Link>
                    {/* <Trans>a144</Trans> */}
                    {t("a144")}
                    <Link
                        href={"https://t.me/vcroy_1"}
                        className={`${styles.linear_link}`}
                        target="_blank">
                        {" "}
                        {/* <Trans>a145</Trans> */}
                        {t("a145")}{" "}
                    </Link>
                    {/* <Trans>a146</Trans> */}
                    {t("a146")}
                </p>
                <Infografic />
            </div>
            <StickyBlock />
        </div>
    );
};

export default DeliveryContent;
