import { cn } from "@royalfut/utils";

import styles from "./Divider.module.scss";
import type { FNCN } from "@royalfut/interfaces";

export const DividerMenu: FNCN<{ label: string }> = ({ label, className }) => {
    return (
        <div
            className={cn(
                "relative before:bg-white-20 after:bg-white-20",
                styles.line,
                className,
            )}
        >
            <div className="absolute font-medium -top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2">
                {label}
            </div>
        </div>
    );
};
