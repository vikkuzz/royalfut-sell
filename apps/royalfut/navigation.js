import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = [
    "en",
    "ar",
    "zh",
    "de",
    "es",
    "fr",
    "it",
    "nl",
    "no",
    "pl",
    "sv",
    "tr",
    "pt",
    "ru",
];
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({
        locales,
        localePrefix,
    });
