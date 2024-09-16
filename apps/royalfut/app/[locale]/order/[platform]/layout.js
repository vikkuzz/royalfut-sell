import { notFound } from "next/navigation";
import React from "react";

async function isPageTrue(page) {
    const routes = ["ps", "ps4", "ps5", "pc", "xbox", "xbox_one", "xbox_xs"];
    return routes.indexOf(page);
}

export default async function layout({ children, params }) {
    const page = await isPageTrue(params.platform);
    if (page < 0) {
        notFound();
    }
    return <>{children}</>;
}
