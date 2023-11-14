const DistrictCasesQueryRequest = require('../src/district_cases_query_request');
const LexMachinaClient = require('../src/lexmachina_client');
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
nockBack.setMode('record');


describe('Execute District Queries',   () => {
    var client = new LexMachinaClient('config/config.json');


    describe('Query Case Status', () => {
        it('should be able to execute queries with case status',  async () => {
            const { nockDone} = await nockBack('query-district-case-status-data.json');

            nock.enableNetConnect();
        
            var caseQuery = new DistrictCasesQueryRequest();
            var caseStatus;
            var index;
            var cases;
            var statuses =   ['Open', 'Terminated'];
            for (index=0; index < statuses.length; index++) {
                caseStatus = statuses[index];
                caseQuery.setCaseStatus(caseStatus);
                //console.log(caseStatus)
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
            }


            nockDone();

        });
    });

    describe('Query Case Types', async () => {

        it('should be able to query via case types includes and excludes', async () => {
            const { nockDone} = await nockBack('query-case-types-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var caseType;
            var index;
            var cases;
            var types = await client.listDistrictCaseTypes();
            types = types[0].caseTypes;
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesInclude(caseType);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesExclude(caseType);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Case Tags',  () => {

        it('should be able to query via case tags includes and excludes', async () => {
            const { nockDone} = await nockBack('query-district-case-tags-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var caseTag;
            var index;
            var cases;
            var tagsObject = await client.listDistrictCaseTags();
            tags = tagsObject[0].caseTags;
            tags.sort();

            for (index=0; index < tags.length ; index++) {
                caseTag = tags[index];
                //TBD remove when this gets fixed in production
                caseQuery.addCaseTagsInclude(caseTag);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < tags.length; index++) {
                caseTag = tags[index];
                caseQuery.addCaseTagsExclude(caseTag);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();

            
        });

    });


    describe('Query Events',  () => {

        it('should be able to query via events includes and excludes', async () => {
            const { nockDone} = await nockBack('query-events-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var index;
            var cases;
            var events = await client.listDistrictEvents();
            events = events.events;
            events.sort();
            //console.log("Events = " + events);

            for (index=0; index < events.length; index++) 
            {
                var event = events[index];
                if (event == 'Permanent Injuction' || event == 'Summary Judgement')  {
                    continue;
                }
                caseQuery.addEventTypesInclude(event);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
                if (event == 'Filed') {
                    continue;
                }
                caseQuery.addEventTypesExclude(event);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

    });

    describe('Query Resolutions', async () => {

        it('should be able to query via resolutions includes and excludes', async () => {
            const { nockDone} = await nockBack('query-resolutions-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var resolution;
            var index;
            var cases;
            var resolutions = await client.listDistrictCaseResolutions();
            resolutions = resolutions.caseResolutions;
            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsInclude(resolution.summary, resolution.specific);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("For resolution include %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsExclude( resolution.summary, resolution.specific);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("For resolution exclude %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )

                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });




    describe('Query Finding',  () => {

        it('should be able to query findings via judgment sources', async () => {
            const { nockDone} = await nockBack('query-findings-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var source;
            var index;
            var cases;
            var judgmentSources = await client.listDistrictJudgmentSources();
            var findingSources = judgmentSources.findings;
            //console.log(findingSources)
            findingSources.sort();

            for (index=0; index < findingSources.length; index++) 
            {
                source = findingSources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addFindingsIncludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for finding judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < findingSources.length; index++) 
            {
                source = findingSources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addFindingsExcludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for finding judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

        it('should be able to query findings via parties', async () => {
            const { nockDone} = await nockBack('query-findings-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var parties = [1334, 2273, 266];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];
                caseQuery.addFindingsIncludeAwardedToParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for finding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];
                caseQuery.addFindingsIncludeAwardedAgainstParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded against cases for finding judgment source %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

        it('should be able to query findings via patent invalidity', async () => {
            const { nockDone} = await nockBack('query-findings-patent-invalidity.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var index;
            var cases;
            var patentInvalidityReasons = ['Invalidity: 103 Obviousness', 'Invalidity: 101 Subject Matter'];

            for (index=0; index < patentInvalidityReasons.length; index++) 
            {
                var patentInvalidityReason = patentInvalidityReasons[index];

                caseQuery.addFindingsIncludePatentInvalidityReasons(patentInvalidityReason);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for finding patent invalidity reason %s = %s", patentInvalidityReason, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }

            nockDone();
            
        });

        it('should be able to query findings via date', async () => {
            const { nockDone} = await nockBack('query-findings-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var cases;

            caseQuery.addFindingsDate('2010-01-01', 'onOrAfter');
            caseQuery.addFindingsDate('2011-01-01', 'onOrBefore');
            cases = await client.queryDistrictCases(caseQuery);
            expect(cases).to.not.be.empty;
            caseQuery.clear();
            

            nockDone();
            
        });

    });


    describe('Query Remedies',  () => {

        it('should be able to query remedies via judgment sources', async () => {
            const { nockDone} = await nockBack('query-remedies-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var judgmentSources = await client.listDistrictJudgmentSources();
            var remedySources = judgmentSources.remedies;
            remedySources.sort();
            var source;
            var index;
            var cases;

            for (index=0; index < remedySources.length; index++) 
            {
                source = remedySources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addRemediesIncludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for remedy judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < remedySources.length; index++) 
            {
                source = remedySources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addRemediesExcludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for remedy judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

        it('should be able to query remedies via parties', async () => {
            const { nockDone} = await nockBack('query-remedies-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var parties = [1334, 2273, 266];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];

                caseQuery.addRemediesIncludeAwardedToParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for remedy party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];
                caseQuery.addRemediesIncludeAwardedAgainstParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded against cases for remedy judgment source %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });


        it('should be able to query remedies via date', async () => {
            const { nockDone} = await nockBack('query-remedies-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();

            caseQuery.addRemediesDate('2010-01-01', 'onOrAfter');
            caseQuery.addRemediesDate('2011-01-01', 'onOrBefore');
            var cases = await client.queryDistrictCases(caseQuery);
            expect(cases).to.not.be.empty;
            caseQuery.clear();
            

            nockDone();
            
        });

    });


    describe('Query Damages',  () => {

        it('should be able to query damages via judgment sources', async () => {
            const { nockDone} = await nockBack('query-damages-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var judgmentSources = await client.listDistrictJudgmentSources();
            var damageSources = judgmentSources.damages;
            damageSources.sort();
            var source;
            var index;
            var cases;

            for (index=0; index < damageSources.length; index++) 
            {
                source = damageSources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addDamagesIncludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for damage judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < damageSources.length; index++) 
            {
                source = damageSources[index];
                if (source == 'No Type Specified') {
                    continue;
                }
                caseQuery.addDamagesExcludeJudgmentSource(source);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for damage judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

        it('should be able to query damages via parties', async () => {
            const { nockDone} = await nockBack('query-damages-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var parties = [1334, 2273, 266];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];

                caseQuery.addDamagesIncludeAwardedToParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for damage party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++) 
            {
                party = parties[index];
                caseQuery.addDamagesIncludeAwardedAgainstParties(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded against cases for damage judgment source %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });


        it('should be able to query damages via date', async () => {
            const { nockDone} = await nockBack('query-damages-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();

            caseQuery.addDamagesDate('2010-01-01', 'onOrAfter');
            caseQuery.addDamagesDate('2011-01-01', 'onOrBefore');
            var cases = await client.queryDistrictCases(caseQuery);
            expect(cases).to.not.be.empty;
            caseQuery.clear();
            

            nockDone();
            
        });

    });


    describe('Query Patents',  () => {

        it('should be able to query via parties', async () => {
            const { nockDone} = await nockBack('query-patents.json');
            nock.enableNetConnect();
            
            var caseQuery = new DistrictCasesQueryRequest();
            var patents = [	10560500, 7171615, 8984393];
            var patent;
            var index;
            var cases;

            for (index=0; index < patents.length; index++) 
            {
                patent = patents[index];

                caseQuery.addPatentsInclude(patent);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including patent %i = %s", patent, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < patents.length; index++) 
            {
                patent = patents[index];
                caseQuery.addPatentsExclude(patent);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding patent %i = %s", patent, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

    });


    describe('Query Judges', () => {
        it('should be able to query via judges includes and excludes', async () => {
            const { nockDone} = await nockBack('query-judges.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;

     
            var judges = [	3488, 3402, 3077];
            var judge;
            var index;
            var cases;

            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesInclude(judge);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesExclude(judge);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });

    describe('Query Magistrates', () => {
        it('should be able to query via magistrates includes and excludes', async () => {
            const { nockDone} = await nockBack('query-magistrates.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.magistrates.include).to.be.empty;
            expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;
     
            var magistrates = [	141, 174, 1437];
            var magistrate;
            var index;
            var cases;


            for (index=0; index < magistrates.length; index++)  {
                magistrate = magistrates[index];

                caseQuery.addMagistratesInclude(magistrate);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including magistrate %i = %s", magistrate, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < magistrates.length; index++)  {
                magistrate = magistrates[index];

                caseQuery.addMagistratesExclude(magistrate);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding magistrate %i = %s", magistrate, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });

    describe('Query Courts', () => {
        it('should be able to query via courts includes and excludes', async () => {
            const { nockDone} = await nockBack('query-courts.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;

     
            var courts = ['njd', 'dcd', 'ord'];
            var court;
            var index;
            var cases;

            for (index=0; index < courts.length; index++)  {
                court = courts[index];

                caseQuery.addCourtsInclude(court);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < courts.length; index++)  {
                court = courts[index];

                caseQuery.addCourtsExclude(court);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });


    describe('Query Law Firms', () => {
        it('should be able to query via law firms includes and excludes', async () => {
            const { nockDone} = await nockBack('query-lawfirms.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

     
            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsInclude(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExclude(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via law firms plaintiff includes and excludes', async () => {
            const { nockDone} = await nockBack('query-lawfirms-plaintiff.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

 
            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via law firms defendant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-lawfirms-defendant.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeDefendant(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeDefendant(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via law firms third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-lawfirms-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });



    describe('Query Parties', () => {
        it('should be able to query via parties includes and excludes', async () => {
            const { nockDone} = await nockBack('query-parties.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;

     
            var parties = [ 2273, 4590, 28268];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesInclude(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExclude(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via parties plaintiff includes and excludes', async () => {
            const { nockDone} = await nockBack('query-parties-plaintiff.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

            var parties = [ 2273, 4590, 28268];
            var party;
            var cases;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludePlaintiff(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludePlaintiff(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via parties defendant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-parties-defendant.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeDefendant(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeDefendant(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via parties third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-parties-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
    
            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeThirdParty(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeThirdParty(party);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });

    describe('Query MDL', () => {
        it('should be able to query via MDL includes and excludes', async () => {
            const { nockDone} = await nockBack('query-mdl.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            expect(caseQuery.queryObject.mdl.include).to.be.empty;
            expect(caseQuery.queryObject.mdl.exclude).to.be.empty;

     
            var mdls = [ 2273, 2885,2745,2735];
            var cases;
            var mdl;
            var index;

            for (index=0; index < mdls.length; index++)  {
                mdl = mdls[index];

                caseQuery.addMDLInclude(mdl);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including mdl %i = %s", mdl, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < mdls.length; index++)  {
                mdl = mdls[index];

                caseQuery.addPartiesExclude(mdl);
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding mdl %i = %s", mdl, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });
    });

    describe('Query Misc Operations', () => {
        it('should be able to query via date', async () => {
            const { nockDone} = await nockBack('query-misc.json');
            nock.enableNetConnect();

            var caseQuery = new DistrictCasesQueryRequest();
            caseQuery.setDate('2022-01-01', 'filed', 'onOrAfter');
            caseQuery.setDate('2022-01-01', 'filed', 'onOrBefore');
            caseQuery.setPageSize(500);

            var cases = await client.queryDistrictCases(caseQuery, {pageThrough: true});
            //console.log("Cases filed on 2022-01-01 = %s", cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
                
            nockDone();
        });
    });

});