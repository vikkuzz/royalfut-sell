"use client";

import dynamic from "next/dynamic";
import { OrderStepIds } from "@royalfut/enums";
import { useOrderTradeStepsStore } from "@royalfut/store";

import type { ComponentType } from "react";

const OrderInfoAction = dynamic(() => import("./actions/OrderInfoAction"), {
    loading: () => <p>Loading...</p>,
});
const AccountDetailsAction = dynamic(
    () => import("./actions/AccountDetailsAction"),
    { loading: () => <p>Loading...</p> }
);
const SummaryAndSellAction = dynamic(
    () => import("./actions/SummaryAndSellAction"),
    { loading: () => <p>Loading...</p> }
);
const AwaitingDeliveryAction = dynamic(
    () => import("./actions/AwaitingDeliveryAction"),
    { loading: () => <p>Loading...</p> }
);

const renderer: Record<OrderStepIds, ComponentType> = {
    [OrderStepIds.ORDER_INFO]: OrderInfoAction,
    [OrderStepIds.ACCOUNT_DETAILS]: AccountDetailsAction,
    [OrderStepIds.SUMMARY_AND_SELL]: SummaryAndSellAction,
    [OrderStepIds.AWAITING_FOR_DELIVERY]: AwaitingDeliveryAction,
};

const OrderStepActionRenderer = () => {
    const stepId = useOrderTradeStepsStore(state => state.stepId);
    const Renderer = renderer[stepId];

    return <Renderer />;
};

export default OrderStepActionRenderer;
