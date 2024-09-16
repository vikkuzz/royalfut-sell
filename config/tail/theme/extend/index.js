const colors = require("./colors");
const screens = require('./screens');

module.exports = {
    colors,
    screens,
    maxWidth: {
        viewport: "var(--size-screen-viewport-max-w)",
        loginSheet: "var(--size-login-sheet)",
    },
    spacing: {
        4.5: "1.125rem", // 18px
        15: "3.75rem", // 60px
        17: "4.5rem", // 72px
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
    boxShadow: {
        stereo: "0 8px 80px rgba(137,81,242,.4)",
    },
    width: {
        dropdownCurrency: "var(--size-ccy-dropdown-width)",
        dropdownI18n: "var(--size-i18n-dropdown-width)",
        loginSheet: "var(--size-login-sheet)",
    },
    zIndex: {
        header: "var(--z-index-header)",
    },
    backgroundImage: {
        "linear-primary-stereo": "linear-gradient(265.73deg,rgba(168,45,249,.2), rgba(102,120,233,.2))",
        "linear-primary-simple-pan": "linear-gradient(265.73deg, #A82DF9 0%, #6678E9 100%)",
        "linear-primary-pan": "linear-gradient(266deg, #FB9EE1 2.7%, #A82DF9 37.71%, #6678E9 62.72%, #FB9EE1 90.62%)",
        "gradient-text":
            "linear-gradient(265.72deg, #FB9EE1 2.7%, #A82DF9 37.71%, #6678E9 62.72%, #FB9EE1 90.62%)",
        "header-linear":
            "linear-gradient(180deg,rgba(8,12,31,.8),rgba(8,12,31,.79) 6.7%,rgba(8,12,31,.77) 13.3%,rgba(8,12,31,.73) 20%,rgba(8,12,31,.68) 26.7%,rgba(8,12,31,.62) 33.3%,rgba(8,12,31,.54) 40%,rgba(8,12,31,.45) 46.7%,rgba(8,12,31,.35) 53.3%,rgba(8,12,31,.27) 60%,rgba(8,12,31,.19) 66.7%,rgba(8,12,31,.12) 73.3%,rgba(8,12,31,.07) 80%,rgba(8,12,31,.03) 86.7%,rgba(8,12,31,.007) 93.3%,rgba(8,12,31,0))",
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
};