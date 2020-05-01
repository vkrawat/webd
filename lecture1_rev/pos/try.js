let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");

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

function viewAsFlatFile(src) {


    let isFile = fs.lstatSync(src).isFile();
    // console.log(isFile);
    if (isFile) {
        console.log(src + "*");
        return;
    } else {

        console.log(src);
    }

    let childrens = fs.readdirSync(src);
    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
        let childPath = path.join(src, childrens[i]);
        viewAsFlatFile(childPath);
    }

}

// viewAsFlatFile(process.argv[2]);
// viewAsTree(process.argv[2], "");

function untreefy(src, dest) {
    let isFile = fs.lstatSync(src).isFile();

    let newFileName = uniqid();
    if (isFile) {

        let node = {};
        node.isFile = true
        node.oldName = path.basename(src)
        node.newName = newFileName



        let destPath = path.join(dest, newFileName);
        fs.copyFileSync(src, destPath);

        return node;

    } else {
        let node = {};
        node.isFile = false
        node.oldName = path.basename(src)
        node.children = []


        // console.log(path.basename(src));
        // let arr=[];


        let childrens = fs.readdirSync(src);

        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            let nodeChild = {};
            nodeChild = untreefy(childPath, dest);
            node.children.push(nodeChild);
        }

        return node;
    }
}

// let root = {};
// root=untreefy(process.argv[2], process.argv[3]);
// console.log(root);
// fs.writeFileSync(path.join(process.argv[3],"metadata.json"),JSON.stringify(root));


function treefy(src, dest, node) {
    if (node.isFile == true) {
        let srcPath = path.join(src, node.newName);
        let destPath = path.join(dest, node.oldName);
        fs.copyFileSync(srcPath,destPath);
    }
    else{
        let dirPath=path.join(dest,node.name);
        fs.mkdirSync(dirPath);

        let children=node.children
        for(let i=0;i<children.length;i++){
            let child=children[i];
            let childPath=dirPath;
            treefy(src,childPath,child);
        }
    }
}

let root = require(path.join(process.argv[2],"metadata.json"));
// console.log(root);
treefy(process.argv[2], process.argv[3], root);