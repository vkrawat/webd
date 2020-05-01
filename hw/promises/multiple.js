let fs = require("fs");

let fileWillBeOpened = fs.promises.readFile("../html/f1.html")
console.log(fileWillBeOpened);

fileWillBeOpened.then(function () {
    console.log("inside 1st then")
    let second= fs.promises.readFile("../html/f2.html")
    console.log(second)
    return second;
},
    function () {
        console.log("inside 1st catch")
    }).then(function(second){
  
        console.log('inside 2nd then')
    },function(){
            console.log("inside 2nd catch")
    })

// parallel========================================================>

fileWillBeOpened.then(function () {
    console.log("inside 1st then")
},
    function () {
        console.log("inside 1st catch")
    })

let sndfileWillBeOpened = fs.promises.readFile("../html/f1.html")
console.log(sndfileWillBeOpened);

sndfileWillBeOpened.then(function () {
    console.log("inside 1st then")
},
    function () {
        console.log("inside 1st catch")
})


