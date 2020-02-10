const path = require("path");

module.exports = {
    entry: {
        main: "./src/iva-app.js"
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "string-replace-loader",
                options: {
                    search: "/web_modules/lit-element.js",
                    replace: "lit-element"
                }
            }
        ]

    }
};
