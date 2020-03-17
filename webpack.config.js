const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
// const StringReplacePlugin = require("string-replace-webpack-plugin"); webpack 2
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const PluginProposalExportDefaultFrom = require("@babel/plugin-proposal-export-default-from"); // Allows `export .. from` syntax in the entry point
const MergeIntoSingleFilePlugin = require("webpack-merge-and-include-globally");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const uglifyJS = require("uglify-js");

const DIST_PATH = path.resolve(__dirname, "dist/webpack/");
const tpl = path => ({
    img: `<img alt="${path}" src="${path}" />`,
    css: `<link rel="stylesheet" type="text/css" href="${path}">`,
    js: `<script type="text/javascript" src="${path}"></script>`,
    void: ""
});

// TODO add CSS loader and group all fonts in one directory rewriting urls

module.exports = {
    mode: "production",
    entry: {
        "iva-app": "./src/iva-app.js"
    },
    output: {
        filename: "[name][hash].js",
        path: DIST_PATH
    },
    plugins: [
        // --------------copy html
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                //removeComments: true
            }
        }),
        new HtmlReplaceWebpackPlugin([
            {
                // mimic the behaviour of Grunt processhtml (for the assets defined in MergeIntoSingleFilePlugin())
                pattern: /<!-- build:([\s\S]*?)\[([\s\S]*?)] -->[\s\S]*?<!-- \/build -->/m,
                replacement: function(match, type, path) {
                    return tpl(path)[type];
                }
            }
        ]
        ),
        new MergeIntoSingleFilePlugin({
            files: {
                "assets/css/styles.css": [
                    "lib/jsorolla/styles/css/style.css",
                    "src/styles/toggle-switch.css",
                    "src/styles/global.css"
                ],
                "assets/css/vendor.css": [
                    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "./node_modules/animate.css/animate.min.css",
                    "./node_modules/bootstrap-table/dist/bootstrap-table.min.css",
                    "./node_modules/bootstrap-select/dist/css/bootstrap-select.min.css",
                    "./node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css",
                    "./node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css",
                    "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
                    "./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
                    "./node_modules/qtip2/dist/jquery.qtip.min.css",
                    "./node_modules/jquery.json-viewer/json-viewer/jquery.json-viewer.css"
                ],
                "assets/js/vendor.js": [
                    "./node_modules/jquery/dist/jquery.js",
                    "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
                    "./node_modules/underscore/underscore-min.js",
                    "./node_modules/backbone/backbone-min.js",
                    "./node_modules/highcharts/highcharts.js",
                    "./node_modules/qtip2/dist/jquery.qtip.min.js",
                    "./node_modules/urijs/src/URI.min.js",
                    "./node_modules/cookies-js/dist/cookies.min.js",
                    "./node_modules/crypto-js/core.js",
                    "./node_modules/crypto-js/sha256.js",
                    "./node_modules/jquery.json-viewer/json-viewer/jquery.json-viewer.js",
                    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
                    "./node_modules/bootstrap-table/dist/bootstrap-table.min.js",
                    "./node_modules/bootstrap-select/dist/js/bootstrap-select.js",
                    "./node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.js",
                    "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js",
                    "./node_modules/bootstrap-validator/dist/validator.min.js",
                    "./node_modules/moment/min/moment.min.js",
                    "./node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
                    "./node_modules/bootstrap-notify/bootstrap-notify.js",
                    "./node_modules/jwt-decode/build/jwt-decode.min.js",
                    "./node_modules/bootstrap-3-typeahead/bootstrap3-typeahead.min.js"
                ]
            }
        }),
        new CopyWebpackPlugin([
            {
                context: "./src/conf",
                from: "**/*.js",
                to: DIST_PATH + "/conf"
            },
            {
                context: "./src/img",
                from: "**/*",
                to: DIST_PATH + "/img"
            },
            {
                context: "./lib/jsorolla/styles/fonts",
                from: "**/*",
                to: DIST_PATH + "/assets/fonts"
            },
            {
                context: "./node_modules/bootstrap/dist/fonts",
                from: "**/*",
                to: DIST_PATH + "/assets/fonts"
            },
            {
                context: "node_modules/@webcomponents/webcomponentsjs",
                from: "**/*.js",
                to: DIST_PATH + "/webcomponents"
            },
            {
                context: "node_modules/@fortawesome/fontawesome-free/webfonts",
                from: "fa-solid-900.*",
                to: DIST_PATH + "/assets/webfonts"

            }
    ])
        // ignore is not the best way to externalize a resource, but webpack don't support external ES modules yet.
        // ignore makes sense because iva-app bundle will be an ES module on its own, so import X from "/jsorolla.min.js" won't be a problem if not processed by webpack
        // why do whe need to bundle iva-app in webpack at all then? Because we need to process litElement imports
        /* new webpack.IgnorePlugin({
            //resourceRegExp: /import [\s\S]+? from "\.\/\.\.\/lib\/jsorolla\/dist\/main\.js";/
            //resourceRegExp: /import [\s\S]+? from "main\.js";/
            //resourceRegExp: /^\.\/locale$/,
            //contextRegExp: /moment$/
        })*/
    ],
    optimization: {
        minimize: true
    },
    externals: [
        {

        }
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"] // rewrite html content (replace automatically <img src="img.jpg"/> in require("img.jpg"))
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [[
                            "@babel/preset-env",
                            {
                                // useBuiltIns: "usage",
                                targets: ">1%, not dead, not ie 11"
                                // corejs: 3
                            }
                        ]],
                        plugins: [
                            "@babel/plugin-proposal-export-default-from",
                            // "@babel/transform-runtime",
                            ["@babel/plugin-proposal-class-properties", {"loose": true}]
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "string-replace-loader",
                options: {
                    multiple: [
                        {
                            search: "/web_modules/lit-element.js",
                            replace: "lit-element"
                        },
                        {
                            search: "/node_modules/countup.js/dist/countUp.min.js",
                            replace: "countup.js"
                        }
                        /* js string replacement
                        {
                            search: "// @dev\\[([\\s\\S]*?)\\][\\s\\S]*?// /@dev",
                            replace: (match, p1, offset, string) => `import ${p1} from "main.js";`,
                            //replace: (match, p1, offset, string) => `${p1}`,
                            flags: "gim",
                            strict: true
                        }*/
                    ]

                }
            }
        ]

    }
};