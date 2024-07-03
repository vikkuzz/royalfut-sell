"use client";
import { usePopupDialogStore } from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";
import { useEffect } from "react";

const PaymentConfirmed = () => {
    const { setPopup } = usePopupDialogStore();

    useEffect(() => {
        setPopup(EUIDialogsNames.WITHDRAW_SUCCESS);
    }, [setPopup]);

    return <></>;
};

export default PaymentConfirmed;
