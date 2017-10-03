#!/usr/bin/env nodejs

const fs = require("fs");
let shelljs = require('shelljs');
let DOMParser = require("xmldom").DOMParser;

const VENDOR_FOLDER = "build/vendors/";

// Copy Polymer dependency
shelljs.cp("-rL", "node_modules/@polymer", VENDOR_FOLDER);

// Copy vendor dependencies
fs.readFile("src/prod/index.html", "utf8", function (err2, content) {
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(content, "text/html");

    let links = htmlDoc.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        let href = links[i].getAttribute("href");
        let arr = href.split("node_modules/");
        if (arr.length === 2) {
            let path = arr[1].substring(0, arr[1].lastIndexOf("/"));
            shelljs.mkdir("-p", VENDOR_FOLDER + path);
            shelljs.cp("node_modules/" + arr[1], VENDOR_FOLDER + path);
        }
    }

    let scripts = htmlDoc.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        let src = scripts[i].getAttribute("src");
        let arr = src.split("node_modules/");
        if (arr.length === 2) {
            let path = arr[1].substring(0, arr[1].lastIndexOf("/"));
            shelljs.mkdir("-p", VENDOR_FOLDER + path);
            shelljs.cp("node_modules/" + arr[1], VENDOR_FOLDER + path);
        }
    }
});

