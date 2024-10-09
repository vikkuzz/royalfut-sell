import { useCallback } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import ActionPairNavigations from "../ActionPairNavigations";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { OrderProcessingStepsInfo } from "@royalfut/collections";
import { EOrderProcessingStepIds } from "@royalfut/enums";

const SummaryAndSellAction = () => {
    const router = useI18nRouter();
    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));
    // const setCompleted = useOrderTradeStepsStore(
    //     state => state.setStepsCompleted
    // );

    const nextStep = useCallback(async () => {
        await router.push(
            `${OrderProcessingStepsInfo[EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS].to}`,
            {
                scroll: true,
            }
        );
        setStepId(EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS, {
            markCurrentStepAsCompleted: true,
        });
    }, [router, setStepId]);

    return (
        <ActionPairNavigations
            className="sm:mt-[6.37rem]"
            prev={{
                id: EOrderProcessingStepIds.SELLER_ORDER_INFO,
                label: "Order Info",
            }}
            next={{
                id: EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
                label: "Account Details",
                onAction: nextStep,
            }}
        />
    );
};

export default SummaryAndSellAction;
