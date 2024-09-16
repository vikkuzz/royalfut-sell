/* eslint-disable max-lines */
"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { useLogoutCleanup } from "./useLogoutCleanup";
import { useForwardLogin } from "./useLogin";
import { IUserProfile } from "@royalfut/interfaces";

enum QuerySignInMsgReasonTypes {
    ACCESS = "access",
    UNCONFIRMED_EMAIL_ADDRESS = "unconfirmed_email",
    CONFIRMED_EMAIL_ADDRESS = "confirmed_email",
}

const enum ChannelMessageTypes {
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
              ChannelMessageTypes,
              ChannelMessageTypes.LOGOUT | ChannelMessageTypes.LOGIN
          >;
      }
    | {
          type: ChannelMessageTypes.LOGOUT;
          notify?: INotifyLogoutReason;
      }
    | {
          type: ChannelMessageTypes.LOGIN;
          profile: IUserProfile;
      };
let channel = new BroadcastChannel("auth");

export const useAuthListener = () => {
    const router = useRouter();
    const { performAppClean } = useLogoutCleanup();
    const { forwardLogin } = useForwardLogin();

    const onAuthChange = useCallback(
        async (e: MessageEvent<any>) => {
            if (!channel) return;
            const data = e.data as AuthMessageData;
            if (data.type === ChannelMessageTypes.LOGIN) {
                // router.refresh();
                forwardLogin(data.profile);
                channel.postMessage({
                    type: ChannelMessageTypes.LOGGEDIN,
                } as AuthMessageData);
            } else if (data.type === ChannelMessageTypes.LOGOUT) {
                const reason = data.notify?.reason;
                const url = reason
                    ? `${PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"]}?show=msg&reason=${reason}`
                    : PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"];
                await performAppClean();
                router.replace(url, {
                    scroll: false,
                });
                channel.postMessage({
                    type: ChannelMessageTypes.LOGGEDOUT,
                } as AuthMessageData);
            }
        },
        [forwardLogin, performAppClean, router],
    );

    useEffect(
        () => () => {
            if (channel) {
                channel.removeEventListener("message", onAuthChange);
            }
        },
        [onAuthChange],
    );

    const subscribe = useCallback(() => {
        channel = new BroadcastChannel("auth");
        channel.addEventListener("message", onAuthChange);
    }, [onAuthChange]);

    const loginListener = useCallback((profile: IUserProfile) => {
        const authChannel = new BroadcastChannel("auth");
        const body: AuthMessageData = {
            type: ChannelMessageTypes.LOGIN,
            profile,
        };
        authChannel.postMessage(body);
    }, []);

    const loggedOut = useCallback((cb: () => void) => {
        const authChannel = new BroadcastChannel("auth");

        authChannel.addEventListener(
            "message",
            function loggedout(e: MessageEvent<any>) {
                if (e.data.type === ChannelMessageTypes.LOGGEDOUT) {
                    cb();
                    channel.removeEventListener("message", loggedout);
                }
            },
        );
    }, []);

    const loggedIn = useCallback((cb: () => void) => {
        const authChannel = new BroadcastChannel("auth");

        authChannel.addEventListener(
            "message",
            function loggedin(e: MessageEvent<any>) {
                if (e.data.type === ChannelMessageTypes.LOGGEDIN) {
                    cb();
                    channel.removeEventListener("message", loggedin);
                }
            },
        );
    }, []);

    const logoutListener = useCallback((notify?: INotifyLogoutReason) => {
        const authChannel = new BroadcastChannel("auth");
        authChannel.postMessage({
            type: ChannelMessageTypes.LOGOUT,
            notify,
        } as AuthMessageData);
    }, []);

    return { loginListener, logoutListener, loggedOut, loggedIn, subscribe };
};
