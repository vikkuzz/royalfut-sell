/* eslint-disable max-lines */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@royalfut/ui";
import { cn } from "@royalfut/utils";

import type { ReactNode } from "react";
import type { FNCN, FNCNChildren } from "@royalfut/interfaces";

const Guide: FNCN<{
    title: string;
    desc: string;
    step: number;
    isActive: boolean;
    children: (isActive: boolean) => ReactNode;
    setStep: (step: number) => void;
    shouldDrawLine: boolean;
    isNextStepActive?: boolean;
}> = ({
    title,
    desc,
    children,
    isActive,
    setStep,
    step,
    shouldDrawLine,
    isNextStepActive = false,
}) => {
    const onSetStep = () => {
        setStep(step);
    };

    return (
        <div className="pb-14 last:pb-0 relative pl-20 sm:pl-16">
            <button
                onClick={onSetStep}
                className={cn(
                    "absolute top-0 transition-colors duration-500 left-0 flex z-[1] items-center justify-center w-12 h-12 sm:w-9 sm:h-9 rounded-full",
                    {
                        "bg-primary": isActive,
                        "border border-white-40 bg-black-background": !isActive,
                    }
                )}>
                <span
                    className={cn(
                        "text-xl sm:text-base font-bold transition-colors duration-300",
                        {
                            "text-white": isActive,
                            // "text-white-40": !isActive,
                        }
                    )}>
                    {step}
                </span>
            </button>
            {shouldDrawLine && (
                <div
                    className={cn(
                        "absolute top-0 left-6 sm:left-4 sm:translate-x-px rotate-180 h-full flex items-center justify-center w-px",
                        {
                            "bg-white-40": !isActive || !isNextStepActive,
                            "bg-primary": isNextStepActive,
                        }
                    )}
                />
            )}
            <div className="flex sm:w-96 flex-col space-y-2">
                <Button
                    onClick={onSetStep}
                    vtype="none"
                    as="button"
                    className={cn(
                        "block text-3xl sm:text-2xl text-left font-bold leading-tight",
                        {
                            "text-white cursor-default": isActive,
                            // "text-white-40 cursor-pointer": !isActive,
                        }
                    )}>
                    {title}
                </Button>
                <span
                    className={cn(
                        "text-xl sm:text-base font-medium inline-block",
                        {
                            "text-white-60": isActive,
                            // "text-white-40": !isActive,
                        }
                    )}>
                    {desc}
                </span>
                {children(isActive)}
            </div>
        </div>
    );
};

const GuideContent: FNCNChildren<{ disable?: boolean }> = ({
    className,
    // disable = false,
    children,
}) => {
    return (
        <div
            className={cn(
                "flex w-full h-auto justify-end",
                // { "opacity-30": disable },
                className
            )}>
            <div
                style={{
                    boxShadow: "0px 8px 80px 0px rgba(137, 81, 242, 0.40)",
                }}
                className="relative flex w-full max-w-3xl h-full bg-black-1 rounded-xl overflow-hidden flex-shrink-0 flex-col items-center justify-center">
                {/* <EmptyImageIcon className="w-14 h-14 text-white-40" /> */}
                {children}
            </div>
        </div>
    );
};

const ExplanationGuide = () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <>
            <div className="flex flex-col">
                <Guide
                    setStep={setActiveStep}
                    step={1}
                    desc="Specify EA account details, then submit order"
                    title="Place an order to withdraw coins from UT club"
                    isActive={activeStep >= 1}
                    shouldDrawLine
                    isNextStepActive={activeStep > 1}>
                    {isActive => (
                        <GuideContent
                            className="flex sm:hidden h-56 flex-none"
                            disable={!isActive}>
                            {
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Order to withdraw"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    src={`/image/step_${1}.png`}
                                />
                            }
                        </GuideContent>
                    )}
                </Guide>
                <Guide
                    setStep={setActiveStep}
                    step={2}
                    desc="Once the transfer is complete, the money will be available for withdrawal in your profile page"
                    title="Wait for the specified amount of coins to be transferred"
                    isActive={activeStep >= 2}
                    shouldDrawLine
                    isNextStepActive={activeStep > 2}>
                    {isActive => (
                        <GuideContent
                            className="flex sm:hidden h-56 flex-none"
                            disable={!isActive}>
                            {
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Order to withdraw"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    src={`/image/step_${2}.png`}
                                />
                            }
                        </GuideContent>
                    )}
                </Guide>
                <Guide
                    setStep={setActiveStep}
                    step={3}
                    desc="As soon as you confirm the transaction, the money will be sent to your bank/crypto account. The deposit time depends on your bank."
                    title="Complete funds withdrawal"
                    isActive={activeStep >= 3}
                    shouldDrawLine={false}
                    isNextStepActive={activeStep > 3}>
                    {isActive => (
                        <GuideContent
                            className="flex sm:hidden h-56 flex-none"
                            disable={!isActive}>
                            {
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Order to withdraw"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    src={`/image/step_${3}.png`}
                                />
                            }
                        </GuideContent>
                    )}
                </Guide>
            </div>
            <GuideContent className="hidden sm:flex">
                <div className="absolute left-5 top-5 text-xl font-semibold text-white-60 overflow-hidden"></div>
                {
                    <Image
                        fill
                        className="object-cover"
                        alt="Order to withdraw"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={`/image/step_${activeStep}.png`}
                    />
                }
            </GuideContent>
        </>
    );
};

export default ExplanationGuide;
