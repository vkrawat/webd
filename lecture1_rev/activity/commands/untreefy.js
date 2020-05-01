let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");

module.exports.untreefy=function(){
let root={};
let src=arguments[0];
let dest=arguments[1];
Untreefy(src,dest,root);
    fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root));
}


function Untreefy(src, dest, node) {
    let isFile = fs.lstatSync(src).isFile();

    let newFileName = uniqid();
    if (isFile) {


        node.isFile = true
        node.oldName = path.basename(src)
        node.newName = newFileName



        let destPath = path.join(dest, newFileName);
        fs.copyFileSync(src, destPath);

    } else {
        node.isFile = false
        node.oldName = path.basename(src)
        node.children = []


        // console.log(path.basename(src));
        // let arr=[];


        let childrens = fs.readdirSync(src);

        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            let nodeChild = {};
            Untreefy(childPath, dest, nodeChild);
            node.children.push(nodeChild);
        }
    }
}