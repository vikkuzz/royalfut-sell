"use client";

import Script from "next/script";
import { isBrowser } from "../../../utils/is";

export const GoogleTagManager = () => {
    const hasGTm = isBrowser() && window.location.hostname === "royalfut.com";

    return hasGTm ? (
        <>
            <Script id="google-tag-manager" strategy="afterInteractive">
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
