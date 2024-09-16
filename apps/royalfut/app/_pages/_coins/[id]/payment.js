import { useDispatch } from "react-redux";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../../utils/useLinguiInit";
import DeliveryStage from "../../../components/DeliveryStage/DeliveryStage";
import MainContainer from "../../../components/MainContainer";
import { orderData } from "../../../redux/actions/royalfutOrderActions";

import styles from "../../../styles/App.module.scss";

const Payment = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const dispatch = useDispatch();

    const backToPayment = () => {
        let data = JSON.parse(localStorage.getItem("/coins"));
        dispatch(orderData(data));
    };

    return (
        <MainContainer customStyle={styles.custom_bckgr}>
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1} ${styles.order_h}`}>
                    <Trans>seo152</Trans>
                </h1>
                <DeliveryStage
                    successUrl={
                        "/profile/#orders&id=#from-acquiring-successfully#coins"
                    }
                    failUrl={"/coins/purchase"}
                    backToPayment={backToPayment}
                />
            </div>
        </MainContainer>
    );
};

export const getServerSideProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};

export default Payment;
