import { seoTags } from "../../../data-elements/seoTags";
import TermsContent from "../../../components/TermsContent";

export async function generateMetadata({ params }) {
    return {
        title: seoTags[params.locale].terms?.title,
        description: seoTags[params.locale].terms?.description,
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function PaymentsPage({ params }) {
    console.log(params);

    return (
        <>
            <TermsContent locale={params.locale} />
        </>
    );
}
