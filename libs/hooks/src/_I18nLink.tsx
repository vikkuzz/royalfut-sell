"use client";

import { forwardRef } from "react";
import NextLink from "next/link";
import {
    isLocalizableHref,
    prefixHref,
    getLocalePrefix,
    // @ts-expect-error patched in package.json
} from "next-intl/navigation/shared-utils";
import { i18nLocalePrefix } from "@royalfut/collections";
import { useI18nStore } from "@royalfut/store";

import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof NextLink>, "locale">;

const I18nLink = forwardRef(
    ({ href, prefetch, ...rest }: Props, ref: Props["ref"]) => {
        const locale = useI18nStore(state => state.i18n);
        const isChangingLocale = false;
        const prefix = getLocalePrefix(locale, i18nLocalePrefix);

        const localizedHref =
            isLocalizableHref(href) &&
            // @ts-expect-error i18nLocalPrefix will be changes
            (i18nLocalePrefix !== "never" || isChangingLocale)
                ? // For the `localePrefix: 'as-needed' strategy, the href shouldn't
                  // be prefixed if the locale is the default locale. To determine this, we
                  // need a) the default locale and b) the information if we use prefixed
                  // routing. The default locale can vary by domain, therefore during the
                  // RSC as well as the SSR render, we can't determine the default locale
                  // statically. Therefore we always prefix the href since this will
                  // always result in a valid URL, even if it might cause a redirect. This
                  // is better than pointing to a non-localized href during the server
                  // render, which would potentially be wrong. The final href is
                  // determined in the effect below.
                  prefixHref(href, prefix)
                : href;

        return (
            <NextLink
                ref={ref}
                href={localizedHref}
                hrefLang={isChangingLocale ? locale : undefined}
                prefetch={prefetch}
                {...rest}
            />
        );
    }
);
I18nLink.displayName = "I18nLink";

export default I18nLink;
