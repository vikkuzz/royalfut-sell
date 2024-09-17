"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Steps from "../../../components/Order/Steps";
import StepOneContent from "../../../components/Order/StepOneContent";
import StepSecondContent from "../../../components/Order/StepSecondContent";
import StepThirdContent from "../../../components/Order/StepThirdContent";
import { changeMethod } from "../../../redux/actions/royalfutActions";
import {
    orderPage,
    orderStep,
} from "../../../redux/actions/royalfutOrderActions";

import styles from "../../../styles/App.module.scss";
import { useTranslations } from "next-intl";

export default function Order() {
    const t = useTranslations("order");
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const stateOrderStep = useSelector(
        state => state.royalfutOrderReducer.order_step
    );
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        const search = searchParams.toString();
        const handleLocalStorageAndAPI = async () => {
            dispatch(changeMethod("easy"));
            dispatch(orderPage(null));
            if (!search.includes("from-acquiring-successfully")) {
                setCurrentPath(false);
            }
            if (search.includes("from-acquiring-successfully")) {
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
}
