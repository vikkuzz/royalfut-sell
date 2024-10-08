import { cn } from "@royalfut/utils";

import type { FNCNChildren } from "@royalfut/interfaces";

export const ErrorCollapsibleText: FNCNChildren<{ show?: boolean }> = ({
    show,
    children,
    className,
}) => {
    return (
        <span
            className={cn(
                "block will-change-[height] text-system-error text-xs transition-all duration-300",
                {
                    "opacity-100 h-[var(--collapsible-h,theme(spacing[3.5]))] pt-1.5":
                        show,
                    "opacity-0 h-0 pt-0 select-none pointer-events-none": !show,
                },
                className
            )}>
            {children}
        </span>
    );
};
