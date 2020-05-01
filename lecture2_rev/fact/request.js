let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio")
let leaderboard=[];
let count=0;
request("https://www.espncricinfo.com/scores/series/19322", function (err, res, html) {
    // console.log(html);
    if (err === null && res.statusCode === 200) {
        // fs.writeFileSync("index.html", html)
        parseHTML3(html);
        
    } else if (res.statusCode === 404) {
        console.log("Invalid URL")
    } else {
        console.log(err)
    }

});

function parseHTML1(html) {
    let $ = cheerio.load(html);
    let ans = $('.item-wrapper .description')
    let first = $(ans[0]).text()
    console.log(first);
}

function parseHTML2(html) {
    let $ = cheerio.load(html);
    let max = 0;
    let bowlerName = "";
    let bowlers = $(".scorecard-section.bowling table tbody tr")
    for (let i = 0; i < bowlers.length; i++) {
        let name = $($(bowlers[i]).find("td")[0]).text();
        let wicket = $($(bowlers[i]).find("td")[5]).text();
        if (wicket >= max) {
            max = wicket;
            bowlerName = name;
        }


    }

    console.log(bowlerName + " " + max);
}


function parseHTML3(html) {
    let $ = cheerio.load(html);

    let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes")
    // console.log(cards.length);

    for (let i = 0; i < cards.length; i++) {
        let matchType = $(cards[i]).find(".cscore_info-overview").text();
        let test = matchType.includes("T20") || matchType.includes("ODI")

        if (test) {
            console.log(matchType);
      
            let link = $(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
            let anchor = `https://www.espncricinfo.com${link}`
            goToMatchPage(anchor);
            
            // console.log(`https://www.espncricinfo.com${link}`);
        }
    }

    console.log("=====================================================");

}

function goToMatchPage(link) {
    count++;
    request(link, function (err, res, html) {
        if (err === null && res.statusCode === 200) {
            // console.log(count);
            // fs.writeFileSync(`match${count}.html`, html);
            handleMatch(html);
            count--;
            if (count == 0)
                console.table(leaderboard)
        } else if (res.statusCode === 404) {
            console.log("Invalid URL")
        } else {
            console.log(err)
        }
    })
}

function handleMatch(html) {
    let $ = cheerio.load(html);

    let format = $(".cscore_info-overview").html();
    format=format.includes("ODI")?"ODI":"T20";
    let team = $(".sub-module.scorecard h2")
    let innings = $(".sub-module.scorecard")
    for (let i = 0; i < team.length; i++) {
        // console.log($(team[i]).text())
        // console.log("-------------------")
        let batManRows = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen")

        for(let j=0;j<batManRows.length;j++){
            let batsmenInfo = $(batManRows[j]);
            let batsmenName=batsmenInfo.find(".cell.batsmen").text();
            let batsmenRun = batsmenInfo.find(".cell.runs").html();
            handlePlayer(format,$(team[i]).text(),batsmenName,batsmenRun)
            // console.log(batsmenName+" "+batsmenRun);
        }
        // console.log();
    }
    // console.log("=================================");
    // console.log(format)

}

function handlePlayer(format, team, batsmenName, batsmenRun){
     batsmenRun=Number(batsmenRun);

     for(let i=0;i<leaderboard.length;i++){
         let obj=leaderboard[i];
         if(obj.name==batsmenName && obj.team==team && obj.format==format){
             obj.runs+=batsmenRun;
             return;
         }
     }

     let obj={
         runs:batsmenRun,
         format:format,
         team:team,
         name:batsmenName
     }

     leaderboard.push(obj);

}