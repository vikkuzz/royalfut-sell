// import { Trans } from '@lingui/macro';
import OrderPayments from "../Order/OrderPayments";
import CheckoutSticky from "../Package/CheckoutSticky";
import OrderDeliveryPlug from "../Order/OrderDeliveryPlug";
import RoyalPointsInfo from "../LoyaltyProgram/RoyalPointsInfo";
import PlatformChangerDd from "../Package/PlatformChangerDd";
import CoinsBlock from "../Package/CoinsBlock";

import styles from "../Package/Checkout.module.scss";
import { useTranslations } from "next-intl";

const Checkout = () => {
    const t = useTranslations("order");
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.main_content}`}>
                <OrderPayments />
                <div className={`from-1025-to-1900`}>
                    <CoinsBlock />
                </div>
            </div>
            <div className={`${styles.width_auto}`}>
                <div className={`${styles.dd_wrapper}`}>
                    <span className={`${styles.dd_wrapper_title}`}>
                        {/* <Trans>locales.platform</Trans> */}
                        {t("seo28")}
                    </span>
                    <PlatformChangerDd />
                </div>
                <div className={`from-375-to-1024`}>
                    <CoinsBlock />
                </div>
                <CheckoutSticky />
                <OrderDeliveryPlug />
                <RoyalPointsInfo />
            </div>
        </div>
    );
};

export default Checkout;
