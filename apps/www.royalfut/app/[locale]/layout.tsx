import { MediaIndicator, Footer } from "@royalfut/components";
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
} from "@royalfut/actions";
import {
    CurrencyStoreProvider,
    StocksStoreProvider,
    UIGlobalStoreProvider,
    I18nStoreProvider,
    AuthStoreProvider,
    UserStoreProvider,
    GoogleOAuthProvider,
    UserBonusStoreProvider,
} from "@royalfut/store";
import { montserrat } from "@royalfut/ui";
import { WWWGlobalData } from "@royalfut/collections";
import { EI18nIds } from "@royalfut/enums";
import { i18nLocales } from "@royalfut/collections";
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
    ] = await Promise.all([
        getMessages(),
        getCurrency(),
        getUser(),
        getStocks(),
        localizeGlobalState(WWWGlobalData),
        getBonusInfo(),
        getBonusLevels(),
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
                    <UIGlobalStoreProvider initial={globalSettings}>
                        <GoogleOAuthProvider clientId="9475571545-s9o5kb38f48n05uafaopfc49i460f676.apps.googleusercontent.com">
                            <StocksStoreProvider initial={{ stocks }}>
                                <AuthStoreProvider
                                    initial={{ isLoggedIn: !!user }}>
                                    <UserStoreProvider initial={{ user }}>
                                        <I18nStoreProvider
                                            initial={{
                                                i18n: locale as EI18nIds,
                                            }}>
                                            <CurrencyStoreProvider
                                                initial={{ currency }}>
                                                <UserBonusStoreProvider
                                                    initial={{
                                                        info: bonusInfo,
                                                        levels: bonusLevels,
                                                    }}>
                                                    <div className="w-full h-full flex-1 pb-10">
                                                        <Header />
                                                        <main className="pt-[var(--size-layout-header)]">
                                                            {children}
                                                        </main>
                                                    </div>
                                                    <Footer />
                                                </UserBonusStoreProvider>
                                            </CurrencyStoreProvider>
                                        </I18nStoreProvider>
                                    </UserStoreProvider>
                                </AuthStoreProvider>
                            </StocksStoreProvider>
                        </GoogleOAuthProvider>
                        <MediaIndicator />
                    </UIGlobalStoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
