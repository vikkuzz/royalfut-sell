import {
    FIFA24CoinsPromo,
    TrustScoreBanner,
    InfographicStats,
    ClientTestimonials,
    ReviewsGallery,
} from "@royalfut/components";
import Hero from "./_components/hero";
import Achivements from "./_components/achivements";
import WhyUs from "./_components/whyus";
import HowDoesItWork from "./_components/guide";
import WithdrawalMethods from "./_components/methods";
import Calculator from "./_components/calculator";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { DefaultAppSettings } from "@royalfut/collections";

const Index = async () => {
    return (
        <div className="flex flex-col">
            <TrustScoreBanner
                className="px-6"
                cnLink="sm:w-auto"
                rate={DefaultAppSettings.trustScore.rate}
                reviews={DefaultAppSettings.trustScore.reviews}
            />
            <Hero />
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <InfographicStats />
            </LayoutViewportSectionFrame>
            <Achivements />
            <HowDoesItWork />
            <WhyUs />
            <WithdrawalMethods />
            <LayoutViewportSectionFrame className="flex flex-col mt-24">
                <ClientTestimonials.Root>
                    <ClientTestimonials.Header
                        title={{
                            label: "What our clients say",
                            cn: "w-96 text-6xl",
                        }}
                    >
                        <ClientTestimonials.Summary />
                    </ClientTestimonials.Header>
                    <ReviewsGallery />
                </ClientTestimonials.Root>
            </LayoutViewportSectionFrame>
            <Calculator />
            <FIFA24CoinsPromo />
        </div>
    );
};

export default Index;
