import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { OrderTradeStepsStoreProvider } from "@royalfut/store";
import { determineOrderProcessingStepByUrl } from "@royalfut/actions";
import { OrderStepActionRenderer } from "@royalfut/components";
import { EOrderProcessingStepIds } from "@royalfut/enums";

import type { FC, PropsWithChildren } from "react";

const FunnelLayout: FC<PropsWithChildren> = async ({ children }) => {
    const id = await determineOrderProcessingStepByUrl(
        EOrderProcessingStepIds.SELLER_ORDER_INFO,
    );

    return (
        <>
            <OrderTradeStepsStoreProvider initial={{ stepId: id }}>
                <div className="pt-[var(--size-layout-header)]">{children}</div>
                {/* NOTE: We are leave this element here to have native sticky effect */}
                <LayoutViewportSectionFrame className="sticky bottom-0 sm:relative z-10">
                    <OrderStepActionRenderer />
                </LayoutViewportSectionFrame>
            </OrderTradeStepsStoreProvider>
        </>
    );
};

export default FunnelLayout;
