const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const PluginProposalExportDefaultFrom = require("@babel/plugin-proposal-export-default-from"); //Allows export .. from syntax in the entry point

const JSOROLLA_PATH = "./lib/jsorolla/";

module.exports = {
    // entry: "./src/iva-app.js",
    entry: {
        main: "./src/index.js",
        jsorolla: "./lib/jsorolla/src/index.js"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [

        new CleanWebpackPlugin(),
        new StringReplacePlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true,
                // removeComments: true
            }
        }),
        // ignore is not the best way to externalize a resource, but webpack don't support external ES modules yet.
        // ignore makes sense because iva-app bundle will be an ES module on its own, so import X from "/jsorolla.min.js" won't be a problem if not processed by webpack
        //  why do whe need to bundle iva-app in webpack at all then? Because we need to process litElement imports
        new webpack.IgnorePlugin({
            //resourceRegExp: /import [\s\S]+? from "\.\/\.\.\/lib\/jsorolla\/dist\/main\.js";/
            resourceRegExp: /import [\s\S]+? from "main\.js";/
            //resourceRegExp: /^\.\/locale$/,
            //contextRegExp: /moment$/
        })
    ],
    optimization: {
        minimize: false
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
                        presets: ["@babel/preset-env"],
                        plugins: [
                            "@babel/plugin-proposal-export-default-from",
                            "@babel/transform-runtime",
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
                        },
                        /*{
                            search: "// @dev\\[([\\s\\S]*?)\\][\\s\\S]*?// /@dev",
                            replace: (match, p1, offset, string) => `import ${p1} from "main.js";`,
                            //replace: (match, p1, offset, string) => `${p1}`,
                            flags: "gim",
                            strict: true
                        }*/
                    ]

                }
            },
            /*{
                test: /index.html$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /<!-- @dev\[([\s\S]*?)] -->[\s\S]*?<!-- \/@dev -->/igm,
                            replacement: function(match, p1, offset, string) {
                                return `<script type="module" src="${JSOROLLA_PATH + p1}"></script>`;
                            }
                        }
                    ]})
            }*/
        ]

    }
};
