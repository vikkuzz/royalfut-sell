module.exports = {
    "extends": ["../../.eslintrc.json"],
    "ignorePatterns": ["!**/*", "**/*.json"],
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
};
