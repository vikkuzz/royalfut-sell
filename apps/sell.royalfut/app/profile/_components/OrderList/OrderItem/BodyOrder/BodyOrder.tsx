import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import React from "react";
import StatusOrder from "./StatusOrder";

const BodyOrder = ({ order }: { order: IOrder }) => {
    return (
        <div className="flex gap-3">
            <div className="flex w-full bg-white/[.05] rounded-md p-4 gap-3">
                <UTCoinMonocolorIcon className="text-secondary w-12 h-12" />
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/75">Amount</span>
                    <span className="text-sm font-semibold">
                        {order.coinCount.toLocaleString()}
                    </span>
                </div>
            </div>
            <StatusOrder status={order.status} />
        </div>
    );
};

export default BodyOrder;
