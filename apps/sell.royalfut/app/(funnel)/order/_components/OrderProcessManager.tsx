import OrderStepTitle from "./OrderStepTitle";
import OrderStepper from "./OrderStepper";

import type { FC, PropsWithChildren } from "react";
import type { IOrderStepsProps } from "./OrderStepper";

interface IOrderProcessManagerProps {
    title: string;
    steps: Pick<IOrderStepsProps, "active" | "availableSteps">;
}

const OrderProcessManager: FC<PropsWithChildren<IOrderProcessManagerProps>> = ({
    children,
    steps,
    title,
}) => {
    return (
        <>
            <div className="w-full space-y-6 mb-7 sm:mb-14">
                <OrderStepTitle title={title} />
                <OrderStepper {...steps} />
            </div>
            <div>{children}</div>
        </>
    );
};

export default OrderProcessManager;
