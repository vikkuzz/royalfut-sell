import { useCallback } from "react";
import { Button } from "@royalfut/ui";
import { MinusIcon, CrossSimpleIcon } from "@royalfut/icons";
import { ETransferAdjustTypes } from "@royalfut/enums";
import { useTransferSelectorStore } from "@royalfut/store";
import { useContinuousClickAction } from "@royalfut/hooks";
import { cn } from "@royalfut/utils";

import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import type { FNCN } from "@royalfut/interfaces";

type ExtendedProps = Omit<ComponentPropsWithoutRef<typeof Button>, "asChild">;

const labelMap: Record<ETransferAdjustTypes, string> = {
    [ETransferAdjustTypes.MINUS]: "Minus coin",
    [ETransferAdjustTypes.PLUS]: "Plus coin",
};

const IconMap: Record<ETransferAdjustTypes, FNCN<ComponentProps<"svg">>> = {
    [ETransferAdjustTypes.MINUS]: MinusIcon,
    [ETransferAdjustTypes.PLUS]: CrossSimpleIcon,
};

interface IChangerButtonProps extends ExtendedProps {
    variant: ETransferAdjustTypes;
}

const ChangerButton: FNCN<IChangerButtonProps> = ({
    variant,
    className,
    ...rest
}) => {
    const Icon = IconMap[variant];
    const adjustSum = useTransferSelectorStore.use.adjustSumToThreshold();
    const disableAdjust = useTransferSelectorStore.use.disableAdjust();

    const adjust = useCallback(() => {
        adjustSum(variant);
    }, [adjustSum, variant]);

    const actions = useContinuousClickAction(adjust);

    return (
        <Button
            {...actions}
            disabled={disableAdjust === variant}
            onContextMenu={e => e.preventDefault()}
            aria-label={labelMap[variant]}
            className={cn(
                "text-white p-7 border-white-20 select-none transition-colors duration-300 hover:bg-black-shape",
                {
                    "border-r rounded-l-lg ":
                        variant === ETransferAdjustTypes.MINUS,
                    "border-l rounded-r-lg":
                        variant === ETransferAdjustTypes.PLUS,
                },
                className
            )}
            {...rest}>
            <Icon className="w-8 h-8 opacity-40" />
        </Button>
    );
};

export default ChangerButton;
