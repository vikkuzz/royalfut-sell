import { StarTrastpilotIcon } from "@royalfut/icons";
import { useTranslations } from "next-intl";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface ITrustScoreBannerProps {
    rate: string;
    reviews: number;
    cnLink?: string;
}

const TrustScoreBanner: FNCN<ITrustScoreBannerProps> = ({
    rate,
    reviews,
    className,
    cnLink,
}) => {
    const t = useTranslations("default");

    return (
        <aside className={cn("flex justify-center", className)}>
            <a
                rel="nofollow noreferrer"
                target="_blank"
                className={cn(
                    "bg-black-shape hover:bg-white-10 inline-flex justify-center items-center gap-2 flex-shrink-0 w-full rounded-xl py-3 px-5 h-11 text-base lg:w-[309px] lg:items-center lg:justify-center",
                    cnLink
                )}
                href="https://uk.trustpilot.com/review/royalfut.com">
                <StarTrastpilotIcon className="text-extra-trustpilot w-6 h-6" />
                TrustScore <b>{rate}</b> |{" "}
                <b className="flex whitespace-nowrap underline">
                    {t("trustScore.reviewsAmount", {
                        amount: reviews,
                    })}
                </b>
            </a>
        </aside>
    );
};

export default TrustScoreBanner;
