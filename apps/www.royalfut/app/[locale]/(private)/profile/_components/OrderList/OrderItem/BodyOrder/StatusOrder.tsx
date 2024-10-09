/* eslint-disable max-lines */
import Image from "next/image";
import React from "react";
import styles from "./StatusOrder.module.scss";
import { cn } from "@royalfut/utils";
import { mapStatus } from "@royalfut/collections";
import DeliveryProgress from "./DeliveryProgress";
import { IOrder } from "@royalfut/interfaces";
import { useTranslations } from "next-intl";

const StatusOrder = ({ order }: { order: IOrder }) => {
    const t = useTranslations("profile");
    let correctStatus = order?.status.toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(mapStatus, `${correctStatus}`)) {
        correctStatus = "unexpected_error";
    }

    return (
        <div
            className={cn(
                "flex flex-col w-full bg-white-05 rounded-md p-4 gap-2",
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
                    <span className="text-xs text-white-70">
                        {t("orders.status")}
                    </span>
                    <span className="text-xl font-semibold">
                        {t(mapStatus[correctStatus].label)}
                    </span>
                </div>
                {mapStatus[correctStatus].image !== "anime" && (
                    <div className="flex w-11 h-11 justify-center items-center relative">
                        <Image
                            alt="icon"
                            width={24}
                            height={24}
                            src={mapStatus[correctStatus].image}
                        />
                    </div>
                )}
                {mapStatus[correctStatus].image === "anime" && (
                    <div className={`${styles.wrapper_animation}`}>
                        <div className={`${styles.block1}`}></div>
                        <div className={`${styles.block2}`}></div>
                    </div>
                )}
            </div>
            {correctStatus === "in_progress" && (
                <DeliveryProgress item={order} />
            )}
            <span className="text-xs text-white-70">
                {t(mapStatus[correctStatus].description)}
            </span>
        </div>
    );
};

export default StatusOrder;
