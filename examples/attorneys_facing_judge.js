const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const readlinesync = require('readline-sync');
const law_firm_id = 0; //YOUR FIRM ID HERE

async function getJudge() {
    var client = new LexMachinaClient('config-auth.json');

    var searchString = readlinesync.question('Enter the name or portion of the name of the judge to search for\n');
    console.log('searching on ' + searchString);
    var judgeJSON = await client.searchJudges(searchString);
    var judgeList = judgeJSON.federalJudges;
    if (judgeList.length == 0) {
        console.log('The search returned no judges\n');
        process.exit();
    }
    for (var i = 0; i < judgeList.length; i++) {
        var judge = judgeList[i];
        console.log((i + 1) + ') ' + judge.name);
    }
    var judgeIndex = readlinesync.question('Enter the number of the judge to use\n');
    return judgeList[judgeIndex - 1].federalJudgeId;

}

async function run() {
    var client = new LexMachinaClient('config-auth.json');
    var query = new CasesQueryRequest();
  
    var judge_id = await getJudge();
    // Looking these up solely for the output below
    var judge = await client.federalJudges(judge_id);
    var law_firm = await client.lawFirm(law_firm_id);

    console.log('Looking up attorneys from ' + law_firm.name + ' that have faced ' + judge.name + '\n\n');
    // Add criteria
    query.addJudgesInclude(judge_id);
    query.addLawFirmsInclude(law_firm_id);
    // Do the actual query
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    var attorneys = [];
    for (var i = 0; i < cases.length; i++) {
        var districtcase = cases[i];
        console.log('Working on case #' + (i + 1));
        var thiscase = await client.districtCases(districtcase);
        thiscase.attorneys.forEach(attorney => {
            if (attorney.lawFirmIds.includes(law_firm_id)) {
                if (!attorneys.includes(attorney.name)) {
                    attorneys.push(attorney.name);
                }
                console.log(attorney.name + '  ID #' + attorney.attorneyId);
            }
        });
    }

    console.log('\n\n' + attorneys.length + ' attorneys have faced ' + judge.name);
    console.log('\nFinal List \n\n');
    attorneys.sort().forEach(attorney => { console.log(attorney); });
    console.log('\n\n');
}

run();