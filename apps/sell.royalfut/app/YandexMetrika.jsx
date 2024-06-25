/* eslint-disable no-undef */
"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function YandexMetrika() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        ym(97304593, "hit", url);
    }, [pathname, searchParams]);

    return null;
}
