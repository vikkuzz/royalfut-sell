import { EAppContacts, EAppSocials, ESEOPlatforms } from "@royalfut/enums";
import { ccyCollection, i18nCollection } from "../locale";
import {
    PROJECT_PUBLIC_WWW_ROUTES,
    PROJECT_PRIVATE_WWW_ROUTES,
} from "../routes";
import { SOCIAL_LINKS, SOCIAL_CREDENTIALS } from "../social";
import { PlatformSEOSets, PlatformOrderLinks } from "../funnel";
import { infographicStats } from "./general.data";

import type {
    IProjectGlobalState,
    IProjectPrivateGlobalState,
} from "@royalfut/interfaces";

export const WWWPrivateGlobalData: IProjectPrivateGlobalState = {
    profile: {
        nsI18n: "profile",
        nav: [
            {
                href: PROJECT_PRIVATE_WWW_ROUTES["PROFILE_ORDERS"],
                label: "Orders",
                localized: false,
            },
            {
                href: PROJECT_PRIVATE_WWW_ROUTES["PROFILE_POINTS"],
                label: "Loyalty Program",
                localized: false,
            },
        ],
    },
};

export const WWWGlobalData: IProjectGlobalState = {
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
        nsI18n: "quinn_pages.home.header",
        nav: [
            {
                label: "nav.1",
                href: PROJECT_PUBLIC_WWW_ROUTES["ORDER"],
                type: "expanded",
                content: [
                    {
                        label: PlatformSEOSets[ESEOPlatforms.PlayStation4].name
                            .v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PlayStation4],
                        localized: false,
                    },
                    {
                        label: PlatformSEOSets[ESEOPlatforms.PlayStation5].name
                            .v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PlayStation5],
                        localized: false,
                    },
                    {
                        label: PlatformSEOSets[ESEOPlatforms.XBoxOne].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.XBoxOne],
                        localized: false,
                    },
                    {
                        label: PlatformSEOSets[ESEOPlatforms.XBoxXS].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.XBoxXS],
                        localized: false,
                    },
                    {
                        label: PlatformSEOSets[ESEOPlatforms.PC].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PC],
                        localized: false,
                    },
                ],
            },
            {
                href: PROJECT_PUBLIC_WWW_ROUTES["COINS"],
                label: "nav.2",
                type: "link",
            },
            {
                href: PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"],
                label: "nav.3",
                type: "link",
            },
            {
                href: PROJECT_PUBLIC_WWW_ROUTES["FAQ"],
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
                nsI18n: "ye_user",
                section: {
                    label: "bar.nav.1.title",
                },
                nav: [
                    {
                        type: "link",
                        label: "bar.nav.1.1",
                        href: PROJECT_PRIVATE_WWW_ROUTES["PROFILE_ORDERS"],
                        icon: "/image/history.svg",
                    },
                    // {
                    //     type: "link",
                    //     label: "bar.nav.1.2",
                    //     href: PROJECT_PRIVATE_WWW_ROUTES["PROFILE_SETTINGS"],
                    // },
                    {
                        type: "link",
                        label: "bar.nav.1.3",
                        href: PROJECT_PRIVATE_WWW_ROUTES["PROFILE_POINTS"],
                    },
                ],
            },
        ],
    },
    footer: {
        nsI18n: "ye_footer",
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
                        label:
                            PlatformSEOSets[ESEOPlatforms.PlayStation4].name
                                .v2 ||
                            PlatformSEOSets[ESEOPlatforms.PlayStation4].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PlayStation4],
                        localized: false,
                    },
                    {
                        type: "link",
                        label:
                            PlatformSEOSets[ESEOPlatforms.PlayStation5].name
                                .v2 ||
                            PlatformSEOSets[ESEOPlatforms.PlayStation5].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PlayStation5],
                        localized: false,
                    },
                    {
                        type: "link",
                        label: PlatformSEOSets[ESEOPlatforms.XBoxOne].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.XBoxOne],
                        localized: false,
                    },
                    {
                        type: "link",
                        label: PlatformSEOSets[ESEOPlatforms.XBoxXS].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.XBoxXS],
                        localized: false,
                    },
                    {
                        type: "link",
                        label: PlatformSEOSets[ESEOPlatforms.PC].name.v1,
                        href: PlatformOrderLinks[ESEOPlatforms.PC],
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
                        href: PROJECT_PUBLIC_WWW_ROUTES["DELIVERY"],
                    },
                    {
                        type: "link",
                        label: "nav.1.2",
                        href: PROJECT_PUBLIC_WWW_ROUTES["PAYMENTS"],
                    },
                    {
                        type: "link",
                        label: "nav.1.3",
                        href: PROJECT_PUBLIC_WWW_ROUTES["TERMS"],
                    },
                    {
                        type: "link",
                        label: "nav.1.4",
                        href: PROJECT_PUBLIC_WWW_ROUTES["PRIVACY"],
                    },
                    {
                        type: "link",
                        label: "nav.1.5",
                        href: PROJECT_PUBLIC_WWW_ROUTES["COOKIE_POLICY"],
                    },
                ],
            },
        ],
    },
    pages: {
        home: {
            nsI18n: "li_home",
            infographic: infographicStats,
        },
    },
};
