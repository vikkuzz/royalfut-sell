import Button from "./Button";
import { cn } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";

export const EmblaBaseButton: FC<ComponentPropsWithoutRef<typeof Button>> = ({
    className,
    style = {},
    children,
    ...rest
}) => {
    return (
        <Button
            className={cn(
                "group inline-flex justify-center items-center p-0 appearance-none rounded-full touch-manipulation cursor-pointer border-none",
                className
            )}
            type="button"
            style={{
                WebkitTapHighlightColor: "hsla(var(--color-white-10), 0.5)",
                ...style,
            }}
            {...rest}>
            {children}
        </Button>
    );
};
