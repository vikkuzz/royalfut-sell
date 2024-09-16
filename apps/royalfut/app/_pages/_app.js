import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { t } from "@lingui/macro";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";

import Head from "next/head";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import "../styles/global.css";
import { ErrorBoundary } from "react-error-boundary";
import { useLinguiInit } from "../utils/useLinguiInit";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, ...rest }) {
    const ISSERVER = typeof window === "undefined";
    const { store, props } = wrapper.useWrappedStore(rest);
    const { session: _session, pageProps } = props;
    useLinguiInit(pageProps.translation);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon2.ico" />
                <title>{t`seo:root:title`}</title>
                <meta name="description" content={t`"seo:root:description"`} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            {!ISSERVER &&
            (window.location.href.includes("test") ||
                window.location.href.includes("localhost")) ? (
                console.log(window.location.href)
            ) : (
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54RZGM9Z')`}
                </Script>
            )}
            {!ISSERVER && (
                <Script id="chat-mngr" strategy="afterInteractive">
                    {`(function(d, w, c) {
        w.BrevoConversationsID = '657db845d9424d239656d97f';
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations')`}
                </Script>
            )}
            <GoogleOAuthProvider clientId="362649615628-1jnb9dkcp6pd3fh0a81qpfqird23bi08.apps.googleusercontent.com">
                <I18nProvider i18n={i18n}>
                    <Provider store={store}>
                        <ErrorBoundary
                            fallback={
                                "Technical error. Please contact support"
                            }>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </Provider>
                </I18nProvider>
            </GoogleOAuthProvider>
        </>
    );
}

export default MyApp;
