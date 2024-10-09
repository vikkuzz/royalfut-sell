import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import {
    i18nLocales,
    i18nLocalePrefix,
    DefaultAppSettings,
} from "@royalfut/collections";

export const locales = i18nLocales;

const intlMiddleware = createMiddleware({
    locales: i18nLocales,
    localePrefix: i18nLocalePrefix,
    defaultLocale: DefaultAppSettings.i18n,
});

// only applies this middleware to files in the app directory
export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);
    intlResponse.headers.set("x-url", request.url);

    return intlResponse;
}
