"use client";

import { useCallback } from "react";
import { useUpdate, useMount } from "@lilib/hooks";
import { useSearchParams } from "next/navigation";
import { useI18nPathname } from "./i18n";
import { useUISheetStore } from "@royalfut/store";

export const useRouteChangeListener = (
    cbUpd: (url: string) => void,
    cbMount: (url: string) => void = cbUpd
) => {
    const pathname = useI18nPathname();
    const searchParams = useSearchParams();

    useUpdate(() => {
        // console.log(`${pathname}?${searchParams}`, "pathname - search params");
        cbUpd(`${pathname}?${searchParams}`);
    }, [pathname, searchParams]);

    useMount(() => {
        // console.log(`${pathname}?${searchParams}`, "pathname - search params");
        cbMount(`${pathname}?${searchParams}`);
    });
};

export const useRouteChangeUIListener = () => {
    const setOpen = useUISheetStore(state => state.setOpen);
    const routeChange = useCallback(() => {
        setOpen(false);
    }, []);

    useRouteChangeListener(routeChange);
};
