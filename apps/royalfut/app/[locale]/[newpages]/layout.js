import { notFound } from "next/navigation";
import React from "react";

async function isPageTrue(page) {
    const routes = ["new51", "new52", "new53"];
    return routes.indexOf(page);
}

export default async function layout({ children, params }) {
    const page = await isPageTrue(params.newpages);
    if (page < 0) {
        notFound();
    }
    return <>{children}</>;
}
