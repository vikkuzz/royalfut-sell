import ExplanationGuide from "./ExplanationGuide";
import { LayoutViewportSectionFrame } from "@royalfut/ui";

const HowDoesItWork = () => {
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="flex flex-col mt-24">
                <div className="mb-10">
                    <h2
                        id="how-does-it-work"
                        className="w-80 text-6xl font-bold text-white">
                        How does it work
                    </h2>
                </div>
                <div className="w-full h-max flex flex-col sm:flex-row sm:justify-between sm:space-x-4">
                    <ExplanationGuide />
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default HowDoesItWork;
