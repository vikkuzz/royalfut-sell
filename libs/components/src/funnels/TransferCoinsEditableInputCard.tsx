"use client";

import { OrderBoxTitle } from "./TradeSummary.client";
import { TransferValidationErrorMsgScheme } from "@royalfut/scheme";
import { useTransferSelectorStore } from "@royalfut/store";
import ContentEditableUTInput from "./ContentEditableUTInput";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface ITransferCoinsEditableInputCardProps {
    title: string;
}

const TransferCoinsEditableInputCard: FNCN<
    ITransferCoinsEditableInputCardProps
> = ({ title, className }) => {
    const use = useTransferSelectorStore.use;
    const hasError = use.hasError();
    const msgError = hasError ? TransferValidationErrorMsgScheme[hasError] : "";

    return (
        <div
            className={cn(
                "flex flex-col w-full h-max rounded-2xl p-4 transition-colors duration-300",
                {
                    "bg-[hsla(var(--color-system-error),.3)]": hasError,
                    "bg-[var(--bg,theme(colors.black.shape))]": !hasError,
                },
                className
            )}>
            <OrderBoxTitle className="mb-2">{title}</OrderBoxTitle>
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

export default TransferCoinsEditableInputCard;
