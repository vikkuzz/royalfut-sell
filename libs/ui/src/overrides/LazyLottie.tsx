"use client";

import { Suspense, lazy } from "react";
import { useLoad } from "@lilib/hooks";

import type { LottieComponentProps } from "lottie-react";

const LazyLottieComponent = lazy(() => import("lottie-react"));

interface ILottieProps<T extends Record<string, unknown>> {
    getJson: () => Promise<T>;
    id: string;
}

function LazyLottie<T extends Record<string, unknown>>({
    getJson,
    id,
    ref,
    ...props
}: ILottieProps<T> & Omit<LottieComponentProps, "animationData">) {
    const { data } = useLoad(getJson, [], {
        idle: true,
        key: id,
    });

    if (!data) return <></>;

    return (
        <Suspense fallback={<></>}>
            <LazyLottieComponent animationData={data} {...props} />
        </Suspense>
    );
}

export default LazyLottie;
