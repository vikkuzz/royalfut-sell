import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import GuideContent from "../components/GuideContent/GuideContent";
import api from "../Api/Api";

import styles from "../styles/App.module.scss";

export async function getServerSideProps(context) {
    const [firstPage, secondPage, thirdPage, translation] = await Promise.all([
        api.getReviews(),
        api.getReviews(),
        api.getReviews(),
        loadCatalog(context.locale),
    ]);
    const result = [...firstPage, ...secondPage, ...thirdPage];
    const reviews = result.filter((item, index, array) => {
        return array.findIndex(obj => obj.id === item.id) === index;
    });

    return { props: { reviews, translation } };
}

const Guide = ({ reviews }) => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();

    return (
        <MainContainer customStyle={".no_backgr_img"}>
            <div className={`${styles.app_main} ${styles.terms_main}`}>
                <h1 className={`${styles.app_h1} ${styles.delivery_h}`}>
                    The Ultimate Guide
                </h1>
                <GuideContent reviews={reviews} />
            </div>
        </MainContainer>
    );
};

export default Guide;
