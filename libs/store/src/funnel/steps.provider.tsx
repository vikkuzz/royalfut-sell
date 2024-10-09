"use client";

import { createContext, useContext } from "react";

import type { PropsWithChildren, FC } from "react";
import type { EAppPlatforms, ESEOPlatforms } from "@royalfut/enums";

interface IFunnelStepsStorageState {
    platform: EAppPlatforms | ESEOPlatforms;
}

interface IFunnelStepsStorageActions {}

interface IFunnelStepsStorageProviderProps extends IFunnelStepsStorageState {}

type TStore = IFunnelStepsStorageState & IFunnelStepsStorageActions;

const FunnelStepsStorageContext = createContext<TStore | null>(null);

export const FunnelStepsStorageProvider: FC<
    PropsWithChildren<IFunnelStepsStorageProviderProps>
> = ({ children, platform }) => {
    return (
        <FunnelStepsStorageContext.Provider value={{ platform }}>
            {children}
        </FunnelStepsStorageContext.Provider>
    );
};

export const useFunnelStepStorageStore = <T,>(
    selector: (store: TStore) => T
): T => {
    const context = useContext(FunnelStepsStorageContext);

    if (!context) {
        throw new Error(
            `useFunnelStepStorageStore must be use within FunnelStepsStorageProvider`
        );
    }

    return selector(context);
};
