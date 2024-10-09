import { useCallback } from "react";
import { useParams } from "next/navigation";
import { useI18nRouter } from "@royalfut/hooks";
import * as CoinsAmountPanel from "../../CoinsAmountPanel";
import {
    WWW_OrderProcessingStepsInfo,
    ORDER_STEPS_PATHNAMES,
    PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import { OrderInfoActionButton } from "../ui";
import { useOrderTradeStepsStore } from "@royalfut/store";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { cn } from "@royalfut/utils";
import { cnOrderInfoAction, cnOrderInfoActionRoot } from "../cn.tail";

const OrderInfoAction = () => {
    const router = useI18nRouter();
    const params = useParams();

    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));

    const onNextStep = useCallback(async () => {
        setStepId(EOrderProcessingStepIds.WWW_CHECKOUT, {
            markCurrentStepAsCompleted: true,
        });
        if (params.platform) {
            const urlPlatform = Array.isArray(params.platform)
                ? params.platform[0]
                : params.platform;
            const href = `${PROJECT_PUBLIC_WWW_ROUTES["ORDER"]}/${urlPlatform}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_CHECKOUT]}`;

            await router.push(href, {
                scroll: true,
            });
            return;
        }

        await router.push(
            `${WWW_OrderProcessingStepsInfo[EOrderProcessingStepIds.WWW_CHECKOUT]!.to}`,
            {
                scroll: true,
            }
        );
    }, [router, setStepId, params]);

    return (
        <CoinsAmountPanel.Root className={cnOrderInfoActionRoot}>
            <CoinsAmountPanel.Info className={cn(cnOrderInfoAction, "gap-6")}>
                <CoinsAmountPanel.InfoGroup>
                    <CoinsAmountPanel.CCY title="Price" />
                </CoinsAmountPanel.InfoGroup>
                <CoinsAmountPanel.Loyalty title="Cashback" />
            </CoinsAmountPanel.Info>
            <OrderInfoActionButton onNextStep={onNextStep} label="Checkout" />
        </CoinsAmountPanel.Root>
    );
};

export default OrderInfoAction;