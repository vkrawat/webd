let fs = require("fs");

fs.readFile("f1.html", function (err, data) {
    console.log("f1");
    if (data.byteLength > 20) {
        fs.readFile("f2.html", function (err, data) {
            console.log("f2")
            if (data.byteLength > 40) {
                fs.readFile("f6.html", function (err, data) {
                    console.log("f6");
                })

            } else {
                fs.readFile("f7.html", function (err, data) {
                    console.log("f7");
                })
            }
        })


    } else {

        fs.readFile("f3.html", function (err, data) {
            console.log("f2")
            if (data.byteLength < 30) {
                fs.readFile("f4.html", function (err, data) {
                    console.log("f4");
                })

            } else {
                fs.readFile("f5.html", function (err, data) {
                    console.log("f5");
                })
            }
        })
    }

});

