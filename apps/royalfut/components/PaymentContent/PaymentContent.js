// import { Trans } from '@lingui/macro';
import StickyBlock from "../StickyBlock/StickyBlock";

import styles from "../../styles/PaymentContent.module.scss";
import { useTranslations } from "next-intl";

const PaymentContent = () => {
    const t = useTranslations("payments");
    return (
        <div className="content">
            <div className={`${styles.payment_container}`}>
                <p>
                    {/* <Trans>seo149</Trans> */}
                    {t("seo149")}
                </p>
                <p>
                    {/* <Trans>seo150</Trans> */}
                    {t("seo150")}
                </p>
                <p>
                    {/* <Trans>seo151</Trans> */}
                    {t("seo151")}
                </p>
            </div>
            <StickyBlock />
        </div>
    );
};

export default PaymentContent;
