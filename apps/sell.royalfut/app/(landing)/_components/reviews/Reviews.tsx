/* eslint-disable max-lines */
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import ReviewsGallery from "./ReviewsGallery";

const Reviews = () => {
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="flex flex-col mt-24">
                <ReviewsGallery />
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default Reviews;
