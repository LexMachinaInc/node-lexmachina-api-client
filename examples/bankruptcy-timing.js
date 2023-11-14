const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const moment = require('moment');
const readlinesync = require('readline-sync');

function median(arr) {
    if (arr.length == 0) {
        return;
    }
    arr.sort((a, b) => a - b);
    const midpoint = Math.floor(arr.length / 2);
    const median = arr.length % 2 === 1 ?
        arr[midpoint] : 
        (arr[midpoint - 1] + arr[midpoint]) / 2; 
}

async function run() {
    var client = new LexMachinaClient('config-auth.json');
    var query = new CasesQueryRequest();
    var daysArray = [];

    var startDate = '2021-01-01';
    var endDate = '2021-12-31';
    query.setDate(startDate,'filed', 'onOrAfter')
        .setDate(endDate, 'filed', 'onOrBefore')
        .addCaseTypesInclude('Bankruptcy');
    console.log('Querying on Bankruptcy cases between %s and %s', startDate, endDate);
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    console.log('\nFound %i cases\n', cases.length);
    for (var index = 0; index < cases.length; index++) {
        var thiscaseID = cases[index];
        var thiscase = await client.districtCases(thiscaseID);
        console.log('Working on %s',thiscase.title) ;
        var filedDate = moment(thiscase.dates.filed);
        var terminatedDate = moment(thiscase.dates.terminated);
        var daysToResolution = terminatedDate.diff(filedDate, 'days');
        console.log('%s %s %i', filedDate, terminatedDate, daysToResolution);
        if (daysToResolution >0) {
            daysArray.push(daysToResolution);
        }
    }
    var medianDays = median(daysArray);
    var dayCount = daysArray.length;

    var dayTotal = daysArray.reduce((partialSum, a) => partialSum + a, 0);
    var averageDays = dayTotal/dayCount;
    console.log(JSON.stringify(daysArray));
    console.log('Days: %i %i %f', dayTotal, dayCount, averageDays);
    console.log('Found %i cases', cases.length);
    console.log('Median days to termination: %i', medianDays);
    console.log('Average days to termination: %i' ,averageDays);
}

run();