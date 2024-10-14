import useEmblaCarousel from "embla-carousel-react";
import {
    BorderedBox,
    EmblaBaseButton,
    EmblaCarouselLayout,
} from "@royalfut/ui";
import { CrownIcon } from "@royalfut/icons";
import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";
import {
    useEmblaScrollSnaps,
    useUserCurrentLoyaltyLevelId,
} from "@royalfut/hooks";
import { useRewardsStore } from "@royalfut/store";
import LoyaltyProgramTiersCard from "./ui/LoyaltyProgramTiersCard";
import { LoyaltyExchangePointRate } from "../../../funnels";
import { cn } from "@royalfut/utils";
import { useTranslations } from "next-intl";

const LoyaltyProgramTiers = () => {
    const t = useTranslations("sage_pages.points");
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const userLevel = useUserCurrentLoyaltyLevelId();
    const { levels } = useRewardsStore(state => ({
        levels: state.loyalty.levelsByStatus,
    }));
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useEmblaScrollSnaps(emblaApi);

    if (!levels) return null;

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4">
                <p className="text-lg font-medium text-white-50 text-left">
                    {t("h4.1")}
                </p>
                <EmblaCarouselLayout.Root className="[--embla-slide-size:60%] sm:[--embla-slide-size:60%] lg:[--embla-slide-size:60%] [--embla-slide-height:18rem] sm:[--embla-slide-height:17rem]">
                    <EmblaCarouselLayout.Body ref={emblaRef}>
                        {Object.keys(levels).map(item => {
                            const id = item as ELoyaltyProgrammaAchievementIDs;

                            return (
                                <EmblaCarouselLayout.Item key={item} asChild>
                                    <LoyaltyProgramTiersCard
                                        isActive={userLevel.id === id}
                                        id={id}
                                        {...levels[id]}
                                    />
                                </EmblaCarouselLayout.Item>
                            );
                        })}
                    </EmblaCarouselLayout.Body>
                    <div className="flex gap-5 mt-7 relative justify-center">
                        <div className="flex gap-5 items-center">
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                {scrollSnaps.map((_, index) => (
                                    <EmblaBaseButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={cn(
                                            "p-1 bg-black-2 transition-all duration-200",
                                            {
                                                "scale-150 bg-white":
                                                    index === selectedIndex,
                                            }
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </EmblaCarouselLayout.Root>
            </div>
        </div>
    );
};

const RoyalPointsDialog = () => {
    const t = useTranslations("sage_pages.points");
    return (
        <BorderedBox
            design={{ gradient: true }}
            cnBox="space-y-10"
            className="center flex flex-col [--rounded:1.75rem] max-w-md sm:max-w-lg px-8 py-10 [--color-illusion-linear-bg:theme(colors.black.shape)]">
            <div className="flex flex-col gap-7 items-center">
                <div className="center w-10 h-10 rounded-full bg-linear-primary-simple-pan">
                    <CrownIcon className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-3xl font-bold text-white">
                            ROYAL Points
                        </h2>
                        <span className="text-sm text-white-70 text-center">
                            {t("text.1")}
                        </span>
                    </div>
                    <LoyaltyExchangePointRate.Root>
                        <LoyaltyExchangePointRate.Point />
                        <LoyaltyExchangePointRate.Equal type="exact" />
                        <LoyaltyExchangePointRate.Price cnTxt="leading-9" />
                    </LoyaltyExchangePointRate.Root>
                </div>
            </div>
            <LoyaltyProgramTiers />
        </BorderedBox>
    );
};

export default RoyalPointsDialog;
