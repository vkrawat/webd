let fs = require("fs");
console.log("before");
let file = fs.promises.readFile("f1.html");

file.then(function (content) {
    console.log(content + "")
})

file.catch(function (err) {
    console.log(err + "")
})

console.log("after");