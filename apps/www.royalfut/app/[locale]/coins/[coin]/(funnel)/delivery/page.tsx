import { notFound } from "next/navigation";
import { Delivery } from "../../../../../../src";
import {
    OrderStepProcessing,
    OrderStepActionRenderer,
} from "@royalfut/components";
import { BreadcrumbMapper } from "@royalfut/ui";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import { OrderTradeStepsStoreProvider } from "@royalfut/store";
import {
    EOrderProcessingStepIds,
    EPaymentSearchParamsKey,
    EPaymentTransactionStatus,
} from "@royalfut/enums";

import type { FC } from "react";

interface IDeliveryPageProps {
    searchParams: Record<EPaymentSearchParamsKey, string>;
    params: { coin: string };
}

const Page: FC<IDeliveryPageProps> = async ({ searchParams, params }) => {
    const status = searchParams[
        EPaymentSearchParamsKey.STATUS
    ] as EPaymentTransactionStatus;
    const orderId = searchParams[EPaymentSearchParamsKey.ORDER_ID];

    if (!orderId || !status) {
        notFound();
    }
    const coinShortView = params.coin.replace("_", ".");

    return (
        <div className="flex flex-col gap-5">
            <BreadcrumbMapper
                crumbs={[
                    {
                        label: "Home",
                        href: PROJECT_PUBLIC_WWW_ROUTES["HOME"],
                    },
                    {
                        label: "Coin Bundles",
                        href: PROJECT_PUBLIC_WWW_ROUTES["COINS"],
                    },
                    {
                        label: coinShortView,
                        href: `${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortView}`,
                    },
                    {
                        label: "Delivery",
                    },
                ]}
            />
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
        </div>
    );
};

export default Page;
