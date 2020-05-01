const input = process.argv[2];
let { help } = require("./commands/help");
let { view } = require("./commands/view");
let { treefy } = require("./commands/treefy");
let { untreefy } = require("./commands/untreefy");

if (input == "view") {

    view(process.argv[3], process.argv[4]);

} else if (input == "treefy") {

    treefy(process.argv[3], process.argv[4]);

} else if (input == "untreefy") {

    untreefy(process.argv[3], process.argv[4]);

} else if (input == "help") {

    help();

} else {

    console.log("Wrong input");

}
