import Button from "./Button";
import { CheckVIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { IButton } from "./Button";

interface ISelectableButtonProps {
    isActive: boolean;
    onSelect: () => void;
}

const SelectableButton: FC<
    ISelectableButtonProps &
        IButton["Base"] &
        Omit<IButton["Native"], "onClick">
> = ({ isActive, className, children, onSelect, ...props }) => {
    return (
        <Button
            as={"button"}
            onClick={onSelect}
            className={cn(
                "flex flex-col py-3 relative items-center transition-colors duration-300 rounded-lg w-full",
                {
                    "bg-[hsl(var(--selectable-btn-bg-interactive,var(--color-black-shape)))] cursor-default":
                        isActive,
                    "shadow-[0_0_0_1px_rgba(255,255,255,20%)] hover:bg-[hsl(var(--selectable-btn-bg-interactive,var(--color-black-shape)))] cursor-pointer":
                        !isActive,
                },
                className
            )}
            {...props}>
            {isActive && (
                <span className="w-4 h-4 rounded-full bg-primary flex border border-white-20 text-white justify-center items-center absolute top-1 right-1.5 p-1">
                    <CheckVIcon className="w-full h-full text-white" />
                </span>
            )}
            {children}
        </Button>
    );
};

export default SelectableButton;
