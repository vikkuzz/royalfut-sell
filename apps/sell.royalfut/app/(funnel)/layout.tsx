import { headers } from "next/headers";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { OrderTradeInfo } from "@royalfut/collections";
import { OrderStepIds } from "@royalfut/enums";
import { OrderTradeStoreProvider } from "@royalfut/store";
import OrderSectionFrame from "./order/_components/OrderSectionFrame";
import OrderStepActionRenderer from "./order/_components/OrderStepActionRenderer";

import type { FC, PropsWithChildren } from "react";

const findStepId = async () => {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") || "";
    try {
        const { pathname } = new URL(fullUrl);
        const info = Object.values(OrderTradeInfo).find(
            info => info.to === pathname
        );

        return info?._id || OrderStepIds.ORDER_INFO;
    } catch (e) {
        return OrderStepIds.ORDER_INFO;
    }
};

const FunnelLayout: FC<PropsWithChildren> = async ({ children }) => {
    const id = await findStepId();
    return (
        <>
            <OrderTradeStoreProvider initial={{ stepId: id }}>
                <div className="pt-[var(--size-layout-header)]">{children}</div>
                {/* NOTE: We are leave this element here to have native sticky effect */}
                <LayoutViewportSectionFrame className="sticky bottom-0 sm:relative z-10">
                    <OrderSectionFrame>
                        <OrderStepActionRenderer />
                    </OrderSectionFrame>
                </LayoutViewportSectionFrame>
            </OrderTradeStoreProvider>
        </>
    );
};

export default FunnelLayout;
