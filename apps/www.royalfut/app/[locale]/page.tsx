import { getTranslations } from "next-intl/server";
import {
    LayoutViewportSectionFrame,
    GradientButtonRegular,
    Button,
} from "@royalfut/ui";
import {
    TrustScoreBanner,
    InfographicStats,
    FIFA24CoinsPromo,
    ClientTestimonials,
    ReviewsGalleryCarousel,
} from "@royalfut/components";
import { LinesMessIcon2 } from "@royalfut/icons";
import CryptoExchangeForm from "./CryptoExchangeForm";
import LoyaltyProgramOverview from "./LoyaltyProgramOverview";
import DeliveryProcess from "./DeliveryProcess";
import PromoCardCarousel from "./PromoCardCarousel";
import OptionCard from "./OptionCard";
import FeatureHighlights from "./FeatureHighlights";
import AnimatedHeadingSection from "./AnimatedHeadingSection";
import FAQ from "./FAQ";
import PromoBanner from "./PromoBanner";
import {
    getBenefitCards,
    getOptionCards,
    getPromoCarouselData,
    getTrustpilotReviews,
} from "@royalfut/actions";
import { DefaultAppSettings } from "@royalfut/collections";

const IndexPage = async () => {
    const [t, promoCards, reviews, options, benefitCards] = await Promise.all([
        getTranslations("home"),
        getPromoCarouselData(),
        getTrustpilotReviews(),
        getOptionCards(),
        getBenefitCards(),
    ]);

    return (
        <div className="flex flex-col">
            <LayoutViewportSectionFrame className="relative flex flex-col overflow-hidden">
                <div className="absolute w-[calc(100%-theme(spacing.8))] md:w-[70%] h-full right-4 md:right-8 top-0 pointer-events-none">
                    <LinesMessIcon2 className="opacity-10" />
                </div>
                <AnimatedHeadingSection
                    h1={t("heading.1.1")}
                    h2={t("heading.1.2")}
                    className="mt-2 md:mt-4"
                />
                <div className="flex flex-col-reverse md:flex-col gap-11 mt-7 md:-mt-7">
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
                <InfographicStats />
            </LayoutViewportSectionFrame>
            <LoyaltyProgramOverview />
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <PromoCardCarousel cards={promoCards} />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="mt-24">
                <DeliveryProcess />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <ClientTestimonials.Root>
                    <ClientTestimonials.Header
                        title={{
                            label: t("trustpilot.reviews.title"),
                            cn: "",
                        }}>
                        <ClientTestimonials.Summary />
                    </ClientTestimonials.Header>
                    <ReviewsGalleryCarousel slides={reviews} />
                </ClientTestimonials.Root>
                <div className="w-full flex justify-center mt-10">
                    <GradientButtonRegular
                        as="link"
                        href="/orders"
                        vsize={"lg"}
                        className="px-20">
                        {t("trustpilot.reviews.action")}
                    </GradientButtonRegular>
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <h2 className="text-4xl font-bold text-white mb-6">
                    {t("coins.options.title")}
                </h2>
                <div className="flex gap-4 flex-col sm:flex-row">
                    {options.map(option => (
                        <OptionCard card={option} key={option.title} />
                    ))}
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <FeatureHighlights cards={benefitCards} />
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <h2 className="text-4xl font-bold text-white mb-6">
                    {t("faq.title")}
                </h2>
                <div className="flex gap-4 flex-col sm:flex-row">
                    <FAQ />
                </div>
                <div className="pt-8 flex w-full justify-center">
                    <Button
                        as="link"
                        href="/faq"
                        vtype="bordered-shadow"
                        vsize="3xl"
                        className="rounded-xl text-xl font-semibold">
                        Have more questions?
                    </Button>
                </div>
            </LayoutViewportSectionFrame>
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <PromoBanner rate={DefaultAppSettings.trustScore.rate} />
            </LayoutViewportSectionFrame>
            <FIFA24CoinsPromo />
        </div>
    );
};

export default IndexPage;
