const { LexMachinaClient, DistrictCasesQueryRequest } = require("..");
const moment = require('moment');

const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function keysSortedByCount(hashmap) {
    var keys = Object.keys(hashmap);
    keys.sort((a,b)=> hashmap[b] - hashmap[a]);
    return keys;
}

function findRepresentedParties(courtcase, lawFirmId) {
//    console.log(JSON.stringify(courtcase));

    var lawfirms = courtcase['lawFirms'];
    for (var index=0;index<lawfirms.length;index++){
        var lawFirm = lawfirms[index];
        if (lawFirm['lawFirmId'] == lawFirmId) {
            return lawFirm['clientPartyIds'];
        }
    }
    // If we make it to here, return an empty array
    return [];
}

function elementsInCommon(array1, array2) {
    var set1 = new Set(array1);
    var set2 = new Set(array2);
    var intersection = [...set1].filter(item => set2.has(item));
    return intersection.length !=0;
}

function addDamages(caseObject, damagesObject, clientList) {
    var damageList = caseObject.damages.active;
    for (var index=0; index<damageList.length; index++) {
        var damage = damageList[index];
        if (elementsInCommon(damage.awardedToPartyId, clientList) && !damage.negated ){
            damagesObject.for += damage.amount;
            console.log('\tDamages found for clients');
        }
        if (elementsInCommon(damage.awardedAgainstPartyIds, clientList) && !damage.negated ){
            damagesObject.against += damage.amount;
            console.log('\tDamages found against clients');

        }

    }

}

async function run() {
    var client = new LexMachinaClient('config.json');
    var query = new DistrictCasesQueryRequest();
    var law_firm_id = 27209; //hard coded to California DOJ 
    var report_days = 60;
    var courtCount = {};
    var tagCount = {};
    var typeCount = {};
    var maxCourts = 5;
    var maxTags = 10;
    var maxTypes = 10;
    var keys, key, index;

    var startDate = moment().subtract(report_days,'days').format('YYYY-MM-DD');
    query.setDate(startDate,'terminated', 'onOrAfter')
        .addLawFirmsInclude(law_firm_id);
    var cases = await client.queryDistrictCases(query, { pageThrough: true });
    console.log('\nFound %i cases\n', cases.length);

    var damages = {'for':0, 'against':0};
    for (index = 0; index < cases.length; index++) {
        var thiscaseID = cases[index];
        var thiscase = await client.districtCases(thiscaseID);
        console.log(thiscase.title) ;
        var clients = findRepresentedParties(thiscase, law_firm_id);
        addDamages(thiscase, damages, clients);
        
        if (!courtCount[thiscase.court]) {
            courtCount[thiscase.court] =1;
        } else {
            courtCount[thiscase.court]++;
        }
        for (var tagIndex = 0; tagIndex < thiscase.caseTags.length; tagIndex++ ){
            var tag = thiscase.caseTags[tagIndex];
            if (!tagCount[tag]) {
                tagCount[tag] = 1;
            } else {
                tagCount[tag]++;
            }
        }
        for (var typeIndex = 0; typeIndex < thiscase.caseType.length; typeIndex++ ){
            var type = thiscase.caseType[typeIndex];
            if (!typeCount[type]) {
                typeCount[type] = 1;
            } else {
                typeCount[type]++;
            }
        }
    }  
    var firm = await client.lawFirm(law_firm_id);
    console.log('\n\nSummary for %s', firm.name);
    console.log('Last %i days', report_days);
    
    keys = keysSortedByCount(courtCount);
    console.log('\n=============\nTop %i Courts\n=============\n', maxCourts);
    for (index =0; index< keys.length && index < maxCourts; index++) {
        key = keys[index];
        console.log('%i\t%s', courtCount[key], key);
    }

    keys = keysSortedByCount(typeCount);
    console.log('\n=============\nTop %i Types\n=============\n', maxTypes);
    for (index =0; index< keys.length && index < maxTypes; index++) {
        key = keys[index];
        console.log('%i\t%s', typeCount[key], key );
    }
    keys = keysSortedByCount(tagCount);
    console.log('\n=============\nTop %i Tags\n=============\n', maxTags);
    for (index =0; index< keys.length && index < maxTags; index++) {
        key = keys[index];
        console.log('%i\t%s', tagCount[key], key );
    }


    console.log('\n==============\nDamage Summary\n==============\n');
    console.log('Damages for:\t\t%s', dollarFormatter.format(damages.for));
    console.log('Damages against:\t%s', dollarFormatter.format(damages.against));
    console.log('\n\n');

}

run();