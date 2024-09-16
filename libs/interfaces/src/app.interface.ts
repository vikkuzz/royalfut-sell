import type { EAppContacts, EAppSocials } from "@royalfut/enums";
import type { I18nCollection, CCYCollection } from "./locale.interface";

type LocalizedNSType<T = never> = T & { nsI18n: string };
type LocalizedLabelType =
    | { localized?: true; fbLabel?: string; nsI18n?: string }
    | { localized: false };
type LocalizedText<T = never, O = false> = T &
    LocalizedLabelType &
    (O extends true ? object : { label: string });

type UIGlobalNavBase<Linked = true> = LocalizedText<
    Linked extends true
        ? {
              href: string;
          }
        : object
>;

export type TUIGlobalNavLink = UIGlobalNavBase & {
    type: "link";
    icon?: string;
};

export type TUIGlobalNavExpanded = UIGlobalNavBase & {
    type: "expanded";
    content: Array<UIGlobalNavBase>;
};

export type TUIGlobalFooterContacts = UIGlobalNavBase<false> & {
    items: Array<
        {
            id: EAppContacts;
            style: {
                showLogo?: boolean;
            };
        } & UIGlobalNavBase
    >;
};

export type TUIGlobalFooterSocials = UIGlobalNavBase<false> & {
    items: Array<
        {
            id: EAppSocials;
        } & UIGlobalNavBase
    >;
};

export type TUIGlobalFooterNavigation = UIGlobalNavBase<false> & {
    links: UIGlobalNavItems;
};

export type UIGlobalNavItems = Array<TUIGlobalNavExpanded | TUIGlobalNavLink>;

export interface IInfographicStatsItem {
    prefixText?: string;
    mainValue: string;
    suffixText: string;
    description: LocalizedText<object>;
}

export interface IUIGlobalState {
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
        nav: UIGlobalNavItems;
    }>;
    footer: LocalizedNSType<{
        contacts: TUIGlobalFooterContacts;
        socials: TUIGlobalFooterSocials;
        nav: Array<TUIGlobalFooterNavigation>;
    }>;
    menu: {
        root: Array<
            LocalizedNSType<
                LocalizedText<
                    {
                        section: LocalizedText<object>;
                        nav: UIGlobalNavItems;
                    },
                    true
                >
            >
        >;
    };
    pages: {
        home: LocalizedNSType<{
            inforgraphic: Array<IInfographicStatsItem>;
        }>;
    };
}
