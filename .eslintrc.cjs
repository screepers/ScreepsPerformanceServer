module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "plugins": ["prettier"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
        "no-console": "off",
        "import/extensions": "off",
        "no-underscore-dangle": "off",
        "no-param-reassign": ["error", { "props": false }],
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto"
            },
        ],
        "indent": ["error", 2]
    }
}
