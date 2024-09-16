module.exports = {
    extends: [
        "plugin:@nx/react",
        "../../.eslintrc.json",
        "@amollo-lint/eslint-config-tsx-prettier",
    ],
    ignorePatterns: ["!**/*", "**/*.json"],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    "overrides": [
        {
            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            rules: {
                "max-lines": ["error", 200],
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
    ],
};
