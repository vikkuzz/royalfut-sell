import { Montserrat, Oswald, Bebas_Neue } from "next/font/google";

export const montserrat = Montserrat({
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
    variable: "--font-body",
    subsets: ["latin"],
});

export const oswald = Oswald({
    weight: "700",
    display: "swap",
    variable: "--font-oswald",
    subsets: ["latin"],
});

export const bebas = Bebas_Neue({
    weight: "400",
    display: "swap",
    subsets: ["latin"],
    variable: "--font-bebas",
});
