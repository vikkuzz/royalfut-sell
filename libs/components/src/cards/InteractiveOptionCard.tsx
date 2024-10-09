import { forwardRef } from "react";
import Image from "next/image";
import { BorderedBox, Link } from "@royalfut/ui";
import { EUIOptionCardIDs } from "@royalfut/enums";
import { LinesMessIcon } from "@royalfut/icons";
import { OptionSponsorCardAction } from "./ui.client";
import { cn } from "@royalfut/utils";

import type {
    ElementRef,
    ComponentPropsWithoutRef,
    ForwardedRef,
    ComponentProps,
} from "react";
import type { TOptionCardEntity, FNCN } from "@royalfut/interfaces";

const SBCSolverCardImage = () => {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="relative w-1/2 h-auto aspect-[7/4]">
                <Image
                    src="/image/SBCsolver.png"
                    className="object-contain"
                    alt="SBC Solver"
                    fill
                />
            </div>
        </div>
    );
};

const OptionLinkOrActionWrapper = forwardRef<
    ElementRef<"div" | "a" | "button">,
    ComponentPropsWithoutRef<"div" | "a" | "button"> &
        IInteractiveOptionCardProps
>(({ card, children, ...props }, externalRef) => {
    if ("type" in card) {
        if (card.type === "link") {
            return (
                <Link
                    href={card.url}
                    {...(props as ComponentProps<"a">)}
                    ref={externalRef as ForwardedRef<HTMLAnchorElement>}>
                    {children}
                </Link>
            );
        }

        if (card.type === "sponsor") {
            return (
                <OptionSponsorCardAction
                    {...(props as ComponentProps<"button">)}
                    url={card.url}
                    ref={externalRef as ForwardedRef<HTMLButtonElement>}>
                    {children}
                </OptionSponsorCardAction>
            );
        }
    }

    return (
        <div
            {...(props as ComponentProps<"div">)}
            ref={externalRef as ForwardedRef<HTMLDivElement>}>
            {children}
        </div>
    );
});
OptionLinkOrActionWrapper.displayName = "OptionCardWrapper";

interface IInteractiveOptionCardProps {
    card: TOptionCardEntity;
    dir?: string;
}

const InteractiveOptionCard: FNCN<IInteractiveOptionCardProps> = ({
    card,
    dir,
    className,
}) => {
    return (
        <BorderedBox
            className={cn(
                "group cursor-pointer basis-full sm:basis-1/2 [--rounded:1.75rem]",
                {
                    "[--color-illusion-linear-bg:rgb(43,41,91)] [--color-illusion-linear-bg-2:rgb(84,83,178)]":
                        card.id === EUIOptionCardIDs.COIN_BUNDLES,
                    "[--color-illusion-linear-bg:rgba(4,5,30,.82)]":
                        card.id === EUIOptionCardIDs.SBC_SOLVER,
                },
                className
            )}
            cnBox="block text-left overflow-hidden"
            asChild
            design={{ gradient: true }}>
            <OptionLinkOrActionWrapper card={card}>
                <div className="flex flex-col gap-0 mr-[var(--border-size)] h-full justify-between">
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
                    {card.id === EUIOptionCardIDs.COIN_BUNDLES && (
                        <>
                            <div
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(67, 16, 235, 80%) 10%, rgba(251, 158, 225, 0) 100%)",
                                }}
                                className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-0 sm:left-[-10%] sm:w-full translate-y-0 blur-[46px] pointer-events-none opacity-60"
                            />
                            <div
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(132,39,255,1) 10%, rgba(251,158,225,0) 100%)",
                                }}
                                className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-0 sm:left-1/4 sm:w-full translate-y-0 blur-[46px] pointer-events-none opacity-60"
                            />
                        </>
                    )}
                    {/* <div className="relative w-full group-hover:scale-125 transition-transform duration-500 rounded-t-[var(--rounded)] overflow-hidden h-full"> */}
                    <div className="center flex-1 relative w-full group-hover:scale-125 transition-transform duration-500 rounded-t-[var(--rounded)] overflow-hidden aspect-[12/5]">
                        <div className="max-h-[16rem] h-full w-full">
                            {/* <div className="h-64"> */}
                            {card.id === EUIOptionCardIDs.COIN_BUNDLES && (
                                <Image
                                    src="/image/buy-coins-option.png"
                                    alt={card.title}
                                    className="object-contain !h-[110%] !-top-[18%] !left-1/2 !-translate-x-1/2"
                                    fill
                                />
                            )}
                            {card.id === EUIOptionCardIDs.SBC_SOLVER && (
                                <SBCSolverCardImage />
                            )}
                        </div>
                    </div>
                    <div
                        className={cn("flex flex-col gap-2 p-6 z-[1]", {
                            "text-right": dir === "rtl",
                        })}>
                        <p className="text-white text-2xl font-bold">
                            {card.title}
                        </p>
                        <span className="text-white-60 text-base leading-snug font-medium">
                            {card.desc}
                        </span>
                    </div>
                </div>
            </OptionLinkOrActionWrapper>
        </BorderedBox>
    );
};

export default InteractiveOptionCard;
