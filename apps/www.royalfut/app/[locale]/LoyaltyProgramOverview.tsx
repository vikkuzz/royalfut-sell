import Image from "next/image";
import { useTranslations } from "next-intl";
import {
    LayoutViewportSectionFrame,
    GradientButtonRegular,
    Button,
} from "@royalfut/ui";

import type { FC } from "react";

const LoyaltyTierBadges = () => {
    return (
        <div className="flex relative w-full overflow-x-hidden py-16 -mt-16 -mb-16 justify-center items-center pointer-events-none">
            <div className="relative w-56 aspect-[4/3] -rotate-6 -ml-12 -translate-x-6 mb-20 translate-y-20">
                {/* <div className="relative w-56 aspect-[4/3] -rotate-6 -translate-x-6 translate-y-12"> */}
                <Image src="/image/medal-tier-2.png" fill alt="" />
            </div>
            <div className="relative w-52 aspect-square">
                <div
                    style={{
                        background:
                            "radial-gradient(circle, rgba(136,82,242,0.8) 0%, rgba(246,192,60,0.4) 100%, rgba(246,192,60,0) 100%)",
                    }}
                    className="absolute h-full top-[0%] left-[0%] w-full translate-y-0 z-[-1] blur-[30px] rounded-full pointer-events-none opacity-70"
                />
                <Image src="/image/medal-tier-1.png" fill alt="" />
            </div>
            <div className="relative w-40 aspect-[12/13] rotate-6 translate-x-7 mb-20 translate-y-20">
                {/* <div className="relative w-44 aspect-[12/13] rotate-6 translate-x-7 translate-y-12"> */}
                <Image src="/image/medal-tier-3.png" fill alt="" />
            </div>
        </div>
    );
};

const LoyaltyStats: FC<{ stats: Array<{ title: string; desc: string }> }> = ({
    stats,
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full sm:w-[90%]">
            {stats.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        className="flex flex-col sm:basis-1/2 items-start p-4 sm:p-3 rounded-xl bg-black-shape gap-2">
                        <span className="text-5xl sm:text-4xl">
                            {item.title}
                        </span>
                        <span className="text-lg sm:text-xs text-white-70 leading-snug font-medium">
                            {item.desc}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

interface IStepData {
    title: string;
    desc: string;
}

const LoyaltySteps: FC<{ steps: Array<IStepData> }> = ({ steps }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-6">
            {steps.map((step, idx) => {
                return (
                    <div
                        key={idx}
                        className="flex flex-col items-start sm:items-center gap-4 sm:gap-5 basis-2/6">
                        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-black-shape">
                            <span className="text-2xl text-white font-bold">
                                {idx + 1}
                            </span>
                        </div>
                        <div className="flex flex-col items-start sm:items-center gap-3">
                            <h3 className="sm:text-center text-white font-bold">
                                {step.title}
                            </h3>
                            <p className="sm:text-center text-white-70 text-base leading-snug font-medium">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const LoyaltyProgramActions = () => {
    const t = useTranslations("home");
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
            <GradientButtonRegular
                as="link"
                href="/"
                vsize="lg"
                className="w-full sm:w-64">
                {t("loyalty.program.overview.action.primary")}
            </GradientButtonRegular>
            <Button
                as="button"
                vtype="secondary"
                vsize="lg"
                className="w-full sm:w-64 rounded-xl text-xl">
                <span className="whitespace-nowrap">
                    {t("loyalty.program.overview.action.sec")}
                </span>
            </Button>
        </div>
    );
};

const LoyaltyProgramOverview = () => {
    const t = useTranslations("home");
    const stats = [
        {
            title: "22k+",
            desc: t("loyalty.program.overview.stats.1"),
        },
        {
            title: "800k+",
            desc: t("loyalty.program.overview.stats.2"),
        },
    ];

    const loyalt_steps: Array<IStepData> = [
        {
            title: t("loyalty.program.overview.steps.1.title"),
            desc: t("loyalty.program.overview.steps.1.desc"),
        },
        {
            title: t("loyalty.program.overview.steps.2.title"),
            desc: t("loyalty.program.overview.steps.2.desc"),
        },
        {
            title: t("loyalty.program.overview.steps.3.title"),
            desc: t("loyalty.program.overview.steps.3.desc"),
        },
    ];

    return (
        <section className="flex flex-col mt-16">
            <LoyaltyTierBadges />
            <LayoutViewportSectionFrame className="flex flex-col mt-16 gap-12">
                <div className="flex flex-col items-center justify-center w-full sm:max-w-lg mx-auto gap-7">
                    <h3 className="text-center text-5xl sm:text-4xl font-bold">
                        {t("loyalty.program.overview.title")}
                    </h3>
                    <span className="text-center text-white-60 text-base leading-snug font-medium w-full sm:w-[90%]">
                        {t("loyalty.program.overview.desc")}
                    </span>
                    <LoyaltyStats stats={stats} />
                </div>
                <LoyaltySteps steps={loyalt_steps} />
                <LoyaltyProgramActions />
            </LayoutViewportSectionFrame>
        </section>
    );
};

export default LoyaltyProgramOverview;
