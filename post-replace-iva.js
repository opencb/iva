#!/usr/bin/env nodejs

const fs = require("fs");

fs.readFile("build/iva-app.html", "utf8", function (err2, content) {
    content = replaceContentIva(content);
    fs.writeFile('build/iva-app.html', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

});


function replaceContentIva(content){
    let importPathRegex = /\[\[importPath\]\]images/g;
    let importPathReplacement = "img";

    content = replaceContent(importPathRegex, importPathReplacement, content);

    return content
}

function replaceContent(regex, replacement, content){
    return content.replace(regex, replacement);
}



