"use client";

import { useState, useCallback } from "react";
import { useUpdate } from "@lilib/hooks";
import { useParams } from "next/navigation";
import { useI18nPathname, useI18nRouter } from "@royalfut/hooks";
import { useI18nStore } from "@royalfut/store";
import { DefaultAppSettings } from "@royalfut/collections";

import type { EI18nIds } from "@royalfut/enums";

interface II18nPickerState {
    id: EI18nIds;
    isOpen: boolean;
    toggleOpen: () => void;
    handleChange: (id: EI18nIds) => void;
    onOpenChange: (open: boolean) => void;
}

export const useI18nPicker = (): II18nPickerState => {
    const params = useParams();
    const router = useI18nRouter();
    const pathname = useI18nPathname();
    const [id, setI18n] = useI18nStore(state => [state.i18n, state.setI18n]);
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, []);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleChange = useCallback(
        (_id: EI18nIds) => {
            router.push(pathname, { locale: _id });
            setIsOpen(false);
        },
        [pathname, router]
    );

    useUpdate(() => {
        if (params.locale) {
            setI18n(params.locale as EI18nIds);
        } else {
            setI18n(DefaultAppSettings.i18n);
        }
    }, [params]);

    return { id, isOpen, toggleOpen, handleChange, onOpenChange };
};
