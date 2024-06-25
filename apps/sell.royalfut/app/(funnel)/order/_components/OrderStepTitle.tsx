import type { FC } from "react";

const OrderStepTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <h1 className="font-bold text-4xl text-center text-white">{title}</h1>
    );
};

export default OrderStepTitle;
