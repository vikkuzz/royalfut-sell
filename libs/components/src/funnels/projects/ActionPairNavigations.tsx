import { useCallback } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import { TradeSummaryPanel } from "../ui";
import { OrderProcessingStepsInfo } from "@royalfut/collections";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { Button, GradientButton } from "@royalfut/ui";
import { ArrowChevronRightIcon, ArrowChevronLeftIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface IStepActionNavigation {
    id: EOrderProcessingStepIds;
    label: string;
    onAction?: (cbRoute: () => void) => void;
    disabled?: boolean;
    classNames?: {
        root?: string;
        txt?: string;
    };
}

interface IActionPairNavigationsProps {
    prev: IStepActionNavigation;
    next: IStepActionNavigation;
}

const ActionPairNavigations: FNCN<IActionPairNavigationsProps> = ({
    next,
    prev,
    className,
}) => {
    const router = useI18nRouter();
    const setStepId = useOrderTradeStepsStore(state => state.setStepId);

    const routing = useCallback(
        (id: EOrderProcessingStepIds) => {
            router.push(`${OrderProcessingStepsInfo[id].to}`, {
                scroll: true,
            });
            setStepId(id);
        },
        [router, setStepId]
    );

    const onNextStep = useCallback(async () => {
        if (next.onAction) {
            next.onAction(routing.bind(null, next.id));
        } else {
            await routing(next.id);
        }
    }, [next, routing]);

    const onPrevStep = useCallback(async () => {
        if (prev.onAction) {
            prev.onAction(routing.bind(null, prev.id));
        } else {
            await routing(prev.id);
        }
    }, [prev, routing]);

    return (
        <TradeSummaryPanel
            className={cn(
                "mt-6 sm:mt-7 sm:space-x-2 sm:h-orderAction pb-3 sm:pb-0",
                className
            )}>
            <Button
                disabled={prev.disabled}
                onClick={onPrevStep}
                className={cn(
                    "h-[4.25rem] sm:h-full w-full sm:w-60 gap-2 bg-black-background rounded-xl",
                    prev.classNames?.root
                )}
                vtype="bordered-shadow"
                type="button">
                <ArrowChevronLeftIcon className="text-white w-6 h-6" />
                <span className={cn("text-xl", prev.classNames?.txt)}>
                    {prev.label}
                </span>
            </Button>
            <GradientButton
                disabled={next.disabled}
                onClick={onNextStep}
                className={cn(
                    "group h-[4.25rem] sm:h-full gap-2 w-full sm:w-60 rounded-xl",
                    next.classNames?.root
                )}>
                <span className={cn("text-xl", next.classNames?.txt)}>
                    {next.label}
                </span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
        </TradeSummaryPanel>
    );
};

export default ActionPairNavigations;
