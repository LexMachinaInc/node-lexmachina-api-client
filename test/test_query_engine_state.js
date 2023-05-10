const StateCasesQueryRequest = require('../src/state_cases_query_request');
const LexMachinaClient = require('../src/lexmachina_client');
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
nockBack.setMode('record');


describe('Execute State Queries',   () => {
    var client = new LexMachinaClient('config/config.json');


    describe('Query Case Status', () => {
        it('should be able to execute queries with case status',  async () => {
            const { nockDone} = await nockBack('query-state-case-status-data.json');

            nock.enableNetConnect();
        
            var caseQuery = new StateCasesQueryRequest();
            var caseStatus;
            var index;
            var cases;
            var statuses =   ['Open', 'Terminated'];
            for (index=0; index < statuses.length; index++) {
                caseStatus = statuses[index];
                caseQuery.setCaseStatus(caseStatus);
                caseQuery.setState("CA");
                //console.log(caseStatus)
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
            }


            nockDone();

        });
    });

    describe('Query Judgment Events', async () => {

        it('should be able to query via case types includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-judgment-events-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var event;
            var index;
            var cases;
            var types = await client.listStateJudgmentEvents();
            events = types.judgmentEvents;
            for (index=0; index < events.length; index++) {
                event = events[index];
                caseQuery.addRulingsIncludeJudgmentEvent(event);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addRulingsExcludeJudgmentEvent(caseType);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Case Types', async () => {

        it('should be able to query via case types includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-case-types-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var caseType;
            var index;
            var cases;
            var types = await client.listStateCaseTypes();
            types = types[0].caseTypes;
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesInclude(caseType);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesExclude(caseType);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });


    describe('Query Case Tags',  () => {

        it('should be able to query via case tags includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-case-tags-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var caseTag;
            var index;
            var cases;
            var tags = await client.listStateCaseTags();
            var state = tags[0].court.state;
            tags = tags[0].caseTags;
            tags.sort();

            for (index=0; index < tags.length; index++) {
                caseTag = tags[index];
                caseQuery.addCaseTagsInclude(caseTag);
                caseQuery.setState(state);
                cases = await client.queryStateCases(caseQuery);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < tags.length; index++) {
                caseTag = tags[index];
                caseQuery.addCaseTagsExclude(caseTag);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Exclude cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();

            
        });

    });


    describe('Query Events',  () => {

        it('should be able to query via events includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-events-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var index;
            var cases;
            var events = await client.listStateEvents();
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
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Include cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
                if (event == 'Filed') {
                    continue;
                }
                caseQuery.addEventTypesExclude(event);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Exclude cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

    });

    describe('Query Resolutions', async () => {

        it('should be able to query via resolutions includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-resolutions-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var resolution;
            var index;
            var cases;
            var resolutions = await client.listStateCaseResolutions();

            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                resolutions = resolutions.caseResolutions;

                caseQuery.addResolutionsInclude(resolution.summary, resolution.specific);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("For resolution include %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsExclude( resolution.summary, resolution.specific);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("For resolution exclude %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )

                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Damages',  () => {

        it('should be able to query damages via judgment sources', async () => {
            const { nockDone} = await nockBack('query-state-damages-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var damageSourcesObject = await client.listStateDamages();
            var damageSources = damageSourcesObject.damages;
            damageSources.sort();
            var source;
            var index;
            var cases;

            for (index=0; index < damageSources.length; index++) 
            {
                source = damageSources[index];
                caseQuery.addDamagesIncludeName(source);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Include cases for damage judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < damageSources.length; index++) 
            {
                source = damageSources[index];
                caseQuery.addDamagesExcludeName(source);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Exclude cases for damage judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });

        it('should be able to query damages via parties', async () => {
            const { nockDone} = await nockBack('query-state-damages-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();
            var toParties = [25344, 3957, 473505];
            var againstParties = [68452930, 47684565, 54966924];
            var party;
            var index;
            var cases;

            for (index=0; index < toParties.length; index++) 
            {
                party = toParties[index];

                caseQuery.addDamagesIncludeAwardedToParties(party);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Awarded to cases for damage party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < againstParties.length; index++) 
            {
                party = againstParties[index];
                caseQuery.addDamagesIncludeAwardedAgainstParties(party);
                caseQuery.setState("CA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Awarded against cases for damage judgment source %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        });


        it('should be able to query damages via date', async () => {
            const { nockDone} = await nockBack('query-state-damages-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new StateCasesQueryRequest();

            caseQuery.addDamagesDate('2020-01-01', 'onOrAfter');
            caseQuery.addDamagesDate('2022-01-01', 'onOrBefore');
            caseQuery.setState("CA");
            var cases = await client.queryStateCases(caseQuery);
            expect(cases).to.not.be.empty;
            caseQuery.clear();
            

            nockDone();
            
        });

    });



    describe('Query Judges', () => {
        it('should be able to query via judges includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-judges.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;

     
            var judges = [	2634, 2578, 2832];
            var judge;
            var index;
            var cases;

            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesInclude(judge);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesExclude(judge);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });

    describe('Query Courts', () => {
        it('should be able to query via courts includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-courts.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;

            var courts = await client.listStateCourts();
            var court;
            var index;
            var cases;
            var statesToSkip = ['NV', 'OR', 'WA'];

            for (index=0; index < courts.length; index++)  {
                court = courts[index];

                caseQuery.addCourtsInclude(court.name);
                caseQuery.setState(court.state);
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including court %s = %s", court, cases.toString())
                //console.log("Checking the court include for %s:%s", court.state, court.name);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < courts.length; index++)  {
                court = courts[index];
                // skip NV because there is only one court and excluding it returns nothing
                if (statesToSkip.includes(court.state) ) {
                    continue;
                }
                caseQuery.addCourtsExclude(court.name);
                caseQuery.setState(court.state);
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding court %s = %s", court, cases.toString())
                //console.log("Checking the court exclude for %s:%s", court.state, court.name);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });


    describe('Query Law Firms', () => {
        it('should be able to query via law firms includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-lawfirms.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

     
            var lawFirms = [ 8489350, 54662, 154487959];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsInclude(lawFirm);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExclude(lawFirm);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via law firms plaintiff includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-lawfirms-plaintiff.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

 
            var lawFirms = [ 80911837, 58148202, 57615348];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via law firms defendant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-lawfirms-defendant.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;


            var lawFirms = [ 69545896, 9352473, 69545896];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeDefendant(lawFirm);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeDefendant(lawFirm);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via law firms third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-lawfirms-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;


            var lawFirms = [ 8759477, 10818448, 49017818];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });



    describe('Query Parties', () => {
        it('should be able to query via parties includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-parties.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;

     
            var parties = [ 54101417, 2912953, 66088502];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesInclude(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExclude(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via parties plaintiff includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-parties-plaintiff.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

            var parties = [ 47445087, 34856927, 2440073];
            var party;
            var cases;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludePlaintiff(party);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludePlaintiff(party);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via parties defendant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-parties-defendant.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

            var parties = [ 55964, 20892182, 66088449];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeDefendant(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeDefendant(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via parties third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-parties-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
    
            var parties = [ 344094, 66080547, 307873];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeThirdParty(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeThirdParty(party);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });

    describe('Query Attorneys', () => {
        it('should be able to query via attorneys includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-attorneys.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.include).to.be.empty;
            expect(caseQuery.queryObject.attorneys.exclude).to.be.empty;

     
            var attorneys = [ 112259428, 110221840, 10391481];
            var attorney;
            var index;
            var cases;

            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysInclude(attorney);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysExclude(attorney);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via attorneys plaintiff includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-attorneys-plaintiff.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludePlaintiff).to.be.empty;

            var attorneys = [ 48517370, 2834399, 659361];
            var attorney;
            var cases;
            var index;

            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysIncludePlaintiff(attorney);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysExcludePlaintiff(attorney);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via attorneys defendant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-attorneys-defendant.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeDefendant).to.be.empty;

            var attorneys = [ 141150476, 15808253, 107853708];
            var cases;
            var attorney;
            var index;

            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysIncludeDefendant(attorney);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysExcludeDefendant(attorney);
                caseQuery.setState("WA");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via attorneys third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-state-attorneys-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.be.empty;
    
            var attorneys = [ 18589436, 40252858];
            var cases;
            var attorney;
            var index;

            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysIncludeThirdParty(attorney);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for including attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < attorneys.length; index++)  {
                attorney = attorneys[index];

                caseQuery.addAttorneysExcludeThirdParty(attorney);
                caseQuery.setState("NV");
                cases = await client.queryStateCases(caseQuery);
                //console.log("Cases for excluding attorney %i = %s", attorney, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });

    describe('Query Misc Operations', () => {
        it('should be able to query via date', async () => {
            const { nockDone} = await nockBack('query-state-misc.json');
            nock.enableNetConnect();

            var caseQuery = new StateCasesQueryRequest();
            caseQuery.setState("CA");
            caseQuery.setDate('2022-01-03', 'filed', 'onOrAfter');
            caseQuery.setDate('2023-01-03', 'filed', 'onOrBefore');
            caseQuery.setPageSize(5);

            var cases = await client.queryStateCases(caseQuery);
            //console.log("Cases filed on 2022-01-01 = %s", cases.toString())
            //console.log("Cases list %s", JSON.stringify(cases));
            expect(cases).to.not.be.empty;
            caseQuery.clear();
                
            nockDone();
        });
    });

});