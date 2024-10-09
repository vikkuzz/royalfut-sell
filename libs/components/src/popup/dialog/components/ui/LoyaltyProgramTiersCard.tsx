import Image from "next/image";
import { forwardRef } from "react";
import { CheckVIcon } from "@royalfut/icons";
import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";
import { loyaltyTierTitleMap } from "@royalfut/collections";
import { cn, formatBySymbolNumber } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef, ElementRef } from "react";
import type { TLoyaltyProgramStatusedLevels } from "@royalfut/interfaces";

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
                        {title}
                    </h5>
                    {isActive ? (
                        <div className="flex justify-center items-center bg-white-10 py-0.5 px-2 gap-1 rounded-3xl">
                            <CheckVIcon className="text-white w-2.5 h-2.5" />
                            <span className="text-white text-xs font-medium">
                                Your tier
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
                    title="Requirements"
                    details={[
                        `${requirements.purchases} purchases on the website`,
                        `${formatBySymbolNumber(requirements.coins, " ")} coins bought in total`,
                    ]}
                />
                <Details
                    title="Benefits"
                    details={[
                        `${benefits.cashbackPerc}% of cashback received from every purchase`,
                        benefits.bonusPartPerc > 0
                            ? `Up to ${benefits.bonusPartPerc} of the order price can be paid with ROYAL Points`
                            : null,
                    ]}
                />
            </div>
        </div>
    );
});
LoyaltyProgramTiersCard.displayName = "LoyaltyProgramTiersCard";

export default LoyaltyProgramTiersCard;
