"use client";

import { createContext, useContext, useState, useCallback } from "react";

import type { FC, ReactNode } from "react";

const ShowPrizeContext = createContext<
    | { showPrize: boolean; handleShowPrize: (value: boolean) => void }
    | undefined
>(undefined);

export const ShowPrizeProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [showPrize, setShowPrize] = useState<boolean>(false);

    const handleShowPrize = useCallback(
        (value: boolean) => setShowPrize(value),
        []
    );

    return (
        <ShowPrizeContext.Provider value={{ showPrize, handleShowPrize }}>
            {children}
        </ShowPrizeContext.Provider>
    );
};

export const useShowPrize = () => {
    const context = useContext(ShowPrizeContext);
    if (!context)
        throw new Error("useShowPrize must be used within a ShowPrizeProvider");
    return context;
};
