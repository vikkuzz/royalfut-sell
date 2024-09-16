const { fontFamily } = require("tailwindcss/defaultTheme");
const extend = require("./extend");

const themeConfig = {
    extend,
    fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
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

module.exports = themeConfig;
