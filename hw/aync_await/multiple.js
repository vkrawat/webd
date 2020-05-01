let fs = require("fs");

(async function () {
    let fileWillBeOpened = await fs.promises.readFile("../html/f1.html")
    console.log(fileWillBeOpened);
    let scndfileWillBeOpened = await fs.promises.readFile("../html/f2.html")
    console.log(scndfileWillBeOpened);
})()


//parallel==================================================================>

    // (async function () {
    //     let fileWillBeOpened = fs.promises.readFile("../html/f1.html")
    //     console.log(fileWillBeOpened);
    //     let scndfileWillBeOpened = fs.promises.readFile("../html/f2.html")
    //     console.log(scndfileWillBeOpened);
    //     let all=await Promise.all([fileWillBeOpened,scndfileWillBeOpened]);
    //     console.log(all)
    // })()



