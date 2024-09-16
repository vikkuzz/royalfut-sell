import { seoTags } from "../../../data-elements/seoTags";
import Delivery from "./delivery";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].delivery?.title,
        description: seoTags[params.locale].delivery?.description,
    };
}

export default async function DeliveryPage({ params }) {
    console.log(params);

    return (
        <>
            <Delivery />
        </>
    );
}
