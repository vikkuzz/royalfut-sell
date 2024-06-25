import { OrderByPlatforms, CoinAmountSelector } from "@royalfut/components";
import { OrderStepIds } from "@royalfut/enums";
import { OrderTradeInfo } from "@royalfut/collections";
import OrderProcessManager from "../_components/OrderProcessManager";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order info | Ultimate Team Coin Store",
};

const OrderPage = () => {
    return (
        <OrderProcessManager
            title="Sell FC 24 Ultimate Team coins"
            steps={{
                active: OrderStepIds.ORDER_INFO,
                availableSteps:
                    OrderTradeInfo[OrderStepIds.ORDER_INFO].allowSteps,
            }}>
            <div>
                <OrderByPlatforms />
                <CoinAmountSelector />
            </div>
        </OrderProcessManager>
    );
};

export default OrderPage;
