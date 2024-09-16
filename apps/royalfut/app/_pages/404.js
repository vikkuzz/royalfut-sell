import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import NotFound from "../components/NotFound";

import styles from "../styles/App.module.scss";

export default function Error() {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();

    return (
        <MainContainer
            keywords={", 404, Такой страницы не существует"}
            description={"Такой страницы не существует"}
            title={"404"}
            bodyBackgr={"404"}
            customStyle={styles.custom_bckgr_profile}>
            <NotFound />
        </MainContainer>
    );
}

export const getStaticProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};
