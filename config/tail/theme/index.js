const { fontFamily } = require("tailwindcss/defaultTheme");
const extend = require("./extend");

const themeConfig = {
    extend,
    fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
    },
    typography: ({ theme }) => ({
        DEFAULT: {
            css: {
                maxWidth: "none",
                "--tw-prose-headings": theme("colors.white.DEFAULT"),
                "--tw-prose-counters": theme("colors.white[50]"),
                "--tw-prose-bullets": theme("colors.white[40]"),
                "--tw-prose-links": theme("colors.white.DEFAULT"),
                "--tw-prose-links-hover": theme("colors.white.60"),
                "--tw-prose-links-underline": theme("colors.white.60"),

                p: {
                    marginTop: theme("spacing.4"),
                    marginBottom: theme("spacing.4"),
                },
                '[class~="lead"]': {
                    fontSize: theme("fontSize.base")[0],
                    ...theme("fontSize.base")[1],
                },

                // Lists
                ol: {
                    listStyleType: "decimal",
                    marginTop: theme("spacing.5"),
                    marginBottom: theme("spacing.5"),
                    paddingLeft: "1.625rem",
                },
                'ol[type="A"]': {
                    listStyleType: "upper-alpha",
                },
                'ol[type="a"]': {
                    listStyleType: "lower-alpha !important",
                },
                'ol[type="A" s]': {
                    listStyleType: "upper-alpha",
                },
                'ol[type="a" s]': {
                    listStyleType: "lower-alpha !important",
                },
                'ol[type="I"]': {
                    listStyleType: "upper-roman",
                },
                'ol[type="i"]': {
                    listStyleType: "lower-roman",
                },
                'ol[type="I" s]': {
                    listStyleType: "upper-roman",
                },
                'ol[type="i" s]': {
                    listStyleType: "lower-roman",
                },
                'ol[type="1"]': {
                    listStyleType: "decimal !important",
                },

                "ol.incremental": {
                    counterReset: "section",
                    listStyleType: "none",
                },
                "ol.incremental li": {
                    position: "relative",
                },
                "ol.incremental:not(.standart) > li::before": {
                    counterIncrement: "section",
                    content: `counters(section, ".") ". "`,
                    position: "absolute",
                    left: "-1.5em",
                    color: "var(--tw-prose-counters)",
                },
                "ol.incremental li ol": {
                    counterReset: "subsection",
                    listStyleType: "none",
                },
                "ol.incremental li ol li": {
                    position: "relative",
                },
                "ol.standart": {
                    counterReset: "item",
                },
                "ol.incremental li ol:not(.standart) > li::before": {
                    counterIncrement: "subsection",
                    content: `counter(section) "." counter(subsection) ". "`,
                    position: "absolute",
                    left: "-1.8em",
                    color: "var(--tw-prose-counters)",
                },
                "ol.incremental li > ul": {
                    listStyleType: "disc",
                    counterReset: "item",
                },
                "ul.checkmark": {
                    listStyleType: "none",
                    counterReset: "item",
                },
                "ul.checkmark > li": {
                    position: "relative",
                },
                "ul.checkmark > li::before": {
                    content: "'✓'",
                    position: "absolute",
                    left: "-1.5em",
                    color: "var(--tw-prose-counters)",
                    fontWeight: "700",
                },
                ul: {
                    listStyleType: "disc",
                    marginTop: theme("spacing.5"),
                    marginBottom: theme("spacing.5"),
                    paddingLeft: "1.625rem",
                },
                li: {
                    marginTop: theme("spacing.2"),
                    marginBottom: theme("spacing.2"),
                },
                ":is(ol, ul) > li": {
                    paddingLeft: theme("spacing[1.5]"),
                },
                "ol > li::marker": {
                    fontWeight: "400",
                    color: "var(--tw-prose-counters)",
                },
                "ul > li::marker": {
                    color: "var(--tw-prose-bullets)",
                },
                "ul > li p": {
                    marginTop: theme("spacing.1"),
                    marginBottom: theme("spacing.1"),
                },
                "> ul > li p": {
                    marginTop: theme("spacing.1"),
                    marginBottom: theme("spacing.1"),
                },
                "> ul > li > *:first-child": {
                    marginTop: theme("spacing.5"),
                },
                "> ul > li > *:last-child": {
                    marginBottom: theme("spacing.5"),
                },
                "> ol > li > *:first-child": {
                    marginTop: theme("spacing.5"),
                },
                "> ol > li > *:last-child": {
                    marginBottom: theme("spacing.5"),
                },
                "ul ul, ul ol, ol ul, ol ol": {
                    marginTop: theme("spacing.3"),
                    marginBottom: theme("spacing.3"),
                },

                // Headings
                h2: {
                    color: "var(--tw-prose-headings)",
                    fontWeight: "600",
                    fontSize: theme("fontSize.xl")[0],
                    ...theme("fontSize.xl")[1],
                    marginTop: theme("spacing.4"),
                    marginBottom: theme("spacing.2"),
                },
                h3: {
                    color: "var(--tw-prose-headings)",
                    fontSize: theme("fontSize.lg")[0],
                    ...theme("fontSize.lg")[1],
                    fontWeight: "600",
                    marginTop: theme("spacing.3"),
                    marginBottom: theme("spacing.2"),
                },

                a: {
                    color: "var(--tw-prose-links)",
                    textDecoration: "underline transparent",
                    fontWeight: "500",
                    transitionProperty: "color, text-decoration-color",
                    transitionDuration: theme("transitionDuration.DEFAULT"),
                    transitionTimingFunction: theme(
                        "transitionTimingFunction.DEFAULT",
                    ),
                    "&:hover": {
                        color: "var(--tw-prose-links-hover)",
                        textDecorationColor: "var(--tw-prose-links-underline)",
                    },
                },

                // Overrides
                ":is(h1, h2, h3) + *": {
                    marginTop: "0",
                },
                "> :first-child": {
                    marginTop: "0 !important",
                },
                "> :last-child": {
                    marginBottom: "0 !important",
                },
            },
        },
    }),
    plugins: [
        require("tailwindcss-animate"),
        require("tailwindcss-animated"),
        require("@tailwindcss/typography"),
        function ({ matchComponents }) {
            matchComponents(
                {
                    "bordered-box-linear": (value) => ({
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
                },
            );
        },
    ],
};

module.exports = themeConfig;
