import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface IAnimatedHeadingSectionProps {
    h1: string;
    h2: string;
    isPrimary?: boolean;
    dir?: string;
}

const AnimatedHeadingSection: FNCN<IAnimatedHeadingSectionProps> = ({
    h1,
    h2,
    className,
    isPrimary = true,
    dir,
}) => {
    const TagH1 = isPrimary ? "h1" : "p";
    const TagH2 = isPrimary ? "h2" : "p";

    return (
        <div
            className={cn(
                "w-full flex justify-center items-center sm:items-start flex-col space-y-2",
                className
            )}
            dir={dir}>
            <TagH1
                className={cn(
                    "text-center md:text-left w-max max-w-full uppercase font-extrabold italic text-white tracking-normal",
                    {
                        "text-3xl xs:text-4xl sm:text-6xl": isPrimary,
                        "text-2xl sm:text-3xl ": !isPrimary,
                    }
                )}>
                {h1}
            </TagH1>
            <TagH2
                className={cn(
                    "bg-linear-primary-simple-pan background-size-200 animate-backgroundPan whitespace-nowrap bg-clip-text webkit-text-fill-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-fill-color:transparent] text-center w-max uppercase text-white font-extrabold italic tracking-normal pr-4 max-w-full",
                    {
                        "text-4xl xs:text-5xl sm:text-7xl": isPrimary,
                        "text-8xl text-wrap text-start whitespace-normal sm:text-6xl lg:text-7xl xl:text-8xl tracking-wide":
                            !isPrimary,
                    }
                )}>
                {h2}
            </TagH2>
        </div>
    );
};

export default AnimatedHeadingSection;
