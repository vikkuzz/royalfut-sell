import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, FC } from "react";

export const Gradient: FC<
    ComponentPropsWithoutRef<"span"> & { asChild?: boolean }
> = ({ className, children, asChild, ...props }) => {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            className={cn(
                "w-max text-white max-w-full",
                "bg-linear-primary-simple-pan background-size-200 animate-backgroundPan whitespace-nowrap bg-clip-text webkit-text-fill-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-fill-color:transparent]",
                className
            )}
            {...props}>
            {children}
        </Comp>
    );
};
