import { getLocale, getTranslations } from "next-intl/server";
import {
    Link,
    LayoutViewportSectionFrame,
    GradientButton,
    SectionTitle,
} from "@royalfut/ui";
import {
    TrustScoreBanner,
    InfographicStats,
    FIFA24CoinsPromo,
    ClientTestimonials,
    ReviewsGalleryCarousel,
    InteractiveOptionCard,
} from "@royalfut/components";
import { LinesMessIcon2 } from "@royalfut/icons";
import {
    AnimatedHeadingSection,
    CryptoExchangeForm,
    DeliveryProcess,
    FAQSnippet,
    LoyaltyProgramOverview,
    PromoCardCarousel,
    FeatureHighlights,
    PromoBanner,
} from "../../src";
import {
    getBenefitCards,
    getOptionCards,
    getPromoCarouselData,
    getTrustpilotReviews,
} from "@royalfut/actions";
import {
    DefaultAppSettings,
    PROJECT_PUBLIC_WWW_ROUTES,
    AppCredentials,
} from "@royalfut/collections";
import { cn } from "@royalfut/utils";

const IndexPage = async () => {
    const [t1, t2, t3, t4, promoCards, reviews, options, benefitCards] =
        await Promise.all([
            getTranslations("quinn_pages"),
            getTranslations("pi_home"),
            getTranslations("car_home"),
            getTranslations("skyler_pages"),
            getPromoCarouselData(),
            getTrustpilotReviews(),
            getOptionCards(),
            getBenefitCards(),
        ]);
    const locale = await getLocale();
    const dir = locale !== "ar" ? "ltr" : "rtl";

    return (
        <div className="flex flex-col">
            <LayoutViewportSectionFrame className="relative flex flex-col overflow-hidden">
                <div
                    className={cn(
                        "absolute w-[calc(100%-theme(spacing.8))] md:w-[70%] h-full right-4 md:right-8 top-0 pointer-events-none",
                        {
                            "md:left-8": dir === "rtl",
                        }
                    )}
                    dir={dir}>
                    <LinesMessIcon2 className="opacity-10" />
                </div>
                <AnimatedHeadingSection
                    h1={t1("home.heading.1.1")}
                    h2={t1("home.heading.1.2", {
                        fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                    })}
                    className="mt-2 md:mt-4"
                    dir={dir}
                />
                <div
                    className="flex flex-col-reverse md:flex-col gap-11 mt-7 md:-mt-7"
                    dir={dir}>
                    <div className="flex justify-end">
                        <TrustScoreBanner
                            className="w-full md:w-auto"
                            cnLink="text-xl md:text-base h-auto py-4 md:py-3"
                            rate={DefaultAppSettings.trustScore.rate}
                            reviews={DefaultAppSettings.trustScore.reviews}
                        />
                    </div>
                    <CryptoExchangeForm />
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <InfographicStats dir={dir} />
            </LayoutViewportSectionFrame>
            <LoyaltyProgramOverview dir={dir} />
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <PromoCardCarousel slides={promoCards} />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="mt-24">
                <DeliveryProcess dir={dir} />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <ClientTestimonials.Root>
                    <ClientTestimonials.Header
                        title={{
                            label: t2("trustpilot.reviews.title"),
                            cn: "",
                        }}
                        dir={dir}>
                        <ClientTestimonials.Summary />
                    </ClientTestimonials.Header>
                    <ReviewsGalleryCarousel slides={reviews} />
                </ClientTestimonials.Root>
                <div className="w-full flex justify-center mt-10">
                    <GradientButton asChild vsize="lg" className="px-20">
                        <Link href={PROJECT_PUBLIC_WWW_ROUTES["ORDER"]}>
                            {t2("trustpilot.reviews.action")}
                        </Link>
                    </GradientButton>
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame
                dir={dir}
                className="flex flex-col mt-24">
                <SectionTitle>{t3("coins.options.title")}</SectionTitle>
                <div className="flex gap-4 flex-col sm:flex-row">
                    {options.map(option => (
                        <InteractiveOptionCard
                            card={option}
                            key={option.title}
                            dir={dir}
                        />
                    ))}
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame
                className="flex flex-col mt-24"
                dir={dir}>
                <FeatureHighlights cards={benefitCards} />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame
                dir={dir}
                className="flex flex-col mt-24">
                <FAQSnippet.Title>{t4("faq.h1")}</FAQSnippet.Title>
                <FAQSnippet.QA />
                <FAQSnippet.CTA />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame
                className="flex flex-col mt-24"
                dir={dir}>
                <PromoBanner
                    rate={DefaultAppSettings.trustScore.rate}
                    dir={dir}
                />
            </LayoutViewportSectionFrame>
            <FIFA24CoinsPromo dir={dir} />
        </div>
    );
};

export default IndexPage;
