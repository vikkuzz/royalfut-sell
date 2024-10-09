"use client";

import { createContext, useState, useContext, forwardRef } from "react";
import { Button } from "../../buttons";
import { cn } from "@royalfut/utils";

import type {
    FC,
    PropsWithChildren,
    ComponentPropsWithoutRef,
    ElementRef,
} from "react";
import type { FNCNChildren } from "@royalfut/interfaces";

type TTabValue = string | number;

interface ITabsState {
    value: TTabValue;
}

interface ITabsActions {
    setValue: (value: TTabValue) => void;
}

type TTabsStore = ITabsState & ITabsActions;

const TabsContext = createContext<TTabsStore | null>(null);

interface ITabsProviderProps {
    initial: {
        value: TTabValue;
    };
}

const TabsProvider: FC<PropsWithChildren<ITabsProviderProps>> = ({
    children,
    initial,
}) => {
    const [value, setValue] = useState(initial.value);

    return (
        <TabsContext.Provider
            value={{
                value,
                setValue,
            }}>
            {children}
        </TabsContext.Provider>
    );
};

const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("useTabsContext must be used within a TabsProvider");
    }
    return context;
};

const Root: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "w-full flex items-center rounded-lg bg-black-dropdown p-0 h-auto",
                className
            )}>
            {children}
        </div>
    );
};

interface IItemValue {
    value: TTabValue;
}

const Item = forwardRef<
    ElementRef<typeof Button>,
    IItemValue & Omit<ComponentPropsWithoutRef<typeof Button>, "onClick">
>(({ value: tabValue, children, className, ...props }, externalRef) => {
    const { setValue, value } = useTabsContext();
    const isActive = tabValue === value;

    return (
        <Button
            data-state={isActive ? "active" : "inactive"}
            className={cn(
                "group h-full flex flex-1 sm:flex-auto items-center justify-center rounded-lg",
                "px-6 py-4 sm:py-2 space-x-3 text-sm font-medium whitespace-nowrap",
                "ring-offset-background transition-all focus-visible:outline-none",
                "data-[state=active]:bg-white-10 data-[state=active]:text-white data-[state=active]:shadow-sm",
                "data-[state=inactive]:bg-transparent data-[state=inactive]:text-white-40",
                className
            )}
            onClick={() => setValue(tabValue)}
            ref={externalRef}
            {...props}>
            {children}
        </Button>
    );
});

const Provider = TabsProvider;
const use = useTabsContext;

export { Provider, Root, Item, use };
