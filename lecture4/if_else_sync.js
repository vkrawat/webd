let fs = require("fs");
let f1 = fs.readFileSync("f1.html");
console.log("f1");
if (f1.byteLength > 20) {
    let f2 = fs.readFileSync("f2.html");
    console.log("f2");

    if (f2.byteLength > 40) {
        let f6 = fs.readFileSync("f6.html");
        console.log("f6");
    } else {
        let f7 = fs.readFileSync("f7.html");
        console.log("f7");
    }

} else {

    let f3 = fs.readFileSync("f3.html");
    console.log("f3");

    if (f3.byteLength < 30) {

        let f4 = fs.readFileSync("f4.html");
        console.log("f4");
    } else {

        let f5 = fs.readFileSync("f5.html");
        console.log("f5");
    }
}
