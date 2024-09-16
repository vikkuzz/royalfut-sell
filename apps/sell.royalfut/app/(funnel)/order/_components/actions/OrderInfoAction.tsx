import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { CoinsAmountPanel } from "@royalfut/components";
import { OrderTradeInfo } from "@royalfut/collections";
import {
    useOrderTradeStepsStore,
    // useTransferEAAccountStore,
} from "@royalfut/store";
import { OrderStepIds } from "@royalfut/enums";
import { ArrowChevronRightIcon } from "@royalfut/icons";

const OrderInfoAction = () => {
    const router = useRouter();
    // const nextToLastStep = useTransferEAAccountStore(state => state.isFilled);

    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));

    const onNextStep = useCallback(async () => {
        // if (nextToLastStep) {
        setStepId(OrderStepIds.ACCOUNT_DETAILS, {
            markCurrentStepAsCompleted: true,
        });
        await router.push(
            `${OrderTradeInfo[OrderStepIds.ACCOUNT_DETAILS].to}`,
            {
                scroll: true,
            }
        );
        // } else {
        //     setStepId(OrderStepIds.SUMMARY_AND_SELL, {
        //         markCurrentStepAsCompleted: true,
        //     });
        //     await router.push(
        //         `${OrderTradeInfo[OrderStepIds.SUMMARY_AND_SELL].to}`,
        //         {
        //             scroll: true,
        //         }
        //     );
        // }
    }, [router, setStepId]);

    return (
        <CoinsAmountPanel.Root className="mt-6 sm:mt-16 sm:space-x-2">
            <CoinsAmountPanel.Info
                className="sm:flex-nowrap sm:flex-[1_0_auto] sm:w-max"
                display={{
                    ut: { title: "You're about to sell" },
                    ccy: { title: "For this much" },
                    loyality: { hide: true },
                }}
            />
            <CoinsAmountPanel.Button
                as="button"
                onClick={onNextStep}
                className="group sm:max-w-[238px] sm:basis-full sm:px-0 items-center space-x-2">
                <span>Next step</span>
                <ArrowChevronRightIcon className="w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </CoinsAmountPanel.Button>
        </CoinsAmountPanel.Root>
    );
};

export default OrderInfoAction;
