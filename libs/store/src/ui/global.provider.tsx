"use client";

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";
import type { IUIGlobalState } from "@royalfut/interfaces";

const UIGlobalStoreContext = createContext<
    { state: IUIGlobalState } | undefined
>(undefined);

interface IUIGlobalStoreProviderProps {
    children: ReactNode;
    initial: IUIGlobalState;
}

export const UIGlobalStoreProvider = ({
    children,
    initial,
}: IUIGlobalStoreProviderProps) => {
    const [state] = useState(initial);

    return (
        <UIGlobalStoreContext.Provider value={{ state }}>
            {children}
        </UIGlobalStoreContext.Provider>
    );
};

export const useUIGlobalStore = <T,>(
    selector: (store: IUIGlobalState) => T
): T => {
    const context = useContext(UIGlobalStoreContext);

    if (!context) {
        throw new Error(
            `useUIGlobalStore must be use within UIGlobalStoreProvider`
        );
    }

    return selector(context.state);
};
