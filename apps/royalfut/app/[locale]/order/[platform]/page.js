import PlatformContent from "./platformContent";
import { seoTags } from "../../../../data-elements/seoTags";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale][params.platform]?.title,
        description: seoTags[params.locale][params.platform]?.description,
    };
}

export default async function PlatformPage({ params }) {
    return (
        <>
            <PlatformContent page={params.platform} />
        </>
    );
}
