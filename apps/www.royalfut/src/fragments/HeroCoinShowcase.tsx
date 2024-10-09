import Image from "next/image";
import { SparkleAnimation } from "@royalfut/components";
import { SparkleAnimationPrize } from "./ui.client";
import { cn } from "@royalfut/utils";

import "./HeroCoinShowcase.scss";

const cnBounce =
    "animate-bounce animate-infinite animate-duration-[1700ms] animate-ease-in-out";

const HeroCoinShowcase = () => {
    return (
        <div className="relative aspect-[42/20] -mt-9 -translate-x-5 md:-translate-x-0 ml-[calc(100%_*_-1)] mr-[calc(100%_*_-1)] sm:ml-0 sm:mr-0 w-[200%] sm:w-full lg:w-3/4">
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(247,188,74,.5) 20%, rgba(247,188,74,0) 100%)",
                }}
                className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-[25%] sm:left-[0%] sm:w-[70%] translate-y-0 z-[1] blur-[56px] pointer-events-none opacity-50"
            />
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(251,158,225,.2) 26%, rgba(251,158,225,0) 100%)",
                }}
                className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-[25%] sm:left-[0%] sm:w-[70%] translate-y-0 z-[-2] blur-[56px] pointer-events-none"
            />
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(153,69,240,.6) 20%, rgba(102,120,233,0) 100%)",
                }}
                className="absolute h-[60%] top-[10%] left-[45%] w-[30%] sm:bottom-[35%] sm:right-[10%] sm:w-[35%] translate-y-0 sm:h-full z-[-2] blur-[56px]"
            />
            <Image
                alt="hero"
                src="/image/treasure-ut.png"
                fill
                priority
                loading="eager"
            />
            <SparkleAnimation
                count={25}
                settings={{
                    size: {
                        min: 15,
                        max: 30,
                    },
                    pos: {
                        right: {
                            min: 80,
                            max: 300,
                        },
                        top: {
                            min: 40,
                            max: 200,
                        },
                    },
                    animate: {
                        delay: {
                            min: 0.3,
                            max: 2,
                        },
                        duration: {
                            min: 2,
                            max: 5,
                        },
                    },
                }}
            />
            <SparkleAnimationPrize />
            <div>
                <div
                    className={cn(
                        "absolute w-max h-max left-[-3%] top-[28%] sm:-left-[18%] sm:top-[42%] z-[-1]",
                        // cnBounce,
                        "animate-delay-[1500ms]"
                    )}>
                    <div className="relative w-16 sm:w-16 aspect-[20/19] -rotate-[70deg]">
                        <Image
                            src="/image/coin-split-1.png"
                            fill
                            alt="earn money"
                        />
                    </div>
                </div>
                <div
                    className={cn(
                        "absolute w-max h-max left-[12%] top-[51%] sm:left-[-5%] sm:top-[4%] z-[-1]",
                        // cnBounce,
                        "animate-delay-1000"
                    )}>
                    <div
                        className={cn(
                            "relative w-16 sm:w-20 aspect-[20/19]",
                            "shine-bright-coin before:bottom-2 before:right-0 before:opacity-75"
                        )}>
                        <Image
                            src="/image/coin-split-2.png"
                            fill
                            alt="earn money"
                        />
                    </div>
                </div>
                <div
                    className={cn(
                        "absolute w-max h-max right-[0%] top-[8%] sm:right-[0%] sm:top-[10%]",
                        cnBounce,
                        "animate-rotate-y animate-once animate-delay-[1000ms]"
                    )}>
                    <div
                        className={cn(
                            "relative w-20 sm:w-[6.5rem] aspect-square rotate-[25deg] shine-hover-coin",
                            "shine-bright-coin before:top-1.5 before:right-2.5 before:opacity-90"
                        )}>
                        <Image
                            src="/image/coin-split-3.png"
                            fill
                            alt="earn money"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCoinShowcase;
