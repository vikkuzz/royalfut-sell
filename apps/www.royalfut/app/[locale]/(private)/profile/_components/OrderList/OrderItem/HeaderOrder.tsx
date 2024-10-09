"use client";
import { ccyCollection, mapStatus } from "@royalfut/collections";
import { ArrowDownFilledIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import React from "react";
import PointsDisplay from "./points/PointsDisplay";

const HeaderOrder = ({
    order,
    isOpen,
    handleClick,
}: {
    order: IOrder;
    isOpen: boolean;
    handleClick: (arg: boolean) => void;
}) => {
    const handleClickAction = () => {
        if (mapStatus[order.status.toLowerCase()]?.body) {
            handleClick(!isOpen);
        } else {
            console.log(order.id);
        }
    };
    return (
        <button
            type="button"
            name="share order"
            className="flex justify-between w-full"
            onClick={handleClickAction}>
            <div>№ {order.id}</div>
            <div className="flex gap-1" data-state={isOpen ? "open" : "closed"}>
                <PointsDisplay order={order} size={"sm"} />
                <div className="flex bg-white/[.1] px-2 py-1 text-base text-white/75 rounded-full items-center">
                    {ccyCollection[order.currency]?.symbol}{" "}
                    {order.overallPrice?.toFixed(2)}
                </div>
                {mapStatus[order.status.toLowerCase()]?.body && (
                    <ArrowDownFilledIcon
                        className={cn(
                            "text-white transition-transform duration-300 w-6",
                            { "rotate-180": isOpen }
                        )}
                    />
                )}
            </div>
        </button>
    );
};

export default HeaderOrder;
