let fs = require("fs");

(async function(){
    let fillWillBeOpened = await fs.promises.readFile("../html/f1.html")
    console.log(fillWillBeOpened);
})()


