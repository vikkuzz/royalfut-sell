import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { ComponentProps, ElementRef } from "react";

interface ILayoutViewportSectionFrameProps {
    asChild?: boolean;
}

export const LayoutViewportSectionFrame = forwardRef<
    ElementRef<"section">,
    ComponentProps<"section"> & ILayoutViewportSectionFrameProps
>(({ asChild = false, children, className, ...props }, externalRef) => {
    const Comp = asChild ? Slot : "section";

    return (
        <Comp
            {...props}
            className={cn(
                "w-full max-w-viewport min-w-viewport mx-auto px-4 md:px-8",
                className,
            )}
            ref={externalRef}
        >
            {children}
        </Comp>
    );
});
LayoutViewportSectionFrame.displayName = "LayoutViewportSectionFrame";
