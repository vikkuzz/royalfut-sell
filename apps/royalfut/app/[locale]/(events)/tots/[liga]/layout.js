import { notFound } from "next/navigation";
import React from "react";
import pagesData from "../../../../../data-elements/leagues";

async function isPageTrue(page, routes) {
    const id = routes.filter(el => {
        const route = el.route.replace("/tots/", "");

        if (route == page) {
            return el;
        }
    }).length;
    if (id > 0) {
        return 1;
    } else return -1;
}

export default async function layout({ children, params }) {
    const page = await isPageTrue(params.liga, pagesData);
    console.log("PAGE:", page);
    if (page < 0) {
        notFound();
    }
    return <>{children}</>;
}
