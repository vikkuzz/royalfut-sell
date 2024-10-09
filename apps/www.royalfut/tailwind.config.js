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
            typography: tail.theme.typography,
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
                "linear-primary-dark":
                    "linear-gradient(180deg,#353054,#12142a 82.05%),linear-gradient(180deg,#353054,rgba(53,48,84,0) 161.55%)",
            },
            borderRadius: {
                "3.5xl": "1.75rem", // 28px
            },
            colors: {
                ...tail.theme.extend.colors,
            },
            backgroundColor: {
                "white-05": "rgba(255, 255, 255, 0.05)",
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
