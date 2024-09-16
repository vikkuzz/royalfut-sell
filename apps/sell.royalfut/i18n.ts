import { getRequestConfig } from "next-intl/server";
import { EI18nIds } from "@royalfut/enums";

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = EI18nIds.ENGLISH;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
