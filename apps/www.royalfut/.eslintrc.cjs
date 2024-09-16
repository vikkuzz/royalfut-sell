module.exports = {
    extends: [
        "plugin:@nx/react-typescript",
        "next",
        "next/core-web-vitals",
        "../../.eslintrc.json",
        "@amollo-lint/eslint-config-tsx-prettier",
    ],
    ignorePatterns: ["!**/*", ".next/**/*", "public/**/*"],
    globals: {
        NodeJS: true,
    },
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            rules: {
                "max-lines": ["error", 200],
                "@next/next/no-html-link-for-pages": [
                    "error",
                    "apps/www.royalfut/pages",
                ],
            },
        },
        {
            files: ["*.ts", "*.tsx"],
            rules: {},
        },
        {
            files: ["*.js", "*.jsx"],
            rules: {},
        },
        {
            files: ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],
            env: {
                jest: true,
            },
        },
    ],
};
