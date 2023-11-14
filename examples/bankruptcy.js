const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const moment = require('moment');
const readlinesync = require('readline-sync');


async function run() {
    var client = new LexMachinaClient('config-auth.json');
    var query = new CasesQueryRequest();

    var startDate = '2017-01-01';
    var endDate = '2021-12-31';
    query.setDate(startDate,'filed', 'onOrAfter')
        .setDate(endDate, 'filed', 'onOrBefore')
        .addCaseTypesInclude('Bankruptcy');
    console.log('Querying on Bankruptcy cases between %s and %s', startDate, endDate);
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    console.log('\nFound %i cases\n', cases.length);

 
}

run();