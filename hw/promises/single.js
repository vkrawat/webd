let fs=require("fs");

let fillWillBeOpened=fs.promises.readFile("../html/f1.html")
console.log(fillWillBeOpened);

fillWillBeOpened.then(function(){
    console.log("inside then")
},
function(){
    console.log("inside catch")
})


