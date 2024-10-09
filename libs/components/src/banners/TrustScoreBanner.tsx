import { StarTrastpilotIcon } from "@royalfut/icons";
import { useTranslations } from "next-intl";
import { EXTERNAL_LINKS } from "@royalfut/collections";
import { DefaultAppSettings } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface ITrustScoreBannerProps {
    rate?: string;
    reviews?: number;
    cnLink?: string;
}

const TrustScoreBanner: FNCN<ITrustScoreBannerProps> = ({
    rate = DefaultAppSettings.trustScore.rate,
    reviews = DefaultAppSettings.trustScore.reviews,
    className,
    cnLink,
}) => {
    const t = useTranslations("quinn_pages");

    return (
        <aside className={cn("flex justify-center", className)}>
            <a
                rel="nofollow noreferrer"
                target="_blank"
                className={cn(
                    "bg-black-shape hover:bg-white-10 inline-flex justify-center items-center gap-2 flex-shrink-0 w-full md:w-auto rounded-xl py-3 px-5 h-11 text-base lg:items-center lg:justify-center",
                    cnLink
                )}
                href={EXTERNAL_LINKS.TRUSTPILOT}>
                <StarTrastpilotIcon className="text-extra-trustpilot w-6 h-6" />
                TrustScore <b>{rate}</b> |{" "}
                <b className="flex whitespace-nowrap underline">
                    {t("trustScore.reviewsAmount", {
                        reviewsAmount: reviews,
                    })}
                </b>
            </a>
        </aside>
    );
};

export default TrustScoreBanner;
