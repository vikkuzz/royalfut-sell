"use client";

import dynamic from "next/dynamic";
import { OrderStepProcessing } from "./ui";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { useOrderTradeStepsStore } from "@royalfut/store";

import type { ComponentType } from "react";

const SellOrderInfoAction = dynamic(
    () => import("./projects/sell/OrderInfoAction"),
    {
        loading: () => <div className="sm:h-orderAction"></div>,
    }
);
const WWWOrderInfoAction = dynamic(
    () => import("./projects/www/OrderInfoAction"),
    {
        loading: () => <div className="sm:h-orderAction"></div>,
    }
);
const WWWAwaitingDeliveryAction = dynamic(
    () => import("./projects/www/AwaitingDeliveryAction"),
    {
        loading: () => <div className="sm:h-orderAction"></div>,
    }
);
const SellAccountDetailsAction = dynamic(
    () => import("./projects/sell/AccountDetailsAction"),
    {
        loading: () => <div className="sm:h-orderAction"></div>,
    }
);

const SellAwaitingDeliveryAction = dynamic(
    () => import("./projects/sell/AwaitingDeliveryAction"),
    { loading: () => <p className="sm:h-orderAction">Loading...</p> }
);

const renderer: Record<EOrderProcessingStepIds, ComponentType | null> = {
    // [EOrderProcessingStepIds.SUMMARY_AND_SELL]: SummaryAndSellAction,

    [EOrderProcessingStepIds.WWW_ORDER_INFO]: WWWOrderInfoAction,
    [EOrderProcessingStepIds.WWW_CHECKOUT]: null,
    [EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]:
        WWWAwaitingDeliveryAction,

    [EOrderProcessingStepIds.SELLER_ORDER_INFO]: SellOrderInfoAction,
    [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]: SellAccountDetailsAction,
    [EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY]:
        SellAwaitingDeliveryAction,
};

const OrderStepActionRenderer = () => {
    const stepId = useOrderTradeStepsStore(state => state.stepId);
    if (!stepId) return null;
    const Renderer = renderer[stepId];

    if (!Renderer) return null;

    return (
        <OrderStepProcessing>
            <Renderer />
        </OrderStepProcessing>
    );
};

export default OrderStepActionRenderer;
