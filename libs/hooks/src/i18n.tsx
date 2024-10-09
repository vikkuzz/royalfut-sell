// TODO: Better place for this module

import _I18nLink from "./_I18nLink";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { i18nLocales, i18nLocalePrefix } from "@royalfut/collections";
import { isBrowser } from "@royalfut/utils";
// @ts-expect-error patched in package.json
import { serverRedirect } from "next-intl/navigation/server-redirect";

const isBrowserEnv = isBrowser();

const clientNav = isBrowser()
    ? createSharedPathnamesNavigation({
          locales: i18nLocales,
          localePrefix: i18nLocalePrefix,
      })
    : ({} as ReturnType<typeof createSharedPathnamesNavigation>);

const I18nLink = isBrowserEnv ? clientNav.Link : _I18nLink;
const i18nRedirect = isBrowserEnv
    ? clientNav.redirect
    : (pathname: string, ...args: any) =>
          serverRedirect({ pathname, localePrefix: i18nLocalePrefix }, ...args);
const useI18nPathname = isBrowserEnv
    ? clientNav.usePathname
    : (): ReturnType<typeof clientNav.usePathname> => "";
const useI18nRouter = isBrowserEnv
    ? clientNav.useRouter
    : (): ReturnType<typeof clientNav.useRouter> => ({
          back() {
              return void 0;
          },
          forward() {
              return void 0;
          },
          prefetch() {
              return void 0;
          },
          push() {
              return void 0;
          },
          refresh() {
              return void 0;
          },
          replace() {
              return void 0;
          },
      });

export { I18nLink, i18nRedirect, useI18nPathname, useI18nRouter };
