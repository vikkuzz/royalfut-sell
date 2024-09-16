import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import { seoTags } from "../data-elements/seoTags";
import ContactsContent from "../components/ContactsContent";

import styles from "../styles/App.module.scss";

const Contacts = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer
            title={seo.contact.title}
            description={seo.contact.description}
            customStyle={"."}
            noindex={true}>
            <div className={`${styles.app_main} ${styles.app_contact_main}`}>
                <h2 className={`${styles.app_h1} ${styles.faq_h2}`}>
                    <Trans>locales.footerLinkContact</Trans>
                </h2>
                <ContactsContent />
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

export default Contacts;
