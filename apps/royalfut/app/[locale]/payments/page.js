import { seoTags } from "../../../data-elements/seoTags";
import Payments from "./payments";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].payments?.title,
        description: seoTags[params.locale].payments?.description,
    };
}

export default async function PaymentsPage({ params }) {
    console.log(params);

    return (
        <>
            <Payments />
        </>
    );
}
