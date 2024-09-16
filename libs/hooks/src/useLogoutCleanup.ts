"use client";

import { useCallback, startTransition } from "react";
import { useAuthStore, useUserStore } from "@royalfut/store";

export const useLogoutCleanup = () => {
    const setIsLogged = useAuthStore((state) => state.setIsLogged);
    const resetUser = useUserStore((state) => state.reset);

    const performAppClean = useCallback(async () => {
        startTransition(() => {
            setIsLogged(false);
            resetUser();
        });
    }, [resetUser, setIsLogged]);

    return { performAppClean };
};
