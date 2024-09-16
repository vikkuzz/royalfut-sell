/* eslint-disable max-lines */
import Image from "next/image";
import { LinesMessIcon } from "@royalfut/icons";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import HeartButton from "./HeartButton";
import { cn } from "@royalfut/utils";

import styles from "./WhyUs.module.scss";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";

const PhoneFrame: FNCNChildren = ({ children, className }) => {
    return (
        <div
            className={cn(
                "w-96 h-[45rem] sm:w-[28rem] sm:h-[57rem] bg-black-background rounded-[4rem] mt-[-85%] sm:mt-[-38%] relative",
                "px-6 py-6",
                "before:absolute before:w-1 before:h-16 before:rounded-tl-md before:rounded-bl-md before:-left-1 before:top-[35%] before:bg-black-background",
                "after:absolute after:w-1 after:h-28 after:rounded-tr-md after:rounded-br-md after:-right-1 after:top-[30%] after:bg-black-background",
                className
            )}>
            <div
                className={cn(
                    "w-full h-full bg-black-shape rounded-[3rem] overflow-hidden px-6 py-9 relative"
                )}>
                <div className="w-full h-full overflow-visible">{children}</div>
            </div>
        </div>
    );
};

const mapBgColors = {
    green: "bg-[#72B46C]",
    purple: "bg-[#6C6DB4]",
    pink: "bg-[#B46C97]",
};

const ProfileItem: FNCN<{
    name: string;
    desc: string;
    image: string;
    color?: keyof typeof mapBgColors;
}> = ({ name, desc, image, color = "purple" }) => {
    return (
        <div className="justify-start items-center gap-4 inline-flex w-full mb-8">
            <div
                className={cn(
                    "w-16 h-16 relative rounded-full overflow-hidden",
                    mapBgColors[color]
                )}>
                <Image
                    src={"/image/sharp-intersect1.svg"}
                    className="absolute !bottom-[-15%] !top-[unset] !left-[-18%]"
                    alt="sharp"
                    fill
                />
                <Image
                    src={"/image/sharp-intersect2.svg"}
                    className="absolute !bottom-[-22%] !top-[unset] !right-[-18%]"
                    alt="sharp"
                    fill
                />
                <Image
                    className="origin-top aspect-square overflow-clip mt-1"
                    src={image}
                    alt={`${name}`}
                    fill
                    priority={false}
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        imageRendering: "auto",
                    }}
                />
            </div>
            <div className="flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-white text-xl font-semibold  capitalize">
                    {name}
                </div>
                <div className="text-white-60 text-base font-medium  capitalize">
                    {desc}
                </div>
            </div>
        </div>
    );
};

const PlayerGroups = () => {
    return (
        <>
            <ProfileItem
                name="Nassar Saidi"
                desc="text"
                image="/image/dummy-soccer-avatar.png"
                color="purple"
            />
            <ProfileItem
                name="Omar"
                desc="text"
                image="/image/dummy-soccer2-avatar.png"
                color="pink"
            />
            <ProfileItem
                name="Nigel C."
                desc="text"
                image="/image/dummy-soccer3-avatar.png"
                color="green"
            />

            <ProfileItem
                name="Nassar Saidi"
                desc="text"
                image="/image/dummy-soccer-avatar.png"
                color="purple"
            />
            <ProfileItem
                name="Omar"
                desc="text"
                image="/image/dummy-soccer2-avatar.png"
                color="pink"
            />
            <ProfileItem
                name="Nigel C."
                desc="text"
                image="/image/dummy-soccer3-avatar.png"
                color="green"
            />

            <ProfileItem
                name="Nassar Saidi"
                desc="text"
                image="/image/dummy-soccer-avatar.png"
                color="purple"
            />
            <ProfileItem
                name="Omar"
                desc="text"
                image="/image/dummy-soccer2-avatar.png"
                color="pink"
            />
            <ProfileItem
                name="Nigel C."
                desc="text"
                image="/image/dummy-soccer3-avatar.png"
                color="green"
            />

            <ProfileItem
                name="Nassar Saidi"
                desc="text"
                image="/image/dummy-soccer-avatar.png"
                color="purple"
            />
            <ProfileItem
                name="Omar"
                desc="text"
                image="/image/dummy-soccer2-avatar.png"
                color="pink"
            />
            <ProfileItem
                name="Nigel C."
                desc="text"
                image="/image/dummy-soccer3-avatar.png"
                color="green"
            />
        </>
    );
};

const WhyUs = () => {
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="flex flex-col mt-24">
                <div className="mb-10">
                    <h2 className="min-w-full md:min-w-[500px] md:max-w-[550px] text-6xl font-bold text-white">
                        Why you should choose us
                    </h2>
                </div>
                <div className="w-full h-max flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4 bg-black-1 rounded-3xl px-8 pb-8 overflow-hidden">
                    <div className="flex flex-col pt-14">
                        <h4 className="w-96 pb-10 text-6xl font-bold uppercase bg-gradient-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-fill-color:transparent]">
                            We know exactly what you need.
                        </h4>
                        <div className="max-w-[33.125rem] sm:w-[33.125rem]">
                            <span className="text-white-60 text-base font-medium  leading-snug">
                                Hundreds of customers from{" "}
                            </span>
                            <span className="text-white text-base font-medium underline leading-snug">
                                ROYALFUT.COM
                            </span>
                            <span className="text-white-60 text-base font-medium leading-snug">
                                {" "}
                                have been asking for coin selling service for a
                                long time. We have conducted a lot of interviews
                                and came up with a solution that will help you
                                make money from your favourite game quickly and
                                easily. We have chosen{" "}
                            </span>
                            <span className="text-white text-base font-bold leading-snug">
                                Comfort Trade
                            </span>
                            <span className="text-white-60 text-base font-medium leading-snug">
                                {" "}
                                as the main delivery method - as it allows you
                                to just fill in your details, and submit to the
                                system, expecting a speedy payout. No need to
                                monitor coin buying cards all day long, our
                                solution will help you earn regularly without
                                much time investment.
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full h-auto justify-center items-center relative flex-col">
                        <div
                            className={cn(
                                "absolute bottom-3/4 sm:bottom-[27%] right-[-10%] sm:right-[10%] w-[140%] sm:w-[70%] h-[150%] sm:h-[70%] blur-[130px]",
                                styles.gradientPhoneFrame
                            )}></div>
                        <LinesMessIcon className="absolute bottom-0 sm:bottom-[10%] right-[-10%] sm:-right-8 w-[140%] sm:w-[110%] h-[150%] sm:h-full opacity-10" />
                        <PhoneFrame className="sm:ml-24">
                            <div className="w-full flex flex-col h-max will-change-transform loop-y-slider-inner">
                                <PlayerGroups />
                                <PlayerGroups />
                            </div>
                            <HeartButton />
                        </PhoneFrame>
                        <span className="sm:ml-24 text-white-60 text-base sm:text-sm font-medium leading-snug mt-3">
                            User requests to lauch sell coins system.
                            <br />
                            All names are hidden for privacy reasons.
                        </span>
                    </div>
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default WhyUs;
