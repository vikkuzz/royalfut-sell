"use client";

import Script from "next/script";
import { isBrowser } from "@royalfut/utils";

export const GoogleTagManager = () => {
    const hasGTm = isBrowser() && window.location.hostname === "royalfut.com";

    return hasGTm ? (
        <>
            <Script defer strategy="afterInteractive" id="google-tag-manager">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54RZGM9Z')`}
            </Script>
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-54RZGM9Z"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
                }}
            />
        </>
    ) : null;
};

export const Brevo = () => {
    return (
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
    );
};
