let fs = require("fs");
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cfile = process.argv[2];
let uToAdd = "";


(async function () {
    try {
        let question = require("./files/questions.js")
        await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 })
        let dataJson = await fs.promises.readFile(cfile);
        let { url, pwd, user } = JSON.parse(dataJson);
        await driver.get(url);

        await Login(pwd, user);

        let loginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"))
        await loginBtn.click();

        let dropdown = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
        await dropdown.click();

        let admin = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
        await admin.click();

        await waitForloader();

        let manageTab = await driver.findElements(swd.By.css(".administration header ul li"))
        await manageTab[1].click();

        let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
        await createChallenge.click();


        let ManageChallengePage = await driver.getCurrentUrl();

        for (let i = 0; i < question.length; i++) {
            console.log(i);
            await driver.get(ManageChallengePage)
            await waitForloader();
            await createNewChallenge(question[i]);
            await waitForloader();
            await addModerator();
            await waitForloader();
            await testCase(question[i]["Testcases"])
        }

        // await createNewChallenge(question[4]);
        // await waitForloader();
        // await addModerator();
        // await waitForloader();
        // await testCase(question[4]["Testcases"]);
       

    }
    catch (err) {
        console.log(err);
    }

})()

async function testCase(question){
    let testCaseTab = await driver.findElement(swd.By.css(".tabs-cta-wrapper ul li[data-tab=testcases]"));
    await testCaseTab.click();

    await waitForloader();

    let confirmBtn = await driver.findElement(swd.By.css("#confirmBtn"));
    await confirmBtn.click();


    await waitForloader();
    for (let j = 0; j < question.length; j++) {
       
        await addTestCase(question[j]);
        await driver.executeScript("location.reload()")


    }
}

async function addTestCase(questions) {

    let testCaseBtn = await driver.findElement(swd.By.css(".btn.add-testcase.btn-green"));
    await testCaseBtn.click();

    const eSelector = [".formgroup.horizontal.input-testcase-row.row .CodeMirror textarea", ".formgroup.horizontal.output-testcase-row.row .CodeMirror textarea"];

    let eWillBeSelected = eSelector.map(function (s) {
        return driver.findElement(swd.By.css(s));
    })

    let allElements = await Promise.all(eWillBeSelected);

    await editHandler(".formgroup.horizontal.input-testcase-row.row .CodeMirror div", allElements[0], questions["Input"]);
    await editHandler(".formgroup.horizontal.output-testcase-row.row .CodeMirror div", allElements[1], questions["Output"]);

    let submitBtn = await driver.findElement(swd.By.css(".btn.btn-primary.btn-large.save-testcase"));
    await submitBtn.click();
}

async function addModerator() {

    let moderatorTab = await driver.findElement(swd.By.css(".tabs-cta-wrapper ul li[data-tab=moderators]"));
    await moderatorTab.click();

    let moderatorInput = await driver.findElement(swd.By.css("#moderator"));
    await moderatorInput.sendKeys("ankushgoyalxyz");

    let moderatorBtn = await driver.findElement(swd.By.css(".btn.moderator-save"));
    await moderatorBtn.click();

}

async function createNewChallenge(question) {
    const eSelector = ["#name", "textarea.description", "#problem_statement-container .CodeMirror textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];

    let eWillBeSelected = eSelector.map(function (s) {
        return driver.findElement(swd.By.css(s));
    })

    let allElements = await Promise.all(eWillBeSelected);

    let nameWillBeAdded = allElements[0].sendKeys(question["Challenge Name"]);
    let desWillBeAdded = allElements[1].sendKeys(question["Description"]);

    await Promise.all([nameWillBeAdded, desWillBeAdded]);

    let data = "try"
    await editHandler("#problem_statement-container .CodeMirror div", allElements[2], question["Problem Statement"]);
    await editHandler("#input_format-container .CodeMirror div", allElements[3], question["Input Format"]);
    await editHandler("#constraints-container .CodeMirror div", allElements[4], question["Constraints"]);
    await editHandler("#output_format-container .CodeMirror div", allElements[5], question["Output Format"]);



    let tagInput = allElements[6];
    await tagInput.sendKeys(question["Tags"]);
    await tagInput.sendKeys(swd.Key.ENTER);

    let submitBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"));
    await submitBtn.click();


}

async function editHandler(parentSelector, allElements, data) {
    let parent = await driver.findElement(swd.By.css(parentSelector))
    await driver.executeScript("arguments[0].style.height='10px'", parent)
    await allElements.sendKeys(data);
}

async function waitForloader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"))
    await driver.wait(swd.until.elementIsNotVisible(loader));
}

async function Login(pwd, user) {
    let userInput = driver.findElement(swd.By.css("#input-1"))
    let passwordInput = driver.findElement(swd.By.css("#input-2"))
    let usrNpwd = await Promise.all([userInput, passwordInput]);

    let userSent = usrNpwd[0].sendKeys(user);
    let passwordSent = usrNpwd[1].sendKeys(pwd);
    await Promise.all([userSent, passwordSent]);
}
