"use client";

/**
 * @see https://www.npmjs.com/package/@react-oauth/google
 * @override https://github.com/MomenSherif/react-oauth/blob/master/packages/%40react-oauth/google/src/GoogleOAuthProvider.tsx
 * @author MomenSherif
 */

import { useContext, createContext, useMemo, ReactNode, useState } from "react";

interface IGoogleOAuthContextProps {
    clientId: string;
    scriptInitialized: boolean;
    setScriptInitialized: (isInitialized: boolean) => void;
}

const GoogleOAuthContext = createContext<IGoogleOAuthContextProps>(null!);

interface IGoogleOAuthProviderProps {
    clientId: string;
    children: ReactNode;
}

export function GoogleOAuthProvider({
    clientId,
    children,
}: IGoogleOAuthProviderProps) {
    const [scriptInitialized, setScriptInitialized] = useState(false);

    const contextValue = useMemo(
        () => ({
            clientId,
            scriptInitialized,
            setScriptInitialized,
        }),
        [clientId, scriptInitialized, setScriptInitialized]
    );

    return (
        <GoogleOAuthContext.Provider value={contextValue}>
            {children}
        </GoogleOAuthContext.Provider>
    );
}

export function useGoogleOAuth() {
    const context = useContext(GoogleOAuthContext);

    if (!context) {
        throw new Error(
            "Google OAuth components must be used within GoogleOAuthProvider"
        );
    }

    return context;
}
