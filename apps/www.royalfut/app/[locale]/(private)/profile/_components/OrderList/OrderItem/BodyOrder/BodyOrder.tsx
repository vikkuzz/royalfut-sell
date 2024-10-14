import { UTCoinMonocolorIcon } from "@royalfut/icons";
import { IOrder } from "@royalfut/interfaces";
import React from "react";
import StatusOrder from "./StatusOrder";
import { mapStatus } from "@royalfut/collections";
import BlockButtons from "./BlockButtons";
import SharedOrderBody from "./SharedOrderBody";
import { useTranslations } from "next-intl";

const BodyOrder = ({
    order,
    isOpen,
    handleClick,
}: {
    order: IOrder;
    isOpen: boolean;
    handleClick: (arg: boolean) => void;
}) => {
    const t = useTranslations("kelly_profile");
    return (
        <div className="flex flex-col">
            <div className="flex gap-3 flex-col-reverse md:flex-row">
                <div className="flex w-full bg-white-05 rounded-md p-4 gap-3">
                    <UTCoinMonocolorIcon className="text-secondary w-12 h-12" />
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-white-70">
                            {t("orders.amount")}
                        </span>
                        <span className="text-xl font-semibold">
                            {order.coinCount?.toLocaleString()}
                        </span>
                    </div>
                </div>
                <StatusOrder order={order} />
            </div>
            {mapStatus[order.status.toLowerCase()]?.btn_text && !isOpen && (
                <BlockButtons
                    order={order}
                    isOpen={isOpen}
                    handleClick={handleClick}
                />
            )}
            {mapStatus[order.status.toLowerCase()]?.body && isOpen && (
                <SharedOrderBody order={order} />
            )}
        </div>
    );
};

export default BodyOrder;
