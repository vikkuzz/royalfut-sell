import { ErrorBoundary } from "react-error-boundary";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../utils/useLinguiInit";
import MainContainer from "../../components/MainContainer";
import Purchase from "../../components/Purchase/Purchase";

import styles from "../../styles/App.module.scss";

const CalcPayment = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();

    return (
        <ErrorBoundary
            fallback={"oops something was wrong, please contact support"}>
            <MainContainer
                customStyle={styles.custom_bckgr}
                // scriptUrl={'https://pay.google.com/gp/p/js/pay.js'}
            >
                <div className={`${styles.app_main}`}>
                    <ErrorBoundary
                        fallback={
                            "oops something was wrong, please contact support"
                        }>
                        <Purchase />
                    </ErrorBoundary>
                </div>
            </MainContainer>
        </ErrorBoundary>
    );
};

export const getStaticProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};

export default CalcPayment;
