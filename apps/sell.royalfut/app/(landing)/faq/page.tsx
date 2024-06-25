import AccordionQuestions from "./Accordion";
import BuyCoinBanner from "./BuyCoinBanner";
import { LayoutViewportSectionFrame } from "@royalfut/ui";

const FAQPage = () => {
    return (
        <LayoutViewportSectionFrame>
            <h1 className="mb-10 text-6xl font-bold text-white">
                Still have questions?
            </h1>
            <div className="flex flex-col sm:flex-row space-x-0 space-y-8 sm:space-x-4 sm:space-y-0 items-center justify-between sm:items-start">
                <AccordionQuestions />
                <BuyCoinBanner />
            </div>
        </LayoutViewportSectionFrame>
    );
};

export default FAQPage;
