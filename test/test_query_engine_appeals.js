const AppealCasesQueryRequest = require('../src/appeal_cases_query_request');
const LexMachinaClient = require('../src/lexmachina_client');
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
nockBack.setMode('record');


describe('Execute Appeal Queries',   () => {
    var client = new LexMachinaClient('config/config.json');


    describe('Query Case Types', async () => {

        it('should be able to query via case types includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-case-types-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new AppealCasesQueryRequest();
            var caseType;
            var index;
            var cases;
            var types = await client.listAppealsCaseTypes();
            types = types[0].caseTypes;
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addOriginatingCasesIncludeCaseTypes(caseType);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            for (index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addOriginatingCasesExcludeCaseTypes(caseType);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Case Tags',  () => {

        it('should be able to query via case tags includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-case-tags-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new AppealCasesQueryRequest();
            var caseTag;
            var index;
            var cases;
            var tags = await client.listAppealsCaseTags();
            tags = tags[0].caseTags;
            tags.sort();

            for (index=0; index < tags.length; index++) {
                caseTag = tags[index];
                caseQuery.addCaseTagsInclude(caseTag);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Include cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < tags.length; index++) {
                caseTag = tags[index];
                caseQuery.addCaseTagsExclude(caseTag);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Exclude cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Resolutions', async () => {

        it('should be able to query via resolutions includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-resolutions-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new AppealCasesQueryRequest();
            var resolution;
            var index;
            var cases;
            var resolutions = await client.listAppealsCaseResolutions();
            resolutions = resolutions.caseResolutions;
            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsInclude(resolution.summary, resolution.specific);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("For resolution include %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsExclude( resolution.summary, resolution.specific);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("For resolution exclude %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )

                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        });

    });

    describe('Query Judges', () => {
        it('should be able to query via judges includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-judges.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;

     
            var judges = [	2267, 3423 , 2846];
            var judge;
            var index;
            var cases;

            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesInclude(judge);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < judges.length; index++)  {
                judge = judges[index];

                caseQuery.addJudgesExclude(judge);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });

    describe('Query Courts', () => {
        it('should be able to query via courts includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-courts.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;

     
            var courts = await client.listAppealsCourts();
            courts = courts.map(a=>a.shortName);
            var court;
            var index;
            var cases;

            for (index=0; index < courts.length; index++)  {
                court = courts[index];

                caseQuery.addCourtsInclude(court);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("Cases for including court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < courts.length; index++)  {
                court = courts[index];

                caseQuery.addCourtsExclude(court);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

    });


    describe('Query Law Firms', () => {
        it('should be able to query via law firms includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

     
            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsInclude(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExclude(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via law firms appellant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms-appellant.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;

 
            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeAppellant(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeAppellant(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via law firms appellee includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms-appellee.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeAppellee(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeAppellee(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });
        it('should be able to query via law firms third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });

        it('should be able to query via law firms respondent includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms-respondent.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludeRespondent(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludeRespondent(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


        it('should be able to query via law firms petiioner movant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-lawfirms-petitioner-movant.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.be.empty;


            var lawFirms = [ 920, 604, 48475215];
            var lawFirm;
            var index;
            var cases;

            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsIncludePetitionerMovant(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < lawFirms.length; index++)  {
                lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExcludePetitionerMovant(lawFirm);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });

    });



    describe('Query Parties', () => {
        it('should be able to query via parties includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;

     
            var parties = [ 2273, 4590, 28268];
            var party;
            var index;
            var cases;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesInclude(party);
                cases = await client.queryAppealsCases(caseQuery);
                console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExclude(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                    
            nockDone();
        });

        it('should be able to query via parties appellant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties-appellant.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;

            var parties = [ 2273, 4590, 28268];
            var party;
            var cases;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeAppellant(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeAppellant(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
                
            nockDone();
        });
        it('should be able to query via parties appellee includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties-appellee.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;

            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeAppellee(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeAppellee(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });

        it('should be able to query via parties third party includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties-third-party.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
    
            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeThirdParty(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeThirdParty(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });

        it('should be able to query via parties respondent includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties-respondent.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includeRespondent).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeRespondent).to.be.empty;
    
            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludeRespondent(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludeRespondent(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });

        it('should be able to query via parties petitioner movant includes and excludes', async () => {
            const { nockDone} = await nockBack('query-appeals-parties-petitioner-movant.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.be.empty;
    
            var parties = [ 2273, 4590, 28268];
            var cases;
            var party;
            var index;

            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesIncludePetitionerMovant(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (index=0; index < parties.length; index++)  {
                party = parties[index];

                caseQuery.addPartiesExcludePetitionerMovant(party);
                cases = await client.queryAppealsCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            
            nockDone();
        });


    });



    describe('Query Misc Operations', () => {
        it('should be able to query via date', async () => {
            const { nockDone} = await nockBack('query-appeals-misc.json');
            nock.enableNetConnect();

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.setDate('2022-01-01', 'filed', 'onOrAfter');
            caseQuery.setDate('2022-02-01', 'filed', 'onOrBefore');
            caseQuery.setPageSize(5);

            var cases = await client.queryAppealsCases(caseQuery, {pageThrough: true});
            //console.log("Cases filed on 2022-01-01 = %s", cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
                
            nockDone();
        });
    });

});