"use client";

import { HoverCard } from "@royalfut/ui";
import { useUIGlobalStore } from "@royalfut/store";
import { useI18nPicker } from "./useI18nPicker";
import { PickerTrigger, PickerCard } from "../common";

import type { FNCN } from "@royalfut/interfaces";
import type { IPickerProps } from "../common";

const I18nPickerHover: FNCN<IPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = false,
    showListCountryFlag = false,
}) => {
    const { handleChange, toggleOpen, id, isOpen, onOpenChange } =
        useI18nPicker();
    const coll = useUIGlobalStore(state => state.local.lng);

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
                    label={coll[id].label}
                    image={{
                        flag: coll[id].image.flag,
                    }}
                    size={size}
                />
            </HoverCard.Trigger>
            <HoverCard.Content className="w-dropdownI18n">
                <PickerCard
                    showFlag={showListCountryFlag}
                    id={id}
                    type="i18n"
                    coll={coll}
                    onChange={handleChange as (id: string) => void}
                />
            </HoverCard.Content>
        </HoverCard.Root>
    );
};

export default I18nPickerHover;
