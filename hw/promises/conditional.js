let fs = require("fs");

let filef1 = fs.promises.readFile("../html/f1.html");

filef1.then(function (data) {
    console.log("f1");
    if(data.byteLength>20){
        let filef2 = fs.promises.readFile("../html/f2.html"); 
        filef2.then(function(){
            console.log("f2");
            if(filef2.byteLength>40){
                let filef6 = fs.promises.readFile("../html/f6.html"); 
                filef6.then(function(){
                    console.log("f6");
                })
            }else{
                let filef7 = fs.promises.readFile("../html/f7.html");
                filef7.then(function () {
                    console.log("f7");
                })
            }
        })
    }else{
        let filef3 = fs.promises.readFile("../html/f3.html");
        filef3.then(function () {
            console.log("f3");
            if (filef2.byteLength < 30) {
                let filef4 = fs.promises.readFile("../html/f4.html");
                filef4.then(function () {
                    console.log("f4");
                })
            } else {
                let filef5 = fs.promises.readFile("../html/f5.html");
                filef5.then(function () {
                    console.log("f5");
                })
            }
        })
    }
 })