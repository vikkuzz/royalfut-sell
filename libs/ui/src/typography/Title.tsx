import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";

export const PageTitle: FC<
    ComponentPropsWithoutRef<"h1"> & { asChild?: boolean }
> = ({ className, children, asChild = false, ...props }) => {
    const Comp = asChild ? Slot : "h1";

    return (
        <Comp className={cn("font-bold text-5.5xl mt-6", className)} {...props}>
            {children}
        </Comp>
    );
};

export const SectionTitle: FC<ComponentPropsWithoutRef<"h2">> = ({
    className,
    children,
    ...props
}) => {
    return (
        <h2
            className={cn("text-4xl font-bold text-white mb-6", className)}
            {...props}>
            {children}
        </h2>
    );
};
