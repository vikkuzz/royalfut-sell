"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useI18nPicker } from "./useI18nPicker";
import { PickerTrigger, PickerCard, cnPickerContent } from "../common";
import { useProjectGlobalStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";

import styles from "../common/picker.module.scss";
import type { FNCN } from "@royalfut/interfaces";
import type { IPickerProps } from "../common";

const I18nPickerDropdown: FNCN<IPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = true,
    showListCountryFlag = false,
}) => {
    const { handleChange, id, isOpen, onOpenChange } = useI18nPicker();
    const coll = useProjectGlobalStore(state => state.local.lng);

    if (!coll) return null;

    return (
        <DropdownMenu.Root
            modal={false}
            open={isOpen}
            onOpenChange={onOpenChange}>
            <DropdownMenu.Trigger className={className} asChild>
                <PickerTrigger
                    showFlag={showCountryFlag}
                    aria-label="Choose language"
                    className="items-center"
                    label={coll[id].label}
                    image={{
                        flag: coll[id].image.flag,
                    }}
                    size={size}
                />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <div className={styles["content-wrapper"]}>
                    <DropdownMenu.Content
                        className={cn("w-dropdownI18n", cnPickerContent)}
                        sideOffset={10}
                        side="top">
                        <PickerCard
                            showFlag={showListCountryFlag}
                            id={id}
                            type="i18n"
                            coll={coll}
                            onChange={handleChange as (id: string) => void}
                        />
                    </DropdownMenu.Content>
                </div>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default I18nPickerDropdown;
