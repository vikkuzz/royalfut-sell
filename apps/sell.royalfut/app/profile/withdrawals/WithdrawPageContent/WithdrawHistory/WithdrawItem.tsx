import { ccyCollection } from "@royalfut/collections";
import {
    BTCIcon,
    ETHIcon,
    PaymentMastercardRotatedIcon,
    PaymentVisaMonocolorIcon,
    TetherRotatedIcon,
} from "@royalfut/icons";
// import { IOrder } from "@royalfut/interfaces";
import Image from "next/image";
import React from "react";
import OrderDate from "../../../_components/OrderList/OrderItem/OrderDate";
import StatusPayout from "./StatusPayout";
import { IPayoutOrder } from "@royalfut/interfaces";
import { ECCYIDs } from "@royalfut/enums";
import { cn } from "@royalfut/utils";

const WithdrawItem = ({ item }: { item: IPayoutOrder }) => {
    const id = item.currency.toLowerCase();
    return (
        <div className="flex w-full p-4 bg-white/[.05] rounded-xl items-center justify-between">
            <div className="flex gap-2 items-center md:gap-12">
                <span className="text-base text-white font-medium">
                    {ccyCollection[id as ECCYIDs].symbol}
                    {Number(item.amount).toFixed(2)}{" "}
                </span>
                <div className="px-3 relative w-4 h-4">
                    <Image alt="arrow" fill src={"/image/arrow-right.svg"} />
                </div>
                {item.withdrawByType === "CRYPTO" ? (
                    <span className="flex gap-1">
                        <BTCIcon
                            className={cn("text-white w-6 h-6 -rotate-[14deg]")}
                        />
                        <TetherRotatedIcon
                            className={cn("text-white w-6 h-6 rotate-12")}
                        />
                        <ETHIcon className={cn("text-white w-6 h-6")} />
                    </span>
                ) : (
                    <span className="flex gap-1">
                        <PaymentVisaMonocolorIcon
                            className={cn("text-white w-6 h-6")}
                        />
                        <PaymentMastercardRotatedIcon
                            className={cn("text-white w-6 h-6 -rotate-12")}
                        />
                    </span>
                )}
            </div>
            <div className="flex gap-3">
                <OrderDate createdAt={item.createdAt} hours />
                <StatusPayout item={item} />
            </div>
        </div>
    );
};

export default WithdrawItem;
