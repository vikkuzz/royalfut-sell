import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { TradeSummaryPanel } from "@royalfut/components";
import { OrderTradeInfo } from "@royalfut/collections";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { OrderStepIds } from "@royalfut/enums";
import { Button, GradientButton } from "@royalfut/ui";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface IStepActionNavigation {
    id: OrderStepIds;
    label: string;
    onAction?: (cbRoute: () => void) => void;
    disabled?: boolean;
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
    const router = useRouter();
    const setStepId = useOrderTradeStepsStore(state => state.setStepId);

    const routing = useCallback(
        (id: OrderStepIds) => {
            setStepId(id);
            router.push(`${OrderTradeInfo[id].to}`, {
                scroll: true,
            });
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
        <TradeSummaryPanel.Root
            className={cn(
                "mt-6 sm:mt-9 sm:space-x-2 sm:h-[4.125rem] pb-3 sm:pb-0",
                className
            )}>
            <Button
                as="button"
                disabled={prev.disabled}
                onClick={onPrevStep}
                className="h-[4.25rem] sm:h-full w-full sm:w-60 bg-black-background"
                vtype="bordered-shadow"
                type="button">
                <ArrowChevronRightIcon className="text-white w-6 h-6 rotate-180" />
                <span className="text-xl">{prev.label}</span>
            </Button>
            <GradientButton
                disabled={next.disabled}
                onClick={onNextStep}
                className="group h-[4.25rem] sm:h-full w-full sm:w-60">
                <span className="text-xl">{next.label}</span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
        </TradeSummaryPanel.Root>
    );
};

export default ActionPairNavigations;
