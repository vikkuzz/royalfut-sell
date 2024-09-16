import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import PrivacyContent from "../components/PrivacyContent/PrivacyContent";
import { seoTags } from "../data-elements/seoTags";

import styles from "../styles/App.module.scss";

const Privacy = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer
            title={seo["privacy-policy"].title}
            description={seo["privacy-policy"].description}
            customStyle={styles.custom_bckgr_profile}>
            <div className={`${styles.app_main}`}>
                <h2 className={`${styles.app_h1} ${styles.privacy_h}`}>
                    <Trans>locales.footerLinkPrivacyPolicy</Trans>
                </h2>
                <PrivacyContent />
            </div>
        </MainContainer>
    );
};

export const getStaticProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};

export default Privacy;
