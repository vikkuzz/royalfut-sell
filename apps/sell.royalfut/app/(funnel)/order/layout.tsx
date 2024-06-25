import { LayoutViewportSectionFrame } from "@royalfut/ui";
import OrderSectionFrame from "./_components/OrderSectionFrame";
import PrefetchSteps from "./_components/PrefetchSteps";

import type { FC, PropsWithChildren } from "react";

const OrderLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <LayoutViewportSectionFrame>
                <OrderSectionFrame>{children}</OrderSectionFrame>
            </LayoutViewportSectionFrame>
            <PrefetchSteps />
        </>
    );
};

export default OrderLayout;
