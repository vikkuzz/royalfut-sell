"use client";

/**
 * @see https://www.npmjs.com/package/@react-oauth/google
 * @override https://github.com/MomenSherif/react-oauth/blob/master/packages/%40react-oauth/google/src/hooks/useLoadGsiScript.ts
 * @author MomenSherif
 */

import { useRef, useCallback } from "react";
import { useGoogleOAuth } from "@royalfut/store";

export interface IUseLoadGsiScriptOptions {
    /**
     * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
     */
    onScriptLoadSuccess?: () => void;
    /**
     * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
     */
    onScriptLoadError?: () => void;
}

export const useLoadGsiScript = (
    options: IUseLoadGsiScriptOptions = {}
): [() => (() => void) | void] => {
    const { onScriptLoadSuccess, onScriptLoadError } = options;
    const { scriptInitialized, setScriptInitialized } = useGoogleOAuth();

    const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
    onScriptLoadSuccessRef.current = onScriptLoadSuccess;

    const onScriptLoadErrorRef = useRef(onScriptLoadError);
    onScriptLoadErrorRef.current = onScriptLoadError;

    const loadScript = useCallback(() => {
        if (scriptInitialized) {
            onScriptLoadSuccessRef.current?.();
            return;
        }

        const scriptTag = document.createElement("script");
        scriptTag.src = "https://accounts.google.com/gsi/client";
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.onload = () => {
            setScriptInitialized(true);
            onScriptLoadSuccessRef.current?.();
        };
        scriptTag.onerror = () => {
            setScriptInitialized(false);
            onScriptLoadErrorRef.current?.();
        };

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [scriptInitialized]);

    return [loadScript];
};
