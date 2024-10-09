import { ArrowChevronRightIcon } from "@royalfut/icons";
import * as CoinsAmountPanel from "../CoinsAmountPanel";

import type { FC } from "react";

export const OrderInfoActionButton: FC<{
    onNextStep: () => void;
    label: string;
}> = ({ onNextStep, label }) => {
    return (
        <CoinsAmountPanel.Button
            onClick={onNextStep}
            className="group sm:max-w-[238px] sm:basis-full sm:px-0 items-center space-x-2">
            <span>{label}</span>
            <ArrowChevronRightIcon className="w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
        </CoinsAmountPanel.Button>
    );
};
