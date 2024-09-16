"use client";

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

interface II18nNSState {
    ns: string;
}

const I18nNSStoreContext = createContext<{ state: II18nNSState } | undefined>(
    undefined
);

interface II18nNSStoreProviderProps {
    children: ReactNode;
    initial: II18nNSState;
}

export const I18nNSStoreProvider = ({
    children,
    initial,
}: II18nNSStoreProviderProps) => {
    const [state] = useState(initial);

    return (
        <I18nNSStoreContext.Provider value={{ state }}>
            {children}
        </I18nNSStoreContext.Provider>
    );
};

export const useI18nNSStore = <T,>(selector: (store: II18nNSState) => T): T => {
    const context = useContext(I18nNSStoreContext);

    if (!context) {
        throw new Error(
            `useI18nNSStore must be use within I18nNSStoreProvider`
        );
    }

    return selector(context.state);
};
