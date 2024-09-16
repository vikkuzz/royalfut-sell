import { seoTags } from "../../../data-elements/seoTags";
import Contacts from "./contact";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].contact?.title,
        description: seoTags[params.locale].contact?.description,
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function ContactsPage({ params }) {
    console.log(params);

    return (
        <>
            <Contacts locale={params.locale} />
        </>
    );
}
