import Image from "next/image";
import { forwardRef } from "react";
import { CheckVIcon } from "@royalfut/icons";
import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";
import { loyaltyTierTitleMap } from "@royalfut/collections";
import { cn, formatBySymbolNumber } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef, ElementRef } from "react";
import type { TLoyaltyProgramStatusedLevels } from "@royalfut/interfaces";
import { useTranslations } from "next-intl";

const Details: FC<{ title: string; details: Array<string | null> }> = ({
    title,
    details,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-white">{title}</p>
            <ul className="text-xs font-medium gap-1 text-white-40">
                {details.filter(Boolean).map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                ))}
            </ul>
        </div>
    );
};

const loyaltyImageMap: Record<ELoyaltyProgrammaAchievementIDs, string> = {
    [ELoyaltyProgrammaAchievementIDs.BRONZE]:
        "/image/loyalty/sm/bronze_medal.png",
    [ELoyaltyProgrammaAchievementIDs.SILVER]:
        "/image/loyalty/sm/silver_medal.png",
    [ELoyaltyProgrammaAchievementIDs.GOLD]: "/image/loyalty/sm/gold_medal.png",
    [ELoyaltyProgrammaAchievementIDs.INFORM]:
        "/image/loyalty/sm/inform_medal.png",
    [ELoyaltyProgrammaAchievementIDs.HERO]: "/image/loyalty/sm/hero_medal.png",
    [ELoyaltyProgrammaAchievementIDs.ICON]: "/image/loyalty/sm/icon_medal.png",
};

interface ILoyaltyProgramTiersCardProps {
    id: ELoyaltyProgrammaAchievementIDs;
    isActive: boolean;
}

const LoyaltyProgramTiersCard = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> &
        ILoyaltyProgramTiersCardProps &
        Omit<
            TLoyaltyProgramStatusedLevels[ELoyaltyProgrammaAchievementIDs],
            "_id"
        >
>(({ id, isActive, benefits, requirements, className }, externalRef) => {
    const t = useTranslations("sage_pages.points");
    const tr = useTranslations("sidney_pages.points");
    const img = loyaltyImageMap[id];
    const title = loyaltyTierTitleMap[id];

    return (
        <div
            ref={externalRef}
            className={cn(
                "flex flex-col bg-white-5 rounded-lg py-3 px-4 gap-7",
                className
            )}>
            <div className="flex justify-between w-full items-center">
                <div className="flex gap-2">
                    <h5
                        className={cn(
                            "text-base font-bold text-white whitespace-nowrap bg-clip-text webkit-text-fill-transparent",
                            {
                                "bg-loyality-tier-card-bronze":
                                    ELoyaltyProgrammaAchievementIDs.BRONZE ===
                                    id,
                                "bg-loyality-tier-card-silver":
                                    ELoyaltyProgrammaAchievementIDs.SILVER ===
                                    id,
                                "bg-loyality-tier-card-gold":
                                    ELoyaltyProgrammaAchievementIDs.GOLD === id,
                                "bg-loyality-tier-card-inform":
                                    ELoyaltyProgrammaAchievementIDs.INFORM ===
                                    id,
                                "bg-loyality-tier-card-hero":
                                    ELoyaltyProgrammaAchievementIDs.HERO === id,
                                "bg-loyality-tier-card-icon":
                                    ELoyaltyProgrammaAchievementIDs.ICON === id,
                            }
                        )}>
                        {tr(`${title}`)}
                    </h5>
                    {isActive ? (
                        <div className="flex justify-center items-center bg-white-10 py-0.5 px-2 gap-1 rounded-3xl">
                            <CheckVIcon className="text-white w-2.5 h-2.5" />
                            <span className="text-white text-xs font-medium">
                                {t("card.notify.1")}
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className="relative w-6 h-6">
                    <Image
                        src={img}
                        fill
                        alt={title}
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Details
                    title={t("card.title.1")}
                    details={[
                        tr("card.content.1", {
                            purchase: requirements.purchases,
                        }),
                        tr("card.content.2", {
                            coins: formatBySymbolNumber(
                                requirements.coins,
                                " "
                            ),
                        }),
                    ]}
                />
                <Details
                    title={t("card.title.2")}
                    details={[
                        tr("card.content.3", {
                            cashback: benefits.cashbackPerc,
                        }),
                        benefits.bonusPartPerc > 0
                            ? tr("card.content.4", {
                                  part: benefits.bonusPartPerc,
                              })
                            : null,
                    ]}
                />
            </div>
        </div>
    );
});
LoyaltyProgramTiersCard.displayName = "LoyaltyProgramTiersCard";

export default LoyaltyProgramTiersCard;
