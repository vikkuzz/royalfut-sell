"use client";

import { useCallback, useMemo, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import {
    useOrderTradeStepsStore,
    useTransferSelectorStore,
} from "@royalfut/store";
// import { OrderStepIds } from "@royalfut/enums";
import { CheckVIcon } from "@royalfut/icons";
import { OrderTradeInfo } from "@royalfut/collections";

import type { FC } from "react";
import type { OrderStepIds } from "@royalfut/enums";

export interface IOrderStepsProps {
    active: OrderStepIds;
    availableSteps?: Array<OrderStepIds>;
}

const OrderStepper: FC<IOrderStepsProps> = ({
    active,
    availableSteps = [active],
}) => {
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
    const router = useRouter();

    useLayoutEffect(() => {
        if (stepId !== active) {
            setStepId(active);
        }
    }, [active, setStepId, stepId]);

    const onChangeStep = useCallback(
        async (id: OrderStepIds) => {
            setStepId(id);
            router.push(`${OrderTradeInfo[id].to}`, {
                scroll: true,
            });
        },
        [router, setStepId]
    );

    const steps = useMemo(() => {
        return (Object.keys(OrderTradeInfo) as Array<OrderStepIds>)
            .sort((a, b) => OrderTradeInfo[a].step - OrderTradeInfo[b].step)
            .map(_step => OrderTradeInfo[_step]);
    }, []);

    // TODO: add button logic scrollIntoCenter props on mount: $0.scrollIntoView({inline: "center" })
    return (
        <div className="flex w-full justify-between px-2 space-x-6 sm:space-x-2 overflow-x-auto">
            {steps.map(item => {
                return (
                    <Button
                        onClick={onChangeStep.bind(null, item._id)}
                        disabled={
                            (!!transferInputError && item._id !== active) ||
                            !availableRoutes.includes(item._id)
                        }
                        as="button"
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
                            {item.title}
                        </span>
                    </Button>
                );
            })}
        </div>
    );
};

export default OrderStepper;
