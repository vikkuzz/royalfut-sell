import {
    Link,
    Button,
    InteractionCard,
    TrustpilotStarRating,
} from "@royalfut/ui";
import { DefaultAppSettings, EXTERNAL_LINKS } from "@royalfut/collections";
import { StarTrastpilotIcon } from "@royalfut/icons";

import type { FNCN } from "@royalfut/interfaces";
import { useTranslations } from "next-intl";

interface ITrustpilotRateCardProps {}

const TrustpilotRateCard: FNCN<ITrustpilotRateCardProps> = ({ className }) => {
    const t = useTranslations("skyler_pages.rated");
    return (
        <InteractionCard.Root className={className}>
            <InteractionCard.Title
                label={t("h1", { rate: DefaultAppSettings.trustScore.rate })}
                className="center text-3xl"
            />
            <InteractionCard.Body>
                <div className="center flex-col gap-6">
                    <TrustpilotStarRating
                        className="w-[90%] gap-2"
                        size="relative"
                        rating={+DefaultAppSettings.trustScore.rate}
                    />
                    <p className="font-medium text-base text-white-60">
                        {t("p.1.text")}{" "}
                        <Link
                            href={EXTERNAL_LINKS.TRUSTPILOT}
                            target="_blank"
                            className="text-white underline font-bold hover:text-white-60 transition-colors duration-200">
                            {DefaultAppSettings.trustScore.reviews}{" "}
                            {t("p.1.link")}
                        </Link>
                    </p>
                </div>
                <div className="center gap-2">
                    <StarTrastpilotIcon className="text-extra-trustpilot w-12 h-12" />
                    <span className="text-3xl font-bold text-white">
                        Trustpilot
                    </span>
                </div>
                <Button
                    asChild
                    vsize="3xl"
                    className="text-2xl font-bold bg-extra-trustpilot rounded-xl border border-[hsla(0,0%,100%,.2)] hover:brightness-110">
                    <Link href={EXTERNAL_LINKS.TRUSTPILOT} target="_blank">
                        {t("button")}
                    </Link>
                </Button>
            </InteractionCard.Body>
        </InteractionCard.Root>
    );
};

export default TrustpilotRateCard;
