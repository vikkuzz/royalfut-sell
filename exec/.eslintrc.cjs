module.exports = {
    extends: ["../.eslintrc.json"],
    ignorePatterns: ["!**/*"],
    parserOptions: {
        project: [
            "./tsconfig.json",
            "./tsconfig.lib.json",
            "./tsconfig.spec.json",
        ],
        tsconfigRootDir: __dirname,
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            rules: {},
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
