module.exports = {
    "extends": ["../../.eslintrc.json"],
    "ignorePatterns": ["!**/*", "**/*.json"],
    "parserOptions": {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    "overrides": [
        {
            "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
            "rules": {
                "max-lines": "off",
            },
        },
        {
            "files": ["*.ts", "*.tsx"],
            "rules": {},
        },
        {
            "files": ["*.js", "*.jsx"],
            "rules": {},
        },
        {
            "files": ["*.json"],
            "parser": "jsonc-eslint-parser",
            "rules": {
                "@nx/dependency-checks": "error",
            },
        },
    ],
};
