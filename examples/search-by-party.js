const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const readlinesync = require('readline-sync');

async function getParty() {
    var client = new LexMachinaClient('config-auth.json');

    var searchString = readlinesync.question('Enter the name or portion of the name of the party to search for\n');
    console.log('Searching on ' + searchString);
    var partyList = await client.searchParties(searchString, {pageThrough: true});
    if (partyList.length == 0) {
        console.log('The search returned no parties\n');
        process.exit();
    }
    for (var i = 0; i < partyList.length; i++) {
        var party = partyList[i];
        console.log((i + 1) + ') ' + party.name);
    }
    var partyIndex = readlinesync.question('Enter the number of the party to use\n');
    return partyList[partyIndex - 1].partyId;

}

async function run() {
    var client = new LexMachinaClient('config-auth.json');
    var query = new CasesQueryRequest();
  
    var party_id = await getParty();
    query.addPartiesInclude(party_id);
    // Do the actual query
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    for (var i = 0; i < cases.length; i++) {
        var districtcase = cases[i];
        console.log('Working on case #' + (i + 1));
        var thiscase = await client.districtCases(districtcase);
        console.log(thiscase.title);
    }

}

run();