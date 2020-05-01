let fs = require("fs");
let path = require("path");
module.exports.view = function () {
    // console.log(arguments);
    let src = arguments[0];
    let mode = arguments[1];
    // console.log(mode);

    if (mode == "-t") {
        viewAsTree(src, "");
    } else if (mode == "-f") {
        viewAsFlatFile(src,path.basename(src));
    } else {

        console.log("Wrong mode");
    }
}

function viewAsTree(src, indent) {
    let isFile = fs.lstatSync(src).isFile();
    // console.log(isFile);
    if (isFile) {
        console.log(indent + path.basename(src) + "*");
        return;
    } else {

        console.log(indent + path.basename(src));
    }

    let childrens = fs.readdirSync(src);
    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
        let childPath = path.join(src, childrens[i]);
        viewAsTree(childPath, indent + "\t");
    }


}

function viewAsFlatFile(src,print) {


    let isFile = fs.lstatSync(src).isFile();
    // console.log(isFile);
    if (isFile) {
        console.log(print+ "*");
        return;
    } else {

        console.log(print);
    }

    let childrens = fs.readdirSync(src);
    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
        let childPath = path.join(src, childrens[i]);
        viewAsFlatFile(childPath,path.join(print,childrens[i]));
    }

}