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
import { getTranslations } from "next-intl/server";

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
        title: "delivery.success.h2",
        label: "delivery.success.desc",
        image: "/image/futcoin-success.png",
        shortTitle: "delivery.success.h1",
    },
    [EPaymentTransactionStatus.FAILURE]: {
        title: "delivery.failed.h2",
        label: "delivery.failed.desc",
        image: "/image/futcoins-failed.png",
        shortTitle: "delivery.failed.h1",
    },
};

export const Title: FC<
    PropsWithChildren<{ status: EPaymentTransactionStatus }>
> = async ({ status }) => {
    const t = await getTranslations("riley_pages.order");
    if (status === EPaymentTransactionStatus.SUCCESS) {
        return (
            <Text.Gradient
                asChild
                className="text-center bg-linear-success-gold w-full pb-1">
                <PageTitle>{t(`${mapStatus[status].shortTitle}`)}</PageTitle>
            </Text.Gradient>
        );
    }

    return (
        <PageTitle className="text-center w-full pb-1">
            {t(`${mapStatus[status].shortTitle}`)}
        </PageTitle>
    );
};

export const Step: FC<
    PropsWithChildren<{ status: EPaymentTransactionStatus }>
> = async ({ status, children }) => {
    const t = await getTranslations("riley_pages.order");
    return (
        <OrderProcessManager
            title={t(`${mapStatus[status].title}`)}
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

export const Page: FC<{ status: EPaymentTransactionStatus }> = async ({
    status,
}) => {
    const t = await getTranslations("riley_pages.order");
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
                    {t(`${mapStatus[status].label}`)}
                </span>
            </div>
        </div>
    );
};
