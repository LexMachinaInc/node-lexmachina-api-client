const { LexMachinaClient, DistrictCasesQueryRequest } = require('@lexmachina/lexmachina-client');
const moment = require('moment');
const readlinesync = require('readline-sync');

async function getJudge() {
    var client = new LexMachinaClient('config/config.json');

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

    var judgeIndex;
    do {
        judgeIndex = readlinesync.question('Enter the number of the judge to use\n');
    } while (!judgeList[judgeIndex - 1]);
    return judgeList[judgeIndex - 1].federalJudgeId;

}

async function run() {
    var client = new LexMachinaClient('config/config.json');
    var query = new DistrictCasesQueryRequest();
    var judge_id = await getJudge();
    var judge = await client.federalJudges(judge_id);

    // Add criteria
    query.addJudgesInclude(judge_id);
    query.setCaseStatus('Terminated');
    query.addEventTypesInclude('Summary Judgment');
    // Do the actual query
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    var resultsMap = {};
    for (var i = 0; i < cases.length; i++) {
        var districtcase = cases[i];
        var thiscase = await client.districtCases(districtcase);
        if (!thiscase) {
            continue;
        }
        console.log('Working on case #%i [%i]', (i + 1), thiscase.districtCaseId || 'no id');
        var events = thiscase.events;
        var resolution = thiscase.resolution;
        if (resolution == null) {
            console.log('No resolution, skipping');
            continue;
        }
        var sjEvents = events.filter(event => event.type == 'Summary Judgment');
        var sjDate = sjEvents[0].occurred;
        var dayOfWeek = moment(sjDate).format('dddd');
        console.log('Summary judgment on %s which is %s  %s:%s', sjDate, dayOfWeek, resolution.summary, resolution.specific);
        var resolutionString = resolution.summary + ':' + resolution.specific;
        if (!resultsMap[resolutionString]) {
            resultsMap[resolutionString] = { 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0, 'Sunday': 0 };
        }
        resultsMap[resolutionString][dayOfWeek]++;
    }

    console.log('\n\nSummary for %s', judge.name);
    var keys = Object.keys(resultsMap);
    keys.forEach(key => {
        console.log('For %s', key);
        var daysStats = resultsMap[key];
        var dayOfWeek = Object.keys(daysStats);

        var days = dayOfWeek.filter(day => daysStats[day] > 0);
        var dayOfWeekSorted = days.sort((a,b) => {return daysStats[b] - daysStats[a]});
        for (var k = 0; k < dayOfWeekSorted.length; k++) {
            var thisDay = dayOfWeekSorted[k];
            console.log('%s: %i', thisDay, daysStats[thisDay]);
        }
    });
}

run();