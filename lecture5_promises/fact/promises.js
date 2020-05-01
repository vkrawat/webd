const fs=require("fs");

function promisify(path){
    let creatorPromise=new Promise(function(success,failure){
        fs.readFile(path,function(err,data){
            if(err){
                console.log("inside reject");
                failure(err);
            }
            else
            console.log("inside resolve")
           success(data);
        })
    })

    return creatorPromise;
}


let readFile = promisify("f1.html");

// let readFile=fs.promises.readFile("f1.html");

readFile.then(function(){
    console.log("inside then");
})

readFile.catch(function () {
    console.log("catch");
})

