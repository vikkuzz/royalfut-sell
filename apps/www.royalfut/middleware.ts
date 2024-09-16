import createMiddleware from "next-intl/middleware";
import { i18nLocales, i18nLocalePrefix } from "@royalfut/collections";
import { EI18nIds } from "@royalfut/enums";

export const locales = i18nLocales;

export default createMiddleware({
    locales: i18nLocales,
    localePrefix: i18nLocalePrefix,
    defaultLocale: EI18nIds.ENGLISH,
});

// only applies this middleware to files in the app directory
export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
