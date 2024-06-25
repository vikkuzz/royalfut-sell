import { ccyCollection } from "@royalfut/collections";
import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import Image from "next/image";
import React from "react";
import OrderDate from "../../../_components/OrderList/OrderItem/OrderDate";
import StatusPayout from "./StatusPayout";

const WithdrawItem = ({ item }: { item: IOrder }) => {
    return (
        <div className="flex w-full p-4 bg-white/[.05] rounded-xl items-center justify-between">
            <div className="flex gap-2 items-center">
                <UTCoinMonocolorIcon className="text-secondary w-5 h-5" />
                <span className="text-base font-medium">
                    {item.coinCount.toLocaleString()}
                </span>
                <div className="px-3 relative w-4 h-4">
                    <Image alt="arrow" fill src={"/image/arrow-right.svg"} />
                </div>
                <span>
                    +{ccyCollection[item.currency.toLowerCase()].symbol}
                    {Number(item.overallPrice).toFixed(2)}{" "}
                </span>
            </div>
            <div className="flex gap-3">
                <OrderDate createdAt={item.createdAt} hours />
                <StatusPayout item={item} />
            </div>
        </div>
    );
};

export default WithdrawItem;
