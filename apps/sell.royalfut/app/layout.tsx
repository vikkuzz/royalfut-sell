import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import {
    Footer,
    MediaIndicator,
    CookieConsentBanner,
    PopupDialog,
} from "@royalfut/components";
import { Header } from "../src/layout";
import { UIGlobalStoreProvider } from "@royalfut/store";
import { montserrat } from "@royalfut/ui";
import {
    CurrencyStoreProvider,
    AuthStoreProvider,
    UserStoreProvider,
    OrderStoreProvider,
    WithdrawStoreProvider,
    StocksStoreProvider,
} from "@royalfut/store";
import {
    getCurrency,
    getUser,
    getCookieConsentStatus,
    createOrder,
    getWallet,
    getStocks,
    localizeGlobalState,
} from "@royalfut/actions";
import clsx from "clsx";
import Watcher from "./Watcher";
import { SellGlobalData } from "@royalfut/collections";
import { GoogleOAuthProvider } from "@royalfut/store";
import { GoogleAnalytics, YandexMetrika } from "./3rdParty.client";

import "@royalfut/styles/css/global.css";
import type { PropsWithChildren, FC } from "react";
import type { Viewport, Metadata } from "next";

export const viewport: Viewport = {
    themeColor: "#8852F2",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "Buy FC 24 Coins for All Platforms | Ultimate Team Coin Store",
    description:
        "Best store to buy EA SPORTS FC 24 Coins ✔Buy EA FC 24 Coins for PS 4/5, Xbox One/X/S 🎮Fast Delivery & 24/7 Live Support ⚡ 100% Secure Payments 🔒 Safe place to get Cheap Ultimate Team Coins 😉",
    manifest: "/manifest.json",
    icons: [
        { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
    ],
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
    const locale = await getLocale();
    const messages = await getMessages();
    const [
        currency,
        user,
        order,
        cookieConsent,
        wallet,
        stocks,
        globalSettings,
    ] = await Promise.all([
        getCurrency(),
        getUser(),
        createOrder(),
        getCookieConsentStatus(),
        getWallet(),
        getStocks(),
        localizeGlobalState(SellGlobalData),
    ]);

    return (
        <html
            className={clsx(
                "antialiased",
                "text-xs lg:text-sm xl:text-base",
                montserrat.variable
            )}
            lang={locale}>
            <head>
                {process.env.NODE_ENV === "production" && (
                    <>
                        <link
                            rel="dns-prefetch"
                            href="https://www.googletagmanager.com"
                        />
                        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
                    </>
                )}
            </head>
            <body className="flex flex-col justify-between min-h-screen">
                {process.env.NODE_ENV === "production" && (
                    <noscript>
                        <div>
                            <img
                                src="https://mc.yandex.ru/watch/97304593"
                                style={{
                                    position: "absolute",
                                    left: "-9999px",
                                }}
                                alt=""
                            />
                        </div>
                    </noscript>
                )}
                <UIGlobalStoreProvider initial={globalSettings}>
                    <NextIntlClientProvider messages={messages}>
                        <GoogleOAuthProvider clientId="9475571545-s9o5kb38f48n05uafaopfc49i460f676.apps.googleusercontent.com">
                            <StocksStoreProvider initial={{ stocks }}>
                                <AuthStoreProvider
                                    initial={{ isLoggedIn: !!user }}>
                                    <UserStoreProvider initial={{ user }}>
                                        <OrderStoreProvider initial={{ order }}>
                                            <WithdrawStoreProvider
                                                initial={{ wallet }}>
                                                <CurrencyStoreProvider
                                                    initial={{ currency }}>
                                                    <div className="w-full h-full flex-1 pb-10">
                                                        <Header />
                                                        {children}
                                                        <PopupDialog />
                                                    </div>
                                                    <Footer />
                                                    <Watcher />
                                                </CurrencyStoreProvider>
                                            </WithdrawStoreProvider>
                                        </OrderStoreProvider>
                                    </UserStoreProvider>
                                </AuthStoreProvider>
                            </StocksStoreProvider>
                        </GoogleOAuthProvider>

                        {!cookieConsent && <CookieConsentBanner />}
                        <MediaIndicator />
                        {process.env.NODE_ENV === "production" && (
                            <GoogleAnalytics
                                gaId="G-LYXMFBE9PQ"
                                allowedHostnames={[
                                    "seller.test-royalfut.com",
                                    "seller.royalfut.com",
                                ]}
                            />
                        )}
                        {process.env.NODE_ENV === "production" && (
                            <YandexMetrika
                                allowedHostnames={[
                                    "seller.test-royalfut.com",
                                    "seller.royalfut.com",
                                ]}
                            />
                        )}
                    </NextIntlClientProvider>
                </UIGlobalStoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;
