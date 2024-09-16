// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compress: process.env.STATE === "deploy" ? false : true,
    // async headers() {
    //     if (process.env.STATE === 'deploy') {
    //         return [
    //           {
    //             source: '/:path*',
    //             headers: [
    //               {
    //                 key: 'Content-Encoding',
    //                 value: 'br',
    //               },
    //             ],
    //           },
    //         ];
    //     }
    //     return [];
    // },
    webpack(config, { isServer }) {
        if (!isServer && process.env.STATE === "deploy") {
            config.optimization.splitChunks.cacheGroups.vendors = {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: "vendors",
                chunks: "all",
                enforce: true,
            };

            config.optimization.removeEmptyChunks = true;
        }

        return config;
    },
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
    },
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
};

// const withPWA = require("next-pwa")({
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//     register: true,
//     skipWaiting: true,
// });

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
module.exports = composePlugins(...plugins)(withNextIntl(nextConfig));
