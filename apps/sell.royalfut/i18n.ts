import { getRequestConfig } from "next-intl/server";
import { DefaultAppSettings } from "@royalfut/collections";

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = DefaultAppSettings.i18n;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
