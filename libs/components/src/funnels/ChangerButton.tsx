import { useCallback } from "react";
import { Button } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import { MinusIcon, CrossSimpleIcon } from "@royalfut/icons";
import { TransferAdjustTypes } from "@royalfut/enums";
import { useTransferSelectorStore } from "@royalfut/store";
import { useContinuousClickAction } from "@royalfut/hooks";

import type { ComponentProps } from "react";
import type { FNCN } from "@royalfut/interfaces";
import type { IButton } from "@royalfut/ui";

type ExtendedProps = IButton["Native"] & IButton["Base"];

const labelMap: Record<TransferAdjustTypes, string> = {
    [TransferAdjustTypes.MINUS]: "Minus coin",
    [TransferAdjustTypes.PLUS]: "Plus coin",
};

const IconMap: Record<TransferAdjustTypes, FNCN<ComponentProps<"svg">>> = {
    [TransferAdjustTypes.MINUS]: MinusIcon,
    [TransferAdjustTypes.PLUS]: CrossSimpleIcon,
};

interface IChangerButtonProps extends ExtendedProps {
    variant: TransferAdjustTypes;
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
            as="button"
            disabled={disableAdjust === variant}
            onContextMenu={e => e.preventDefault()}
            aria-label={labelMap[variant]}
            className={cn(
                "text-white p-7 border-white-20 select-none transition-colors duration-300 hover:bg-black-shape",
                {
                    "border-r rounded-l-lg ":
                        variant === TransferAdjustTypes.MINUS,
                    "border-l rounded-r-lg":
                        variant === TransferAdjustTypes.PLUS,
                },
                className
            )}
            {...rest}>
            <Icon className="w-8 h-8 opacity-40" />
        </Button>
    );
};

export default ChangerButton;
