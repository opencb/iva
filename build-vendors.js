#!/usr/bin/env node

const fs = require("fs");
let shelljs = require('shelljs');
let DOMParser = require("xmldom").DOMParser;

const VENDOR_FOLDER = "build/vendors/";

// Copy Polymer dependency
shelljs.cp("-rL", "node_modules/@polymer", VENDOR_FOLDER);

// Copy vendor dependencies
fs.readFile("build/index.html", "utf8", function (err2, content) {
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(content, "text/html");

    let links = htmlDoc.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        let href = links[i].getAttribute("href");
        let arr = href.split("node_modules/");
        if (arr.length === 2) {
            let path = arr[1].substring(0, arr[1].lastIndexOf("/"));
            shelljs.mkdir("-p", VENDOR_FOLDER + path);
            shelljs.cp("-R", "node_modules/" + arr[1], VENDOR_FOLDER + path);
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

    content = replaceContentIndex(content);
    fs.writeFile('build/index.html', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

});

fs.readFile("build/iva-app.html", "utf8", function (err2, content) {
    content = replaceContentIva(content);
    fs.writeFile('build/iva-app.html', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

});


function replaceContentIva(content){
    let nodeModulesRegex = /\.\.\/node_modules/g;
    let nodeModulesReplacement = "vendors";
    let libJsorollaRegex = /\.\.\/lib\/jsorolla\/src/g;
    let libJsorollaReplacement = "jsorolla/dist/js";

    content = replaceContent(nodeModulesRegex, nodeModulesReplacement, content);
    content = replaceContent(libJsorollaRegex, libJsorollaReplacement, content);

    return content
}

function replaceContentIndex(content){
    let nodeModulesRegex = /\.\.\/\.\.\/node_modules/g;
    let nodeModulesReplacement = "vendors";
    let libJsorollaRegex = /\.\.\/\.\.\/lib\/jsorolla/g;
    let libJsorollaReplacement = "jsorolla";
    let confRegex = /\.\.\/conf/g;
    let confReplacement = "conf";
    let ivaRegex = /\.\.\/iva-app/g;
    let ivaReplacement = "iva-app";
    let utilsRegex = /\.\.\/utils/g;
    let utilsReplacement = "utils";


    content = replaceContent(nodeModulesRegex, nodeModulesReplacement, content);
    content = replaceContent(libJsorollaRegex, libJsorollaReplacement, content);
    content = replaceContent(confRegex, confReplacement, content);
    content = replaceContent(ivaRegex, ivaReplacement, content);
    content = replaceContent(utilsRegex, utilsReplacement, content);

    return content
}

function replaceContent(regex, replacement, content){

    //let htmlDoc = parser.parseFromString(content, "text/html");
    return content.replace(regex, replacement);
}



