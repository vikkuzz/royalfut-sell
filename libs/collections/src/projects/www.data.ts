import { EAppContacts, EAppSocials } from "@royalfut/enums";
import { ccyCollection, i18nCollection } from "../locale";
import { PROJECT_PUBLIC_ROUTES, PROJECT_PRIVATE_ROUTES } from "../routes";
import { SOCIAL_LINKS, SOCIAL_CREDENTIALS } from "../social";
import { infographicStats } from "./general.data";

import type { IUIGlobalState } from "@royalfut/interfaces";

const data: IUIGlobalState = {
    local: {
        lng: i18nCollection,
        ccy: ccyCollection,
    },
    features: {
        loyality: {
            isEnabled: true,
        },
    },
    header: {
        nsI18n: "header",
        nav: [
            {
                label: "nav.1",
                href: PROJECT_PUBLIC_ROUTES["ORDER"],
                type: "expanded",
                content: [
                    {
                        label: "Playstation 4",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/ps4`,
                        localized: false,
                    },
                    {
                        label: "Playstation 5",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/ps5`,
                        localized: false,
                    },
                    {
                        label: "Xbox One",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/xbox_one`,
                        localized: false,
                    },
                    {
                        label: "Xbox Series X|S",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/xbox_xs`,
                        localized: false,
                    },
                    {
                        label: "PC",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/pc`,
                        localized: false,
                    },
                ],
            },
            {
                href: PROJECT_PUBLIC_ROUTES["COINS"],
                label: "nav.2",
                type: "link",
            },
            {
                href: PROJECT_PUBLIC_ROUTES["REVIEWS"],
                label: "nav.3",
                type: "link",
            },
            {
                href: PROJECT_PUBLIC_ROUTES["FAQ"],
                label: "nav.4",
                type: "link",
            },
        ],
        local: {
            ccy: {
                isEnable: true,
                style: {
                    showFlag: false,
                },
            },
            lng: {
                isEnable: true,
                style: {
                    showFlag: true,
                },
            },
        },
    },
    menu: {
        root: [
            {
                nsI18n: "user",
                section: {
                    label: "bar.nav.1.title",
                },
                nav: [
                    {
                        type: "link",
                        label: "bar.nav.1.1",
                        href: PROJECT_PRIVATE_ROUTES["PROFILE_ORDERS"],
                        icon: "/image/history.svg",
                    },
                    {
                        type: "link",
                        label: "bar.nav.1.2",
                        href: PROJECT_PRIVATE_ROUTES["PROFILE_SETTINGS"],
                    },
                    {
                        type: "link",
                        label: "bar.nav.1.3",
                        href: PROJECT_PRIVATE_ROUTES["PROFILE_POINTS"],
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
                    localized: false,
                    href: SOCIAL_LINKS[EAppContacts.MAIL],
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
                        label: "PS4",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/ps4`,
                        localized: false,
                    },
                    {
                        type: "link",
                        label: "PS5",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/ps5`,
                        localized: false,
                    },
                    {
                        type: "link",
                        label: "Xbox One",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/xbox_one`,
                        localized: false,
                    },
                    {
                        type: "link",
                        label: "Xbox Series X|S",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/xbox_xs`,
                        localized: false,
                    },
                    {
                        type: "link",
                        label: "PC",
                        href: `${PROJECT_PUBLIC_ROUTES["ORDER"]}/pc`,
                        localized: false,
                    },
                ],
            },
            {
                label: "title.nav.2",
                links: [
                    {
                        type: "link",
                        label: "nav.1.1",
                        href: PROJECT_PUBLIC_ROUTES["DELIVERY"],
                    },
                    {
                        type: "link",
                        label: "nav.1.2",
                        href: PROJECT_PUBLIC_ROUTES["PAYMENTS"],
                    },
                    {
                        type: "link",
                        label: "nav.1.3",
                        href: PROJECT_PUBLIC_ROUTES["TERMS"],
                    },
                    {
                        type: "link",
                        label: "nav.1.4",
                        href: PROJECT_PUBLIC_ROUTES["PRIVACY"],
                    },
                    {
                        type: "link",
                        label: "nav.1.5",
                        href: PROJECT_PUBLIC_ROUTES["COOKIE"],
                    },
                ],
            },
        ],
    },
    pages: {
        home: {
            nsI18n: "home",
            inforgraphic: infographicStats,
        },
    },
};

export default data;
