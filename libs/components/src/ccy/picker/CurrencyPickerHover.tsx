"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { cn } from "@royalfut/utils";
import { useCurrencyPicker } from "./useCurrencyPicker";
import CurrencyPickerCard from "./CurrencyPickerCard";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";
import { cnPickerContent } from "./ccyPicker.tail";

import styles from "./CurrencyPicker.module.scss";
import type { FNCN } from "@royalfut/interfaces";
import type { ICurrencyPickerProps } from "./_types";

const CurrencyPicker: FNCN<ICurrencyPickerProps> = ({
    className,
    size = "md",
    showCountryFlag = false,
}) => {
    const { ccy, handleChange, toggleOpen, id, isOpen, onOpenChange } =
        useCurrencyPicker();

    return (
        <HoverCard.Root
            onOpenChange={onOpenChange}
            openDelay={400}
            open={isOpen}>
            <HoverCard.Trigger
                className={cn("cursor-default", className)}
                onClick={toggleOpen}
                data-state={isOpen ? "open" : "closed"}
                asChild>
                <CurrencyPickerTrigger ccy={ccy} size={size} />
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <div className={styles["content-wrapper"]}>
                    <HoverCard.Content
                        className={cn(cnPickerContent)}
                        sideOffset={10}>
                        <CurrencyPickerCard
                            showFlag={showCountryFlag}
                            id={id}
                            onChange={handleChange}
                        />
                    </HoverCard.Content>
                </div>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default CurrencyPicker;
