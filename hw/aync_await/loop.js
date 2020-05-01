let fs = require("fs");
let files = ["../html/f1.html", "../html/f2.html"];

(async function readFile(i){
    if (i == files.length) return;

    let fileOpened = await fs.promises.readFile(files[i])
    console.log(fileOpened);
    readFile(i + 1);
})(0)

//parallel=====================================================>

// (async function readFile(i) {
//     if (i == files.length) return;

// readFile(i + 1);

//     let fileOpened = await fs.promises.readFile(files[i])
//     console.log(fileOpened);
//     

// })(0)