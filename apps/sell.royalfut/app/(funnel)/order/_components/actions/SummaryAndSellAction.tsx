import { OrderStepIds } from "@royalfut/enums";
import ActionPairNavigations from "./ActionPairNavigations";
import { useCallback } from "react";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { useRouter } from "next/navigation";
import { OrderTradeInfo } from "@royalfut/collections";

const SummaryAndSellAction = () => {
    const router = useRouter();
    // const setCompleted = useOrderTradeStepsStore(
    //     state => state.setStepsCompleted
    // );
    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));
    const nextStep = useCallback(async () => {
        await router.push(
            `${OrderTradeInfo[OrderStepIds.ACCOUNT_DETAILS].to}`,
            {
                scroll: true,
            }
        );
        setStepId(OrderStepIds.ACCOUNT_DETAILS, {
            markCurrentStepAsCompleted: true,
        });
    }, [router, setStepId]);
    return (
        <ActionPairNavigations
            className="sm:mt-[6.37rem]"
            prev={{
                id: OrderStepIds.ORDER_INFO,
                label: "Order Info",
            }}
            next={{
                id: OrderStepIds.ACCOUNT_DETAILS,
                label: "Account Details",
                onAction: nextStep,
            }}
        />
    );
};

export default SummaryAndSellAction;
