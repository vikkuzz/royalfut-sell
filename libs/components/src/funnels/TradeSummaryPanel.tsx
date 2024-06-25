import { cn } from "@royalfut/utils";

import type { FNCNChildren } from "@royalfut/interfaces";

const TradeSummaryPanel: FNCNChildren = ({ className, children }) => {
    return (
        <div
            className={cn(
                "flex flex-col space-y-3 sm:space-y-0 sm:max-h-[4.125rem] rounded-3xl sm:rounded-none sm:flex-row sticky bottom-0 justify-between",
                className
            )}>
            {children}
        </div>
    );
};

export default {
    Root: TradeSummaryPanel,
};
