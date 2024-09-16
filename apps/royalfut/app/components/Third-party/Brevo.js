"use client";

import Script from "next/script";

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
