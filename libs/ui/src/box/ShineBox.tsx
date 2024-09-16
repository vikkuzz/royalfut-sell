import { cn } from "@royalfut/utils";

import styles from "./ShineBox.module.scss";
import type { FNCNChildren } from "@royalfut/interfaces";

export const ShineBorderBox: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "[--bordered-box-linear-bg-1:#262240] relative bordered-box-linear-card-fly-payment border border-transparent overflow-hidden",
                "origin-top-left justify-center items-center inline-flex z-10 before:animate-delay-1000",
                styles["shine-border-box"],
                "before:hidden sm:before:block",
                className
            )}>
            {children}
        </div>
    );
};
