const { composePlugins, withNx } = require("@nx/next");
const withImages = require("next-images");
const withNextIntl = require("next-intl/plugin")();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = withNextIntl(
    withImages({
        nx: {
            // Set this to true if you would like to use SVGR
            // See: https://github.com/gregberge/svgr
            svgr: false,
        },
        images: {
            disableStaticImages: true,
            deviceSizes: [375, 480, 640, 750, 828, 1080, 1200, 1920],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            minimumCacheTTL: 300,
        },
        env: {
            HOST: process.env.HOST || "0.0.0.0", // указываем адрес сервера
        },
    })
);

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
