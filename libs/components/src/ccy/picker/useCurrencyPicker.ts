import { useState, useCallback } from "react";
import { useCurrencyStore } from "@royalfut/store";
import { ccyCollection } from "@royalfut/collections";

import type { ICCYCollectionEntity } from "@royalfut/interfaces";
import type { ECCYIDs } from "@royalfut/enums";

interface ICurrencyPickerState {
    id: ECCYIDs;
    isOpen: boolean;
    ccy: ICCYCollectionEntity;
    toggleOpen: () => void;
    handleChange: (id: ECCYIDs) => void;
    onOpenChange: (open: boolean) => void;
}

export const useCurrencyPicker = (): ICurrencyPickerState => {
    const [id, setCurrency] = useCurrencyStore(state => [
        state.currency,
        state.setCurrency,
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const ccy = ccyCollection[id];

    const onOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, []);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleChange = useCallback(
        (currencyId: ECCYIDs) => {
            setCurrency(currencyId);
            setIsOpen(false);
        },
        [setCurrency]
    );

    return { id, isOpen, ccy, toggleOpen, handleChange, onOpenChange };
};
