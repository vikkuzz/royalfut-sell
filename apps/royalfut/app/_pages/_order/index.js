import { useEffect, useMemo, useState } from "react";
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
import {
    orderData,
    orderPage,
    orderStep,
} from "../../redux/actions/royalfutOrderActions";
import api from "../../Api/Api";
import { getLoyaltyLevels } from "../../redux/actions/royalfutLoyaltyActions";

import styles from "../../styles/App.module.scss";

export async function getServerSideProps(context) {
    const cookiesToken = context.req.cookies["auth-token"];

    const [stock, loyalty, translation] = await Promise.all([
        api.getStock(),
        api.getLoyaltyTable(cookiesToken),
        loadCatalog(context.locale),
    ]);

    let loyaltyData = null;
    if (cookiesToken) {
        loyaltyData = loyalty[0];
    } else {
        loyaltyData = loyalty.find(el => el.level === 0);
    }

    return { props: { stock, loyalty: loyaltyData, translation } };
}

const Order = ({ loyalty }) => {
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
    const [pageTitle, setPageTitle] = useState(t`ab27`);

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
            dispatch(orderPage(null));
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

    useMemo(() => {
        if (stateOrderStep == 1) {
            setPageTitle(t`ab27`);
        } else if (stateOrderStep == 2) {
            setPageTitle(t`ab28`);
        } else if (stateOrderStep == 3) {
            if (router.asPath.includes("success")) {
                setPageTitle(t`ab35`);
            } else if (router.asPath.includes("failed")) {
                setPageTitle(t`ab34`);
            }
        }
    }, [stateOrderStep, router?.locale]);

    return (
        <MainContainer
            title={pageTitle}
            description={seo.order.description}
            customStyle={styles.page_without_bread}
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
                {stateOrderStep == 1 && <StepOneContent loyalty={loyalty} />}
                {stateOrderStep == 2 && <StepSecondContent loyalty={loyalty} />}
                {stateOrderStep == 3 && <StepThirdContent loyalty={loyalty} />}
            </div>
        </MainContainer>
    );
};

export default Order;
