import { IOrder } from "@royalfut/interfaces";
import React from "react";

const DeliveryProgress = ({ item }: { item: IOrder }) => {
    return (
        <div className="flec flex-col pt-3 w-full ">
            <div className="opacity-40 text-xs">Coins transferred</div>
            <div className="flex justify-start w-full text-xl font-semibold pt-1">
                {Number(item.coinTransferred)?.toLocaleString("ru-RU")} /{" "}
                {item.coinCount?.toLocaleString("ru-RU")}
            </div>
            <div className="flex flex-col relative justify-end pt-4 w-full">
                <div className="self-end text-xl font-semibold absolute top-[-24px]">
                    {item.percentTransferred &&
                    String(item.percentTransferred).indexOf("%") > -1
                        ? item.percentTransferred
                        : `${item.percentTransferred}%`}
                </div>
                <div className="h-3 justify-start rounded-full bg-white-10">
                    <div
                        className="h-full w-auto rounded-full animate-backgroundPan bg-linear-primary-pan background-size-200"
                        style={{
                            width: `${
                                item.percentTransferred &&
                                String(item.percentTransferred).indexOf("%") >
                                    -1
                                    ? item.percentTransferred
                                    : `${item.percentTransferred}%`
                            }`,
                        }}></div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryProgress;
