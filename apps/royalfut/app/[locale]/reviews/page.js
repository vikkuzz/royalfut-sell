import { seoTags } from "../../../data-elements/seoTags";

import ReviewsContent from "../../../components/ReviewsContent/ReviewsContent";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].reviews.title,
        description: seoTags[params.locale].reviews.description,
    };
}

export default async function ReviewsPage({ params }) {
    console.log(params);

    return (
        <>
            <ReviewsContent />
        </>
    );
}
