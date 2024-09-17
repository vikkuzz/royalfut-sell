"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Steps from "../../../../components/Order/Steps";
import StepOneContent from "../../../../components/Order/StepOneContent";
import StepSecondContent from "../../../../components/Order/StepSecondContent";
import StepThirdContent from "../../../../components/Order/StepThirdContent";
import {
    changeMethod,
    changePlatform,
} from "../../../../redux/actions/royalfutActions";
import {
    orderCoinsAmount,
    orderData,
    orderPage,
    orderPlatform,
    orderStep,
} from "../../../../redux/actions/royalfutOrderActions";

import styles from "../../../../styles/App.module.scss";
import { useTranslations } from "next-intl";

const PlatformContent = ({ page }) => {
    const t = useTranslations("order");
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const stateOrderStep = useSelector(
        state => state.royalfutOrderReducer.order_step
    );
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        const search = searchParams.toString();
        let localPage = null;
        const handleLocalStorageAndAPI = async () => {
            dispatch(changeMethod("easy"));

            if (page == "ps4") {
                localPage = "ps4";
            } else if (page == "ps5") {
                localPage = "ps5";
            } else if (page == "xbox_one") {
                localPage = "xbox_one";
            } else if (page == "xbox_xs") {
                localPage = "xbox_xs";
            }

            dispatch(orderPage(localPage));
            dispatch(orderPlatform(page));
            dispatch(changePlatform(page));
            if (!search.includes("success")) {
                setCurrentPath(false);
            }
            if (search.includes("success")) {
                setCurrentPath(true);
                dispatch(orderStep(3));
            } else if (search.includes("failed")) {
                dispatch(orderStep(3));
            }
        };

        handleLocalStorageAndAPI();
    }, []);

    return (
        <div className={`${styles.app_main}`}>
            <h1 className={`${styles.app_h1} ${styles.order_h}`}>
                {stateOrderStep != 3
                    ? t(`preorder.h1`)
                    : currentPath
                      ? t(`seo79`)
                      : t(`seo84`)}
            </h1>
            <Steps />
            {stateOrderStep == 1 && <StepOneContent />}
            {stateOrderStep == 2 && <StepSecondContent />}
            {stateOrderStep == 3 && <StepThirdContent />}
        </div>
    );
};

export default PlatformContent;
