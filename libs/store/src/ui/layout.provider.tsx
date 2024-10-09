"use client";

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

export interface IUIContentWithAsideLayoutState {
    size?: "40-60" | "50-50" | "60-40" | "70-30" | "75-25" | "none";
    aside?: {
        isHidden?: true;
        isStatic?: true;
    };
    header?: {
        isHidden: true;
    };
}

const initialUIContentWithAsideLayoutState: IUIContentWithAsideLayoutState = {
    size: "75-25",
};

const UIContentWithAsideLayoutStoreContext = createContext<
    { state: IUIContentWithAsideLayoutState } | undefined
>(undefined);

interface IContentWithAsideLayoutStoreProviderProps {
    children: ReactNode;
    initial: IUIContentWithAsideLayoutState;
}

export const UIContentWithAsideLayoutStoreProvider = ({
    children,
    initial = initialUIContentWithAsideLayoutState,
}: IContentWithAsideLayoutStoreProviderProps) => {
    const [state] = useState(initial);

    return (
        <UIContentWithAsideLayoutStoreContext.Provider value={{ state }}>
            {children}
        </UIContentWithAsideLayoutStoreContext.Provider>
    );
};

export const useUIContentWithAsideLayoutlStore = <T,>(
    selector: (store: IUIContentWithAsideLayoutState) => T
): T => {
    const context = useContext(UIContentWithAsideLayoutStoreContext);

    if (!context) {
        throw new Error(
            `useUIContentWithAsideLayoutlStore must be use within UIContentWithAsideLayoutStoreProvider`
        );
    }

    return selector(context.state);
};
