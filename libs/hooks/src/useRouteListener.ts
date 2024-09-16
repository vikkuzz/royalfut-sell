"use client";

import { useCallback } from "react";
import { useUpdate, useMount } from "@lilib/hooks";
import { usePathname, useSearchParams } from "next/navigation";

import { useUISheetStore } from "@royalfut/store";

export const useRouteChangeListener = (cb: (url: string) => void) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useUpdate(() => {
        console.log(`${pathname}?${searchParams}`, "pathname - search params");
        cb(`${pathname}?${searchParams}`);
    }, [pathname, searchParams]);

    useMount(() => {
        console.log(`${pathname}?${searchParams}`, "pathname - search params");
        cb(`${pathname}?${searchParams}`);
    });
};

export const useRouteChangeUIListener = () => {
    const setOpen = useUISheetStore((state) => state.setOpen);
    const routeChange = useCallback(() => {
        setOpen(false);
    }, []);

    useRouteChangeListener(routeChange);
};
