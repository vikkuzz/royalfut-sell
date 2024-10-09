import { forwardRef } from "react";
import { SectionTitle } from "@royalfut/ui";
import { Slot } from "@radix-ui/react-slot";
import CryptoSellAmountInput from "./CryptoSellAmountInput";
import { OrderBoxTitle } from "./TradeSummary.client";
import OrderProcessNavigator from "./OrderProcessNavigator";
import { cn } from "@royalfut/utils";

import type {
    FC,
    PropsWithChildren,
    ElementRef,
    ComponentPropsWithoutRef,
} from "react";
import type { FNCNChildren } from "@royalfut/interfaces";
import type { IOrderProcessNavigatorProps } from "./OrderProcessNavigator";

export const TradeSummaryPanel: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "flex flex-col space-y-3 sm:space-y-0 sm:max-h-[4.125rem] rounded-3xl sm:rounded-none sm:flex-row sticky bottom-0 justify-between",
                className
            )}>
            {children}
        </div>
    );
};

export const TradeOptionsPanel: FNCNChildren<{ asChild?: boolean }> = ({
    children,
    className,
    asChild,
}) => {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            className={cn(
                "flex flex-col w-full overflow-hidden bg-black-shape rounded-2xl p-4",
                className
            )}>
            {children}
        </Comp>
    );
};

interface ICoinAmountSelectorProps {
    title: string;
}

export const CoinAmountSelector: FC<ICoinAmountSelectorProps> = ({ title }) => {
    return (
        <div className="flex flex-col">
            <OrderBoxTitle>{title}</OrderBoxTitle>
            <CryptoSellAmountInput />
        </div>
    );
};

interface IOrderByPlatformsProps {
    title: string;
}

export const OrderByPlatforms: FC<
    PropsWithChildren<IOrderByPlatformsProps>
> = ({ title, children }) => {
    return (
        <div className="flex flex-col mb-8">
            <OrderBoxTitle>{title}</OrderBoxTitle>
            {children}
        </div>
    );
};

export const OrderStepProcessing = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, externalRef) => {
    return (
        <div
            ref={externalRef}
            className={cn(
                "max-w-2xl mx-auto pt-3 sm:pt-7 flex flex-col",
                className
            )}
            {...props}>
            {children}
        </div>
    );
});
OrderStepProcessing.displayName = "OrderStepProcessing";

interface IOrderProcessManagerProps {
    title: string;
    steps: Pick<IOrderProcessNavigatorProps, "active" | "availableSteps">;
}

export const OrderProcessManager: FC<
    PropsWithChildren<IOrderProcessManagerProps>
> = ({ children, steps, title }) => {
    return (
        <>
            <div className="w-full mb-7 sm:mb-14">
                <SectionTitle className="text-center">{title}</SectionTitle>
                <OrderProcessNavigator {...steps} />
            </div>
            <div>{children}</div>
        </>
    );
};
