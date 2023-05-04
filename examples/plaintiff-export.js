const { LexMachinaClient, CasesQueryRequest } = require('@lexmachina/lexmachina-client');
const moment = require('moment');
const readlinesync = require('readline-sync');



function elementsInCommon(array1, array2) {
    var set1 = new Set(array1);
    var set2 = new Set(array2);
    var intersection = [...set1].filter(item => set2.has(item));
    return intersection.length !=0;
}

function isPlaintiff(element) {
    if (element.role == 'Plaintiff') {
        return element.partyId;
    }
}

function indexLawFirms(thiscase) {
    var index = {};
    thiscase.lawFirms.forEach(lawFirm =>{
        index[lawFirm.lawFirmId] = lawFirm;
    });
    return index;
}

function indexAttorneys(thiscase) {
    var index = {};
    thiscase.attorneys.forEach(attorney => {
        index[attorney.attorneyId] = attorney;
    });
    return index;
}

function getRepresentation(thiscase, plaintiff) {
    var firms = thiscase.lawFirms.filter(firm=>firm.clientPartyIds.includes(plaintiff.partyId)).map((firm) => firm.lawFirmId);
    var attorneys = thiscase.attorneys.filter(attorney=>attorney.clientsPartyIds.includes(plaintiff.partyId)).map((attorney) => attorney.attorneyId);

    //var attorney = thiscase.attorneys.map((attorney)=>{console.log(attorney)})
    //console.log("%s (%i) is represented by firms: %s", plaintiff.name, plaintiff.partyId, JSON.stringify(firms));
    //console.log("%s (%i) is represented by attorneys: %s", plaintiff.name, plaintiff.partyId, JSON.stringify(attorneys));
    return [firms, attorneys];
}

async function run() {
    var caseID = 2000207159;
    var client = new LexMachinaClient('config-auth.json');
    var thiscase = await client.districtCases(caseID);
    var lawFirmIndex = indexLawFirms(thiscase);
    var attorneyIndex = indexAttorneys(thiscase);

    //    process.exit()
    var plaintiffs = thiscase.parties.filter(party => party.role == 'Plaintiff');

    
    for (var index = 0; index <=plaintiffs.length; index++) {
        var plaintiff = plaintiffs[index];
        if (plaintiff) {
            var firms, attorneys;
            [firms, attorneys] = getRepresentation(thiscase, plaintiff);
            //        console.log("I got this from lawyer: %s", JSON.stringify(attorneys));
            //        console.log("I got this from firm: %s", JSON.stringify(firms));
            console.log('%s\t[%i]', plaintiff.name, plaintiff.partyId);
            firms && firms.forEach(firmId=>{
                var firm = lawFirmIndex[firmId];
                console.log('\t%s [%i]',firm.name, firmId );
            });
            attorneys && attorneys.forEach(attorneyId =>{
                var attorney = attorneyIndex[attorneyId];
                var firmNames = [];
                if (attorney.lawFirmIds) {
                    var representingFirms = attorney.lawFirmIds.filter(id => firms && firms.includes(id));
                    //if (representingFirms.length > 1) console.log("There are %i representing firms", representingFirms.length);
                    firmNames = representingFirms.map(firmId => lawFirmIndex[firmId].name);
                }
                console.log('\t\t%s [%i]\t', attorney.name, attorneyId, firmNames.join('; '));
            });
        }   
    }
 
}

run();