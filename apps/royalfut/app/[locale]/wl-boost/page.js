import { seoTags } from "../../../data-elements/seoTags";
import Boost from "./boost";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale]["wl-boost"]?.title,
    };
}

export default async function BoostPage({ params }) {
    console.log(params);

    return (
        <>
            <Boost locale={params.locale} />
        </>
    );
}
