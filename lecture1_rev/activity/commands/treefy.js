let path = require("path");
let fs = require("fs");
module.exports.treefy = function () {
    let src = arguments[0];
    let dest = arguments[1];
    let root = require(path.join(src, "metadata.json"));

    console.log(root);

    treefyFolder(dest ,src, root);
};
function treefyFolder(src, dest, node) {
    if (node.isFile == true) {
        let oldFile = path.join(src, node.newName);
        let newFile = path.join(dest, node.oldName);
        fs.copyFileSync(oldFile, newFile);
        // create a file  in dest directory and rename them
    } else {
        let dirName = path.join(dest, node.name);
        fs.mkdirSync(dirName);
        for (let i = 0; i < node.children.length; i++) {
            treefyFolder(src, dirName, node.children[i]);
        }
    }
}