let fs = require("fs");
let files = ["f1.html", "f2.html"];


function readFile(i) {
    if (i == files.length) return;

    fs.readFile(files[i], function (err, data) {
        console.log(i + 1 + data + "");
        
    })
    readFile(i + 1);
}

readFile(0);

