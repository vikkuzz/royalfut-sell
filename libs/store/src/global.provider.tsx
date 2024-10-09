"use client";

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";
import type {
    IProjectGlobalState,
    IProjectPrivateGlobalState,
} from "@royalfut/interfaces";

interface IProjectGlobalStoreProviderProps<T> {
    children: ReactNode;
    initial: T;
}

const ProjectGlobalStoreContext = createContext<
    { state: IProjectGlobalState } | undefined
>(undefined);

export const ProjectGlobalStoreProvider = ({
    children,
    initial,
}: IProjectGlobalStoreProviderProps<IProjectGlobalState>) => {
    const [state] = useState(initial);

    return (
        <ProjectGlobalStoreContext.Provider value={{ state }}>
            {children}
        </ProjectGlobalStoreContext.Provider>
    );
};

export const useProjectGlobalStore = <T,>(
    selector: (store: IProjectGlobalState) => T
): T => {
    const context = useContext(ProjectGlobalStoreContext);

    if (!context) {
        throw new Error(
            `useProjectGlobalStore must be use within ProjectGlobalStoreProvider`
        );
    }

    return selector(context.state);
};

const ProjectPrivateGlobalStoreContext = createContext<
    { state: IProjectPrivateGlobalState } | undefined
>(undefined);

export const ProjectPrivateGlobalStoreProvider = ({
    children,
    initial,
}: IProjectGlobalStoreProviderProps<IProjectPrivateGlobalState>) => {
    const [state] = useState(initial);

    return (
        <ProjectPrivateGlobalStoreContext.Provider value={{ state }}>
            {children}
        </ProjectPrivateGlobalStoreContext.Provider>
    );
};

export const useProjectPrivateGlobalStore = <T,>(
    selector: (store: IProjectPrivateGlobalState) => T
): T => {
    const context = useContext(ProjectPrivateGlobalStoreContext);

    if (!context) {
        throw new Error(
            `useProjectPrivateGlobalStore must be use within ProjectPrivateGlobalStoreProvider`
        );
    }

    return selector(context.state);
};
