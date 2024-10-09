"use client";
import { mapStatus } from "@royalfut/collections";
import { IOrder } from "@royalfut/interfaces";
import { useTransferEAAccountStore } from "@royalfut/store";
import { Button, GradientButton } from "@royalfut/ui";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlockButtons = ({
    order,
    isOpen,
    handleClick,
}: {
    order: IOrder;
    isOpen: boolean;
    handleClick: (arg: boolean) => void;
}) => {
    const t = useTranslations("profile");
    const router = useRouter();
    const { reset } = useTransferEAAccountStore();
    const [btnDesign, setBtnDesign] = useState(false);

    useEffect(() => {
        const currentStatus = order.status.toLowerCase();
        if (
            currentStatus === "finished" ||
            currentStatus === "pc_not_supported" ||
            currentStatus === "error_payment" ||
            currentStatus === "waiting_payment"
        ) {
            setBtnDesign(true);
        } else {
            setBtnDesign(false);
        }
    }, [order]);

    const click = () => {
        if (mapStatus[order.status.toLowerCase()].btn_fnc === "retryOrder") {
            router.push("/order");
        } else if (
            mapStatus[order.status.toLowerCase()].btn_fnc === "openOrder"
        ) {
            handleClick(!isOpen);
        } else if (
            mapStatus[order.status.toLowerCase()].btn_fnc === "wrongCredentials"
        ) {
            handleClick(!isOpen);
            reset();
        }
    };

    return (
        <div data-id={order.id} className="flex gap-2">
            <div
                data-id={order.id}
                className="xs:hidden md:flex w-full max-w-[50%] "></div>

            {mapStatus[order.status.toLowerCase()].btn_text && !btnDesign && (
                <div className="w-full md:max-w-[50%] md:pl-1 pt-4 h-20">
                    <GradientButton
                        asChild
                        onClick={click}
                        className="text-xl font-semibold w-full h-full rounded-xl">
                        <span className="w-full h-full text-base whitespace-nowrap capitalize">
                            {t(mapStatus[order.status.toLowerCase()].btn_text)}
                        </span>
                    </GradientButton>
                </div>
            )}
            {mapStatus[order.status.toLowerCase()].btn_text && btnDesign && (
                <div className="w-full md:max-w-[50%] md:pl-1 pt-4 h-20">
                    <Button
                        asChild
                        vtype="bordered-shadow"
                        vsize="3xl"
                        onClick={click}
                        className="text-xl font-semibold w-full h-full rounded-xl">
                        <span className="w-full h-full text-base whitespace-nowrap capitalize">
                            {t(mapStatus[order.status.toLowerCase()].btn_text)}
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BlockButtons;
