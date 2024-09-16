// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
// import MainContainer from '../components/MainContainer';
import { useTranslations } from "next-intl";
import DeliveryContent from "../../../components/DeliveryContent/DeliveryContent";
// import { seoTags } from '../data-elements/seoTags';

import styles from "../../../styles/App.module.scss";

const Delivery = () => {
    const t = useTranslations("home.footer");
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    // const router = useRouter();
    // const seo = seoTags[router.locale];

    return (
        // <MainContainer
        //     title={seo.delivery.title}
        //     description={seo.delivery.description}
        //     customStyle={'.no_backgr_img'}
        // >
        <div className={`${styles.app_main} ${styles.terms_main}`}>
            <h1 className={`${styles.app_h1} ${styles.delivery_h}`}>
                {/* <Trans>locales.menuLinkDelivery</Trans> */}
                {t("delivery")}
            </h1>
            <DeliveryContent />
        </div>
        // </MainContainer>
    );
};

// export const getStaticProps = async (ctx) => {
//     const translation = await loadCatalog(ctx.locale);

//     return {
//         props: { translation },
//     };
// };

export default Delivery;
