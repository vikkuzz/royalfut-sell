import "../../styles/global.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "../../navigation";
import ClientLayout from "./ClientLayout";
import { Montserrat } from "next/font/google";
import { GoogleTagManager } from "../components/Analitics/Analitics";
import { Brevo } from "../components/Third-party/Brevo";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic", "vietnamese"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    icons: {
        icon: "/favicon2.ico",
    },
};

export default function RootLayout({ children, params }) {
    if (!locales.includes(params.locale)) {
        notFound();
    }

    const messages = useMessages();

    return (
        <html lang={params.locale}>
            <head>
                <GoogleTagManager />
            </head>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
                <body className={montserrat.className}>
                    <ClientLayout locale={params.locale}>
                        {children}
                    </ClientLayout>
                    <Brevo />
                </body>
            </NextIntlClientProvider>
        </html>
    );
}