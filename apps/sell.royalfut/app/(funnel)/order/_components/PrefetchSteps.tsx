"use client";

import { useEffect, startTransition } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const PrefetchSteps = () => {
    const router = useI18nRouter();

    useEffect(() => {
        startTransition(() => {
            router.prefetch(
                PROJECT_PUBLIC_SELLER_ROUTES.ORDER_ACCOUNT_DETAILS,
                {
                    kind: PrefetchKind.FULL,
                },
            );
            router.prefetch(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO, {
                kind: PrefetchKind.FULL,
            });
            router.prefetch(
                PROJECT_PUBLIC_SELLER_ROUTES.ORDER_AWAITING_FOR_DELIVERY,
                {
                    kind: PrefetchKind.TEMPORARY,
                },
            );
            // router.prefetch(
            //     PROJECT_PUBLIC_SELLER_ROUTES.ORDER_SUMMARY_AND_SELL,
            //     {
            //         kind: PrefetchKind.TEMPORARY,
            //     }
            // );
        });
    }, [router]);

    return null;
};

export default PrefetchSteps;
