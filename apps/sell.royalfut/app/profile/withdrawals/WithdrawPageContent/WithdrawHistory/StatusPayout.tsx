"use client";
import { CheckVIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import React, { useEffect, useState } from "react";

interface IStatus {
    color: string;
    text: string;
    textColor: string;
    icon: boolean;
}

const StatusPayout = ({ item }: {item:any}) => {
    const mapStatus = {
        closed: {
            color: "#15BC26",
            text: "Paid",
            textColor: "text-white",
            icon: true,
        },
        other: {
            color: "#EAB11F",
            text: "In Progress",
            textColor: "text-black",
            icon: false,
        },
    };
    const [status, setStatus] = useState<IStatus>(mapStatus.other);
    useEffect(() => {
        if (item.status.toLowerCase() === "closed") {
            setStatus(mapStatus.closed);
        } else {
            setStatus(mapStatus.other);
        }
    }, [item, mapStatus.closed, mapStatus.other]);
    return (
        <div
            className={cn(
                "flex rounded-full px-2 py-1 text-xs font-medium items-center gap-1",
                {
                    "bg-[#15BC26] text-white": status.color === "#15BC26",
                    "bg-[#EAB11F] text-black": status.color === "#EAB11F",
                }
            )}>
            {status.text}
            {status.icon && <CheckVIcon className="w-3 h-3 text-white" />}
        </div>
    );
};

export default StatusPayout;
