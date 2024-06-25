"use client";

import { useCallback } from "react";
import { EAAuthForm } from "@royalfut/components";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { OrderStepIds } from "@royalfut/enums";

const EALogin = () => {
    const { setAllowSteps, setStepsCompleted } = useOrderTradeStepsStore(
        state => ({
            setAllowSteps: state.setAllowSteps,
            setStepsCompleted: state.setStepsCompleted,
        })
    );

    const onValid = useCallback(() => {
        setAllowSteps([OrderStepIds.ACCOUNT_DETAILS]);
        setStepsCompleted([OrderStepIds.SUMMARY_AND_SELL]);
    }, [setAllowSteps, setStepsCompleted]);

    const onInvalid = useCallback(() => {
        setAllowSteps(
            [OrderStepIds.ACCOUNT_DETAILS, OrderStepIds.AWAITING_FOR_DELIVERY],
            "pulloff"
        );
        setStepsCompleted([OrderStepIds.ACCOUNT_DETAILS], "pulloff");
    }, [setAllowSteps, setStepsCompleted]);

    return <EAAuthForm onValid={onValid} onInvalid={onInvalid} />;
};

export default EALogin;
