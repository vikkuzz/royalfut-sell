import { createStore } from "zustand";
import { OrderTradeInfo } from "@royalfut/collections";
import { OrderStepIds } from "@royalfut/enums";
import { mergeArrays } from "@royalfut/utils";

import type { MakeRequiredAndNonNullableProps } from "@royalfut/interfaces";

type ModifyStepsTypes = "push" | "replace" | "pulloff";

const ModifyStepsMethodsMap: Record<
    ModifyStepsTypes,
    <T>(stored: Array<T>, external: Array<T>) => Array<T>
> = {
    push: mergeArrays,
    replace: function <T>(_stored: Array<T>, external: Array<T>): Array<T> {
        return external;
    },
    pulloff: function <T>(stored: Array<T>, external: Array<T>): Array<T> {
        return stored.filter(step => !external.includes(step));
    },
};

const findIdByStep = (step: number) => {
    const orderInfoId = OrderTradeInfo[OrderStepIds.ORDER_INFO]._id;

    if (OrderTradeInfo[OrderStepIds.ORDER_INFO].step === step) {
        return orderInfoId;
    }

    const info = Object.values(OrderTradeInfo).find(info => info.step === step);
    return info ? info._id : orderInfoId;
};

const markPreviousStepsAsCompleted = (
    id: OrderStepIds
): Array<OrderStepIds> => {
    const actualStep = OrderTradeInfo[id].step;
    if (actualStep === 1) {
        return [OrderStepIds.ORDER_INFO];
    }

    return Object.values(OrderTradeInfo)
        .filter(item => item.step < actualStep)
        .map(item => item._id);
};

export interface IOrderTradeStepsState {
    step: number;
    stepId: OrderStepIds;
    allowSteps: Array<OrderStepIds>;
    completed: Array<OrderStepIds>;
}

interface IOrderTradeStepsActions {
    setStepId: (
        id: OrderStepIds,
        extra?: { markCurrentStepAsCompleted?: boolean }
    ) => void;
    setAllowSteps: (
        steps: Array<OrderStepIds>,
        method?: ModifyStepsTypes
    ) => void;
    setStepsCompleted: (
        steps: Array<OrderStepIds>,
        method?: ModifyStepsTypes
    ) => void;
}

export type OrderTradeStepsStore = IOrderTradeStepsState &
    IOrderTradeStepsActions;

const initialOrderTradeStepsStore: IOrderTradeStepsState = {
    step: 1,
    stepId: findIdByStep(1),
    completed: [OrderStepIds.ORDER_INFO],
    allowSteps: [OrderStepIds.ACCOUNT_DETAILS],
};

export const createOrderTradeStepsStore = (
    initState: MakeRequiredAndNonNullableProps<
        Partial<IOrderTradeStepsState>,
        "stepId"
    > = initialOrderTradeStepsStore
) => {
    const state: IOrderTradeStepsState = {
        stepId: initState.stepId,
        completed: mergeArrays(markPreviousStepsAsCompleted(initState.stepId), [
            OrderStepIds.ORDER_INFO,
        ]),
        allowSteps: OrderTradeInfo[initState.stepId].allowSteps,
        step: OrderTradeInfo[initState.stepId].step,
    };

    return createStore<OrderTradeStepsStore>()(set => ({
        ...state,
        setStepId: (id, extra = {}) =>
            set(store => {
                const makeCompleted = extra.markCurrentStepAsCompleted ?? false;

                return {
                    step: OrderTradeInfo[id].step,
                    stepId: id,
                    allowSteps: mergeArrays(
                        OrderTradeInfo[id].allowSteps,
                        store.allowSteps
                    ),
                    completed: makeCompleted
                        ? mergeArrays(store.completed, [store.stepId])
                        : store.completed,
                };
            }),
        setAllowSteps: (steps, method = "push") =>
            set(store => ({
                allowSteps: ModifyStepsMethodsMap[method](
                    store.allowSteps,
                    steps
                ),
            })),
        setStepsCompleted: (steps, method = "push") =>
            set(store => ({
                completed: ModifyStepsMethodsMap[method](
                    store.completed,
                    steps
                ),
            })),
    }));
};
