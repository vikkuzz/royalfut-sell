import Image from "next/image";
import { BorderedBox } from "@royalfut/ui";
import { EUIOptionCardIDs } from "@royalfut/enums";
import { LinesMessIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { IOptionCardEntity } from "@royalfut/interfaces";

const SBCSolverImage = () => {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="relative w-1/2 h-auto aspect-[7/4]">
                <Image src="/image/SBCsolver.png" alt="" fill />
            </div>
        </div>
    );
};

interface IOptionCardProps {
    card: IOptionCardEntity;
}

const OptionCard: FC<IOptionCardProps> = ({ card }) => {
    return (
        <BorderedBox
            className={cn(
                "group cursor-pointer basis-full sm:basis-1/2 [--rounded:1.75rem]",
                {
                    "[--color-illusion-linear-bg:rgb(43,41,91)] [--color-illusion-linear-bg-2:rgb(84,83,178)]":
                        card.id === EUIOptionCardIDs.COIN_BUNDLES,
                    "[--color-illusion-linear-bg:rgba(4,5,30,.82)]":
                        card.id === EUIOptionCardIDs.SBC_SOLVER,
                }
            )}
            cnBox="overflow-hidden"
            design={{ gradient: true }}>
            <div className="flex flex-col gap-0 mr-[var(--border-size)]">
                {card.id === EUIOptionCardIDs.SBC_SOLVER && (
                    <>
                        <div
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(84,83,178,.8) 10%, rgba(251,158,225,0) 100%)",
                            }}
                            className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-0 sm:left-0 sm:w-full translate-y-0 blur-[46px] pointer-events-none opacity-60"
                        />
                        <LinesMessIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-10" />
                    </>
                )}
                <div className="relative w-full group-hover:scale-125 transition-transform duration-500 rounded-t-[var(--rounded)] overflow-hidden aspect-[12/5]">
                    {card.id === EUIOptionCardIDs.COIN_BUNDLES && (
                        <Image
                            src="/image/buy-coins-option.png"
                            alt={card.title}
                            fill
                        />
                    )}
                    {card.id === EUIOptionCardIDs.SBC_SOLVER && (
                        <SBCSolverImage />
                    )}
                </div>
                <div className="flex flex-col gap-2 p-6 z-[1]">
                    <p className="text-white text-2xl font-bold">
                        {card.title}
                    </p>
                    <span className="text-white-60 text-base leading-snug font-medium">
                        {card.desc}
                    </span>
                </div>
            </div>
        </BorderedBox>
    );
};

export default OptionCard;
