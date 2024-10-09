import { createStore } from "zustand";
import { ORDER_PROCESSING_STEPS_INFO } from "@royalfut/collections";
import { EOrderProcessingStepIds } from "@royalfut/enums";
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
    const info = Object.values(ORDER_PROCESSING_STEPS_INFO).find(
        info => info.step === step
    )!;
    return info._id;
};

const markPreviousStepsAsCompleted = (
    id: EOrderProcessingStepIds
): Array<EOrderProcessingStepIds> => {
    const info = ORDER_PROCESSING_STEPS_INFO[id];
    if (!info) return [];

    const actualStep = info.step;
    if (actualStep === 1) {
        return [info._id];
    }

    return Object.values(ORDER_PROCESSING_STEPS_INFO)
        .filter(item => item!.step < actualStep)
        .map(item => item!._id);
};

export interface IOrderTradeStepsState {
    step: number;
    stepId: EOrderProcessingStepIds;
    allowSteps: Array<EOrderProcessingStepIds>;
    completed: Array<EOrderProcessingStepIds>;
}

interface IOrderTradeStepsActions {
    setStepId: (
        id: EOrderProcessingStepIds,
        extra?: { markCurrentStepAsCompleted?: boolean }
    ) => void;
    setAllowSteps: (
        steps: Array<EOrderProcessingStepIds>,
        method?: ModifyStepsTypes
    ) => void;
    setStepsCompleted: (
        steps: Array<EOrderProcessingStepIds>,
        method?: ModifyStepsTypes
    ) => void;
}

export type OrderTradeStepsStore = IOrderTradeStepsState &
    IOrderTradeStepsActions;

const initialOrderTradeStepsStore: IOrderTradeStepsState = {
    step: 1,
    stepId: findIdByStep(1),
    completed: [],
    allowSteps: [],
};

export const createOrderTradeStepsStore = (
    initState: MakeRequiredAndNonNullableProps<
        Partial<IOrderTradeStepsState>,
        "stepId"
    > = initialOrderTradeStepsStore
) => {
    const info = ORDER_PROCESSING_STEPS_INFO[initState.stepId];
    const firstStep = Object.values(ORDER_PROCESSING_STEPS_INFO).find(
        item => item.step === 1
    )?._id;
    const state: IOrderTradeStepsState = {
        stepId: initState.stepId,
        completed: mergeArrays(markPreviousStepsAsCompleted(initState.stepId), [
            firstStep!,
        ]),
        allowSteps: info?.allowSteps || [],
        step: info?.step || 1,
    };

    return createStore<OrderTradeStepsStore>()(set => ({
        ...state,
        setStepId: (id, extra = {}) =>
            set(store => {
                const makeCompleted = extra.markCurrentStepAsCompleted ?? false;
                const stepInfo = ORDER_PROCESSING_STEPS_INFO[id];
                if (!stepInfo) return {};

                return {
                    step: stepInfo.step,
                    stepId: id,
                    allowSteps: mergeArrays(
                        stepInfo.allowSteps,
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
