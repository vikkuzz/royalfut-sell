"use client";

import { useCallback, useMemo, useLayoutEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@royalfut/ui";
import {
    useOrderTradeStepsStore,
    useTransferSelectorStore,
} from "@royalfut/store";
import { CheckVIcon } from "@royalfut/icons";
import {
    ORDER_PROCESSING_STEPS_INFO,
    ORDER_STEPS_PATHNAMES,
    PROJECT_PUBLIC_ROUTES,
} from "@royalfut/collections";
import { cn, getURLWithPlatform } from "@royalfut/utils";

import type { FC } from "react";
import type { EOrderProcessingStepIds } from "@royalfut/enums";
import type { IOrderProcessingStepInfo } from "@royalfut/interfaces";
import { useTranslations } from "next-intl";

export interface IOrderProcessNavigatorProps {
    active: EOrderProcessingStepIds;
    availableSteps?: Array<EOrderProcessingStepIds>;
}

const OrderProcessNavigator: FC<IOrderProcessNavigatorProps> = ({
    active,
    availableSteps = [active],
}) => {
    const t = useTranslations("greer_pages.order");
    const params = useParams();
    const router = useRouter();
    const { stepId, setStepId, allowRoutes, completed } =
        useOrderTradeStepsStore(state => ({
            setStepId: state.setStepId,
            stepId: state.stepId,
            allowRoutes:
                state.allowSteps.length === 0
                    ? availableSteps
                    : state.allowSteps,
            completed: state.completed,
        }));
    const availableRoutes = [active, ...allowRoutes];
    const transferInputError = useTransferSelectorStore.use.hasError();
    const platform = useTransferSelectorStore.use.platform();

    const onChangeStep = useCallback(
        async (id: EOrderProcessingStepIds) => {
            const info = ORDER_PROCESSING_STEPS_INFO[id];

            if (info) {
                if (params.platform) {
                    const url = getURLWithPlatform(platform);
                    if (url) {
                        const href = `${PROJECT_PUBLIC_ROUTES["ORDER"]}/${url.platform}${ORDER_STEPS_PATHNAMES[id]}`;
                        router.push(href, {
                            scroll: true,
                        });
                        return;
                    }
                }
                router.push(info.to, {
                    scroll: true,
                });
                setStepId(id);
            }
        },
        [router, setStepId, platform, params]
    );

    useLayoutEffect(() => {
        if (stepId !== active) {
            onChangeStep(active);
        }
        // NOTE: it should work only on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const steps = useMemo(() => {
        return (
            Object.keys(
                ORDER_PROCESSING_STEPS_INFO
            ) as Array<EOrderProcessingStepIds>
        )
            .sort(
                (a, b) =>
                    ORDER_PROCESSING_STEPS_INFO[a]!.step -
                    ORDER_PROCESSING_STEPS_INFO[b]!.step
            )
            .map(_step => ORDER_PROCESSING_STEPS_INFO[_step])
            .filter(Boolean) as Array<IOrderProcessingStepInfo>;
    }, []);

    // TODO: add button logic scrollIntoCenter props on mount: $0.scrollIntoView({inline: "center" })
    return (
        <div className="flex w-full gap-6 justify-center px-2 space-x-6 sm:space-x-2 overflow-x-auto">
            {steps.map(item => {
                return (
                    <Button
                        onClick={onChangeStep.bind(null, item._id)}
                        disabled={
                            (!!transferInputError && item._id !== active) ||
                            !availableRoutes.includes(item._id)
                        }
                        clickable={active !== item._id}
                        className="group flex space-x-2 items-center flex-nowrap"
                        key={item._id}>
                        <div
                            className={cn(
                                "h-9 w-9 border rounded-full border-primary flex justify-center items-center transition-colors duration-300",
                                {
                                    "bg-primary": active === item._id,
                                    "group-hover:bg-primary/50":
                                        active !== item._id,
                                }
                            )}>
                            {completed.includes(item._id) &&
                            active !== item._id ? (
                                <CheckVIcon
                                    className={cn("w-4 h-4", {
                                        "text-white": active === item._id,
                                        "text-primary": active !== item._id,
                                    })}
                                />
                            ) : (
                                <span className="text-white text-base font-bold">
                                    {item.step}
                                </span>
                            )}
                        </div>
                        <span className="font-medium text-xs text-white whitespace-nowrap">
                            {t(`${item.title}`)}
                        </span>
                    </Button>
                );
            })}
        </div>
    );
};

export default OrderProcessNavigator;
