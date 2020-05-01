let fs = require("fs");
console.log("before");
fs.readFile("f1.html", function (err, data) {
    console.log(data + "");
})

console.log("after");

