import { useRouter } from "next/router";
import { useLingui } from "@lingui/react";
import MainContainer from "../components/MainContainer";
import { loadCatalog } from "../utils/useLinguiInit";
import styles from "../styles/App.module.scss";
import { seoTags } from "../data-elements/seoTags";
import ReviewsContent from "../components/ReviewsContent/ReviewsContent";

const Reviews = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer
            customStyle={styles.custom_bckgr_profile}
            title={seo.reviews.title}>
            <div className={`${styles.app_main} ${styles.terms_main}`}>
                <ReviewsContent />
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

export default Reviews;
