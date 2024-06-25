"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@royalfut/utils";
import { useCurrencyPicker } from "./useCurrencyPicker";
import CurrencyPickerCard from "./CurrencyPickerCard";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";
import { cnPickerContent } from "./ccyPicker.tail";

import type { FNCN } from "@royalfut/interfaces";
import type { ICurrencyPickerProps } from "./_types";

const CurrencyPickerDropdown: FNCN<ICurrencyPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = false,
}) => {
    const { ccy, handleChange, id, isOpen, onOpenChange } = useCurrencyPicker();

    return (
        <DropdownMenu.Root
            modal={false}
            open={isOpen}
            onOpenChange={onOpenChange}>
            <DropdownMenu.Trigger className={className} asChild>
                <CurrencyPickerTrigger
                    aria-label="Choose currency"
                    size={size}
                    ccy={ccy}
                />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={cn(cnPickerContent)}
                    sideOffset={10}
                    side="top">
                    <CurrencyPickerCard
                        showFlag={showCountryFlag}
                        id={id}
                        onChange={handleChange}
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default CurrencyPickerDropdown;
