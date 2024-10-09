import Image from "next/image";
import { Link, BorderedBox, GradientButton } from "@royalfut/ui";
import { useTranslations } from "next-intl";
import AnimatedHeadingSection from "./AnimatedHeadingSection";
import {
    StarTrastpilotIcon,
    SpiralLinearGradientArrowIcon,
    EllipseLinearGradientIcon,
    GridSquareIcon,
    ShapeIntersectIcon,
    ShapeSubtractIcon,
} from "@royalfut/icons";
import {
    PROJECT_PUBLIC_WWW_ROUTES,
    AppCredentials,
} from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface IPromoBannerProps {
    rate: string;
    dir?: string;
}

const PromoBanner: FC<IPromoBannerProps> = ({ rate, dir }) => {
    const t1 = useTranslations("skyler_pages");
    const t2 = useTranslations("quinn_pages");

    return (
        <BorderedBox
            className="basis-full [--color-illusion-linear-bg:theme(colors.white.5)] [--rounded:1.75rem]"
            cnBox="py-7 px-10"
            design={{ gradient: true }}>
            <div className="flex flex-col-reverse sm:flex-row gap-17 sm:gap-4">
                <div
                    dir="ltr"
                    className="basis-2/3 flex flex-col justify-between gap-10 sm:gap-12">
                    <div className="flex flex-col" dir={dir}>
                        <div className="flex items-center gap-2">
                            <StarTrastpilotIcon className="text-extra-trustpilot w-7 h-7" />
                            <span className="text-base font-medium">
                                TrustScore <b>{rate}</b>
                            </span>
                        </div>
                        <AnimatedHeadingSection
                            h1={t2("home.heading.1.1")}
                            h2={t2("home.heading.1.2", {
                                fc: `${AppCredentials.game.name.v2} ${AppCredentials.game.release}`,
                            })}
                            isPrimary={false}
                            className="mt-6 space-y-1 items-start justify-start"
                        />
                    </div>
                    <div
                        className={cn(
                            "relative gap-6 sm:gap-0 flex flex-col sm:flex-row justify-start w-full sm:w-max",
                            {
                                "self-center": dir === "rtl",
                            }
                        )}>
                        <GradientButton
                            asChild
                            vsize="lg"
                            className="inline-block px-24 leading-loose w-full sm:w-auto">
                            <Link href={PROJECT_PUBLIC_WWW_ROUTES["ORDER"]}>
                                {t1("card.button.1")}
                            </Link>
                        </GradientButton>
                        <div className="relative flex justify-center sm:absolute sm:-right-7 sm:translate-x-full sm:top-1/2 sm:-translate-y-1/2">
                            <div className="relative flex flex-row-reverse sm:flex-row gap-1">
                                <SpiralLinearGradientArrowIcon className="w-14 h-16 rotate-0 -scale-x-100 sm:scale-x-[none]" />
                                <div className="relative flex justify-center items-center px-8 py-4">
                                    <span className="text-sm font-bold text-center">
                                        0% fees
                                    </span>
                                    <EllipseLinearGradientIcon className="absolute left-0 top-0 w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/3">
                    <div className="relative h-full flex items-center">
                        <GridSquareIcon className="text-white-20 w-full h-auto aspect-video" />
                        <ShapeIntersectIcon className="text-extra-stereo opacity-20 w-4/5 h-auto absolute top-1/3 left-[15%] -translate-x-1/2 -translate-y-1/2 " />
                        <ShapeSubtractIcon className="text-extra-stereo opacity-20 w-4/5 h-auto absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 aspect-square rounded-[4rem] -rotate-[25deg] z-[2]">
                            <div className="absolute w-max h-max left-[5%] -top-[15%]">
                                <div
                                    className={
                                        "relative w-17 aspect-[20/19] -rotate-45 shine-bright-coin before:-bottom-2 before:right-1/4 before:w-3/4 before:opacity-40"
                                    }>
                                    <Image
                                        src="/image/coin-split-1.png"
                                        fill
                                        alt="earn money"
                                    />
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "absolute w-max h-max left-[80%] md:left-[90%] top-[30%] md:top-[25%]"
                                )}>
                                <div
                                    className={
                                        "relative w-24 aspect-[20/19] rotate-45 shine-bright-coin before:-bottom-2 before:right-1/4 before:w-3/4 before:opacity-50"
                                    }>
                                    <Image
                                        src="/image/coin-split-1.png"
                                        fill
                                        alt="earn money"
                                    />
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "absolute w-max h-max left-[50%] top-[90%]"
                                )}>
                                <div
                                    className={
                                        "relative w-20 aspect-[20/19] rotate-[25deg] shine-bright-coin before:bottom-2 before:right-5 before:opacity-50"
                                    }>
                                    <Image
                                        src="/image/coin-split-2.png"
                                        fill
                                        alt="earn money"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="absolute w-max h-max left-[12%] top-[70%]">
                            <div className="relative w-20 aspect-[20/19] -rotate-[35deg] shine-bright-coin before:bottom-2 before:right-5 before:opacity-75">
                                <Image
                                    src="/image/coin-split-3.png"
                                    fill
                                    alt="earn money"
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(247,188,74,.5) 20%, rgba(247,188,74,0) 100%)",
                            }}
                            className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-[5%] sm:left-[0%] sm:w-[100%] translate-y-0 blur-[46px] pointer-events-none opacity-60"
                        />
                        <div
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(251,158,225,.3) 26%, rgba(251,158,225,0) 100%)",
                            }}
                            className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-[25%] sm:left-[0%] sm:w-full translate-y-0 z-10 blur-[56px] pointer-events-none opacity-60"
                        />
                        <div className="absolute top-[48%] left-[47.5%] -translate-x-1/2 -translate-y-1/2 w-[76%] aspect-square rounded-[4rem] -rotate-[25deg]">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/image/halland-square.png"
                                    fill
                                    alt="earn money"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BorderedBox>
    );
};

export default PromoBanner;
