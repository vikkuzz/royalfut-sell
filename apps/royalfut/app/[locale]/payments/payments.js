// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
// import MainContainer from '../components/MainContainer';
import PaymentContent from "../../../components/PaymentContent";
// import { seoTags } from '../data-elements/seoTags';

import styles from "../../../styles/App.module.scss";
import { useTranslations } from "next-intl";

const Payments = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    // const router = useRouter();
    // const seo = seoTags[router.locale];
    const t = useTranslations("home.footer");

    return (
        // <MainContainer
        //     title={seo.payment.title}
        //     description={seo.payment.description}
        //     customStyle={'.'}
        // >
        <div className={`${styles.app_main}`}>
            <h1 className={`${styles.app_h1} ${styles.app_payment_h}`}>
                {/* <Trans>locales.pagePaymentMethodName</Trans> */}
                {t("payment")}
            </h1>
            <PaymentContent />
        </div>
        // </MainContainer>
    );
};

// export const getStaticProps = async (ctx) => {
//     const translation = await loadCatalog(ctx.locale);

//     return {
//         props: { translation }
//     };
// };

export default Payments;
