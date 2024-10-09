import { OrderStepProcessing } from "@royalfut/components";

import type { FC, PropsWithChildren } from "react";

const OrderLayout: FC<PropsWithChildren> = ({ children }) => {
    return <OrderStepProcessing>{children}</OrderStepProcessing>;
};

export default OrderLayout;
