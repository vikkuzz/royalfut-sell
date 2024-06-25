/* eslint-disable max-lines */
const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    content: [
        join(
            __dirname,
            "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
        ),
        join(__dirname, "../../libs/styles/css/**/*.css"),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        fontFamily: {
            body: ["var(--font-body)", ...fontFamily.sans],
        },
        extend: {
            screens: {
                xs: "375px",
                "2xl": "1440px",
                "3xl": "1920px",
                "4xl": "2560px",
            },
            maxWidth: {
                viewport: "var(--size-screen-viewport-max-w)",
                loginSheet: "var(--size-login-sheet)",
            },
            spacing: {
                4.5: "1.125rem", // 18px
            },
            fontSize: {
                "2.5xl": ["1.75rem", { lineHeight: "2.15rem" }],
                "xs-normal": ["0.75rem", { lineHeight: "1.5rem" }],
            },
            minWidth: {
                viewport: "var(--size-screen-viewport-min-w)",
            },
            height: {
                layoutHeader: "var(--size-layout-header)",
            },
            width: {
                dropdownCurrency: "var(--size-ccy-dropdown-width)",
                loginSheet: "var(--size-login-sheet)",
            },
            zIndex: {
                header: "var(--z-index-header)",
            },
            backgroundImage: {
                "gradient-text":
                    "linear-gradient(265.72deg, #FB9EE1 2.7%, #A82DF9 37.71%, #6678E9 62.72%, #FB9EE1 90.62%)",
                "header-linear":
                    "linear-gradient(180deg,rgba(8,12,31,.8),rgba(8,12,31,.79) 6.7%,rgba(8,12,31,.77) 13.3%,rgba(8,12,31,.73) 20%,rgba(8,12,31,.68) 26.7%,rgba(8,12,31,.62) 33.3%,rgba(8,12,31,.54) 40%,rgba(8,12,31,.45) 46.7%,rgba(8,12,31,.35) 53.3%,rgba(8,12,31,.27) 60%,rgba(8,12,31,.19) 66.7%,rgba(8,12,31,.12) 73.3%,rgba(8,12,31,.07) 80%,rgba(8,12,31,.03) 86.7%,rgba(8,12,31,.007) 93.3%,rgba(8,12,31,0))",
            },
            colors: {
                primary: "hsl(var(--color-primary))",
                secondary: "hsl(var(--color-secondary))",

                white: {
                    DEFAULT: "hsl(var(--color-white))",
                    10: "hsl(var(--color-white-10))",
                    20: "hsl(var(--color-white-20))",
                    40: "hsl(var(--color-white-40))",
                    60: "hsl(var(--color-white-60))",
                },

                black: {
                    DEFAULT: "hsl(var(--color-black-text))",
                    text: "hsl(var(--color-black-text))",
                    background: "hsl(var(--color-black-background))",
                    1: "hsl(var(--color-black-1))",
                    2: "hsl(var(--color-black-2))",
                    shape: "hsl(var(--color-black-shape))",
                    dropdown: "hsl(var(--color-black-dropdown))",
                },

                extra: {
                    bonus: "hsl(var(--color-extra-bonus))",
                    trustpilot: "hsl(var(--color-extra-trustpilot))",
                    benefit1: "hsl(var(--color-extra-benefit-1))",
                    benefit2: "hsl(var(--color-extra-benefit-2))",
                    benefit3: "hsl(var(--color-extra-benefit-3))",
                    benefit4: "hsl(var(--color-extra-benefit-4))",
                },

                labels: {
                    sale: "hsl(var(--color-labels-sale))",
                    new: "hsl(var(--color-labels-new))",
                    hot: "hsl(var(--color-labels-hot))",
                },

                system: {
                    success: "hsl(var(--color-system-success))",
                    error: "hsl(var(--color-system-error))",
                    info: "hsl(var(--color-system-info))",
                },

                referral: {
                    income: "hsl(var(--color-referral-income))",
                },

                typography: {
                    text: "hsl(var(--color-typography-body))",
                    title: "hsl(var(--color-typography-title))",
                },

                layout: {
                    DEFAULT: "hsl(var(--color-black-background))",
                },
            },
            keyframes: {
                slideUpAndFade: {
                    "0%": { opacity: "0", transform: "translateY(2px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideRightAndFade: {
                    "0%": { opacity: "0", transform: "translateX(-2px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideDownAndFade: {
                    "0%": { opacity: "0", transform: "translateY(-2px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideLeftAndFade: {
                    "0%": { opacity: "0", transform: "translateX(2px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideDown: {
                    from: { height: "0px" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                slideUp: {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0px" },
                },
                "shake-r-sm": {
                    "0%": { transform: "translateX(0rem)" },
                    "25%": { transform: "translateX(-0.1rem)" },
                    "50%": { transform: "translateX(0.5rem)" },
                    "100%": { transform: "translateX(0rem)" },
                },
                backgroundPan: {
                    from: { "background-position": "0% center" },
                    to: { "background-position": "-200% center" },
                },
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" },
                },
            },
            animation: {
                slideUpAndFade:
                    "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
                slideDownAndFade:
                    "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
                slideRightAndFade:
                    "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
                slideLeftAndFade:
                    "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
                slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                backgroundPan: "backgroundPan 3s linear infinite",
                "shake-r-sm": "shake-r-sm .5s both",
                "caret-blink": "caret-blink 1.25s ease-out infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwindcss-animated"),
        function ({ matchComponents }) {
            matchComponents(
                {
                    "bordered-box-linear": value => ({
                        background: value,
                    }),
                },
                {
                    values: {
                        "accent-1":
                            "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(to right, #6678E9 40%, #A82DF9 100%) border-box",
                        "accent-2":
                            "linear-gradient(265.73deg, #a82df9, #6678e9)",
                        "white-20":
                            "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(to right, rgba(255,255,255,5%) 50%, rgba(255,255,255,5%) 100%) border-box",
                        avatar: "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(215.43deg, #F7BC4A -37.68%, #BBB39E 105.34%) border-box",
                        error: "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(to right, #E84545 50%, #E84545 100%) border-box",
                        success:
                            "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(to right, #15BC26 50%, #15BC26 100%) border-box",
                        "card-fly-payment":
                            "linear-gradient(var(--bordered-box-linear-bg-1, #2b2d3c), var(--bordered-box-linear-bg-1, #2b2d3c)) padding-box, linear-gradient(to bottom, rgb(69,68,90) 40%, transparent 100%) border-box",
                    },
                }
            );
        },
    ],
};
