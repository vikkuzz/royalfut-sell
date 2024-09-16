import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../../utils/useLinguiInit";
import MainContainer from "../../../components/MainContainer";
import Checkout from "../../../components/Package/Checkout";
import { seoTags } from "../../../data-elements/seoTags";
import { orderData } from "../../../redux/actions/royalfutOrderActions";

import styles from "../../../styles/App.module.scss";

const CalcPayment = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const dispatch = useDispatch();
    const router = useRouter();
    const seo = seoTags[router.locale];

    useEffect(() => {
        if (localStorage.getItem("/coins")) {
            let data = JSON.parse(localStorage.getItem("/coins"));
            dispatch(orderData(data));
        }
    }, []);

    return (
        <MainContainer
            customStyle={styles.custom_bckgr}
            title={seo.purchase.title}>
            <div className={`${styles.app_main}`}>
                <Checkout />
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

export default CalcPayment;
