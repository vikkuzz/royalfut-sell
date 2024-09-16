import { seoTags } from "../../../data-elements/seoTags";
import Cookie from "./cookie-policy";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale]["delivery"]?.title,
        description: seoTags[params.locale]["delivery"]?.description,
    };
}

export default async function CookiePage({ params }) {
    console.log(params);

    return (
        <>
            <Cookie locale={params.locale} />
        </>
    );
}
