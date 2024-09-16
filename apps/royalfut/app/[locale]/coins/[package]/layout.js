import { notFound } from "next/navigation";
import React from "react";
import defaultCoinsCount from "../../../../data-elements/coinsCards";

async function isPageTrue(page) {
    let result = defaultCoinsCount.filter(el => el.limitSumView === page)[0];
    if (result) {
        return 1;
    }
    return -1;
}

export default async function layout({ children, params }) {
    const page = await isPageTrue(params.package);
    if (page < 0) {
        notFound();
    }
    return <>{children}</>;
}
