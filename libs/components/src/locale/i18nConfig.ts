import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { i18nLocales, i18nLocalePrefix } from "@royalfut/collections";

export const {
    Link: I18nLink,
    redirect: useI18nRedirect,
    usePathname: useI18nPathname,
    useRouter: useI18nRouter,
} = createSharedPathnamesNavigation({
    locales: i18nLocales,
    localePrefix: i18nLocalePrefix,
});
