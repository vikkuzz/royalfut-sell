import {
    MediaIndicator,
    Footer,
    PopupDialog,
    CookieConsentBanner,
    SubscriptionManager,
} from "@royalfut/components";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Header } from "../../src/layout";
import {
    getBonusInfo,
    getCurrency,
    getStocks,
    getUser,
    localizeGlobalState,
    getBonusLevels,
    getCookieConsentStatus,
} from "@royalfut/actions";
import {
    CurrencyStoreProvider,
    StocksStoreProvider,
    ProjectGlobalStoreProvider,
    I18nStoreProvider,
    AuthStoreProvider,
    UserStoreProvider,
    GoogleOAuthProvider,
    UserBonusStoreProvider,
    RewardsStoreProvider,
} from "@royalfut/store";
import { montserrat } from "@royalfut/ui";
import { WWWGlobalData } from "@royalfut/collections";
import { EI18nIds } from "@royalfut/enums";
import { i18nLocales } from "@royalfut/collections";
import { Brevo, GoogleTagManager } from "./3rdParty.client";
import clsx from "clsx";

import "@royalfut/styles/css/global.css";
import type { FC, PropsWithChildren } from "react";
import type { Viewport, Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: "",
};

export const viewport: Viewport = {
    themeColor: "#8852F2",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const RootLayout: FC<
    PropsWithChildren<{ params: { locale: EI18nIds } }>
> = async ({ children, params }) => {
    const locale = await getLocale();
    if (!i18nLocales.includes(params.locale)) {
        notFound();
    }

    const [
        messages,
        currency,
        user,
        stocks,
        globalSettings,
        bonusInfo,
        bonusLevels,
        cookieConsent,
    ] = await Promise.all([
        getMessages(),
        getCurrency(),
        getUser(),
        getStocks(),
        localizeGlobalState(WWWGlobalData),
        getBonusInfo(),
        getBonusLevels(),
        getCookieConsentStatus(),
    ]);

    return (
        <html
            className={clsx(
                "antialiased",
                "text-xs lg:text-sm xl:text-base",
                montserrat.variable
            )}
            lang={locale}>
            <body className="flex flex-col justify-between min-h-screen">
                <NextIntlClientProvider
                    locale={params.locale}
                    messages={messages}>
                    <I18nStoreProvider
                        initial={{
                            i18n: locale as EI18nIds,
                        }}>
                        <ProjectGlobalStoreProvider initial={globalSettings}>
                            <GoogleOAuthProvider clientId="362649615628-1jnb9dkcp6pd3fh0a81qpfqird23bi08.apps.googleusercontent.com">
                                <StocksStoreProvider initial={{ stocks }}>
                                    <AuthStoreProvider
                                        initial={{ isLoggedIn: !!user }}>
                                        <UserStoreProvider initial={{ user }}>
                                            <CurrencyStoreProvider
                                                initial={{ currency }}>
                                                <RewardsStoreProvider
                                                    initial={{
                                                        loyalty: {
                                                            levels:
                                                                bonusLevels?.levels ??
                                                                [],
                                                            levelsByStatus:
                                                                bonusLevels?.levelsByStatus ??
                                                                null,
                                                        },
                                                    }}>
                                                    <UserBonusStoreProvider
                                                        initial={{
                                                            info: bonusInfo,
                                                        }}>
                                                        <div className="w-full h-full flex-1 pb-10">
                                                            <Header />
                                                            <main className="pt-[var(--size-layout-header)]">
                                                                {children}
                                                            </main>
                                                            <PopupDialog />
                                                        </div>
                                                        <Footer locale={locale} />
                                                        <SubscriptionManager />
                                                    </UserBonusStoreProvider>
                                                </RewardsStoreProvider>
                                            </CurrencyStoreProvider>
                                        </UserStoreProvider>
                                    </AuthStoreProvider>
                                </StocksStoreProvider>
                            </GoogleOAuthProvider>
                            {!cookieConsent && <CookieConsentBanner />}
                            <MediaIndicator />
                        </ProjectGlobalStoreProvider>
                    </I18nStoreProvider>
                </NextIntlClientProvider>
                {process.env.NODE_ENV === "production" && (
                    <>
                        <GoogleTagManager />
                        <Brevo />
                    </>
                )}
            </body>
        </html>
    );
};

export default RootLayout;
