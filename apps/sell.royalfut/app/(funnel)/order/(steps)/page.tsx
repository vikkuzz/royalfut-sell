import {
    OrderByPlatforms,
    CoinAmountSelector,
    OrderProcessManager,
    PlatformChoice,
} from "@royalfut/components";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import {
    SELLER_OrderProcessingStepsInfo,
    PlatformAppSets,
} from "@royalfut/collections";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order info | Ultimate Team Coin Store",
};

const OrderPage = () => {
    return (
        <OrderProcessManager
            title="Sell FC 24 Ultimate Team coins"
            steps={{
                active: EOrderProcessingStepIds.SELLER_ORDER_INFO,
                availableSteps:
                    SELLER_OrderProcessingStepsInfo[
                        EOrderProcessingStepIds.SELLER_ORDER_INFO
                    ]!.allowSteps,
            }}
        >
            <div>
                <OrderByPlatforms title="Select your platform">
                    <PlatformChoice.Root>
                        <PlatformChoice.Buttons sets={PlatformAppSets} />
                    </PlatformChoice.Root>
                </OrderByPlatforms>
                <CoinAmountSelector title="Specify the amount of coins for sale" />
            </div>
        </OrderProcessManager>
    );
};

export default OrderPage;
