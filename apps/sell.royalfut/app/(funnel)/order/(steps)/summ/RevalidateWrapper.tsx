"use client";

import { useRouter } from "next/navigation";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { OrderStepIds } from "@royalfut/enums";
import { OrderTradeInfo } from "@royalfut/collections";

import type { FC, PropsWithChildren } from "react";

/** https://github.com/amannn/next-intl/issues/873 */
const RevalidateWrapper: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const allowSteps = useOrderTradeStepsStore(state => state.allowSteps);

    if (allowSteps.includes(OrderStepIds.SUMMARY_AND_SELL)) {
        router.replace(`${OrderTradeInfo[OrderStepIds.SUMMARY_AND_SELL].to}`);
        return null;
    }

    return <>{children}</>;
};

export default RevalidateWrapper;
