import { useRouter } from "next/router";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import TermsContent from "../../components/TermsContent/TermsContent";
import { seoTags } from "../data-elements/seoTags";

import styles from "../styles/App.module.scss";

const Terms = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer
            title={seo.terms.title}
            description={seo.terms.description}
            customStyle={styles.custom_bckgr_profile}
            noindex={true}>
            <div className={`${styles.app_main} ${styles.terms_main}`}>
                <TermsContent />
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

export default Terms;
