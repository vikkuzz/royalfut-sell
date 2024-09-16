"use client";

import Script from "next/script";
// import { GoogleAnalytics as ThirdPartiesGoogleAnalytics } from "@next/third-parties/google";
import { useRouteChangeListener } from "@royalfut/hooks";
import { isBrowser } from "@royalfut/utils";

import type { FC } from "react";

interface IInjectedHostnames {
    allowedHostnames: Array<string>;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Window {
        ym: (id: number, method: string, url: string) => void;
    }
}

export interface IGAParams {
    gaId: string;
    dataLayerName?: string;
}

export const GoogleAnalytics: FC<IInjectedHostnames & IGAParams> = ({
    allowedHostnames,
    gaId,
    dataLayerName = "dataLayer",
}) => {
    const hasGA =
        isBrowser() && allowedHostnames.includes(window.location.hostname);

    return hasGA ? (
        <>
            <Script
                defer
                strategy="afterInteractive"
                id="_next-ga-init"
                dangerouslySetInnerHTML={{
                    __html: `
                    window['${dataLayerName}'] = window['${dataLayerName}'] || [];
                    function gtag(){window['${dataLayerName}'].push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gaId}');`,
                }}
            />
            <Script
                id="_next-ga"
                defer
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
        </>
    ) : null;
};

export default function YandexMetrikaListener() {
    useRouteChangeListener(url => window.ym(97304593, "hit", url));
    return null;
}

export const YandexMetrika: FC<IInjectedHostnames> = ({ allowedHostnames }) => {
    const hasYM =
        isBrowser() && allowedHostnames.includes(window.location.hostname);

    return hasYM ? (
        <>
            <Script id="metrika-counter" defer strategy="afterInteractive">
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
            <YandexMetrikaListener />
        </>
    ) : null;
};
