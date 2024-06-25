import { useCallback } from "react";
import { useAuthStore, useUserStore } from "@royalfut/store";

import type { IUserProfile } from "@royalfut/interfaces";

export const useForwardLogin = () => {
    const setIsLogged = useAuthStore(state => state.setIsLogged);
    const setProfile = useUserStore(state => state.setUser);

    const forwardLogin = useCallback(
        (profile: IUserProfile) => {
            setProfile(profile);
            setIsLogged(true);
        },
        [setIsLogged, setProfile]
    );

    return { forwardLogin };
};
