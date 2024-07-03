"use client";

// import { useCallback } from 'react';
// import { useMount } from '@lilib/hooks';
// import { useRouter } from 'next/navigation';

// import { useUISheetStore } from "@royalfut/store";

type useRouteChangeListener = () => void;

export const useRouteChangeListener: useRouteChangeListener = () => {
    // const router = useRouter();
    // const setOpen = useUISheetStore(state => state.setOpen);

    // const routeChangeStart = useCallback((url: string) => {
    //     //
    // }, []);

    // const routeChangeComplete = useCallback((url: string) => {
    //     setOpen(false);
    // }, [setOpen]);

    // useMount(() => {
    //     router.events.on('routeChangeStart', (() => console.log("2222"), routeChangeStart));
    //     router.events.on('routeChangeComplete', routeChangeComplete);

    //     return () => {
    //         router.events.off('routeChangeStart', routeChangeStart);
    //         router.events.off('routeChangeComplete', routeChangeComplete);
    //     }
    // });

    return void 0;
};
