import { ECCYIDs, EI18nIds } from "@royalfut/enums";

import type { CCYCollection, I18nCollection } from "@royalfut/interfaces";

export const i18nCollection: I18nCollection = {
    [EI18nIds.ENGLISH]: {
        id: EI18nIds.ENGLISH,
        label: "English",
        title: "English",
        image: {
            flag: "/image/flags/circle/us.svg",
        },
    },
    [EI18nIds.ARABIC]: {
        id: EI18nIds.ARABIC,
        label: "العربية",
        title: "Arabic",
        image: {
            flag: "/image/flags/circle/sa.svg",
        },
    },
    [EI18nIds.GERMAN]: {
        id: EI18nIds.GERMAN,
        label: "Deutsch",
        title: "German",
        image: {
            flag: "/image/flags/circle/de.svg",
        },
    },
    [EI18nIds.SPANISH]: {
        id: EI18nIds.SPANISH,
        label: "Español",
        title: "Spanish",
        image: {
            flag: "/image/flags/circle/es.svg",
        },
    },
    [EI18nIds.FRENCH]: {
        id: EI18nIds.FRENCH,
        label: "Français",
        title: "French",
        image: {
            flag: "/image/flags/circle/fr.svg",
        },
    },
    [EI18nIds.ITALIAN]: {
        id: EI18nIds.ITALIAN,
        label: "Italiano",
        title: "Italian",
        image: {
            flag: "/image/flags/circle/it.svg",
        },
    },
    [EI18nIds.DUTCH]: {
        id: EI18nIds.DUTCH,
        label: "Nederlands",
        title: "Dutch",
        image: {
            flag: "/image/flags/circle/nl.svg",
        },
    },
    [EI18nIds.PORTUGUESE]: {
        id: EI18nIds.PORTUGUESE,
        label: "Português",
        title: "Portuguese",
        image: {
            flag: "/image/flags/circle/pt.svg",
        },
    },
    [EI18nIds.SWEDISH]: {
        id: EI18nIds.SWEDISH,
        label: "Svenska",
        title: "Swedish",
        image: {
            flag: "/image/flags/circle/se.svg",
        },
    },
    [EI18nIds.NORWEGIAN]: {
        id: EI18nIds.NORWEGIAN,
        label: "Norsk",
        title: "Norwegian",
        image: {
            flag: "/image/flags/circle/no.svg",
        },
    },
    [EI18nIds.CHINESE]: {
        id: EI18nIds.CHINESE,
        label: "简体中文",
        title: "Simplified Chinese",
        image: {
            flag: "/image/flags/circle/zh.svg",
        },
    },
    [EI18nIds.POLISH]: {
        id: EI18nIds.POLISH,
        label: "Polski",
        title: "Polish",
        image: {
            flag: "/image/flags/circle/pl.svg",
        },
    },
    [EI18nIds.TURKISH]: {
        id: EI18nIds.TURKISH,
        label: "Türkçe",
        title: "Turkish",
        image: {
            flag: "/image/flags/circle/tr.svg",
        },
    },
    [EI18nIds.RUSSIAN]: {
        id: EI18nIds.RUSSIAN,
        label: "Русский",
        title: "Russian",
        image: {
            flag: "/image/flags/circle/ru.svg",
        },
    },
};

export const i18nLocales = Object.keys(i18nCollection);
export const i18nLocalePrefix = "as-needed";

export const ccyCollection: CCYCollection = {
    [ECCYIDs.USD]: {
        id: ECCYIDs.USD,
        name: "Dollar",
        currency: "US dollar",
        symbol: "$",
        code: "USD",
        territory: {
            name: "United States",
            iso: "US",
        },
        image: {
            symbol: "/image/ccy/symbol/usd.svg",
            flag: "/image/flags/circle/us.svg",
        },
    },
    [ECCYIDs.AED]: {
        id: ECCYIDs.AED,
        name: "Dirham",
        currency: "UAE Dirham",
        symbol: "د.إ",
        code: "AED",
        territory: {
            name: "United Arab Emirates",
            iso: "AE",
        },
        image: {
            symbol: "/image/ccy/symbol/aed.svg",
            flag: "/image/flags/circle/ae.svg",
        },
    },
    [ECCYIDs.GBP]: {
        id: ECCYIDs.GBP,
        name: "Pound",
        currency: "Pound sterling",
        symbol: "£",
        code: "GBP",
        territory: {
            name: "United Kingdom",
            iso: "GB",
        },
        image: {
            symbol: "/image/ccy/symbol/gbp.svg",
            flag: "/image/flags/circle/gb-eng.svg",
        },
    },
    [ECCYIDs.SAR]: {
        id: ECCYIDs.SAR,
        name: "Riyal",
        currency: "Saudi riyal",
        symbol: "﷼",
        code: "SAR",
        territory: {
            name: "Saudi Arabia",
            iso: "SA",
        },
        image: {
            symbol: "/image/ccy/symbol/sar.svg",
            flag: "/image/flags/circle/sa.svg",
        },
    },
    [ECCYIDs.EUR]: {
        id: ECCYIDs.EUR,
        name: "Euro",
        currency: "Euro",
        symbol: "€",
        code: "EUR",
        territory: {
            name: "European Union",
            iso: "EU",
        },
        image: {
            symbol: "/image/ccy/symbol/eur.svg",
            flag: "/image/flags/circle/eu.svg",
        },
    },
    [ECCYIDs.SEK]: {
        id: ECCYIDs.SEK,
        name: "Krona",
        currency: "Swedish krona",
        symbol: "kr",
        code: "SEK",
        territory: {
            name: "Sweden",
            iso: "SE",
        },
        image: {
            symbol: "/image/ccy/symbol/sek.svg",
            flag: "/image/flags/circle/se.svg",
        },
    },
    [ECCYIDs.CAD]: {
        id: ECCYIDs.CAD,
        name: "Dollar",
        currency: "Canadian dollar",
        symbol: "C$",
        code: "CAD",
        territory: {
            name: "Canada",
            iso: "CA",
        },
        image: {
            symbol: "/image/ccy/symbol/cad.svg",
            flag: "/image/flags/circle/ca.svg",
        },
    },
    [ECCYIDs.NOK]: {
        id: ECCYIDs.NOK,
        name: "Krone",
        currency: "Norwegian krone",
        symbol: "kr",
        code: "NOK",
        territory: {
            name: "Norway",
            iso: "NO",
        },
        image: {
            symbol: "/image/ccy/symbol/nok.svg",
            flag: "/image/flags/circle/no.svg",
        },
    },
    [ECCYIDs.AUD]: {
        id: ECCYIDs.AUD,
        name: "Dollar",
        currency: "Australian dollar",
        symbol: "A$",
        code: "AUD",
        territory: {
            name: "Australia",
            iso: "AU",
        },
        image: {
            symbol: "/image/ccy/symbol/aud.svg",
            flag: "/image/flags/circle/au.svg",
        },
    },
    [ECCYIDs.PLN]: {
        id: ECCYIDs.PLN,
        name: "Zloty",
        currency: "Polish złoty",
        symbol: "zł",
        code: "PLN",
        territory: {
            name: "Poland",
            iso: "PL",
        },
        image: {
            symbol: "/image/ccy/symbol/pln.svg",
            flag: "/image/flags/circle/pl.svg",
        },
    },
    [ECCYIDs.BRL]: {
        id: ECCYIDs.BRL,
        name: "Real",
        currency: "Brazilian real",
        symbol: "R$",
        code: "BRL",
        territory: {
            name: "Brazil",
            iso: "BR",
        },
        image: {
            symbol: "/image/ccy/symbol/brl.svg",
            flag: "/image/flags/circle/br.svg",
        },
    },
    [ECCYIDs.TRY]: {
        id: ECCYIDs.TRY,
        name: "Lira",
        currency: "Turkish lira",
        symbol: "₺",
        code: "TRY",
        territory: {
            name: "Turkey",
            iso: "TR",
        },
        image: {
            symbol: "/image/ccy/symbol/try.svg",
            flag: "/image/flags/circle/tr.svg",
        },
    },
    [ECCYIDs.RUB]: {
        id: ECCYIDs.RUB,
        name: "Ruble",
        currency: "Russian ruble",
        symbol: "₽",
        code: "RUB",
        territory: {
            name: "Russia",
            iso: "RU",
        },
        image: {
            symbol: "/image/ccy/symbol/rub.svg",
            flag: "/image/flags/circle/ru.svg",
        },
    },
};
