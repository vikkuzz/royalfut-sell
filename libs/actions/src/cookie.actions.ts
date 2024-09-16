"use server";

import { cookies } from "next/headers";
import { CookiesKeys } from "@royalfut/enums";

import type { CookieConsentTypes } from "@royalfut/interfaces";

export const getCookieConsentStatus =
    async (): Promise<CookieConsentTypes | null> => {
        const cookieStore = cookies();
        const hasCookie = cookieStore.has(CookiesKeys.COOKIES_CONSENT_STATUS);
        const value = hasCookie
            ? cookieStore.get(CookiesKeys.COOKIES_CONSENT_STATUS)?.value
            : undefined;

        if (!value) {
            return null;
        }

        return value as CookieConsentTypes;
    };

export const setCookieConsentStatus = async (type: CookieConsentTypes) => {
    const cookieStore = cookies();

    cookieStore.set({
        name: CookiesKeys.COOKIES_CONSENT_STATUS,
        value: String(type),
    });
};

export const deleteCookieConsentStatus = async () => {
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set(CookiesKeys.COOKIES_CONSENT_STATUS, "", {
        expires: Date.now() - oneDay,
    });
};
