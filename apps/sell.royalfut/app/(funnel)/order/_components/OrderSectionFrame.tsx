import { forwardRef } from "react";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const OrderSectionFrame = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, externalRef) => {
    return (
        <div
            ref={externalRef}
            className={cn(
                "max-w-2xl mx-auto pt-3 sm:pt-6 flex flex-col",
                className
            )}
            {...props}>
            {children}
        </div>
    );
});
OrderSectionFrame.displayName = "OrderSectionFrame";

export default OrderSectionFrame;
