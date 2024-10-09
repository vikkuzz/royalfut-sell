import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import { Link, LayoutViewportSectionFrame, GradientButton } from "@royalfut/ui";
import { LoyaltyProgramRoyalPointAction } from "./ui.client";

import type { FC } from "react";

const LoyaltyTierBadges = () => {
    return (
        <div className="flex relative w-full overflow-x-hidden py-16 -mt-16 -mb-16 justify-center items-center pointer-events-none">
            <div className="relative w-56 aspect-[12/9] -rotate-6 -ml-16 -translate-x-7 mb-20 translate-y-20">
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
            <div className="relative w-40 aspect-[12/13] rotate-6 translate-x-10 mb-20 translate-y-20">
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

const LoyaltySteps: FC<{ steps: Array<IStepData>; dir?: string }> = ({
    steps,
    dir,
}) => {
    return (
        <div
            className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-6"
            dir={dir}>
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
    const t = useTranslations("li_home");

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
            <GradientButton asChild vsize="lg" className="w-full sm:w-64">
                <Link href={PROJECT_PUBLIC_WWW_ROUTES["ORDER"]}>
                    {t("loyalty.program.overview.action.primary")}
                </Link>
            </GradientButton>
            <LoyaltyProgramRoyalPointAction />
        </div>
    );
};

const LoyaltyProgramOverview = ({ dir }: { dir?: string }) => {
    const t1 = useTranslations("li_home");
    const t2 = useTranslations("pi_home");
    const stats = [
        {
            title: "22k+",
            desc: t1("loyalty.program.overview.stats.1"),
        },
        {
            title: "800k+",
            desc: t1("loyalty.program.overview.stats.2"),
        },
    ];

    const loyalt_steps: Array<IStepData> = [
        {
            title: t1("loyalty.program.overview.steps.1.title"),
            desc: t1("loyalty.program.overview.steps.1.desc"),
        },
        {
            title: t2("loyalty.program.overview.steps.2.title"),
            desc: t2("loyalty.program.overview.steps.2.desc"),
        },
        {
            title: t2("loyalty.program.overview.steps.3.title"),
            desc: t2("loyalty.program.overview.steps.3.desc"),
        },
    ];

    return (
        <section className="flex flex-col mt-16">
            <LoyaltyTierBadges />
            <LayoutViewportSectionFrame className="flex flex-col mt-16 gap-12">
                <div className="flex flex-col items-center justify-center w-full sm:max-w-lg mx-auto gap-7">
                    <h3 className="text-center text-5xl sm:text-4xl font-bold">
                        {t2("loyalty.program.overview.title")}
                    </h3>
                    <span className="text-center text-white-60 text-base leading-snug font-medium w-full sm:w-[90%]">
                        {t1("loyalty.program.overview.desc")}
                    </span>
                    <LoyaltyStats stats={stats} />
                </div>
                <LoyaltySteps steps={loyalt_steps} dir={dir} />
                <LoyaltyProgramActions />
            </LayoutViewportSectionFrame>
        </section>
    );
};

export default LoyaltyProgramOverview;
