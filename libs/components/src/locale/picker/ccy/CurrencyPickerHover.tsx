"use client";

import { HoverCard } from "@royalfut/ui";
import { useProjectGlobalStore } from "@royalfut/store";
import { useCurrencyPicker } from "./useCurrencyPicker";
import { PickerTrigger, PickerCard } from "../common";

import type { FNCN } from "@royalfut/interfaces";
import type { IPickerProps } from "../common";

const CurrencyPicker: FNCN<IPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = false,
    showListCountryFlag = false,
}) => {
    const { ccy, handleChange, toggleOpen, id, isOpen, onOpenChange } =
        useCurrencyPicker();
    const coll = useProjectGlobalStore(state => state.local.ccy);

    if (!coll) return null;

    return (
        <HoverCard.Root onOpenChange={onOpenChange} open={isOpen}>
            <HoverCard.Trigger
                className={className}
                onClick={toggleOpen}
                isOpen={isOpen}
                asChild>
                <PickerTrigger
                    showFlag={showCountryFlag}
                    className="items-center"
                    size={size}
                    label={ccy.code}
                    image={{
                        flag: ccy.image.flag,
                        alt: ccy.currency,
                    }}
                />
            </HoverCard.Trigger>
            <HoverCard.Content className="w-dropdownCurrency">
                <PickerCard
                    showFlag={showListCountryFlag}
                    id={id}
                    type="ccy"
                    coll={coll}
                    onChange={handleChange as (id: string) => void}
                />
            </HoverCard.Content>
        </HoverCard.Root>
    );
};

export default CurrencyPicker;
