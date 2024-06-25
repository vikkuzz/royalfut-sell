module.exports = {
    "extends": ["plugin:@nx/react", "../../.eslintrc.json"],
    "ignorePatterns": ["!**/*"],
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "rules": {
                "prettier/prettier": 0,
                "max-params": "off"
            },
    "overrides": [
        {
            "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
            "rules": {},
        },
        {
            "files": ["*.ts", "*.tsx"],
            "rules": {},
        },
        {
            "files": ["*.js", "*.jsx"],
            "rules": {
                "prettier/prettier": 0,
                "max-params": "off"
            },
        },
    ],
};
