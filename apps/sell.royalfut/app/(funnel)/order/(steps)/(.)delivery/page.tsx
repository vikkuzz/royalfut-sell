import { OrderTradeInfo } from "@royalfut/collections";
import { OrderStepIds } from "@royalfut/enums";
import Image from "next/image";
import OrderProcessManager from "../../_components/OrderProcessManager";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awaiting for delivery | Ultimate Team Coin Store",
};

const mapStatus = {
    success: {
        label: "You can track the status of the coin transfer on the Deals tab of your profile page",
        image: "/image/processing.png",
    },
    error: {
        label: "Check the data specified during payment or use another payment method",
        image: "/image/cash-money-error.png",
    },
};

const SummaryAndSell = () => {
    const status = "success";

    return (
        <OrderProcessManager
            title="Sale request submitted"
            steps={{
                active: OrderStepIds.AWAITING_FOR_DELIVERY,
                availableSteps:
                    OrderTradeInfo[OrderStepIds.AWAITING_FOR_DELIVERY]
                        .allowSteps,
            }}>
            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center space-y-4 max-w-[21.4375rem] mx-auto">
                    <div className="relative w-80 h-60">
                        <Image
                            alt={status}
                            src={mapStatus[status].image}
                            fill
                        />
                    </div>
                    <span className="text-base font-medium leading-5 text-white-60 text-center">
                        {mapStatus[status].label}
                    </span>
                </div>
            </div>
        </OrderProcessManager>
    );
};

export default SummaryAndSell;
