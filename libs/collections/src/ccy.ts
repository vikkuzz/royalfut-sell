import { ECCYIDs } from "@royalfut/enums";

import type { CCYCollection } from "@royalfut/interfaces";

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
    // [ECCYIDs.RUB]: {
    //     id: ECCYIDs.RUB,
    //     name: "Ruble",
    //     currency: "Russian ruble",
    //     symbol: "₽",
    //     code: "RUB",
    //     territory: {
    //         name: "Russia",
    //         iso: "RU",
    //     },
    //     image: {
    //         symbol: "/image/ccy/symbol/rub.svg",
    //         flag: "/image/flags/circle/ru.svg",
    //     },
    // },
};
