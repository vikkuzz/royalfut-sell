import { notFound } from "next/navigation";
import { Delivery } from "../../../../../src";
import {
    OrderStepProcessing,
    OrderStepActionRenderer,
} from "@royalfut/components";
import { OrderTradeStepsStoreProvider } from "@royalfut/store";
import {
    EOrderProcessingStepIds,
    EPaymentSearchParamsKey,
    EPaymentTransactionStatus,
} from "@royalfut/enums";

import type { FC } from "react";

interface IDeliveryPageProps {
    searchParams: Record<EPaymentSearchParamsKey, string>;
}

const Page: FC<IDeliveryPageProps> = async ({ searchParams }) => {
    const status = searchParams[
        EPaymentSearchParamsKey.STATUS
    ] as EPaymentTransactionStatus;
    const orderId = searchParams[EPaymentSearchParamsKey.ORDER_ID];

    if (!orderId || !status) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-7">
            <Delivery.Title status={status} />
            <OrderStepProcessing>
                <Delivery.Page status={status} />
                <OrderTradeStepsStoreProvider
                    initial={{
                        stepId: EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY,
                    }}>
                    <OrderStepActionRenderer />
                </OrderTradeStepsStoreProvider>
            </OrderStepProcessing>
        </div>
    );
};

export default Page;
