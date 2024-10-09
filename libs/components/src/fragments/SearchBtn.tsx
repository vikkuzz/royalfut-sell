import { SearchIcon } from "@royalfut/icons";
import { Button } from "@royalfut/ui";
import { cn } from "@royalfut/utils";

import type { PropsWithoutRef, HTMLAttributes, ComponentType } from "react";

const SearchBtn: ComponentType<
    PropsWithoutRef<HTMLAttributes<HTMLElement>>
> = ({ className, ...props }) => {
    return (
        <div
            className="w-full h-full pointer-events-none flex justify-between absolute top-0 left-0 z-[1]"
            {...props}>
            <Button
                type="button"
                className={cn(
                    "w-max h-max pointer-events-[all] left-2",
                    className
                )}>
                <SearchIcon className="w-6 h-6 text-white bg-transparent fill-white" />
            </Button>
        </div>
    );
};

export default SearchBtn;
