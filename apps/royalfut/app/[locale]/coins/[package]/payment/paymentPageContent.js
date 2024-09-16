"use client";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
// import { Trans, t } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../../utils/useLinguiInit';
import DeliveryStage from "../../../../../components/DeliveryStage/DeliveryStage";
// import MainContainer from '../../components/MainContainer';
import { orderData } from "../../../../../redux/actions/royalfutOrderActions";
import { seoTags } from "../../../../../data-elements/seoTags";

import styles from "../../../../../styles/App.module.scss";
import { useEffect, useState } from "react";

const PaymentPageContent = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();

    const dispatch = useDispatch();
    // const router = useRouter();
    const searchParams = useSearchParams();
    // const seo = seoTags[router.locale];
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        const search = searchParams.toString();
        if (!search.includes("success")) {
            setCurrentPath(false);
        } else {
            setCurrentPath(true);
        }
    }, []);

    const backToPayment = () => {
        let data = JSON.parse(localStorage.getItem("/coins"));
        dispatch(orderData(data));
    };

    return (
        // <MainContainer title={seo.purchase.title} customStyle={styles.custom_bckgr}>
        <div className={`${styles.app_main}`}>
            <h1 className={`${styles.app_h1} ${styles.order_h}`}>
                {currentPath ? t(`seo79`) : t(`seo84`)}
            </h1>
            <DeliveryStage
                successUrl={
                    "/profile?tab=orders&status=from-acquiring-successfully&page=coins"
                }
                failUrl={"/coins/purchase"}
                backToPayment={backToPayment}
            />
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

export default PaymentPageContent;
