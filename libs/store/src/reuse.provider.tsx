// NOTE: Context Shadowing
// FIXME: Hierarchical State

"use client";

import { createContext, useContext, useState } from "react";

import type { Dispatch, SetStateAction, ReactNode } from "react";

interface IReusableState<S> {
    state: S;
    setState: Dispatch<SetStateAction<S>>;
}

const ReusableStoreContext = createContext<IReusableState<any> | undefined>(
    undefined
);

interface IReusableStoreProviderProps<S> {
    children: ReactNode;
    initial: S;
}

export function ReusableStoreProvider<S>({
    children,
    initial,
}: IReusableStoreProviderProps<S>) {
    const [state, setState] = useState<S>(initial);

    return (
        <ReusableStoreContext.Provider value={{ state, setState }}>
            {children}
        </ReusableStoreContext.Provider>
    );
}

export function useReusableGlobalStore<S>(): [
    IReusableState<S>["state"],
    IReusableState<S>["setState"],
] {
    const context = useContext(ReusableStoreContext);

    if (!context) {
        throw new Error(
            "useReusableGlobalStore must be used within a ReusableStoreProvider"
        );
    }

    return [context.state, context.setState];
}

export const useSelectedReusableGlobalStore = <T, S>(
    selector: (store: IReusableState<S>) => T
): T => {
    const context = useContext(ReusableStoreContext);

    if (!context) {
        throw new Error(
            `useReusableGlobalStore must be use within ReusableStoreProvider`
        );
    }

    return selector(context.state);
};

/// ////////
/*
interface IState {
    text: string;
}

const initialState: IState = {
    text: "Context",
};

const U = () => {
    const s = useSelectedReusableGlobalStore<string, IState>(
        ({ state }) => state.text
    );
    const [state] = useReusableGlobalStore<IState>();

    return <></>;
};

function P() {
    return (
        <ReusableStoreProvider<IState> initial={initialState}>
            <U />
        </ReusableStoreProvider>
    );
}
*/
