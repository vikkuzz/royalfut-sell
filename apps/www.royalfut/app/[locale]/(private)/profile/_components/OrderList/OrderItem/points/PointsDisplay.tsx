"use client";
import React from "react";

import { CrownIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";

const PointsDisplay = ({ order, size }: { order: IOrder; size?: string }) => {
    if (
        order.status.toLowerCase() === "error_payment" ||
        order.status.toLowerCase() === "waiting_payment"
    ) {
        return <></>;
    } else if (order?.cashback) {
        if (order?.cashback > 0) {
            return (
                <div className="flex py-1 px-2 justify-center items-center gap-[2px] rounded-full h-fit text-base font-medium bg-purple-500">
                    +{Math.round(order?.cashback * 10)}{" "}
                    <div>
                        <CrownIcon
                            className={cn("text-white", {
                                "w-3 h-3": size === "sm",
                                "w-3.5 h-3.5 sm:w-4 sm:h-4": size === "md",
                            })}
                        />
                    </div>
                </div>
            );
        } else if (order?.cashbackUsed && order?.cashbackUsed > 0) {
            return (
                <div className="flex py-1 px-2 justify-center items-center gap-[2px] rounded-full h-fit text-base font-medium border border-purple-500">
                    -{Math.round(order?.cashbackUsed * 10)}
                    <div>
                        <CrownIcon
                            className={cn("text-white", {
                                "w-3 h-3": size === "sm",
                                "w-3.5 h-3.5 sm:w-4 sm:h-4": size === "md",
                            })}
                        />
                    </div>
                </div>
            );
        }
    } else {
        return <></>;
    }
};

export default PointsDisplay;
