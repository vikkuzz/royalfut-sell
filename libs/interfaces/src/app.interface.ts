import type { EAppContacts, EAppSocials } from "@royalfut/enums";
import type { I18nCollection, CCYCollection } from "./locale.interface";

type LocalizedNSType<T = never, Opt = false> = T &
    (Opt extends true ? { nsI18n?: string } : { nsI18n: string });
type LocalizedLabelType =
    | { localized?: true; fbLabel?: string; nsI18n?: string }
    | { localized: false };
type LocalizedText<T = never, O = false> = T &
    LocalizedLabelType &
    (O extends true ? object : { label: string });

type ProjectGlobalNavBase<Linked = true> = LocalizedText<
    Linked extends true
        ? {
              href: string;
              nsI18n?: string;
          }
        : object
>;
interface IIconProps {
    src: string;
    width: number;
}

export type TProjectGlobalNavLink = ProjectGlobalNavBase & {
    type: "link";
    icon?: IIconProps;
};

export type TProjectGlobalNavExpanded = ProjectGlobalNavBase & {
    type: "expanded";
    content: Array<ProjectGlobalNavBase>;
};

export type TProjectGlobalFooterContacts = ProjectGlobalNavBase<false> & {
    items: Array<
        {
            id: EAppContacts;
            style: {
                showLogo?: boolean;
            };
        } & ProjectGlobalNavBase
    >;
};

export type TProjectGlobalFooterSocials = ProjectGlobalNavBase<false> & {
    items: Array<
        {
            id: EAppSocials;
        } & ProjectGlobalNavBase
    >;
};

export type TProjectGlobalFooterNavigation = ProjectGlobalNavBase<false> & {
    links: ProjectGlobalNavItems;
};

export type ProjectGlobalNavItems = Array<
    TProjectGlobalNavExpanded | TProjectGlobalNavLink
>;

export interface IInfographicStatsItem {
    prefixText?: string;
    mainValue: string;
    suffixText: string;
    description: LocalizedText<object>;
}

export interface IProjectGlobalState {
    local: {
        lng: I18nCollection | null;
        ccy: CCYCollection | null;
    };
    features: {
        loyality: {
            isEnabled: boolean;
        };
    };
    header: LocalizedNSType<{
        local: {
            lng: {
                isEnable: boolean;
                style?: {
                    showFlag?: boolean;
                };
            };
            ccy: {
                isEnable: boolean;
                style?: {
                    showFlag?: boolean;
                };
            };
        };
        nav: ProjectGlobalNavItems;
    }>;
    footer: LocalizedNSType<{
        contacts: TProjectGlobalFooterContacts;
        socials: TProjectGlobalFooterSocials;
        nav: Array<TProjectGlobalFooterNavigation>;
    }>;
    menu: {
        root: Array<
            LocalizedNSType<
                LocalizedText<
                    {
                        section: LocalizedText<object>;
                        nav: ProjectGlobalNavItems;
                    },
                    true
                >
            >
        >;
    };
    pages: {
        home: LocalizedNSType<{
            infographic: Array<IInfographicStatsItem>;
        }>;
    };
}

export interface IProjectPrivateGlobalState {
    profile: LocalizedNSType<
        {
            nav: Array<ProjectGlobalNavBase>;
        },
        true
    >;
}
