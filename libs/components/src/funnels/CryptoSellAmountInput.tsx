"use client";

import { UTCoinMonocolorIcon, ErrorRoundedFillIcon } from "@royalfut/icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import SliderPicker from "./SliderPicker";
import ChangerButton from "./ChangerButton";
import { cn } from "@royalfut/utils";
import { useTransferSelectorStore } from "@royalfut/store";
import { TransferAdjustTypes } from "@royalfut/enums";
import { TransferValidationErrorMsgScheme } from "@royalfut/scheme";
import UTCoinInput from "./UTCoinInput";

import styles from "./CryptoSellAmountInput.module.scss";

const CryptoSellAmountInput = () => {
    const use = useTransferSelectorStore.use;
    const value = use.labelUT();
    const hasError = use.hasError();
    const msgError = hasError ? TransferValidationErrorMsgScheme[hasError] : "";

    return (
        <div className="flex flex-col space-y-5">
            <div className="w-full border border-white-20 flex rounded-lg justify-between">
                <ChangerButton variant={TransferAdjustTypes.MINUS} />
                <Tooltip.Provider>
                    <Tooltip.Root open={!!hasError}>
                        <Tooltip.Trigger asChild>
                            <label
                                data-value={value}
                                className={cn(
                                    "w-full flex justify-center select-none space-x-2 items-center cursor-text transition-colors duration-300 hover:bg-black-shape focus-within:bg-black-dropdown",
                                    styles.inputSizer
                                )}
                                htmlFor="input-coins">
                                <UTCoinMonocolorIcon className="text-secondary w-9 h-9" />
                                <UTCoinInput id="input-coins" />
                            </label>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <div className="popper [--z-index-popper:10]">
                                <Tooltip.Content
                                    className={cn(
                                        "group select-none rounded-xl p-2 bg-black-dropdown will-change-[transform,opacity]",
                                        "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
                                    )}
                                    sideOffset={-25}
                                    side="bottom">
                                    <Tooltip.Arrow
                                        className="fill-white w-6 -z-[-1] bg-black-dropdown h-8 group-data-[side=bottom]:rounded-b-[50%] group-data-[side=top]:rounded-b-[50%] -top-4 relative"
                                        asChild>
                                        <div />
                                    </Tooltip.Arrow>
                                    <div className="z-10 relative flex items-center space-x-1">
                                        <ErrorRoundedFillIcon className="w-4 h-4 text-system-error" />
                                        <span className="text-system-error text-xs font-medium">
                                            {msgError}
                                        </span>
                                    </div>
                                </Tooltip.Content>
                            </div>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <ChangerButton variant={TransferAdjustTypes.PLUS} />
            </div>
            <SliderPicker />
        </div>
    );
};

export default CryptoSellAmountInput;
