import { cn } from "@royalfut/utils";
import { BorderedBox } from "@royalfut/ui";

import type { FNCN } from "@royalfut/interfaces";

interface IStatsCardProps {
    theme: 1 | 2 | 3 | 4 | 5 | 6;
    content: {
        sec: [string, string];
        primary: string;
    };
}

const StatsCard: FNCN<IStatsCardProps> = ({ className, content, theme }) => {
    return (
        <BorderedBox
            design={{ gradient: `accent-${theme}` }}
            className={cn(
                "[--rounded:1.5rem] [--color-illusion-linear-bg-deg:35deg] [--color-illusion-linear-bg-per:45%] [--color-illusion-linear-bg:#171228]",
                className
            )}
            cnBox="flex flex-col py-5 px-5">
            <div className="min-h-[2.5rem]">
                <span className="text-base font-semibold text-white-60 leading-5 inline-block">
                    {content.sec[0]}
                </span>
            </div>
            <div>
                <span className="text-white font-bold text-6xl">
                    {content.primary}
                </span>
            </div>
            <div>
                <span className="text-base font-semibold text-white-60 leading-5 inline-block">
                    {content.sec[1]}
                </span>
            </div>
        </BorderedBox>
    );
};

export default StatsCard;
