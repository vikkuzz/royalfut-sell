// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
// import { seoTags } from '../data-elements/seoTags';
// import MainContainer from '../components/MainContainer';
import { useTranslations } from "next-intl";
import CustomAccordion from "../../../components/CustomAccordion/CustomAccordion";

import styles from "../../../styles/App.module.scss";

const Faq = () => {
    const t = useTranslations("faq");
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    // const router = useRouter();
    // const seo = seoTags[router.locale];

    return (
        // <MainContainer title={seo.faq.title} description={seo.faq.description} customStyle={'.'}>
        <div className={`${styles.app_main} ${styles.faq_main}`}>
            <h2 className={`${styles.app_h1} ${styles.faq_h2}`}>
                {/* <Trans>ab20</Trans> */}
                {t("ab20")}
            </h2>
            <CustomAccordion />
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

export default Faq;
