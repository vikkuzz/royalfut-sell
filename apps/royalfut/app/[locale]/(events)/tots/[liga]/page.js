import pagesData from "../../../../../data-elements/leagues";
import PageContent from "./pageContent";

import styles from "./page.module.scss";

export async function generateMetadata({ params }) {
    const page = pagesData.filter(el => el.route.includes(params.liga))[0];
    return {
        title: page?.title,
        description: page?.description,
    };
}

export default async function LigaPage({ params }) {
    console.log(params);

    const page = pagesData.filter(el => el.route.includes(params.liga))[0];
    return (
        <main className={styles.main}>
            <PageContent page={page} />
        </main>
    );
}
