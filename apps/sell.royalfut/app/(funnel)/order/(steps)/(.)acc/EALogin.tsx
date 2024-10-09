"use client";

import { useCallback } from "react";
import { EAAuthForm } from "@royalfut/components";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { EOrderProcessingStepIds } from "@royalfut/enums";

const EALogin = () => {
    const { setAllowSteps, setStepsCompleted } = useOrderTradeStepsStore(
        (state) => ({
            setAllowSteps: state.setAllowSteps,
            setStepsCompleted: state.setStepsCompleted,
        }),
    );

    const onValid = useCallback(() => {
        setAllowSteps([EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]);
        // setStepsCompleted([EOrderProcessingStepIds.SUMMARY_AND_SELL]);
    }, [setAllowSteps]);

    const onInvalid = useCallback(() => {
        setAllowSteps(
            [
                EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
                EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY,
            ],
            "pulloff",
        );
        setStepsCompleted(
            [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS],
            "pulloff",
        );
    }, [setAllowSteps, setStepsCompleted]);

    return <EAAuthForm onValid={onValid} onInvalid={onInvalid} />;
};

export default EALogin;
