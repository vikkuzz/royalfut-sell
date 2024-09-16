import {
    PlatformChoice,
    CryptoSellAmountInput,
    CoinsAmountPanel,
    SparkleAnimation,
} from "@royalfut/components";
import { useTranslations } from "next-intl";
import { PlatformSets } from "@royalfut/collections";
import { ShowPrizeProvider } from "./prize.provider";
import { CoinsAmountPanelAction } from "./ui.client";
import HeroCoinShowcase from "./HeroCoinShowcase";
import { cn } from "@royalfut/utils";

import "./CryptoExchangeForm.scss";
import type { FC, PropsWithChildren } from "react";

const BoxWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div
            className={cn(
                "flex relative w-full",
                "[--border-size:1.5px] [--rounded:1.75rem] [--color-illusion-linear-bg:theme(colors.black.background)] [--border-color:theme(colors.white.20)] [--color-illusion-shine-accent-1:theme(colors.primary)] [--color-illusion-shine-accent-2:theme(colors.secondary)]"
            )}>
            <div className="absolute w-full h-full z-[-1] right-0 flex md:hidden">
                <SparkleAnimation
                    count={50}
                    settings={{
                        size: {
                            min: 10,
                            max: 20,
                        },
                        pos: {
                            right: {
                                min: 0,
                                max: 90,
                                isPercent: true,
                            },
                            top: {
                                min: -30,
                                max: 30,
                            },
                        },
                        animate: {
                            delay: {
                                min: 1,
                                max: 3,
                            },
                            duration: {
                                min: 5,
                                max: 10,
                            },
                        },
                    }}
                />
            </div>
            <div className="absolute left-0 top-0 w-full h-full">
                <div
                    className={cn(
                        "relative h-full w-full gradient-illusion-border",
                        "after:absolute after:w-full after:h-full after:rounded-[var(--rounded)]"
                    )}
                />
            </div>
            <div className="relative flex m-[var(--border-size)] px-4 py-6 sm:py-6 sm:px-9 w-full rounded-[var(--rounded)] bg-linear-primary-dark">
                {children}
            </div>
        </div>
    );
};

const CryptoExchangeForm = () => {
    const t = useTranslations("home");

    return (
        <ShowPrizeProvider>
            <BoxWrapper>
                <div className="flex flex-col w-full md:w-3/5">
                    <div className="flex flex-col w-full gap-6">
                        <PlatformChoice
                            sets={PlatformSets}
                            className="[--selectable-btn-bg-interactive:var(--color-black-shape)] md:w-3/4"
                            cnBtn="flex-row-reverse items-center gap-2"
                        />
                        <CryptoSellAmountInput />
                    </div>
                    <CoinsAmountPanel.Root className="mt-6 sm:mt-12 sm:relative sm:space-x-0">
                        <CoinsAmountPanel.Info
                            className="sm:bg-transparent sm:px-0"
                            display={{
                                ut: { hide: true },
                                ccy: { title: t("calc.panel.info.ccy") },
                                loyality: { hide: false },
                            }}
                        />
                        <CoinsAmountPanelAction />
                    </CoinsAmountPanel.Root>
                </div>
                <div className="hidden justify-end w-2/5 h-full md:flex">
                    <HeroCoinShowcase />
                </div>
            </BoxWrapper>
        </ShowPrizeProvider>
    );
};

export default CryptoExchangeForm;
