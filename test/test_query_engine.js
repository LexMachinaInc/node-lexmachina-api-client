const CasesQueryRequest = require('../src/case_query_request')
const LexMachinaClient = require('../src/lexmachina_client')
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
nockBack.setMode('record');


describe('Execute Queries',   () => {
    var client = new LexMachinaClient('config/config-auth.json')


    describe('Query Case Status', () => {
        it('should be able to execute queries with case status',  async () => {
            const { nockDone} = await nockBack('query-case-status-data.json');

            nock.enableNetConnect();
        
            var caseQuery = new CasesQueryRequest();
            var statuses =   ["Open", "Terminated"];
            for (var index=0; index < statuses.length; index++) {
                caseStatus = statuses[index];
                caseQuery.setCaseStatus(caseStatus);
                //console.log(caseStatus)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
            }


            nockDone();

        })
    })

    describe('Query Case Types', async () => {

        it('should be able to query via case types includes and excludes', async () => {
            const { nockDone} = await nockBack('query-case-types-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var types = await client.listCaseTypes();
            for (var index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesInclude(caseType)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            for (var index=0; index < types.length; index++) {
                caseType = types[index];
                caseQuery.addCaseTypesExclude(caseType)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases = "+cases)
                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        })

    });

    describe('Query Case Tags',  () => {

        it('should be able to query via case tags includes and excludes', async () => {
            const { nockDone} = await nockBack('query-case-tags-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var tags = await client.listCaseTags();
            tags.sort();

            for (var index=0; index < tags.length; index++) {
                var caseTag = tags[index];
                //TBD remove when this gets fixed in production
                caseQuery.addCaseTagsInclude(caseTag);
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < tags.length; index++) {
                var caseTag = tags[index];
                caseQuery.addCaseTagsExclude(caseTag)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for tag %s = %s", caseTag, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();

            
        })

    });


    describe('Query Events',  () => {

        it('should be able to query via events includes and excludes', async () => {
            const { nockDone} = await nockBack('query-events-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var events = await client.listEvents();
            events.sort();

            for (var index=0; index < events.length; index++) 
             {
                var event = events[index];
                if (event == "Permanent Injuction" || event == "Summary Judgement")  {
                    continue;
                }
                caseQuery.addEventTypesInclude(event);
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
                if (event == "Filed") {
                    continue;
                }
                caseQuery.addEventTypesExclude(event)
                cases = await client.queryDistrictCases(caseQuery);
                //console.log("Exclude cases for event %s = %s", event, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            nockDone();
            
        })

    });

    describe('Query Resolutions', async () => {

        it('should be able to query via resolutions includes and excludes', async () => {
            const { nockDone} = await nockBack('query-resolutions-data.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var resolutions = await client.listCaseResolutions();
            for (var index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsInclude(resolution.summary, resolution.specific)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("For resolution include %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < resolutions.length; index++) {
                resolution = resolutions[index];
                caseQuery.addResolutionsExclude( resolution.summary, resolution.specific)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("For resolution exclude %s, cases =  %s", JSON.stringify(resolution), JSON.stringify(cases) )

                expect(cases).to.have.lengthOf(5);
                caseQuery.clear();
            }
            nockDone();

            
        })

    });




    describe('Query Finding',  () => {

        it('should be able to query findings via judgment sources', async () => {
            const { nockDone} = await nockBack('query-findings-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var judgmentSources = await client.listJudgmentSources();
            var findingSources = judgmentSources.findings;
            //console.log(findingSources)
            findingSources.sort();

            for (var index=0; index < findingSources.length; index++) 
             {
                var source = findingSources[index];
                if (source == "No Type Specified") {
                    continue;
                }
                caseQuery.addFindingsIncludeJudgmentSource(source)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for finding judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < findingSources.length; index++) 
            {
               var source = findingSources[index];
               if (source == "No Type Specified") {
                   continue;
               }
               caseQuery.addFindingsExcludeJudgmentSource(source)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Exclude cases for finding judgment source %s = %s", source, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })

        it('should be able to query findings via parties', async () => {
            const { nockDone} = await nockBack('query-findings-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var parties = [1334, 2273, 266];
            //console.log(parties)

            for (var index=0; index < parties.length; index++) 
             {
                var party = parties[index];

                caseQuery.addFindingsIncludeAwardedToParties(party)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for finding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < parties.length; index++) 
            {
               var party = parties[index];
               caseQuery.addFindingsIncludeAwardedAgainstParties(party)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Awarded against cases for finding judgment source %i = %s", party, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })

        it('should be able to query findings via patent invalidity', async () => {
            const { nockDone} = await nockBack('query-findings-patent-invalidity.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var patentInvalidityReasons = ["Invalidity: 103 Obviousness", "Invalidity: 101 Subject Matter"];

            for (var index=0; index < patentInvalidityReasons.length; index++) 
             {
                var patentInvalidityReason = patentInvalidityReasons[index];

                caseQuery.addFindingsIncludePatentInvalidityReasons(patentInvalidityReason)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for finding patent invalidity reason %s = %s", patentInvalidityReason, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }

            nockDone();
            
        })

        it('should be able to query findings via date', async () => {
            const { nockDone} = await nockBack('query-findings-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();

                caseQuery.addFindingsDate("2010-01-01", "onOrAfter")
                caseQuery.addFindingsDate("2011-01-01", "onOrBefore")
                var cases = await client.queryDistrictCases(caseQuery);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            

            nockDone();
            
        })

    });


    describe('Query Remedies',  () => {

        it('should be able to query remedies via judgment sources', async () => {
            const { nockDone} = await nockBack('query-remedies-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var judgmentSources = await client.listJudgmentSources();
            var remedySources = judgmentSources.remedies;
            //console.log(remedySources)
            remedySources.sort();

            for (var index=0; index < remedySources.length; index++) 
             {
                var source = remedySources[index];
                if (source == "No Type Specified") {
                    continue;
                }
                caseQuery.addRemediesIncludeJudgmentSource(source)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for remedy judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < remedySources.length; index++) 
            {
               var source = remedySources[index];
               if (source == "No Type Specified") {
                   continue;
               }
               caseQuery.addRemediesExcludeJudgmentSource(source)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Exclude cases for remedy judgment source %s = %s", source, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })

        it('should be able to query remedies via parties', async () => {
            const { nockDone} = await nockBack('query-remedies-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var parties = [1334, 2273, 266];
            //console.log(parties)

            for (var index=0; index < parties.length; index++) 
             {
                var party = parties[index];

                caseQuery.addRemediesIncludeAwardedToParties(party)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for remedy party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < parties.length; index++) 
            {
               var party = parties[index];
               caseQuery.addRemediesIncludeAwardedAgainstParties(party)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Awarded against cases for remedy judgment source %i = %s", party, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })


        it('should be able to query remedies via date', async () => {
            const { nockDone} = await nockBack('query-remedies-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();

                caseQuery.addRemediesDate("2010-01-01", "onOrAfter")
                caseQuery.addRemediesDate("2011-01-01", "onOrBefore")
                var cases = await client.queryDistrictCases(caseQuery);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            

            nockDone();
            
        })

    });


    describe('Query Damages',  () => {

        it('should be able to query damages via judgment sources', async () => {
            const { nockDone} = await nockBack('query-damages-judgment-sources.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var judgmentSources = await client.listJudgmentSources();
            var damageSources = judgmentSources.damages;
            //console.log(damageSources)
            damageSources.sort();

            for (var index=0; index < damageSources.length; index++) 
             {
                var source = damageSources[index];
                if (source == "No Type Specified") {
                    continue;
                }
                caseQuery.addDamagesIncludeJudgmentSource(source)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Include cases for damage judgment source %s = %s", source, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < damageSources.length; index++) 
            {
               var source = damageSources[index];
               if (source == "No Type Specified") {
                   continue;
               }
               caseQuery.addDamagesExcludeJudgmentSource(source)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Exclude cases for damage judgment source %s = %s", source, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })

        it('should be able to query damages via parties', async () => {
            const { nockDone} = await nockBack('query-damages-parties.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var parties = [1334, 2273, 266];
            //console.log(parties)

            for (var index=0; index < parties.length; index++) 
             {
                var party = parties[index];

                caseQuery.addDamagesIncludeAwardedToParties(party)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Awarded to cases for damage party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < parties.length; index++) 
            {
               var party = parties[index];
               caseQuery.addDamagesIncludeAwardedAgainstParties(party)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Awarded against cases for damage judgment source %i = %s", party, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })


        it('should be able to query damages via date', async () => {
            const { nockDone} = await nockBack('query-damages-date.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();

                caseQuery.addDamagesDate("2010-01-01", "onOrAfter")
                caseQuery.addDamagesDate("2011-01-01", "onOrBefore")
                var cases = await client.queryDistrictCases(caseQuery);
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            

            nockDone();
            
        })

    });


    describe('Query Patents',  () => {

        it('should be able to query via parties', async () => {
            const { nockDone} = await nockBack('query-patents.json');
            nock.enableNetConnect();
            
            var caseQuery = new CasesQueryRequest();
            var patents = [	10560500, 7171615, 8984393];

            for (var index=0; index < patents.length; index++) 
             {
                var patent = patents[index];

                caseQuery.addPatentsInclude(patent)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including patent %i = %s", patent, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
            }
            for (var index=0; index < patents.length; index++) 
            {
               var patent = patents[index];
               caseQuery.addPatentsExclude(patent)
               var cases = await client.queryDistrictCases(caseQuery);
               //console.log("Cases for excluding patent %i = %s", patent, cases.toString())
               expect(cases).to.not.be.empty;
               caseQuery.clear();
           }
            nockDone();
            
        })

    });


    describe('Query Judges', () => {
        it('should be able to query via judges includes and excludes', async () => {
            const { nockDone} = await nockBack('query-judges.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;

     
            var judges = [	3488, 3402, 3077];

            for (var index=0; index < judges.length; index++)  {
                var judge = judges[index];

                caseQuery.addJudgesInclude(judge)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < judges.length; index++)  {
                var judge = judges[index];

                caseQuery.addJudgesExclude(judge)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding judge %i = %s", judge, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })

    })

    describe('Query Magistrates', () => {
        it('should be able to query via magistrates includes and excludes', async () => {
            const { nockDone} = await nockBack('query-magistrates.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.magistrates.include).to.be.empty;
            expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;

     
            var magistrates = [	141, 174, 1437];

            for (var index=0; index < magistrates.length; index++)  {
                var magistrate = magistrates[index];

                caseQuery.addMagistratesInclude(magistrate)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including magistrate %i = %s", magistrate, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < magistrates.length; index++)  {
                var magistrate = magistrates[index];

                caseQuery.addMagistratesExclude(magistrate)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding magistrate %i = %s", magistrate, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })

    })

    describe('Query Courts', () => {
        it('should be able to query via courts includes and excludes', async () => {
            const { nockDone} = await nockBack('query-courts.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;

     
            var courts = ["njd", "dcd", "ord"];


            for (var index=0; index < courts.length; index++)  {
                var court = courts[index];

                caseQuery.addCourtsInclude(court)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < courts.length; index++)  {
                var court = courts[index];

                caseQuery.addCourtsExclude(court)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding court %s = %s", court, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })

    })


    describe('Query Law Firms', () => {
        it('should be able to query via law firms includes and excludes', async () => {
            const { nockDone} = await nockBack('query-lawfirms.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

     
            var lawFirms = [ 920, 604, 48475215];

            for (var index=0; index < lawFirms.length; index++)  {
                var lawFirm = lawFirms[index];

                caseQuery.addLawFirmsInclude(lawFirm)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < lawFirms.length; index++)  {
                var lawFirm = lawFirms[index];

                caseQuery.addLawFirmsExclude(lawFirm)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })

    it('should be able to query via law firms plaintiff includes and excludes', async () => {
        const { nockDone} = await nockBack('query-lawfirms-plaintiff.json');
        nock.enableNetConnect();

        var caseQuery = new CasesQueryRequest();
        expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
        expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

 
        var lawFirms = [ 920, 604, 48475215];

        for (var index=0; index < lawFirms.length; index++)  {
            var lawFirm = lawFirms[index];

            caseQuery.addLawFirmsIncludePlaintiff(lawFirm)
            var cases = await client.queryDistrictCases(caseQuery);
            //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
         }
         for (var index=0; index < lawFirms.length; index++)  {
            var lawFirm = lawFirms[index];

            caseQuery.addLawFirmsExcludePlaintiff(lawFirm)
            var cases = await client.queryDistrictCases(caseQuery);
            //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
         }
                
        nockDone();
})
it('should be able to query via law firms defendant includes and excludes', async () => {
    const { nockDone} = await nockBack('query-lawfirms-defendant.json');
    nock.enableNetConnect();

    var caseQuery = new CasesQueryRequest();
    expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
    expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;


    var lawFirms = [ 920, 604, 48475215];

    for (var index=0; index < lawFirms.length; index++)  {
        var lawFirm = lawFirms[index];

        caseQuery.addLawFirmsIncludeDefendant(lawFirm)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
     for (var index=0; index < lawFirms.length; index++)  {
        var lawFirm = lawFirms[index];

        caseQuery.addLawFirmsExcludeDefendant(lawFirm)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
            
    nockDone();
})
it('should be able to query via law firms third party includes and excludes', async () => {
    const { nockDone} = await nockBack('query-lawfirms-third-party.json');
    nock.enableNetConnect();

    var caseQuery = new CasesQueryRequest();
    expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
    expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;


    var lawFirms = [ 920, 604, 48475215];

    for (var index=0; index < lawFirms.length; index++)  {
        var lawFirm = lawFirms[index];

        caseQuery.addLawFirmsIncludeThirdParty(lawFirm)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for including lawFirm %i = %s", lawFirm, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
     for (var index=0; index < lawFirms.length; index++)  {
        var lawFirm = lawFirms[index];

        caseQuery.addLawFirmsExcludeThirdParty(lawFirm)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for excluding lawFirm %i = %s", lawFirm, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
            
    nockDone();
})


    })



    describe('Query Parties', () => {
        it('should be able to query via parties includes and excludes', async () => {
            const { nockDone} = await nockBack('query-parties.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;

     
            var parties = [ 2273, 4590, 28268];

            for (var index=0; index < parties.length; index++)  {
                var party = parties[index];

                caseQuery.addPartiesInclude(party)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < parties.length; index++)  {
                var party = parties[index];

                caseQuery.addPartiesExclude(party)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding party %i = %s", party, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })

    it('should be able to query via parties plaintiff includes and excludes', async () => {
        const { nockDone} = await nockBack('query-parties-plaintiff.json');
        nock.enableNetConnect();

        var caseQuery = new CasesQueryRequest();
        expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
        expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

        var parties = [ 2273, 4590, 28268];

        for (var index=0; index < parties.length; index++)  {
            var party = parties[index];

            caseQuery.addPartiesIncludePlaintiff(party)
            var cases = await client.queryDistrictCases(caseQuery);
            //console.log("Cases for including party %i = %s", party, cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
         }
         for (var index=0; index < parties.length; index++)  {
            var party = parties[index];

            caseQuery.addPartiesExcludePlaintiff(party)
            var cases = await client.queryDistrictCases(caseQuery);
            //console.log("Cases for excluding party %i = %s", party, cases.toString())
            expect(cases).to.not.be.empty;
            caseQuery.clear();
         }
                
        nockDone();
})
it('should be able to query via parties defendant includes and excludes', async () => {
    const { nockDone} = await nockBack('query-parties-defendant.json');
    nock.enableNetConnect();

    var caseQuery = new CasesQueryRequest();
    expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
    expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

    var parties = [ 2273, 4590, 28268];

    for (var index=0; index < parties.length; index++)  {
        var party = parties[index];

        caseQuery.addPartiesIncludeDefendant(party)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for including party %i = %s", party, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
     for (var index=0; index < parties.length; index++)  {
        var party = parties[index];

        caseQuery.addPartiesExcludeDefendant(party)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for excluding party %i = %s", party, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
            
    nockDone();
})
it('should be able to query via parties third party includes and excludes', async () => {
    const { nockDone} = await nockBack('query-parties-third-party.json');
    nock.enableNetConnect();

    var caseQuery = new CasesQueryRequest();
    expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
    expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
    
    var parties = [ 2273, 4590, 28268];

    for (var index=0; index < parties.length; index++)  {
        var party = parties[index];

        caseQuery.addPartiesIncludeThirdParty(party)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for including party %i = %s", party, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
     for (var index=0; index < parties.length; index++)  {
        var party = parties[index];

        caseQuery.addPartiesExcludeThirdParty(party)
        var cases = await client.queryDistrictCases(caseQuery);
        //console.log("Cases for excluding party %i = %s", party, cases.toString())
        expect(cases).to.not.be.empty;
        caseQuery.clear();
     }
            
    nockDone();
})


    })

    describe('Query MDL', () => {
        it('should be able to query via MDL includes and excludes', async () => {
            const { nockDone} = await nockBack('query-mdl.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.mdl.include).to.be.empty;
            expect(caseQuery.queryObject.mdl.exclude).to.be.empty;

     
            var mdls = [ 2273, 2885,2745,2735];

            for (var index=0; index < mdls.length; index++)  {
                var mdl = mdls[index];

                caseQuery.addMDLInclude(mdl)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for including mdl %i = %s", mdl, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
             for (var index=0; index < mdls.length; index++)  {
                var mdl = mdls[index];

                caseQuery.addPartiesExclude(mdl)
                var cases = await client.queryDistrictCases(caseQuery);
                //console.log("Cases for excluding mdl %i = %s", mdl, cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
             }
                    
            nockDone();
    })
    })

    describe('Query Misc Operations', () => {
        it('should be able to query via date', async () => {
            const { nockDone} = await nockBack('query-misc.json');
            nock.enableNetConnect();

            var caseQuery = new CasesQueryRequest();
            caseQuery.setDate("2022-01-01", "filed", "onOrAfter");
            caseQuery.setDate("2022-01-01", "filed", "onOrBefore");
            caseQuery.setPageSize(500);

            var cases = await client.queryDistrictCases(caseQuery, {pageThrough: true});
                //console.log("Cases filed on 2022-01-01 = %s", cases.toString())
                expect(cases).to.not.be.empty;
                caseQuery.clear();
                
            nockDone();
    })
    })



})
/* 



    describe('Ordering', () => {
        var first = "ByFirstFiled";
        var last = "ByLastFiled";

        it('Setting Ordering', () => {
            expect(caseQuery.queryObject.ordering).to.equal(first)
            caseQuery.setOrdering(last)
            expect(caseQuery.queryObject.ordering).to.equal(last);
            caseQuery.clear();
            expect(caseQuery.queryObject.ordering).to.equal(first)
        })
    })

    describe('Page', () => {
        var pageSize = 100;

        it('Setting Page Size', () => {
            expect(caseQuery.queryObject.pageSize).to.equal(5)
            caseQuery.setPageSize(pageSize)
            expect(caseQuery.queryObject.pageSize).to.equal(pageSize);
            caseQuery.clear();
            expect(caseQuery.queryObject.pageSize).to.equal(5)
        })

        it('Setting Page', () => {
            expect(caseQuery.queryObject.page).to.equal(1)
            caseQuery.setPage(5)
            expect(caseQuery.queryObject.page).to.equal(5);
            caseQuery.nextPage();
            expect(caseQuery.queryObject.page).to.equal(6)
            caseQuery.nextPage();
            expect(caseQuery.queryObject.page).to.equal(7)
            caseQuery.clear();
            expect(caseQuery.queryObject.page).to.equal(1)
        })
    })
})

describe('Date Operation', () => {
    var caseQuery = new CasesQueryRequest();
    var operators = ["onOrAfter", "onOrBefore"]
    var fields = ["filed", "terminated", "lastDocket", "trial"]
    var goodDate = "2021-01-01"
    var badDate = "01/01/2021"

    it('Adding valid dates, fields and operators succeed', () => {
        operators.forEach(operator => {
            fields.forEach(field => {
                caseQuery.setDate(goodDate, field, operator);
                expect(caseQuery.queryObject.dates[field][operator]).to.equal(goodDate)
                caseQuery.clear()
                expect(caseQuery.queryObject.dates[field][operator]).to.be.empty;
            })
        })
    })

    it('Adding invalid date throws error', () => {
        function badDateSet() {
            caseQuery.setDate(badDate, fields[0], operators[0]);
        }
        expect(badDateSet).to.throw(/Dates must be in YYYY-MM-DD format/)
        expect(badDateSet).to.throw(badDate)
    })

    it('Adding invalid operator throws error', () => {
        var badOperator = "notAnOperator"
        function badOperatorSet() {
            caseQuery.setDate(goodDate, fields[0], badOperator);
        }
        expect(badOperatorSet).to.throw(/Not a valid operator/)
        expect(badOperatorSet).to.throw(badOperator)
    })

    it('Adding invalid field throws error', () => {
        var badField = "notAField"
        function badFieldSet() {
            caseQuery.setDate(goodDate, badField, operators[0]);
        }
        expect(badFieldSet).to.throw(/Not a valid field/)
        expect(badFieldSet).to.throw(badField)
    })
})
*/