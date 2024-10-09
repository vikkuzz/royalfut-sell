"use client";
import React, { useState } from "react";
import OrderDate from "./OrderDate";
import { IOrder } from "@royalfut/interfaces";
import HeaderOrder from "./HeaderOrder";
import BodyOrder from "./BodyOrder/BodyOrder";

const OrderItem = ({ order }: { order: IOrder }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex gap-4 flex-col">
            <OrderDate createdAt={order.createdAt} />
            <div className="flex flex-col border border-white-10 rounded-xl bg-[#2B2D43] p-4 w-full gap-6">
                <HeaderOrder
                    order={order}
                    isOpen={isOpen}
                    handleClick={setIsOpen}
                />
                <BodyOrder
                    order={order}
                    handleClick={setIsOpen}
                    isOpen={isOpen}
                />
            </div>
        </div>
    );
};

export default OrderItem;
