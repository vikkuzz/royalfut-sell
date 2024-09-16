import React from "react";
import PackagePageContent from "./packagePageContent";

import { seoTags } from "../../../../data-elements/seoTags";
import defaultCoinsCount from "../../../../data-elements/coinsCards";

export async function generateMetadata({ params }) {
    console.log("params", params);
    let seo = seoTags[params.locale];
    let title_text = seo.idk.title.replace("100k");
    let description_text = seo.idk.description.replace("100k");
    let result = defaultCoinsCount.filter(
        el => el.limitSumView === params.package
    )[0];
    if (result.limitSumCoins < 1000000) {
        title_text = seo.idk.title.replaceAll(
            "100K",
            result.limitSumView.toUpperCase()
        );

        description_text = seo.idk.description.replace(
            "100K",
            result.limitSumView.toUpperCase()
        );
    } else {
        title_text = seo.idm.title
            .replace("1", result.limitSumCoins / 1000000)
            .replace("1000K", result.limitSumView.toUpperCase());
        description_text = seo.idm.description
            .replace("1000K", result.limitSumView.toUpperCase())
            .replace("1", result.limitSumCoins / 1000000);
    }
    return {
        title: title_text,
        description: description_text,
    };
}

export default function CoinsPackagePage({ params }) {
    return (
        <>
            <PackagePageContent query={params.package} locale={params.locale} />
        </>
    );
}
