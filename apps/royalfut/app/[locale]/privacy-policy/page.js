import { seoTags } from "../../../data-elements/seoTags";
import Privacy from "./privacy-policy";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale]["privacy-policy"]?.title,
        description: seoTags[params.locale]["privacy-policy"]?.description,
    };
}

export default async function PrivacyPage({ params }) {
    console.log(params);

    return (
        <>
            <Privacy locale={params.locale} />
        </>
    );
}
