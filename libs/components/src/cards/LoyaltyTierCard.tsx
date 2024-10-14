/* eslint-disable max-lines */
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useUpdate } from "@lilib/hooks";
import {
    LabeledProgress,
    EmblaCarouselLayout,
    EmblaBaseButton,
} from "@royalfut/ui";
import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";
import {
    useEmblaPrevNextButtons,
    useEmblaScrollSnaps,
    useIsMounted,
} from "@royalfut/hooks";
import {
    ArrowChevronLeftIcon,
    ArrowChevronRightIcon,
    CheckVIcon,
    CrownIcon,
    LockSecuredIcon,
} from "@royalfut/icons";
import { loyaltyTierTitleMap } from "@royalfut/collections";
import { cn, formatCommaNumber, calculatePercentage } from "@royalfut/utils";

import type {
    FC,
    PropsWithChildren,
    ComponentPropsWithoutRef,
    CSSProperties,
} from "react";
import type {
    FNCN,
    FNCNChildren,
    FCIcon,
    TLoyaltyProgramStatusedLevels,
} from "@royalfut/interfaces";
import type { EmblaCarouselType } from "embla-carousel";
import type { EmblaViewportRefType } from "embla-carousel-react";
import { useTranslations } from "next-intl";

const enum ETierCompletionStatus {
    SUFFICIENTLY_PURCHASES_SUFFICIENTLY_COINS,
    SUFFICIENTLY_PURCHASES_INSUFFICIENTLY_COINS,
    SUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES,
    INSUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES,
    PASSED_TIER,
}

const enum EBenefitStatusIds {
    ACTUAL,
    LEVEL_UP,
    INCREASE,
    MAX,
    LOCKED,
}

const tierStatusTitleMap: Record<ETierCompletionStatus, string> = {
    [ETierCompletionStatus.SUFFICIENTLY_PURCHASES_SUFFICIENTLY_COINS]:
        "status.title.1",
    [ETierCompletionStatus.SUFFICIENTLY_PURCHASES_INSUFFICIENTLY_COINS]:
        "status.title.2",
    [ETierCompletionStatus.SUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES]:
        "status.title.3",
    [ETierCompletionStatus.INSUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES]:
        "status.title.4",
    [ETierCompletionStatus.PASSED_TIER]: "status.title.5",
};

const tierStatusIconMap: Record<ETierCompletionStatus, FCIcon | null> = {
    [ETierCompletionStatus.SUFFICIENTLY_PURCHASES_SUFFICIENTLY_COINS]:
        CheckVIcon,
    [ETierCompletionStatus.SUFFICIENTLY_PURCHASES_INSUFFICIENTLY_COINS]:
        LockSecuredIcon,
    [ETierCompletionStatus.SUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES]:
        LockSecuredIcon,
    [ETierCompletionStatus.INSUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES]:
        LockSecuredIcon,
    [ETierCompletionStatus.PASSED_TIER]: CheckVIcon,
};

const benefitStatusTitleMap: Record<EBenefitStatusIds, string> = {
    [EBenefitStatusIds.ACTUAL]: "status.benefits.1",
    [EBenefitStatusIds.LEVEL_UP]: "status.benefits.2",
    [EBenefitStatusIds.INCREASE]: "status.benefits.3",
    [EBenefitStatusIds.MAX]: "status.benefits.4",
    [EBenefitStatusIds.LOCKED]: "status.benefits.5",
};

const benefitStatusIconMap: Record<EBenefitStatusIds, FCIcon | null> = {
    [EBenefitStatusIds.ACTUAL]: CheckVIcon,
    [EBenefitStatusIds.LEVEL_UP]: null,
    [EBenefitStatusIds.INCREASE]: null,
    [EBenefitStatusIds.MAX]: null,
    [EBenefitStatusIds.LOCKED]: LockSecuredIcon,
};

interface IReachingNextRankEntities {
    step: number;
    label: string;
}

const sequenceReachingNextRank: Record<
    ELoyaltyProgrammaAchievementIDs,
    Array<IReachingNextRankEntities>
> = {
    [ELoyaltyProgrammaAchievementIDs.BRONZE]: [
        {
            step: 1,
            label: "step.req.1",
        },
        {
            step: 2,
            label: "step.req.2",
        },
    ],
    [ELoyaltyProgrammaAchievementIDs.SILVER]: [
        {
            step: 1,
            label: "step.req.1",
        },
        {
            step: 2,
            label: "step.req.2",
        },
    ],
    [ELoyaltyProgrammaAchievementIDs.GOLD]: [
        {
            step: 1,
            label: "step.req.1",
        },
        {
            step: 2,
            label: "step.req.2",
        },
        {
            step: 3,
            label: "step.req.3",
        },
    ],
    [ELoyaltyProgrammaAchievementIDs.INFORM]: [
        {
            step: 1,
            label: "step.req.1",
        },
        {
            step: 2,
            label: "step.req.1",
        },
        {
            step: 3,
            label: "step.req.1",
        },
        {
            step: 4,
            label: "step.req.1",
        },
    ],
    [ELoyaltyProgrammaAchievementIDs.HERO]: [
        {
            step: 1,
            label: "step.req.1",
        },
        {
            step: 2,
            label: "step.req.1",
        },
        {
            step: 3,
            label: "step.req.1",
        },
        {
            step: 4,
            label: "step.req.1",
        },
    ],
    [ELoyaltyProgrammaAchievementIDs.ICON]: [],
};

interface ITierState {
    richedTierId: ELoyaltyProgrammaAchievementIDs;
    selectedTierId: ELoyaltyProgrammaAchievementIDs;
    boughtCoins: number;
    emblaRef: EmblaViewportRefType;
    emblaApi: EmblaCarouselType | undefined;
    isPassedSelectedTierId: boolean;
    isSelectedTierCurrentRank: boolean;
    levels: TLoyaltyProgramStatusedLevels;
}

interface ITierActions {
    setSelectedTierId: (id: ELoyaltyProgrammaAchievementIDs) => void;
}

type TTierStoreContextProps = ITierState & ITierActions;

const TierContext = createContext<TTierStoreContextProps | null>(null);

interface ITierProviderProps {
    boughtCoins: number;
    levels: TLoyaltyProgramStatusedLevels;
    richedTierId: ELoyaltyProgrammaAchievementIDs;
}

const TierProvider: FC<
    Omit<PropsWithChildren<ITierProviderProps>, "userLevel">
> = ({ children, boughtCoins, levels, richedTierId }) => {
    const [selectedTierId, setSelectedTierId] = useState(richedTierId);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        containScroll: false,
        startIndex: Object.keys(levels).findIndex(
            item => item === richedTierId
        ),
    });

    const isPassedSelectedTierId = useMemo(() => {
        const score = levels[selectedTierId].requirements.coins;
        return score <= boughtCoins;
    }, [boughtCoins, levels, selectedTierId]);

    const isSelectedTierCurrentRank = useMemo(
        () => selectedTierId === richedTierId,
        [selectedTierId, richedTierId]
    );

    return (
        <TierContext.Provider
            value={{
                setSelectedTierId,
                selectedTierId,
                richedTierId,
                boughtCoins,
                emblaRef,
                levels,
                emblaApi,
                isPassedSelectedTierId,
                isSelectedTierCurrentRank,
            }}>
            {children}
        </TierContext.Provider>
    );
};

const useTierContext = () => {
    const context = useContext(TierContext);
    if (!context) {
        throw new Error("useTierContext must be used within a TierProvider");
    }
    return context;
};

const Viewport: FNCNChildren = ({ className, children }) => {
    return <div className={cn("px-6 sm:px-10", className)}>{children}</div>;
};

const Root: FNCNChildren<Omit<ITierProviderProps, "">> = ({
    className,
    children,
    boughtCoins,
    levels,
    richedTierId,
}) => {
    return (
        <TierProvider
            boughtCoins={boughtCoins}
            richedTierId={richedTierId}
            levels={levels}>
            <div
                className={cn(
                    "flex flex-col pt-12 pb-10 bg-black-1 border border-white-10 rounded-xl",
                    className
                )}>
                {children}
            </div>
        </TierProvider>
    );
};

const Title: FNCN<{ id: ELoyaltyProgrammaAchievementIDs }> = ({
    id,
    className,
}) => {
    const t = useTranslations("sidney_pages.points");
    const title = loyaltyTierTitleMap[id];

    return (
        <h5
            className={cn(
                "text-base font-bold text-white whitespace-nowrap bg-clip-text webkit-text-fill-transparent",
                {
                    "bg-loyality-tier-card-bronze":
                        ELoyaltyProgrammaAchievementIDs.BRONZE === id,
                    "bg-loyality-tier-card-silver":
                        ELoyaltyProgrammaAchievementIDs.SILVER === id,
                    "bg-loyality-tier-card-gold":
                        ELoyaltyProgrammaAchievementIDs.GOLD === id,
                    "bg-loyality-tier-card-inform":
                        ELoyaltyProgrammaAchievementIDs.INFORM === id,
                    "bg-loyality-tier-card-hero":
                        ELoyaltyProgrammaAchievementIDs.HERO === id,
                    "bg-loyality-tier-card-icon":
                        ELoyaltyProgrammaAchievementIDs.ICON === id,
                },
                className
            )}>
            {t(`${title}`)}
        </h5>
    );
};

const StatusBar: FC<{ title: string; icon: FCIcon | null }> = ({
    title,
    icon: Icon,
}) => {
    return (
        <div className="flex justify-center items-center bg-black-dropdown py-2 px-3 gap-2 rounded-3xl select-none">
            {Icon && <Icon className="text-white w-3 h-3" />}
            <span className="text-white text-xs font-medium text-center">
                {title}
            </span>
        </div>
    );
};

const IndicatorStatus: FC<{ status: ETierCompletionStatus }> = ({ status }) => {
    const t = useTranslations("sidney_pages.points");
    const title = tierStatusTitleMap[status];
    const Icon = tierStatusIconMap[status];

    return <StatusBar title={t(`${title}`)} icon={Icon} />;
};

const Header = () => {
    const {
        selectedTierId,
        richedTierId,
        isPassedSelectedTierId,
        isSelectedTierCurrentRank,
    } = useTierContext();
    const status = isPassedSelectedTierId
        ? richedTierId === selectedTierId
            ? ETierCompletionStatus.SUFFICIENTLY_PURCHASES_SUFFICIENTLY_COINS
            : ETierCompletionStatus.PASSED_TIER
        : isSelectedTierCurrentRank
          ? ETierCompletionStatus.SUFFICIENTLY_PURCHASES_SUFFICIENTLY_COINS
          : ETierCompletionStatus.INSUFFICIENTLY_MONEY_INSUFFICIENTLY_PURCHASES;

    return (
        <div className="center flex-col gap-2">
            <Title id={selectedTierId} className="text-4xl" />
            <IndicatorStatus status={status} />
        </div>
    );
};

const BenefitStatus: FC<{ status: EBenefitStatusIds }> = ({ status }) => {
    const t = useTranslations("blair_pages.points");
    const title = benefitStatusTitleMap[status];
    const Icon = benefitStatusIconMap[status];

    return <StatusBar title={t(`${title}`)} icon={Icon} />;
};

const BenefitPerc: FNCN<{ perc: number; showBonusIcon?: boolean }> = ({
    perc,
    showBonusIcon = false,
    className,
}) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="text-white text-3.5xl font-bold">{perc}%</span>
            {showBonusIcon && (
                <div className="center bg-linear-primary-simple-pan w-8 h-8 rounded-full">
                    <CrownIcon className="text-white w-4.5" />
                </div>
            )}
        </div>
    );
};

const Benefit: FC<
    { desc: string } & ComponentPropsWithoutRef<typeof BenefitPerc> &
        ComponentPropsWithoutRef<typeof BenefitStatus>
> = ({ desc, perc, status, showBonusIcon }) => {
    return (
        <div className="flex flex-col px-4 py-3 bg-[hsla(0,0%,100%,.05)] rounded-lg basis-full min-h-[9.375rem] sm:basis-1/2 justify-between">
            <div className="flex justify-between gap-2">
                <BenefitPerc
                    perc={perc}
                    showBonusIcon={showBonusIcon}
                    className={cn({
                        "opacity-50": status === EBenefitStatusIds.LOCKED,
                    })}
                />
                <BenefitStatus status={status} />
            </div>
            <div
                className={cn({
                    "opacity-50": status === EBenefitStatusIds.LOCKED,
                })}>
                <span className="text-base text-white-40 font-medium inline-block leading-5">
                    {desc}
                </span>
            </div>
        </div>
    );
};

const Benefits = () => {
    const t = useTranslations("blair_pages.points");
    const { selectedTierId, isPassedSelectedTierId, levels } = useTierContext();
    const data = levels[selectedTierId].benefits;

    const locked = !isPassedSelectedTierId;

    return (
        <Viewport className="flex gap-3 flex-col sm:flex-row mt-8">
            <Benefit
                desc={t("benefits.desc.1")}
                perc={data.cashbackPerc}
                showBonusIcon
                status={
                    locked ? EBenefitStatusIds.LOCKED : EBenefitStatusIds.ACTUAL
                }
            />
            <Benefit
                desc={t("benefits.desc.2")}
                perc={data.bonusPartPerc}
                status={
                    locked
                        ? EBenefitStatusIds.LOCKED
                        : EBenefitStatusIds.INCREASE
                }
            />
        </Viewport>
    );
};

const ProgressBar = () => {
    const { selectedTierId, boughtCoins, levels } = useTierContext();
    const nextAchievemntId = levels[selectedTierId].nextLevelId;
    const limit = nextAchievemntId
        ? levels[nextAchievemntId].requirements.coins
        : levels[selectedTierId].requirements.coins;

    const perc = calculatePercentage(boughtCoins, limit);

    return (
        <Viewport className="flex mt-6 justify-between h-2.5 items-center gap-4">
            {nextAchievemntId && (
                <Title
                    id={selectedTierId}
                    className="min-w-[3.75rem] text-left"
                />
            )}
            <LabeledProgress
                className="max-w-none w-full"
                cnIndicator="w-full rounded-full"
                progress={Number(perc.toFixed(1))}
                label={!limit ? " " : undefined}
            />
            {nextAchievemntId && (
                <Title
                    id={nextAchievemntId}
                    className="min-w-[3.75rem] text-right"
                />
            )}
        </Viewport>
    );
};

const Balance = () => {
    const t = useTranslations("blair_pages.points");
    const { selectedTierId, boughtCoins, levels } = useTierContext();
    const nextAchievemntId = levels[selectedTierId].nextLevelId;
    const limit = nextAchievemntId
        ? levels[nextAchievemntId].requirements.coins
        : null;

    return (
        <div className="center flex-col gap-2 mt-2">
            <span className="font-medium text-sm md:text-xs text-white-40 text-center">
                {t("text.2")}
            </span>
            <div className="flex flex-col text-center">
                <p className="font-bold text-5.5xl text-white">
                    {formatCommaNumber(boughtCoins) ?? "Loading..."}
                </p>
                {limit && (
                    <span className="text-white-40 font-semibold text-xl">
                        / {formatCommaNumber(limit)}
                    </span>
                )}
            </div>
        </div>
    );
};

const RankBadge: FNCN<{
    id: ELoyaltyProgrammaAchievementIDs;
    isSelected: boolean;
}> = ({ id, className, isSelected }) => {
    const { boughtCoins, richedTierId, levels } = useTierContext();
    const nextAchievemntId = levels[id].nextLevelId;
    const data = nextAchievemntId ? levels[nextAchievemntId] : null;
    const limit =
        data?.requirements.coins ??
        levels[ELoyaltyProgrammaAchievementIDs.HERO].requirements.coins;

    const isActive =
        (isSelected && limit! <= boughtCoins) || id === richedTierId;

    return (
        <div
            className={cn(
                "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                className
            )}>
            <div
                className={cn(
                    "relative w-[15rem] md:w-[14.5rem] lg:w-[18.5rem] h-auto aspect-square transition-opacity duration-300",
                    {
                        "opacity-100": isActive && isSelected,
                        "opacity-[.15]": !isActive || !isSelected,
                    }
                )}>
                <div
                    className={cn(
                        "absolute w-[50%] h-[50%] lg:h-[55%] lg:w-[55%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] blur-[30px] lg:blur-[36px] will-change-[filter] rounded-full pointer-events-none opacity-50",
                        {
                            "bg-loyality-tier-card-bronze":
                                id === ELoyaltyProgrammaAchievementIDs.BRONZE,
                            "bg-loyality-tier-card-silver":
                                id === ELoyaltyProgrammaAchievementIDs.SILVER,
                            "bg-loyality-tier-card-gold":
                                id === ELoyaltyProgrammaAchievementIDs.GOLD,
                            "bg-loyality-tier-card-inform":
                                id === ELoyaltyProgrammaAchievementIDs.INFORM,
                            "bg-loyality-tier-card-hero":
                                id === ELoyaltyProgrammaAchievementIDs.HERO,
                            "bg-loyality-tier-card-icon":
                                id === ELoyaltyProgrammaAchievementIDs.ICON,
                        }
                    )}
                />
                <Image src={`/image/loyalty/lg/${id}.png`} alt="" fill />
            </div>
            {limit! > boughtCoins && id !== richedTierId && (
                <LockSecuredIcon className="text-white-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
            )}
        </div>
    );
};

const RankProgressIndicator: FC<
    ComponentPropsWithoutRef<"div"> & { step: number; isReached: boolean }
> = ({ className, step, isReached, ...props }) => {
    return (
        <div
            className={cn(
                "flex rounded p-1 items-center w-[var(--connector-indicator-w)]",
                {
                    "bg-primary justify-between": isReached,
                    "bg-black-3 justify-end": !isReached,
                },
                className
            )}
            {...props}>
            {isReached && (
                <CheckVIcon className="text-white w-3.5 h-3.5 sm:w-3 sm:h-3" />
            )}
            <span
                className={cn("font-bold text-base sm:text-xs", {
                    "text-white": isReached,
                    "text-white-40": !isReached,
                })}>
                {step}
            </span>
        </div>
    );
};

const RankTierConnector: FC<
    ComponentPropsWithoutRef<"div"> & { label?: string }
> = ({ className, children, label, ...props }) => {
    return (
        <div className={cn("absolute left-full top-1/2", className)} {...props}>
            <div className="relative hidden sm:block">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[var(--connector-w)] h-0.5 bg-black-3 rounded-full overflow-hidden">
                    <div className="relative w-full h-full before:absolute before:bg-primary before:w-[var(--connector-active-perc)] before:h-full before:left-0 before:top-0" />
                </div>
                <div className="flex gap-[var(--connector-indicator-gap)] absolute -translate-x-1/2 -translate-y-1/2">
                    {children}
                </div>
                {label && (
                    <div className="absolute w-36 -translate-x-1/2 text-center mt-10">
                        <span className="font-medium text-xs text-white-40 max-w-36 inline-block leading-snug">
                            {label}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

const NextRankMilestoneConnector: FC<{
    id: ELoyaltyProgrammaAchievementIDs;
    data: Array<IReachingNextRankEntities>;
}> = ({ id, data }) => {
    const t = useTranslations("blair_pages.points");
    const { boughtCoins, levels } = useTierContext();
    const isPassedTierId = useMemo(() => {
        const nextAchievemntId = levels[id].nextLevelId;
        const score = nextAchievemntId
            ? levels[nextAchievemntId].requirements.coins
            : null;
        if (score) {
            return score <= boughtCoins;
        } else {
            return (
                boughtCoins >=
                levels[ELoyaltyProgrammaAchievementIDs.HERO].requirements.coins!
            );
        }
    }, [boughtCoins, id, levels]);

    const css = {
        connectorW: 9,
        indicatorW: 1.25,
        indicatorGap: 0.5,
        riched: isPassedTierId ? data.length : 0,
        rankLimit: data.length,
    };

    const entity = data.find(item => item.step === css.riched + 1);

    return (
        <RankTierConnector
            label={entity?.label ? t(`${entity.label}`) : undefined}
            style={
                {
                    "--connector-riched": css.riched,
                    "--connector-rank-limit": css.rankLimit,
                } as CSSProperties
            }
            className={cn(
                "[--connector-w:9rem] [--connector-indicator-w:1.25rem] [--connector-indicator-gap:0.5rem]",
                "[--connector-indicator-size:calc(calc(var(--connector-rank-limit)*var(--connector-indicator-w))+calc(calc(var(--connector-rank-limit)-1)*var(--connector-indicator-gap)))]",
                "[--connector-edge-space:calc(calc(var(--connector-w)-var(--connector-indicator-size))/2)]",
                {
                    "left-[93%]": id === ELoyaltyProgrammaAchievementIDs.INFORM,
                    "left-[105%]": id === ELoyaltyProgrammaAchievementIDs.HERO,
                    "[--connector-active-perc:100%]":
                        css.riched >= css.rankLimit,
                    "[--connector-active-perc:0%]": css.riched === 0,
                    "[--connector-active-perc:calc(var(--connector-edge-space)+calc(var(--connector-riched)*var(--connector-indicator-w)))]":
                        css.riched !== 0 && css.riched < css.rankLimit,
                }
            )}>
            {data.map((rank, idx) => {
                return (
                    <RankProgressIndicator
                        key={idx}
                        isReached={css.riched > idx}
                        step={rank.step}
                        className="h-12 flex-col"
                    />
                );
            })}
        </RankTierConnector>
    );
};

const RankProgressionItem: FC<{
    id: ELoyaltyProgrammaAchievementIDs;
    isSelected: boolean;
}> = ({ id, isSelected }) => {
    const reachengNextRank = sequenceReachingNextRank[id];

    return (
        <EmblaCarouselLayout.Item
            cnBox={cn({
                "z-[-1]": !isSelected,
            })}>
            <ArrowButtons isSelected={isSelected} />
            <RankBadge id={id} isSelected={isSelected} />
            {reachengNextRank.length > 0 && (
                <NextRankMilestoneConnector id={id} data={reachengNextRank} />
            )}
        </EmblaCarouselLayout.Item>
    );
};

const calculateSpaceAround = (
    containerWidth: number,
    numberOfElements: number
): Array<number> => {
    const totalGaps = numberOfElements + 1;
    const spaceAround = containerWidth / totalGaps;

    let currentPosition = spaceAround;
    const positions = Array.from({ length: numberOfElements }, () => {
        const position = currentPosition;
        currentPosition += spaceAround;
        return position;
    });

    return positions;
};

const RankProgressionIndicatorMobileItem = () => {
    const {
        selectedTierId,
        richedTierId,
        isPassedSelectedTierId,
        isSelectedTierCurrentRank,
    } = useTierContext();
    if (selectedTierId === ELoyaltyProgrammaAchievementIDs.ICON) return null;
    const reachengNextRank = sequenceReachingNextRank[selectedTierId];
    const reachedSteps = isPassedSelectedTierId
        ? richedTierId === selectedTierId
            ? 0
            : reachengNextRank.length
        : !isSelectedTierCurrentRank
          ? 0
          : 0;
    const positions = calculateSpaceAround(100, reachengNextRank.length);
    const entity = reachengNextRank.find(
        item => item.step === reachedSteps + 1
    );

    return (
        <div
            className="px-6 w-full mb-8 block sm:hidden"
            style={
                {
                    "--connector-active-perc": `${reachedSteps <= 0 ? 0 : reachedSteps === reachengNextRank.length ? 100 : positions[reachedSteps - 1]}%`,
                } as CSSProperties
            }>
            {entity?.label && (
                <div className="flex justify-center w-full text-center mb-2.5">
                    <span className="font-medium text-sm text-white-40 max-w-[13rem] inline-block leading-snug">
                        {entity.label}
                    </span>
                </div>
            )}
            <div className="relative w-full h-7">
                <div className="absolute w-full h-1 bg-black-3 rounded-full overflow-hidden top-1/2 -translate-y-1/2">
                    <div className="relative w-full h-full before:absolute before:bg-primary before:w-[var(--connector-active-perc)] before:h-full before:left-0 before:top-0" />
                </div>
                <div className="relative flex w-full h-full">
                    {reachengNextRank.map((item, idx) => {
                        const isReached = reachedSteps > idx;

                        return (
                            <RankProgressIndicator
                                key={item.step}
                                isReached={isReached}
                                step={item.step}
                                style={{ left: `${positions[idx]}%` }}
                                className={cn(
                                    "absolute -translate-x-1/2 h-full top-0 flex-row-reverse",
                                    {
                                        "[--connector-indicator-w:theme(spacing.12)] px-2":
                                            isReached,
                                        "[--connector-indicator-w:theme(spacing.7)] justify-center":
                                            !isReached,
                                    }
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ArrowButtons: FC<{ isSelected: boolean }> = ({ isSelected }) => {
    const { emblaApi } = useTierContext();
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = useEmblaPrevNextButtons(emblaApi);

    if (!isSelected) return null;

    return (
        <div className="relative top-1/2 -translate-y-1/2 z-10 w-full pointer-events-all sm:pointer-events-none">
            <div className="absolute flex sm:hidden items-center justify-between w-[120%] top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
                <EmblaBaseButton
                    onClick={onPrevButtonClick}
                    className={cn({
                        "invisible": prevBtnDisabled,
                    })}
                    disabled={prevBtnDisabled}>
                    <ArrowChevronLeftIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11" />
                </EmblaBaseButton>
                <EmblaBaseButton
                    onClick={onNextButtonClick}
                    className={cn({
                        "invisible": nextBtnDisabled,
                    })}
                    disabled={nextBtnDisabled}>
                    <ArrowChevronRightIcon className="text-white group-hover:text-white-70 transition-colors duration-200 w-11 h-11" />
                </EmblaBaseButton>
            </div>
        </div>
    );
};

const RankProgression = () => {
    const isMounted = useIsMounted();
    const { setSelectedTierId, emblaRef, emblaApi, levels } = useTierContext();
    const { selectedIndex } = useEmblaScrollSnaps(emblaApi);

    useUpdate(() => {
        setSelectedTierId(
            Object.keys(levels)[
                selectedIndex
            ] as ELoyaltyProgrammaAchievementIDs
        );
    }, [selectedIndex]);

    return (
        <EmblaCarouselLayout.Root
            className={cn(
                "relative [--embla-slide-height:16rem] lg:[--embla-slide-height:20rem] [--embla-slide-spacing:0rem] [--embla-slide-size:50%] sm:[--embla-slide-size:50%] lg:[--embla-slide-size:50%]",
                {
                    "invisible": !isMounted,
                    "visible": isMounted,
                }
            )}>
            <EmblaCarouselLayout.Body ref={emblaRef}>
                {Object.keys(levels).map((item, idx) => {
                    return (
                        <RankProgressionItem
                            key={item}
                            id={item as ELoyaltyProgrammaAchievementIDs}
                            isSelected={idx === selectedIndex}
                        />
                    );
                })}
            </EmblaCarouselLayout.Body>
            <RankProgressionIndicatorMobileItem />
        </EmblaCarouselLayout.Root>
    );
};

export { Root, RankProgression, Title, Header, Benefits, ProgressBar, Balance };
