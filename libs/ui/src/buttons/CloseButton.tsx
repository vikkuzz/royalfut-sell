import { forwardRef } from "react";
import Button from "./Button";
import { XIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

interface ICloseButtonProps {
    view?: "rounded" | "default";
}

const CloseButton = forwardRef<
    ElementRef<typeof Button>,
    Omit<ComponentPropsWithoutRef<typeof Button>, "children"> &
        ICloseButtonProps
>(({ view = "default", className, ...props }, externalRef) => {
    return (
        <Button
            ref={externalRef}
            className={cn(
                "absolute opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none focus:outline-none focus:ring-2 focus-withing:outline-none focus:ring-white-20 focus:ring-offset-0",
                {
                    "right-10 top-10 rounded-sm data-[state=open]:bg-secondary":
                        view === "default",
                    "center w-8 h-8 bg-white-10 rounded-full right-4 top-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground":
                        view === "rounded",
                },
                className
            )}
            {...props}>
            <XIcon
                className={cn(" text-white", {
                    "h-9 w-9": view === "default",
                    "h-4 w-4": view === "rounded",
                })}
            />
            <span className="sr-only">Close</span>
        </Button>
    );
});

export default CloseButton;
