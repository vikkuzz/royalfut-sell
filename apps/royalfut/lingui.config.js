const nextConfig = require("./next.config");

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: nextConfig.i18n.locales,
    pseudoLocale: "pseudo",
    sourceLocale: nextConfig.i18n.defaultLocale,
    fallbackLocales: {
        default: "en",
    },
    catalogs: [
        {
            path: "<rootDir>/locales/lng/{locale}",
            include: ["pages/", "components/"],
        },
    ],
};
