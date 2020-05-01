require("chromedriver");
let fs = require("fs");
let swd = require("selenium-webdriver");
let credentialFile = process.argv[2];
let metadataFile = process.argv[3];
let username = "";
let password = "";
let gModule;
console.log(metadataFile)
//browser build
let bldr = new swd.Builder();

//tab
let driver = bldr.forBrowser("chrome").build();



// let credential=fs.readFileSync("file.json");
let credential = fs.promises.readFile(credentialFile);
credential.then(function (credential) {
    credential = JSON.parse(credential)
    username = credential.username;
    password = credential.password;
    let PageWillOpenedPromise = driver.get("https://pepcoding.com/login");
    return PageWillOpenedPromise;
}).then(function () {
    // console.log("google page opened");

    let emailWillBeSelected = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelected = driver.findElement(swd.By.css("input[type=password]"));

    return Promise.all([emailWillBeSelected, passwordWillBeSelected]);

}).then(function (arr) {

    let emailElement = arr[0];
    let passwordElement = arr[1];
    let emailWillBeSend = emailElement.sendKeys(username);
    let passwordWillBeSend = passwordElement.sendKeys(password);

    return Promise.all([passwordWillBeSend, emailWillBeSend]);


}).then(function (ans) {

    // console.log(ans);
    let signIn = driver.findElement(swd.By.css("button[type=submit]"));

    return signIn

}).then(function (signIn) {

    let SignedIn = signIn.click();
    return SignedIn;

}).then(function () {

    let wait = driver.wait(swd.until.elementsLocated(swd.By.css(".resource a")), 10000);
    return wait;

}).then(function () {

    let resourceCardWillBeSelected = driver.findElement(swd.By.css(".resource a"));
    return resourceCardWillBeSelected;

}).then(function (resourceCard) {

    let resourceClick = resourceCard.getAttribute("href");
    return resourceClick;

}).then(function (link) {

    let resourcePage = driver.get(link);
    return resourcePage;

}).then(function () {

    let overlayWillBeSelected = driver.findElement(swd.By.css("#siteOverlay"));

    return overlayWillBeSelected;
}).then(function (soe) {
    let wait = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
    return wait;
}).then(function () {

    let coursePage = driver.findElement(swd.By.css("#courseCard33"))
    return coursePage

}).then(function (courseCard) {

    let courseCardClicked = courseCard.click();
    return courseCardClicked;
})
.then(function () {

    let wait = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
    return wait;
})
    .then(function () {
        let moduleSelected = driver.findElements(swd.By.css(".lis.tab"));
        return moduleSelected;

    }).then(function (module) {

        gModule = module;
        console.log(module.length);
        let arr = [];
        for (let i = 0; i < module.length; i++) {
            let modulePromise = module[i].getText();
            arr.push(modulePromise);
        }
        return Promise.all(arr);

    })
    .then(function (AllModuleText) {

        let i;
        for (i = 0; i < AllModuleText.length; i++) {
            if (AllModuleText[i].includes("Dynamic Programming") === true) {
                break;
            }
        }

        let moduleClicked = gModule[i].click();
        return moduleClicked;

    })
    .then(function () {

        let wait = driver.wait(swd.until.elementsLocated(swd.By.css(".collection-item")), 10000);
        return wait;
    })
    .then(function () {
        let lectureSelected = driver.findElements(swd.By.css(".collection-item"));
        return lectureSelected;

    }).then(function (lecture) {

        gModule = lecture;
        console.log(lecture[0]);
        let arr = [];
        for (let i = 0; i < lecture.length; i++) {
            let lecturePromise = lecture[i].getText();
            arr.push(lecturePromise);
        }
        return Promise.all(arr);

    })
    .then(function (AllModuleText) {

        let i;
        for (i = 0; i < AllModuleText.length; i++) {
            if (AllModuleText[i].includes("Dynamic Programming and Greedy") === true) {
                break;
            }
        }

        let moduleClicked = gModule[i].click();
        return moduleClicked;

    }).then(function () {

        let wait = driver.wait(swd.until.elementsLocated(swd.By.css(".collection-item")), 10000);
        return wait;
    })
    .then(function () {
        let lectureSelected = driver.findElements(swd.By.css(".collection-item"));
        return lectureSelected;

    }).then(function (lecture) {

        gModule = lecture;
        // console.log(lecture[0]);
        let arr = [];
        for (let i = 0; i < lecture.length; i++) {
            let lecturePromise = lecture[i].getText();
            arr.push(lecturePromise);
        }
        return Promise.all(arr);

    })
    .then(function (AllModuleText) {

        let i;
        for (i = 0; i < AllModuleText.length; i++) {
            if (AllModuleText[i].includes("Fibonacci-dp") === true) {
                break;
            }
        }

        let moduleClicked = gModule[i].click();
        return moduleClicked;

    })
    .then(function () {

        console.log("reached");

    })
    .catch(function (err) {

        console.log(err);
    })


// .then(function(){
//     let metadata=fs.promises.readFile(metadataFile);
//     return metadata;
// }).then(function(metadata){
//     metadata=JSON.parse(metadata)
//     let queUrl=metadata[0];
//     console.log(queUrl)
//     let willOpenQuesPage=driver.get(queUrl.url);
//     return willOpenQuesPage;
// }).then(function(){
//     console.log(reached);
// })


