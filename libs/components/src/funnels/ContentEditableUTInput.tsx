"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import { UTCoinMonocolorIcon, PencilMonocolorIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";
import UTCoinInput from "./UTCoinInput";

const ContentEditableUTInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const coinUT = useTransferSelectorStore.use.labelUT();
    const [editable, setEditable] = useState(false);

    const toggleEditable = useCallback(() => {
        setEditable((prev) => !prev);
    }, []);

    useEffect(() => {
        if (editable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editable]);

    return (
        <div className="flex justify-between items-center">
            <div className="flex space-x-1.5 flex-1">
                <UTCoinMonocolorIcon className="w-6 h-6 text-white flex-none" />
                <div className="w-full">
                    {editable ? (
                        <UTCoinInput
                            ref={inputRef}
                            type="text"
                            onBlur={() => setEditable(false)}
                            className="text-white font-semibold text-base flex-1 w-full"
                        />
                    ) : (
                        <span className="text-white font-semibold text-base">
                            {coinUT}
                        </span>
                    )}
                </div>
            </div>
            <Button
                as="button"
                onClick={toggleEditable}
                className={cn(
                    "w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300",
                    {
                        "bg-secondary/50": editable,
                        "bg-white-10 hover:bg-extra-benefit4/50": !editable,
                    },
                )}
            >
                <PencilMonocolorIcon className="w-3 h-3 text-white" />
            </Button>
        </div>
    );
};

export default ContentEditableUTInput;
