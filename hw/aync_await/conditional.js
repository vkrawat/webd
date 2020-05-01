let fs = require("fs");

(async function () {
    let filef1 = await fs.promises.readFile("../html/f1.html")
    console.log("f1")
    if (filef1.byteLength > 20) {
        let filef2 = await fs.promises.readFile("../html/f2.html")
        console.log("f2");
        if (filef2.byteLength > 40) {
            let filef2 = await fs.promises.readFile("../html/f6.html")
            console.log("f6");
        } else {
            let filef2 = await fs.promises.readFile("../html/f7.html")
            console.log("f7");
        }
    } else {
        let filef2 = await fs.promises.readFile("../html/f3.html")
        console.log("f3");
        if (filef2.byteLength < 30) {
            let filef2 = await fs.promises.readFile("../html/f4.html")
            console.log("f4");
        } else {
            let filef2 = await fs.promises.readFile("../html/f5.html")
            console.log("f5");
        }
    }
})()
