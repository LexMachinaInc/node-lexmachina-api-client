const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD';
var client = new LexMachinaClient('config-auth.json');

function pushUnique(array, item) {
    if (!array.some((arrayItem) => JSON.stringify(item) == JSON.stringify(arrayItem))) {
        //    if (!array.includes(item)) {
        array.push(item);
        return true;
    }
    return false;
}

async function processCase(thisCase, client) {
    var caseJSON = await client.districtCases(thisCase);
    if (!caseJSON) {
        console.log('No data returned for case %i', thisCase);
        return false;
    }
    console.log('Loaded %s', caseJSON.title);
    console.log('\tFiled on %s - terminated on %s', caseJSON.dates.filed, caseJSON.dates.terminated);
    // This is the place to put any code you want
    // to run on every individual case

    return;
}

async function run() {
    var cases = [];
    var start_date_for_slice = moment().subtract(5, 'years');
    var end_date_for_slice = moment(start_date_for_slice).add(1, 'months');
    //Continue this loop until the window starts after today
    while (start_date_for_slice < moment.now()) {
        var query = new CasesQueryRequest();
        query.setDate(start_date_for_slice.format(DATE_FORMAT), 'terminated', 'onOrAfter');
        query.setDate(end_date_for_slice.format(DATE_FORMAT), 'terminated', 'onOrBefore');
        query.setCaseStatus('Terminated');
        console.log('Querying between %s and %s', start_date_for_slice, end_date_for_slice);
        try {
            cases = await client.queryDistrictCases(query, { pageThrough: true });
           
        } catch (error) {
            console.log('Caught error: %s', error.message);
        }
        console.log('Found %i cases', cases.length);

        for (var i = 0; i < cases.length; i++) {
            var thisCase = cases[i];
            console.log('Processing case %i', thisCase);
            try {
                await processCase(thisCase, client);                 
            } catch (error) {
                console.log('Caught error: %s', error.message);
            }
        }
        //Advance the query window. Set the beginning to one day
        // after the previous end, end 1 month after that
        start_date_for_slice = moment(end_date_for_slice).add(1, 'day');
        end_date_for_slice = moment(start_date_for_slice).add(1, 'months');
        
    }

    return;
}

run();