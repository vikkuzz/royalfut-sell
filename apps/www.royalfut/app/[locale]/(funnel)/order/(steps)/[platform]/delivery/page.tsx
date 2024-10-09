import { notFound } from "next/navigation";
import { Delivery } from "../../../../../../../src";
import {
    EPaymentTransactionStatus,
    EPaymentSearchParamsKey,
} from "@royalfut/enums";

import type { FC } from "react";

interface IDeliveryPageProps {
    searchParams: Record<EPaymentSearchParamsKey, string>;
}

const Page: FC<IDeliveryPageProps> = ({ searchParams }) => {
    const status = searchParams[
        EPaymentSearchParamsKey.STATUS
    ] as EPaymentTransactionStatus;
    const orderId = searchParams[EPaymentSearchParamsKey.ORDER_ID];

    if (!orderId || !status) {
        notFound();
    }

    return (
        <Delivery.Step status={status}>
            <Delivery.Page status={status} />
        </Delivery.Step>
    );
};

export default Page;
