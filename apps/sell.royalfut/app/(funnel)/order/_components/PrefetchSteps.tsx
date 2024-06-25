"use client";

import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { PUBLIC_ROUTES } from "@royalfut/collections";

const PrefetchSteps = () => {
    const router = useRouter();

    useEffect(() => {
        startTransition(() => {
            router.prefetch(PUBLIC_ROUTES.ORDER_ACCOUNT_DETAILS, {
                kind: PrefetchKind.FULL,
            });
            router.prefetch(PUBLIC_ROUTES.ORDER_INFO, {
                kind: PrefetchKind.FULL,
            });
            router.prefetch(PUBLIC_ROUTES.ORDER_AWAITING_FOR_DELIVERY, {
                kind: PrefetchKind.TEMPORARY,
            });
            router.prefetch(PUBLIC_ROUTES.ORDER_SUMMARY_AND_SELL, {
                kind: PrefetchKind.TEMPORARY,
            });
        });
    }, [router]);

    return null;
};

export default PrefetchSteps;
