const LexMachinaClient = require('./src/lexmachina_client')
const StateCasesQueryRequest = require('./src/state_cases_query_request.js')
const readlinesync = require('readline-sync')
const { exit } = require('process')
const moment = require('moment');

async function getState() {
    var searchString = readlinesync.question("Enter the state to search\n")
    return searchString;  
  }

async function run() {
    var client = new LexMachinaClient('config/config.json');
    var query = new StateCasesQueryRequest();
    var state = await getState();
    var page = 1;
    var pageSize = 500;

    query.setState(state);
    query.setPageSize(pageSize);

    while (true) { 
    query.setPage(page);
    var cases = await client.queryStateCases(query);
    for (var i=0; i<cases.length; i++) {
        var stateCaseId = cases[i];
        var stateCase = await client.stateCases(stateCaseId);
        if (!(stateCase.judges.length && stateCase.lawFirms.length && stateCase.attorneys.length && stateCase.parties.length)){
           // continue;
        }
 
         if (!(stateCase.damages.active.length )){
            continue;
         }


        var thirdPartyExists = false;
        stateCase.parties.map(a=>{thirdPartyExists = ((a.role=="Third Party") || thirdPartyExists)} )
        if (! thirdPartyExists) {
            //continue;
        }
        console.log("Case %i", stateCaseId);

        if (stateCase.judges.length) { 
        console.log("Judges: %s\n", JSON.stringify(stateCase.judges));
    }   
    if (stateCase.lawFirms.length) { 
        console.log("Law Firms: %s\n", JSON.stringify(stateCase.lawFirms));
    }
    if (stateCase.attorneys.length) { 
        console.log("Attorneys: %s\n", JSON.stringify(stateCase.attorneys));
    }
    if (stateCase.parties.length) { 
        console.log("Parties: %s\n", JSON.stringify(stateCase.parties));
    }
    if (stateCase.damages.active.length ) { 
        console.log("Parties: %s\n", JSON.stringify(stateCase.damages.active));
    }


}

    }

 
}

run();