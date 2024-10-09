import { determineOrderProcessingStepByUrl } from "@royalfut/actions";
import { OrderStepActionRenderer } from "@royalfut/components";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { OrderTradeStepsStoreProvider } from "@royalfut/store";
import { EOrderProcessingStepIds } from "@royalfut/enums";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = async ({ children }) => {
    const id = await determineOrderProcessingStepByUrl(
        EOrderProcessingStepIds.WWW_ORDER_INFO
    );

    return (
        <OrderTradeStepsStoreProvider initial={{ stepId: id }}>
            <LayoutViewportSectionFrame asChild>
                <div>{children}</div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="sticky bottom-0 sm:relative z-10">
                <OrderStepActionRenderer />
            </LayoutViewportSectionFrame>
        </OrderTradeStepsStoreProvider>
    );
};

export default Layout;
