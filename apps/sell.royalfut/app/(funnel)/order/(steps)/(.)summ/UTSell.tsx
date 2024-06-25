"use client";

import { OrderBoxTitle, ContentEditableUTInput } from "@royalfut/components";
import { TransferValidationErrorMsgScheme } from "@royalfut/scheme";
import { useTransferSelectorStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";

const UTSell = () => {
    const use = useTransferSelectorStore.use;
    const hasError = use.hasError();
    const msgError = hasError ? TransferValidationErrorMsgScheme[hasError] : "";

    return (
        <div
            className={cn(
                "flex flex-col w-full h-max rounded-2xl p-4 transition-colors duration-300",
                {
                    "bg-system-error/30": hasError,
                    "bg-black-shape": !hasError,
                }
            )}>
            <OrderBoxTitle className="mb-2">Coins for sale</OrderBoxTitle>
            <ContentEditableUTInput />
            <span
                className={cn(
                    "block will-change-[height] text-system-error text-xs transition-all duration-300",
                    {
                        "opacity-100 h-3.5 pt-1.5": msgError.length !== 0,
                        "opacity-0 h-0 pt-0": msgError.length === 0,
                    }
                )}>
                {msgError}
            </span>
        </div>
    );
};

export default UTSell;
