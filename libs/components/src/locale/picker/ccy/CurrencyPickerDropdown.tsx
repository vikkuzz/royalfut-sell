"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCurrencyPicker } from "./useCurrencyPicker";
import { PickerTrigger, PickerCard, cnPickerContent } from "../common";
import { useProjectGlobalStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";

import styles from "../common/picker.module.scss";
import type { FNCN } from "@royalfut/interfaces";
import type { IPickerProps } from "../common";

const CurrencyPickerDropdown: FNCN<IPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = true,
    showListCountryFlag = false,
}) => {
    const { ccy, handleChange, id, isOpen, onOpenChange } = useCurrencyPicker();
    const coll = useProjectGlobalStore(state => state.local.ccy);

    if (!coll) return null;

    return (
        <DropdownMenu.Root
            modal={false}
            open={isOpen}
            onOpenChange={onOpenChange}>
            <DropdownMenu.Trigger className={className} asChild>
                <PickerTrigger
                    aria-label="Choose currency"
                    className="items-center"
                    showFlag={showCountryFlag}
                    size={size}
                    label={ccy.code}
                    image={{
                        flag: ccy.image.flag,
                        alt: ccy.currency,
                    }}
                />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <div className={styles["content-wrapper"]}>
                    <DropdownMenu.Content
                        className={cn("w-dropdownCurrency", cnPickerContent)}
                        sideOffset={10}
                        side="top">
                        <PickerCard
                            showFlag={showListCountryFlag}
                            id={id}
                            coll={coll}
                            type="ccy"
                            onChange={handleChange as (id: string) => void}
                        />
                    </DropdownMenu.Content>
                </div>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default CurrencyPickerDropdown;
