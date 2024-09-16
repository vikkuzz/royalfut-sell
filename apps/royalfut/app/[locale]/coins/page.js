import CoinsContent from "./coinsContent";
import { seoTags } from "../../../data-elements/seoTags";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].coins?.title,
        description: seoTags[params.locale].coins?.description,
    };
}

export default async function CoinsPage({ params }) {
    console.log(params);

    return (
        <>
            <CoinsContent />
        </>
    );
}
