import { BorderedBox } from "@royalfut/ui";
import {
    TargetCircleArrowIcon,
    BrainCircleIcon,
    ClockCircleIcon,
    CurrencyCircleIcon,
} from "@royalfut/icons";
import { EUIBenefitIDs } from "@royalfut/enums";

import type { ComponentProps, FC } from "react";
import type { IBenefitCardEntity } from "@royalfut/interfaces";

const iconBenefitMaps: Record<
    EUIBenefitIDs,
    { icon: FC<ComponentProps<"svg">>; color: string }
> = {
    [EUIBenefitIDs.EXPERIENCE]: {
        icon: TargetCircleArrowIcon,
        color: "#8852F2",
    },
    [EUIBenefitIDs.SAFE]: {
        icon: BrainCircleIcon,
        color: "#3C9AA1",
    },
    [EUIBenefitIDs.SERVICE]: {
        icon: ClockCircleIcon,
        color: "#9E3749",
    },
    [EUIBenefitIDs.PRICING]: {
        icon: CurrencyCircleIcon,
        color: "#809E35",
    },
};

interface IFeatureHighlightsProps {
    cards: Array<IBenefitCardEntity>;
}

const FeatureHighlights: FC<IFeatureHighlightsProps> = ({ cards }) => {
    return (
        <div className="flex gap-8 sm:gap-4 flex-col sm:flex-row">
            {cards.map((card, idx) => {
                const Icon = iconBenefitMaps[card.id];

                return (
                    <BorderedBox
                        className="basis-full border-0 sm:border sm:border-white-20 sm:basis-1/4 rounded-3.5xl [--rounded:1.75rem]"
                        cnBox="bg-transparent sm:bg-white-5"
                        key={idx}>
                        <div className="flex sm:p-6 flex-col gap-3 sm:gap-5">
                            <div className="flex items-center gap-5">
                                <Icon.icon
                                    className="w-12 h-12"
                                    style={{ color: Icon.color }}
                                />
                                <p className="text-white sm:hidden text-2xl font-bold">
                                    {card.title}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2  z-[1]">
                                <p className="hidden sm:block text-white text-2xl font-bold">
                                    {card.title}
                                </p>
                                <span className="text-white-60 text-base leading-snug font-medium">
                                    {card.desc}
                                </span>
                            </div>
                        </div>
                    </BorderedBox>
                );
            })}
        </div>
    );
};

export default FeatureHighlights;
