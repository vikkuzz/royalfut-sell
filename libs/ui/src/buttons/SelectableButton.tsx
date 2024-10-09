import Button, { LinkButton } from "./Button";
import { CheckVIcon } from "@royalfut/icons";
import { cn, excludeProps } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";

interface ISelectableButtonBaseProps {
    isActive: boolean;
    onSelect: () => void;
    indicatorType?: "border" | "V";
}

type TSelectableButtonProps =
    | ({ asLink?: true } & Omit<
          ComponentPropsWithoutRef<typeof LinkButton>,
          "asChild" | "onClick"
      >)
    | ({ asLink?: false } & Omit<
          ComponentPropsWithoutRef<typeof Button>,
          "asChild" | "onClick"
      >);

const SelectableButton: FC<
    ISelectableButtonBaseProps & TSelectableButtonProps
> = ({ isActive, className, indicatorType = "V", children, ...rest }) => {
    const Comp = rest.asLink ? LinkButton : Button;
    const props = excludeProps(rest, ["asLink", "onSelect"]);

    return (
        <Comp
            onClick={rest.onSelect}
            className={cn(
                "flex flex-col py-3 relative items-center transition-colors duration-300 rounded-lg w-full",
                {
                    "bg-[hsl(var(--selectable-btn-bg-interactive,var(--color-black-shape)))] cursor-default":
                        isActive,
                    "shadow-[0_0_0_1px_rgba(255,255,255,20%)] hover:bg-[hsl(var(--selectable-btn-bg-interactive,var(--color-black-shape)))] cursor-pointer":
                        !isActive,
                    "shadow-[0_0_0_1px_rgba(255,255,255,20%)]":
                        isActive && indicatorType === "border",
                },
                className
            )}
            {...(props as any)}>
            {isActive && indicatorType === "V" && (
                <span className="w-4 h-4 rounded-full bg-primary flex border border-white-20 text-white justify-center items-center absolute top-1 right-1.5 p-1">
                    <CheckVIcon className="w-full h-full text-white" />
                </span>
            )}
            {children}
        </Comp>
    );
};

export default SelectableButton;
