import {
    DefaultAppSettings,
    PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import { useTranslations } from "next-intl";
import { VerifiedMarkerIcon } from "@royalfut/icons";
import { Link, TrustpilotStarRating, SectionTitle } from "@royalfut/ui";
import { cn } from "@royalfut/utils";

import type { FNCNChildren } from "@royalfut/interfaces";

const WidgetText: FNCNChildren = ({ className, children }) => {
    return (
        <span
            className={cn(
                "flex whitespace-nowrap w-auto text-xs font-bold gap-1 items-center",
                className
            )}>
            {children}
        </span>
    );
};

const Divider = () => {
    return <span className="h-4 w-px bg-white-40 mx-3" />;
};

const TrustpilotRatingSummary = () => {
    const t = useTranslations("pi_home");

    return (
        <div dir="ltr">
            <h3 className="flex text-3xl font-bold gap-3 md:justify-end md:text-2xl">
                Trustpilot
                <TrustpilotStarRating
                    rating={+DefaultAppSettings.trustScore.rate}
                />
            </h3>
            <div className="flex flex-wrap gap-y-2" dir="ltr">
                <WidgetText>
                    {t("trustpilot.reviews.rating", {
                        amount: DefaultAppSettings.trustScore.rate,
                        max: 5,
                    })}
                </WidgetText>
                <Divider />
                <WidgetText>
                    <span className="text-white-50">
                        {t.rich("trustpilot.reviews.count", {
                            highlight: chunk => (
                                <Link
                                    href={PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"]}
                                    className="text-white underline">
                                    {chunk}
                                </Link>
                            ),
                            amount: DefaultAppSettings.trustScore.reviews,
                        })}
                    </span>
                </WidgetText>
                <Divider />
                <WidgetText className="text-white-50">
                    {t("trustpilot.reviews.rate")}
                </WidgetText>
                <Divider />
                <WidgetText>
                    <VerifiedMarkerIcon className="text-extra-trustpilot w-4 h-4" />
                    <span className="text-white-50">
                        {t("trustpilot.reviews.verified")}
                    </span>
                </WidgetText>
            </div>
        </div>
    );
};

interface IClientTestimonialsHeader {
    title: {
        label: string;
        cn?: string;
    };
    dir?: string;
}

const ClientTestimonialsHeader: FNCNChildren<IClientTestimonialsHeader> = ({
    children,
    title,
    className,
    dir,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row justify-between md:items-end",
                className
            )}
            dir={dir}>
            <SectionTitle className={cn("md:mb-0", title.cn)}>
                {title.label}
            </SectionTitle>
            <div className="flex flex-col gap-4 md:gap-2">{children}</div>
        </div>
    );
};

interface IClientTestimonialsProps {}

const ClientTestimonials: FNCNChildren<IClientTestimonialsProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col gap-6 md:gap-10", className)}>
            {children}
        </div>
    );
};

const Root = ClientTestimonials;
const Header = ClientTestimonialsHeader;
const Summary = TrustpilotRatingSummary;

export { Root, Header, Summary };
