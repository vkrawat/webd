let fs = require("fs");
console.log("before");
fs.readFile("f1.html", function (err, data) {
    console.log(data + "");
})
// let finalTime = Date.now() + 1000 * 10;

fs.readFile("f2.html", function (err, data) {
    console.log(data + "");
})
console.log("after");

