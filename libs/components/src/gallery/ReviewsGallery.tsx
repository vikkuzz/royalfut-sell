import { ReviewCard } from "@royalfut/ui";
import { reviews } from "@royalfut/collections";

const ReviewsGallery = () => {
    return (
        <div className="max-w-screen w-full overflow-x-auto pb-6">
            <div className="grid grid-flow-col grid-rows-2 gap-4 w-max">
                {reviews.map(el => (
                    <ReviewCard key={el.id} review={el} />
                ))}
            </div>
        </div>
    );
};

export default ReviewsGallery;
