import {
    PublicHeader,
    Footer,
    MediaIndicator,
    CookieConsentBanner,
    PopupDialog,
} from "@royalfut/components";
import { montserrat } from "@royalfut/ui";
import {
    CurrencyStoreProvider,
    AuthStoreProvider,
    UserStoreProvider,
    OrderStoreProvider,
    WithdrawStoreProvider,
} from "@royalfut/store";
import {
    getCurrency,
    getUser,
    getCookieConsentStatus,
    createOrder,
    getWallet,
} from "@royalfut/actions";
import clsx from "clsx";
import Watcher from "./Watcher";
import YandexMetrika from "./YandexMetrika";

import "./global.css";
import { type PropsWithChildren, type FC, Suspense } from "react";
import type { Viewport, Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
    const currency = await getCurrency();
    const user = await getUser();
    const order = await createOrder();
    const cookieConsent = await getCookieConsentStatus();
    const wallet = await getWallet();

    return (
        <html
            className={clsx(
                "antialiased",
                "text-xs lg:text-sm xl:text-base",
                montserrat.variable
            )}
            lang="en">
            <GoogleAnalytics gaId="G-LYXMFBE9PQ" />
            <body className="flex flex-col justify-between min-h-screen">
                <Script id="metrika-counter" strategy="afterInteractive">
                    {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(97304593, "init", {
                            defer: true,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true,
                            ecommerce:"dataLayer"
                    });`}
                </Script>
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/97304593"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>
                <Suspense fallback={<></>}>
                    <YandexMetrika />
                </Suspense>
                <GoogleOAuthProvider clientId="9475571545-s9o5kb38f48n05uafaopfc49i460f676.apps.googleusercontent.com">
                    <AuthStoreProvider initial={{ isLoggedIn: !!user }}>
                        <UserStoreProvider initial={{ user }}>
                            <OrderStoreProvider initial={{ order }}>
                                <WithdrawStoreProvider initial={{ wallet }}>
                                    <CurrencyStoreProvider
                                        initial={{ currency }}>
                                        <div className="w-full h-full flex-1 pb-10">
                                            <PublicHeader />
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

                    {!cookieConsent && <CookieConsentBanner />}
                    <MediaIndicator />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
};

export default RootLayout;
