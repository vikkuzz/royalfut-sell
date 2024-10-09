import { useCallback } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import * as CoinsAmountPanel from "../../CoinsAmountPanel";
import { SELLER_OrderProcessingStepsInfo } from "@royalfut/collections";
import {
    useOrderTradeStepsStore,
    // useTransferEAAccountStore,
} from "@royalfut/store";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { cnOrderInfoAction, cnOrderInfoActionRoot } from "../cn.tail";
import { OrderInfoActionButton } from "../ui";

const OrderInfoAction = () => {
    const router = useI18nRouter();
    // const nextToLastStep = useTransferEAAccountStore(state => state.isFilled);
    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));

    const onNextStep = useCallback(async () => {
        // if (nextToLastStep) {
        setStepId(EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS, {
            markCurrentStepAsCompleted: true,
        });

        await router.push(
            `${SELLER_OrderProcessingStepsInfo[EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]!.to}`,
            {
                scroll: true,
            }
        );
        // } else {
        //     setStepId(EOrderProcessingStepIds.SUMMARY_AND_SELL, {
        //         markCurrentStepAsCompleted: true,
        //     });
        //     await router.push(
        //         `${OrderProcessingStepsInfo[EOrderProcessingStepIds.SUMMARY_AND_SELL].to}`,
        //         {
        //             scroll: true,
        //         }
        //     );
        // }
    }, [router, setStepId]);

    return (
        <CoinsAmountPanel.Root className={cnOrderInfoActionRoot}>
            <CoinsAmountPanel.Info className={cnOrderInfoAction}>
                <CoinsAmountPanel.InfoGroup>
                    <CoinsAmountPanel.UT title="You're about to sell" />
                    <CoinsAmountPanel.CCY title="For this much" />
                </CoinsAmountPanel.InfoGroup>
            </CoinsAmountPanel.Info>
            <OrderInfoActionButton onNextStep={onNextStep} label="Next step" />
        </CoinsAmountPanel.Root>
    );
};

export default OrderInfoAction;
