"use client";

import { useTranslations } from "next-intl";
import { CoinsAmountPanel, SparkleAnimation } from "@royalfut/components";
import { Link, Button } from "@royalfut/ui";
import { usePopupDialogStore } from "@royalfut/store";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { EUIDialogsNames } from "@royalfut/enums";
import { useShowPrize } from "./prize.provider";
import { analitic, cn } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";

export const CoinsAmountPanelAction: FC<
    Omit<
        ComponentPropsWithoutRef<typeof CoinsAmountPanel.Button>,
        "children" | "asChild"
    > & { href: string }
> = ({ className, href, ...props }) => {
    const t = useTranslations("chris_coinBundles");

    return (
        <CoinsAmountPanel.Button
            asChild
            onClick={analitic.clickMainBuyCoins}
            className={cn("group items-center space-x-2", className)}
            {...props}>
            <Link href={href} scroll={true}>
                <span>{t("coinCard.action")}</span>
                <ArrowChevronRightIcon className="w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </Link>
        </CoinsAmountPanel.Button>
    );
};

export const CoinsAmountPanelActionPrizeEffect: FC<
    ComponentPropsWithoutRef<typeof CoinsAmountPanelAction>
> = props => {
    const { handleShowPrize } = useShowPrize();

    return (
        <CoinsAmountPanelAction
            onMouseEnter={() => handleShowPrize(true)}
            onMouseLeave={() => handleShowPrize(false)}
            {...props}
        />
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

export const LoyaltyProgramRoyalPointAction = () => {
    const t = useTranslations("li_home");
    const { setPopup } = usePopupDialogStore();

    return (
        <Button
            vtype="secondary"
            onClick={() => setPopup(EUIDialogsNames.ROYAL_POINTS)}
            vsize="lg"
            className="w-full sm:w-64 rounded-xl text-xl">
            <span className="whitespace-nowrap">
                {t("loyalty.program.overview.action.sec")}
            </span>
        </Button>
    );
};
