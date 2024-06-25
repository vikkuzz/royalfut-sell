import React from "react";
import OrderDate from "./OrderDate";
import { IOrder } from "@royalfut/interfaces";
import HeaderOrder from "./HeaderOrder";
import BodyOrder from "./BodyOrder/BodyOrder";

const OrderItem = ({ order }: { order: IOrder }) => {
    console.log(order)
    return (
        <div className="flex gap-4 flex-col">
            <OrderDate createdAt={order.createdAt} />
            <div className="flex flex-col border border-white-10 rounded-xl bg-white/[.02] p-4 w-full gap-6">
                <HeaderOrder order={order} />
                <BodyOrder order={order} />
            </div>
        </div>
    );
};

export default OrderItem;
