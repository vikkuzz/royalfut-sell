"use client";
import { usePopupDialogStore } from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";
import { useEffect } from "react";

const PaymentCancelled = () => {
    const { setPopup } = usePopupDialogStore();

    useEffect(() => {
        setPopup(EUIDialogsNames.WITHDRAW_FILED);
    }, [setPopup]);

    return <></>;
};

export default PaymentCancelled;
