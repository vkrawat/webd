let fs = require("fs");
let files = ["../html/f1.html", "../html/f2.html"];


function readFile(i) {
    if (i == files.length) return;

    let fileOpened=fs.promises.readFile(files[i])
    fileOpened.then(function(){
        console.log("inside " + (i + 1) + " then ");
        readFile(i+1);
    },function(){
            console.log("inside "+(i+1)+" catch");
            readFile(i + 1);
    })
}

//parallel==========================================================>

// function readFile(i) {
//     if (i == files.length) return;

//     let fileOpened = fs.promises.readFile(files[i])
//     fileOpened.then(function () {
//         console.log("inside " + (i + 1) + " then ");
//     }, function () {
//         console.log("inside " + (i + 1) + " catch");

//     })

//     readFile(i + 1);
// }

readFile(0);

