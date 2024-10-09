import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

const AchivementRecord: FNCN<{ achivement: string; desc: string }> = ({
    className,
    achivement,
    desc,
}) => {
    return (
        <div
            className={cn(
                "flex-col justify-start items-start gap-2 flex relative",
                className,
            )}
        >
            <span className="text-center w-max text-transparent text-[3.5rem] pt-1 -mt-1 font-bold leading-10 pb-3 animate-backgroundPan bg-linear-primary-pan background-size-200 whitespace-nowrap bg-clip-text webkit-text-fill-transparent">
                {achivement}
            </span>
            <span className="text-white-60 text-xl sm:text-base font-medium -mt-1 max-w-[18rem] sm:max-w-full">
                {desc}
            </span>
        </div>
    );
};

export default AchivementRecord;
