"use client";
import { ccyCollection } from "@royalfut/collections";
import { ArrowDownFilledIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import React, { useState } from "react";

const HeaderOrder = ({ order }: { order: IOrder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            type="button"
            name="share order"
            className="flex justify-between w-full"
            onClick={() => setIsOpen(!isOpen)}>
            <div>№ {order.id}</div>
            <div className="flex gap-1" data-state={isOpen ? "open" : "closed"}>
                <div className="bg-white/[.1] px-2 py-1 text-xs text-white/75 rounded-full">
                    {ccyCollection[order.currency].symbol}{" "}
                    {order.estimatedPrice?.toFixed(2)}
                </div>
                <ArrowDownFilledIcon
                    className={cn(
                        "text-white transition-transform duration-300 w-6",
                        { "rotate-180": isOpen }
                    )}
                />
            </div>
        </button>
    );
};

export default HeaderOrder;
