import { EAppContacts, EAppSocials } from "@royalfut/enums";
import { ccyCollection } from "../locale";
import {
    PROJECT_PRIVATE_SELLER_ROUTES,
    PROJECT_PUBLIC_SELLER_ROUTES,
} from "../routes";
import { SOCIAL_LINKS, SOCIAL_CREDENTIALS } from "../social";
import { infographicStats } from "./general.data";

import type {
    IProjectGlobalState,
    IProjectPrivateGlobalState,
} from "@royalfut/interfaces";

export const SellPrivateGlobalData: IProjectPrivateGlobalState = {
    profile: {
        nav: [
            {
                href: PROJECT_PRIVATE_SELLER_ROUTES["PROFILE_ORDERS"],
                label: "Deals",
                localized: false,
            },
            {
                href: PROJECT_PRIVATE_SELLER_ROUTES["PROFILE_WITHDRAWALS"],
                label: "Payouts",
                localized: false,
            },
        ],
    },
};

export const SellGlobalData: IProjectGlobalState = {
    local: {
        lng: null,
        ccy: ccyCollection,
    },
    features: {
        loyality: {
            isEnabled: false,
        },
    },
    header: {
        nsI18n: "header",
        nav: [
            {
                label: "nav.1",
                href: `${PROJECT_PUBLIC_SELLER_ROUTES["HOME"]}#how-does-it-work`,
                type: "link",
            },
            {
                label: "nav.2",
                href: PROJECT_PUBLIC_SELLER_ROUTES["FAQ"],
                type: "link",
            },
        ],
        local: {
            ccy: {
                isEnable: true,
                style: {
                    showFlag: true,
                },
            },
            lng: {
                isEnable: false,
            },
        },
    },
    menu: {
        root: [
            {
                section: {
                    label: "bar.nav.1.title",
                },
                nsI18n: "user",
                nav: [
                    {
                        type: "link",
                        label: "bar.nav.1.1",
                        href: PROJECT_PRIVATE_SELLER_ROUTES["PROFILE_ORDERS"],
                    },
                ],
            },
        ],
    },
    footer: {
        nsI18n: "footer",
        contacts: {
            label: "title.contacts",
            items: [
                {
                    id: EAppContacts.WHATS_APP,
                    label: "WhatsApp",
                    href: SOCIAL_LINKS[EAppContacts.WHATS_APP],
                    localized: false,
                    style: {
                        showLogo: true,
                    },
                },
                {
                    id: EAppContacts.TELEGRAM,
                    label: "Telegram",
                    href: SOCIAL_LINKS[EAppContacts.TELEGRAM],
                    localized: false,
                    style: {
                        showLogo: true,
                    },
                },
                {
                    id: EAppContacts.MAIL,
                    label: SOCIAL_CREDENTIALS.mail.support,
                    href: SOCIAL_LINKS[EAppContacts.MAIL],
                    localized: false,
                    style: {
                        showLogo: true,
                    },
                },
            ],
        },
        socials: {
            label: "title.socials",
            items: [
                {
                    id: EAppSocials.INSTAGRAM,
                    href: SOCIAL_LINKS[EAppSocials.INSTAGRAM],
                    label: "Instagram",
                    localized: false,
                },
                {
                    id: EAppSocials.TIK_TOK,
                    href: SOCIAL_LINKS[EAppSocials.TIK_TOK],
                    label: "Tik Tok",
                    localized: false,
                },
                {
                    id: EAppSocials.YOU_TUBE,
                    href: SOCIAL_LINKS[EAppSocials.YOU_TUBE],
                    label: "YouTube",
                    localized: false,
                },
                {
                    id: EAppSocials.TWITCH,
                    href: SOCIAL_LINKS[EAppSocials.TWITCH],
                    label: "Twitch",
                    localized: false,
                },
            ],
        },
        nav: [
            {
                label: "title.nav.1",
                links: [
                    {
                        type: "link",
                        label: "nav.1.1",
                        href: PROJECT_PUBLIC_SELLER_ROUTES["PAYMENT"],
                    },
                    {
                        type: "link",
                        label: "nav.1.2",
                        href: PROJECT_PUBLIC_SELLER_ROUTES[
                            "TERMS_AND_CONDITIONS"
                        ],
                    },
                    {
                        type: "link",
                        label: "nav.1.3",
                        href: PROJECT_PUBLIC_SELLER_ROUTES["PRIVACY_POLICY"],
                    },
                    {
                        type: "link",
                        label: "nav.1.4",
                        href: PROJECT_PUBLIC_SELLER_ROUTES["COOKIE_POLICY"],
                    },
                ],
            },
        ],
    },
    pages: {
        home: {
            nsI18n: "home",
            infographic: infographicStats,
        },
    },
};
