import { seoTags } from "../../../data-elements/seoTags";
import Faq from "./faq";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].faq?.title,
        description: seoTags[params.locale].faq?.description,
    };
}

export default async function FaqPage({ params }) {
    console.log(params);

    return (
        <>
            <Faq />
        </>
    );
}
