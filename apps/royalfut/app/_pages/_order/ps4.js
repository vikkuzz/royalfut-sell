import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../utils/useLinguiInit";
import MainContainer from "../../components/MainContainer";
import { seoTags } from "../../data-elements/seoTags";
import Steps from "../../components/Order/Steps";
import StepOneContent from "../../components/Order/StepOneContent";
import StepSecondContent from "../../components/Order/StepSecondContent";
import StepThirdContent from "../../components/Order/StepThirdContent";
import { currentCurrency } from "../../redux/actions/royalfutCurrencyAction";
import { changeMethod } from "../../redux/actions/royalfutActions";
import api from "../../Api/Api";
import {
    orderData,
    orderPage,
    orderPlatform,
    orderStep,
} from "../../redux/actions/royalfutOrderActions";
import { getLoyaltyLevels } from "../../redux/actions/royalfutLoyaltyActions";

import styles from "../../styles/App.module.scss";

const Order = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const dispatch = useDispatch();
    const seo = seoTags[router.locale];
    const stateOrderStep = useSelector(
        state => state.royalfutOrderReducer.order_step
    );
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        const handleLocalStorageAndAPI = async () => {
            if (localStorage.getItem("currency")) {
                let localCurr = JSON.parse(localStorage.getItem("currency"));
                dispatch(currentCurrency(localCurr.title));
            }
            if (localStorage.getItem("/order")) {
                let localData = JSON.parse(localStorage.getItem("/order"));
                dispatch(orderData(localData));
                dispatch(orderStep(3));
                localStorage.removeItem("/order");
            }
            dispatch(changeMethod("easy"));
            dispatch(orderPage("ps4"));
            dispatch(orderPlatform("ps4"));
            if (!router.asPath.includes("success")) {
                setCurrentPath(false);
            } else {
                setCurrentPath(true);
            }

            await api.getLoyaltyTable().then(result => {
                const sortedRes = result.sort((a, b) => a.level - b.level);

                dispatch(getLoyaltyLevels(sortedRes[0]));
            });
        };

        handleLocalStorageAndAPI();
    }, []);

    return (
        <MainContainer
            title={seo.ps4.title}
            description={seo.ps4.description}
            customStyle="."
            noBread={true}>
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1} ${styles.order_h}`}>
                    {stateOrderStep != 3
                        ? t`ab92`
                        : currentPath
                          ? t`seo79`
                          : t`seo84`}
                </h1>
                <Steps />
                {stateOrderStep == 1 && <StepOneContent />}
                {stateOrderStep == 2 && <StepSecondContent />}
                {stateOrderStep == 3 && <StepThirdContent />}
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

export default Order;
