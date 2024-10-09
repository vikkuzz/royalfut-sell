import { ECCYIDs, EI18nIds } from "@royalfut/enums";

export const AppCredentials = {
    game: {
        name: {
            v1: "FC",
            v2: "FIFA",
        },
        release: "25",
    },
    copyright: {
        symbol: "©",
        title: "ROYALFUT",
        year: "2024",
    },
};

export const DefaultAppSettings = {
    currency: ECCYIDs.USD,
    i18n: EI18nIds.ENGLISH,
    trustScore: {
        rate: "4.6",
        reviews: 527,
    },
};
