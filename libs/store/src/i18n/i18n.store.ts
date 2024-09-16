import { createStore } from "zustand";
import { EI18nIds } from "@royalfut/enums";

export interface II18nState {
    i18n: EI18nIds;
}

interface II18nAction {
    setI18n: (i18n: EI18nIds) => void;
}

export type I18nStore = II18nState & II18nAction;

const initialI18nState: II18nState = {
    i18n: EI18nIds.ENGLISH,
};

export const createI18nStore = (initState: II18nState = initialI18nState) => {
    return createStore<I18nStore>()(set => ({
        ...initState,
        setI18n: i18n =>
            set(() => {
                return { i18n };
            }),
    }));
};
