"use client";

import { CCYDisplay, CurrencyPickerDropdown } from "@royalfut/components";
import { ClockIcon } from "@royalfut/icons";
import { useTransferStore } from "@royalfut/store";

const EarnMoney = () => {
    const { payment } = useTransferStore();
    return (
        <div className="flex flex-col gap-1">
            <div className="flex space-x-2.5">
                <CCYDisplay
                    className="text-xl"
                    imageType="image"
                    decimalPlaces={2}
                />
                <div className="flex h-auto items-center bg-black-dropdown rounded-md">
                    <CurrencyPickerDropdown
                        className="px-2 items-center space-x-1"
                        size="sm"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-white-40">
                    Estimated time
                </span>
                <ClockIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">
                    {payment === "first" && "10 hours"}
                    {payment === "sixth" && "16 hours"}
                </span>
            </div>
        </div>
    );
};

export default EarnMoney;
