import Image from "next/image";
import React from "react";
import styles from "./StatusOrder.module.scss";
import { cn } from "@royalfut/utils";

interface IMapStatus {
    [key: string]: {
        label: string;
        image: string;
        theme: string;
        description: string;
    };
}

const mapStatus: IMapStatus = {
    error_payment: {
        label: "Error payment",
        image: "/image/status/error.svg",
        theme: "red",
        description: "",
    },
    error: {
        label: "Insufficient Coin Balance",
        image: "/image/status/warning.svg",
        theme: "red",
        description:
            "Funds for coins has been charged to the ROYALFUT balance.",
    },
    finished: {
        label: "Deal Completed",
        image: "/image/status/done.svg",
        theme: "green",
        description: "",
    },
    closed: {
        label: "Deal Completed",
        image: "/image/status/done.svg",
        theme: "green",
        description: "",
    },
    in_progress: {
        label: "Transfer in Progress",
        image: "anime",
        theme: "white",
        description: "",
    },
    accepted: {
        label: "Checking your Account",
        image: "anime",
        theme: "blue",
        description: "",
    },
    started: {
        label: "Order started",
        image: "/image/status/info.svg",
        theme: "blue",
        description: "",
    },
    undefined: {
        label: "Status is not mapped",
        image: "/image/status/info.svg",
        theme: "blue",
        description: "",
    },
    created: {
        label: "Created",
        image: "/image/status/info.svg",
        theme: "white",
        description: "",
    },
};

const StatusOrder = ({ status }: { status: string }) => {
    const correctStatus = status.toLowerCase();
    // if (!mapStatus.hasOwnProperty(`${correctStatus}`)) {
    //     correctStatus = "undefined";
    // }

    return (
        <div
            className={cn(
                "flex flex-col w-full bg-white/[.05] rounded-md p-4 gap-2",
                {
                    "bg-[#15BC26] bg-opacity-30":
                        mapStatus[correctStatus].theme === "green",
                    "bg-[#E84545] bg-opacity-30":
                        mapStatus[correctStatus].theme === "red",
                    "bg-[#4285f4] bg-opacity-30":
                        mapStatus[correctStatus].theme === "blue",
                }
            )}>
            <div className="flex w-full justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/75">Status</span>
                    <span className="text-sm font-semibold">
                        {mapStatus[correctStatus].label}
                    </span>
                </div>
                {correctStatus !== "in_progress" &&
                    correctStatus !== "accepted" && (
                        <div className="flex w-11 h-11 justify-center items-center relative">
                            <Image
                                alt="icon"
                                width={24}
                                height={24}
                                src={mapStatus[correctStatus].image}
                            />
                        </div>
                    )}
                {(correctStatus === "in_progress" ||
                    correctStatus === "accepted") && (
                    <div className={`${styles.wrapper_animation}`}>
                        <div className={`${styles.block1}`}></div>
                        <div className={`${styles.block2}`}></div>
                    </div>
                )}
            </div>
            <span className="text-xs text-white/75">
                {mapStatus[correctStatus].description}
            </span>
        </div>
    );
};

export default StatusOrder;
