import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@royalfut/utils";

import styles from "./PrimaryGradient.module.scss";
import type { ElementRef, ComponentPropsWithoutRef } from "react";

const PrimaryGradientBox = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> & {
        asChild?: boolean;
        withHover?: boolean;
        activeShadow?: boolean;
    }
>(
    (
        {
            asChild = false,
            children,
            withHover = true,
            activeShadow = false,
            className,
            ...props
        },
        externalRef,
    ) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                className={cn(
                    styles.gradient,
                    {
                        [styles.hover]: withHover,
                        [styles.shadow]: activeShadow,
                    },
                    className,
                )}
                ref={externalRef}
                {...props}
            >
                {children}
            </Comp>
        );
    },
);

export default PrimaryGradientBox;
