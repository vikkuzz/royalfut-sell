import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { OrderStepProcessing } from "@royalfut/components";
import PrefetchSteps from "./_components/PrefetchSteps";

import type { FC, PropsWithChildren } from "react";

const OrderLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <LayoutViewportSectionFrame>
                <OrderStepProcessing>{children}</OrderStepProcessing>
            </LayoutViewportSectionFrame>
            <PrefetchSteps />
        </>
    );
};

export default OrderLayout;
