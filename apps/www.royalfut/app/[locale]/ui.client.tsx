"use client";

import { useTranslations } from "next-intl";
import { CoinsAmountPanel, SparkleAnimation } from "@royalfut/components";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { useShowPrize } from "./prize.provider";

export const CoinsAmountPanelAction = () => {
    const t = useTranslations("home");
    const { handleShowPrize } = useShowPrize();

    return (
        <CoinsAmountPanel.Button
            as="link"
            onMouseEnter={() => handleShowPrize(true)}
            onMouseLeave={() => handleShowPrize(false)}
            className="group items-center space-x-2"
            scroll={true}
            href={"/"}>
            <span>{t("calc.panel.action.1")}</span>
            <ArrowChevronRightIcon className="w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
        </CoinsAmountPanel.Button>
    );
};

export const SparkleAnimationPrize = () => {
    const { showPrize } = useShowPrize();

    return (
        <>
            {showPrize && (
                <SparkleAnimation
                    count={55}
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
                                max: 1,
                            },
                            duration: {
                                min: 1,
                                max: 3,
                            },
                        },
                    }}
                />
            )}
        </>
    );
};
