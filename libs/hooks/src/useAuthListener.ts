/* eslint-disable max-lines */
"use client";

import { useCallback, useEffect } from "react";
import { useI18nRouter } from "./i18n";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { useLogoutCleanup } from "./useLogoutCleanup";
import { useForwardLogin } from "./useLogin";
import { SafeBroadcastChannel } from "@royalfut/utils";

import type { IUserProfile } from "@royalfut/interfaces";

const CHANNEL_NAME = "auth";

const enum QuerySignInMsgReasonTypes {
    ACCESS = "access",
    UNCONFIRMED_EMAIL_ADDRESS = "unconfirmed_email",
    CONFIRMED_EMAIL_ADDRESS = "confirmed_email",
}

const enum EChannelMessageTypes {
    LOGIN = "login",
    LOGOUT = "logout",
    LOGGEDIN = "loggedin",
    LOGGEDOUT = "loggedout",
}

interface INotifyLogoutReason {
    reason: QuerySignInMsgReasonTypes;
}

type AuthMessageData =
    | {
          type: Exclude<
              EChannelMessageTypes,
              EChannelMessageTypes.LOGOUT | EChannelMessageTypes.LOGIN
          >;
      }
    | {
          type: EChannelMessageTypes.LOGOUT;
          notify?: INotifyLogoutReason;
      }
    | {
          type: EChannelMessageTypes.LOGIN;
          profile: IUserProfile;
      };

const channel = new SafeBroadcastChannel(CHANNEL_NAME);

export const useAuthListener = () => {
    const router = useI18nRouter();
    const { performAppClean } = useLogoutCleanup();
    const { forwardLogin } = useForwardLogin();

    const handleLocalLogout = useCallback(
        async (reason?: QuerySignInMsgReasonTypes) => {
            const url = reason
                ? `${PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"]}?show=msg&reason=${reason}`
                : PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"];
            const isPublicPage =
                Object.values(PROJECT_PUBLIC_ROUTES).includes(
                    window.location.pathname
                ) || window.location.pathname.startsWith("/coins");
            if (!isPublicPage) {
                router.replace(url, { scroll: false });
            }

            await performAppClean();
            channel.postMessage({
                type: EChannelMessageTypes.LOGGEDOUT,
            } as AuthMessageData);
        },
        [performAppClean, router]
    );

    const onAuthChange = useCallback(
        async (e: MessageEvent<any>) => {
            if (!channel) return;
            const data = e.data as AuthMessageData;
            if (data.type === EChannelMessageTypes.LOGIN) {
                // router.refresh();
                forwardLogin(data.profile);
                channel.postMessage({
                    type: EChannelMessageTypes.LOGGEDIN,
                } as AuthMessageData);
            } else if (data.type === EChannelMessageTypes.LOGOUT) {
                const reason = data.notify?.reason;
                await handleLocalLogout(reason);
            }
        },
        [forwardLogin, performAppClean, router, handleLocalLogout]
    );

    useEffect(() => {
        if (channel) {
            channel.removeEventListener(onAuthChange);
        }
    }, [onAuthChange]);

    const subscribe = useCallback(() => {
        channel.addEventListener(onAuthChange);
    }, [onAuthChange]);

    const loginListener = useCallback((profile: IUserProfile) => {
        const body: AuthMessageData = {
            type: EChannelMessageTypes.LOGIN,
            profile,
        };
        channel.postMessage(body);
    }, []);

    const loggedOut = useCallback((cb: () => void) => {
        channel.addEventListener(function loggedout(e: MessageEvent<any>) {
            if (e.data.type === EChannelMessageTypes.LOGGEDOUT) {
                cb();
                channel.removeEventListener(loggedout);
            }
        });
    }, []);

    const loggedIn = useCallback((cb: () => void) => {
        channel.addEventListener(function loggedin(e: MessageEvent<any>) {
            if (e.data.type === EChannelMessageTypes.LOGGEDIN) {
                cb();
                channel.removeEventListener(loggedin);
            }
        });
    }, []);

    const logoutListener = useCallback((notify?: INotifyLogoutReason) => {
        const body: AuthMessageData = {
            type: EChannelMessageTypes.LOGOUT,
            notify,
        };

        channel.postMessage(body);
        handleLocalLogout(notify?.reason);
    }, []);

    return { loginListener, logoutListener, loggedOut, loggedIn, subscribe };
};
