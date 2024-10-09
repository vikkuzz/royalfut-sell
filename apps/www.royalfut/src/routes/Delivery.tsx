import Image from "next/image";
import { OrderProcessManager } from "@royalfut/components";
import { PageTitle, Text } from "@royalfut/ui";
import { WWW_OrderProcessingStepsInfo } from "@royalfut/collections";
import {
    EOrderProcessingStepIds,
    EPaymentTransactionStatus,
} from "@royalfut/enums";
import { cn } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awaiting for delivery | Ultimate Team Coin Store",
};

const mapStatus: Record<
    EPaymentTransactionStatus,
    {
        title: string;
        label: string;
        image: string;
        shortTitle: string;
    }
> = {
    [EPaymentTransactionStatus.SUCCESS]: {
        title: "Your order has been successfully paid!",
        label: "You can track the status of execution in the orders section",
        image: "/image/futcoin-success.png",
        shortTitle: "Order Paid Successfully",
    },
    [EPaymentTransactionStatus.FAILURE]: {
        title: "An error occurred during the payment process",
        label: "Check the data specified during payment or use another payment method",
        image: "/image/futcoins-failed.png",
        shortTitle: "Payment Process Failed",
    },
};

export const Title: FC<
    PropsWithChildren<{ status: EPaymentTransactionStatus }>
> = ({ status }) => {
    if (status === EPaymentTransactionStatus.SUCCESS) {
        return (
            <Text.Gradient
                asChild
                className="text-center bg-linear-success-gold w-full pb-1">
                <PageTitle>{mapStatus[status].shortTitle}</PageTitle>
            </Text.Gradient>
        );
    }

    return (
        <PageTitle className="text-center w-full pb-1">
            {mapStatus[status].shortTitle}
        </PageTitle>
    );
};

export const Step: FC<
    PropsWithChildren<{ status: EPaymentTransactionStatus }>
> = ({ status, children }) => {
    return (
        <OrderProcessManager
            title={mapStatus[status].title}
            steps={{
                active: EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY,
                availableSteps:
                    WWW_OrderProcessingStepsInfo[
                        EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY
                    ]!.allowSteps,
            }}>
            {children}
        </OrderProcessManager>
    );
};

export const Page: FC<{ status: EPaymentTransactionStatus }> = ({ status }) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center space-y-4 max-w-[21.4375rem] mx-auto">
                <div
                    className={cn("relative h-60 mx-auto", {
                        "w-72": status === EPaymentTransactionStatus.SUCCESS,
                        "w-80": status === EPaymentTransactionStatus.FAILURE,
                    })}>
                    <Image
                        alt={status}
                        className="object-contain"
                        src={mapStatus[status].image}
                        fill
                    />
                </div>
                <span className="text-base font-medium leading-5 text-white-60 text-center">
                    {mapStatus[status].label}
                </span>
            </div>
        </div>
    );
};
