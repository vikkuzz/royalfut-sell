"use client";

// import { useI18nRouter } from "@royalfut/hooks";
// import { useOrderTradeStepsStore } from "@royalfut/store";
// import { EOrderProcessingStepIds } from "@royalfut/enums";
// import { OrderProcessingStepsInfo } from "@royalfut/collections";

import type { FC, PropsWithChildren } from "react";

/** https://github.com/amannn/next-intl/issues/873 */
const RevalidateWrapper: FC<PropsWithChildren> = ({ children }) => {
    // const router = useI18nRouter();
    // const allowSteps = useOrderTradeStepsStore(state => state.allowSteps);

    // if (allowSteps.includes(EOrderProcessingStepIds.SUMMARY_AND_SELL)) {
    //     router.replace(`${OrderProcessingStepsInfo[EOrderProcessingStepIds.SUMMARY_AND_SELL].to}`);
    //     return null;
    // }

    return <>{children}</>;
};

export default RevalidateWrapper;
