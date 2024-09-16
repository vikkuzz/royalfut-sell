"use client";

/**
 * @see https://www.npmjs.com/package/@react-oauth/google
 * @override https://github.com/MomenSherif/react-oauth/blob/master/packages/%40react-oauth/google/src/hooks/useGoogleLogin.ts
 * @author MomenSherif
 */

import { useCallback, useRef } from "react";
import { useGoogleOAuth } from "@royalfut/store";
import {
    TokenClientConfig,
    TokenResponse,
    CodeResponse,
    OverridableTokenClientConfig,
    NonOAuthError,
} from "@react-oauth/google";
import { useLoadGsiScript } from "./useLoadGsiScript";

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Window {
        google?: {
            accounts: {
                id: unknown;
                oauth2: {
                    initTokenClient: (
                        props: {
                            client_id: string;
                            scope: string;
                            callback: (
                                response: TokenResponse | CodeResponse
                            ) => void;
                            error_callback: (
                                nonOAuthError: NonOAuthError
                            ) => void;
                        } & Omit<
                            TokenClientConfig,
                            "client_id" | "scope" | "callback"
                        >
                    ) =>
                        | {
                              requestAccessToken: (
                                  props:
                                      | OverridableTokenClientConfig
                                      | undefined
                              ) => void;
                          }
                        | undefined;
                };
            };
        };
    }
}

interface IImplicitFlowOptions
    extends Omit<TokenClientConfig, "client_id" | "scope" | "callback"> {
    onSuccess?: (
        tokenResponse: Omit<
            TokenResponse,
            "error" | "error_description" | "error_uri"
        >,
    ) => void;
    onError?: (
        errorResponse: Pick<
            TokenResponse,
            "error" | "error_description" | "error_uri"
        >,
    ) => void;
    onNonOAuthError?: (nonOAuthError: NonOAuthError) => void;
    scope?: TokenClientConfig["scope"];
    overrideScope?: boolean;
}

export const useGoogleLogin = ({
    scope = "",
    onSuccess,
    onError,
    onNonOAuthError,
    overrideScope,
    state,
    ...props
}: IImplicitFlowOptions): ((
    overrideConfig?: OverridableTokenClientConfig
) => void) => {
    const { clientId, scriptInitialized } = useGoogleOAuth();

    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;

    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;

    const onNonOAuthErrorRef = useRef(onNonOAuthError);
    onNonOAuthErrorRef.current = onNonOAuthError;

    const loginImplicitFlow = useCallback(
        (overrideConfig?: OverridableTokenClientConfig) => {
            const clientMethod = "initTokenClient";
            const client = window?.google?.accounts?.oauth2[clientMethod]({
                client_id: clientId,
                scope: overrideScope ? scope : `openid profile email ${scope}`,
                callback: (response: TokenResponse | CodeResponse) => {
                    if (response.error) return onErrorRef.current?.(response);
                    onSuccessRef.current?.(response as any);
                },
                error_callback: (nonOAuthError: NonOAuthError) => {
                    onNonOAuthErrorRef.current?.(nonOAuthError);
                },
                state,
                ...props,
            });

            client?.requestAccessToken(overrideConfig);
            client?.requestAccessToken(overrideConfig);
        },
        [clientId, scriptInitialized, scope, overrideScope, state, props],
    );

    const [loadScript] = useLoadGsiScript({
        onScriptLoadSuccess: () => {
            loginImplicitFlow();
        },
    });

    return loadScript;
};
