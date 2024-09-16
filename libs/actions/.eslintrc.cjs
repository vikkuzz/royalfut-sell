module.exports = {
    extends: ["plugin:@nx/react", "../../.eslintrc.json"],
    ignorePatterns: ["!**/*"],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        extends: ["plugin:@nx/react", "../../.eslintrc.json"],
        ignorePatterns: ["!**/*"],
        parserOptions: {
            project: "./tsconfig.json",
            tsconfigRootDir: __dirname,
        },
        overrides: [
            {
                files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
                rules: {},
                files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
                rules: {},
            },
            {
                files: ["*.ts", "*.tsx"],
                rules: {},
                files: ["*.ts", "*.tsx"],
                rules: {},
            },
            {
                files: ["*.js", "*.jsx"],
                rules: {},
            },
        ],
    }
}