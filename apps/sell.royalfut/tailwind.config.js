const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const tail = require("../../config/tail");

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
            ...tail.theme.fontFamily,
        },
        extend: {
            screens: {
                ...tail.theme.extend.screens,
            },
            maxWidth: {
                ...tail.theme.extend.maxWidth,
            },
            spacing: {
                ...tail.theme.extend.spacing,
            },
            fontSize: {
                ...tail.theme.extend.fontSize,
            },
            minWidth: {
                ...tail.theme.extend.minWidth,
            },
            height: {
                ...tail.theme.extend.height,
            },
            width: {
                ...tail.theme.extend.width,
            },
            zIndex: {
                ...tail.theme.extend.zIndex,
            },
            backgroundImage: {
                ...tail.theme.extend.backgroundImage,
            },
            colors: {
                ...tail.theme.extend.colors,
            },
            boxShadow: {
                ...tail.theme.extend.boxShadow,
            },
            keyframes: {
                ...tail.theme.extend.keyframes,
            },
            animation: {
                ...tail.theme.extend.animation,
            },
        },
    },
    plugins: [...tail.theme.plugins],
};
