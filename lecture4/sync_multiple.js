let fs = require("fs");
console.log("before");
let data = fs.readFileSync("f1.html")
console.log(data + "");
let data1 = fs.readFileSync("f2.html")
console.log(data1 + "");

console.log("after");
