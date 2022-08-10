const CasesQueryRequest = require('../src/case_query_request.js')
var chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
chai.should();
chai.use(require('chai-things'));

describe('Add and Remove Query Statements', () => {

    describe('Case Status', () => {
        it('should be able to add and remove Case Status', () => {
            var caseQuery = new CasesQueryRequest();
            ["Open", "Close"].forEach(caseStatus => {
                caseQuery.setCaseStatus(caseStatus);
                expect(caseQuery.queryObject.CaseStatus).to.equal(caseStatus);
            })
            caseQuery.clear()
            expect(caseQuery.queryObject.CaseStatus).to.be.empty;
        })
    })

    describe('Case Types', () => {
        it('should be able to add and remove case Types includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.CaseTypes.Include).to.be.empty;
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.be.empty;

            caseQuery.addCaseTypesInclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTypes.Include).to.be.empty;
            caseQuery.addCaseTypesInclude(["Antitrust", "Copyrights", "Contracts"])
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTypes.Include).to.be.empty;

            caseQuery.addCaseTypesExclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.be.empty;
            caseQuery.addCaseTypesExclude(["Antitrust", "Copyrights", "Contracts"])
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.be.empty;
        })

        it('adding the same Case Type to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addCaseTypesInclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(1);
            caseQuery.addCaseTypesInclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCaseTypesExclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(1);
            caseQuery.addCaseTypesExclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ["Antitrust", "Bankruptcy", "Civil Rights"]
            var array2 = ["Antitrust", "Bankruptcy", "Consumer Protection"]
            caseQuery.addCaseTypesInclude(array1)
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(3);
            caseQuery.addCaseTypesInclude(array2)
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(4);
            caseQuery.addCaseTypesInclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCaseTypesExclude(array1)
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(3)
            caseQuery.addCaseTypesExclude(array2)
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(4);
            caseQuery.addCaseTypesExclude("Antitrust")
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Case Tags', () => {
        it('should be able to add and remove case Tags includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.CaseTags.Include).to.be.empty;
            expect(caseQuery.queryObject.CaseTags.Exclude).to.be.empty;

            caseQuery.addCaseTagsInclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTags.Include).to.be.empty;
            caseQuery.addCaseTagsInclude(["Trial", "COVID-19", "Pro Se"])
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTags.Include).to.be.empty;

            caseQuery.addCaseTagsExclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTags.Exclude).to.be.empty;
            caseQuery.addCaseTagsExclude(["Trial", "COVID-19", "Pro Se"])
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.CaseTags.Exclude).to.be.empty;
        })

        it('adding the same Case Tag to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addCaseTagsInclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(1);
            caseQuery.addCaseTagsInclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCaseTagsExclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(1);
            caseQuery.addCaseTagsExclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ["Trial", "COVID-19", "Pro Se"]
            var array2 = ["Trial", "COVID-19", "Appealed"]
            caseQuery.addCaseTagsInclude(array1)
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(3);
            caseQuery.addCaseTagsInclude(array2)
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(4);
            caseQuery.addCaseTagsInclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCaseTagsExclude(array1)
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(3)
            caseQuery.addCaseTagsExclude(array2)
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(4);
            caseQuery.addCaseTagsExclude("Trial")
            expect(caseQuery.queryObject.CaseTags.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    })

    describe('Events', () => {
        it('should be able to add and remove events includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.be.empty;
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.be.empty;

            caseQuery.addEventTypesInclude("Filed")
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.be.empty;
            caseQuery.addEventTypesInclude(["Markman Hearing", "Permanent Injuction", "Summary Judgement"])
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.be.empty;

            caseQuery.addEventTypesExclude("Filed")
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.be.empty;
            caseQuery.addEventTypesExclude(["Markman Hearing", "Permanent Injuction", "Summary Judgement"])
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.be.empty;
        })

        it('adding the same events to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addEventTypesInclude("Filed")
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(1);
            caseQuery.addEventTypesInclude("Filed")
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addEventTypesExclude("Filed")
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(1);
            caseQuery.addEventTypesExclude("Filed")
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ["Markman Hearing", "Permanent Injuction", "Summary Judgement"]
            var array2 = ["Permanent Injuction", "Summary Judgement", "Dismiss (Contested)"]
            caseQuery.addEventTypesInclude(array1)
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(3);
            caseQuery.addEventTypesInclude(array2)
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(4);
            caseQuery.addEventTypesInclude("Markman Hearing")
            expect(caseQuery.queryObject.Events.IncludeEventTypes).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addEventTypesExclude(array1)
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(3)
            caseQuery.addEventTypesExclude(array2)
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(4);
            caseQuery.addEventTypesExclude("Markman Hearing")
            expect(caseQuery.queryObject.Events.ExcludeEventTypes).to.have.lengthOf(4);
            caseQuery.clear();
        })
    })

    describe('Findings', () => {
        it('should be able to add and remove findings includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.be.empty;
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.be.empty;
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.be.empty;

            caseQuery.addFindingsIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.be.empty;
            caseQuery.addFindingsIncludeAwardedToParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.be.empty;

            caseQuery.addFindingsIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.be.empty;
            caseQuery.addFindingsIncludeAwardedAgainstParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.be.empty;

            caseQuery.addFindingsIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.be.empty;
            caseQuery.addFindingsIncludeJudgmentSource([1234, 2345, 3456])
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.be.empty;

            caseQuery.addFindingsIncludePatentInvalidityReasons(1234)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.be.empty;
            caseQuery.addFindingsIncludePatentInvalidityReasons([1234, 2345, 3456])
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.be.empty;
        })

        it('adding the same findings IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addFindingsIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.clear();


            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]
            caseQuery.addFindingsIncludeAwardedToParties(array1)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeAwardedToParties(array2)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedToParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();



            caseQuery.addFindingsIncludeAwardedAgainstParties(array1)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeAwardedAgainstParties(array2)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Findings.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            var caseQuery = new CasesQueryRequest();
            caseQuery.addFindingsIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addFindingsIncludeJudgmentSource(array1)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeJudgmentSource(array2)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Findings.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.clear();

            // Patent Invalidity Reasons
            var caseQuery = new CasesQueryRequest();
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(1);
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addFindingsIncludePatentInvalidityReasons(array1)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(3);
            caseQuery.addFindingsIncludePatentInvalidityReasons(array2)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(4);
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234)
            expect(caseQuery.queryObject.Findings.Include.PatentInvalidityReasons).to.have.lengthOf(4);
            caseQuery.clear();
        })
    })

    describe('Remedies', () => {
        it('should be able to add and remove remedies includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.be.empty;
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.be.empty;

            caseQuery.addRemediesIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.be.empty;
            caseQuery.addRemediesIncludeAwardedToParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.be.empty;

            caseQuery.addRemediesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.be.empty;
            caseQuery.addRemediesIncludeAwardedAgainstParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.be.empty;

            caseQuery.addRemediesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.be.empty;
            caseQuery.addRemediesIncludeJudgmentSource([1234, 2345, 3456])
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.be.empty;
        })

        it('adding the same remedy IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addRemediesIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]
            caseQuery.addRemediesIncludeAwardedToParties(array1)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeAwardedToParties(array2)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeAwardedToParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedToParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addRemediesIncludeAwardedAgainstParties(array1)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeAwardedAgainstParties(array2)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Remedies.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            var caseQuery = new CasesQueryRequest();
            caseQuery.addRemediesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addRemediesIncludeJudgmentSource(array1)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeJudgmentSource(array2)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Remedies.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.clear();
        })
    })

    describe('Damages', () => {
        it('should be able to add and remove damage includes ', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.be.empty;
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.be.empty;
            expect(caseQuery.queryObject.Damages.Include.Name).to.be.empty;
            expect(caseQuery.queryObject.Damages.Include.Type).to.be.empty;

            caseQuery.addDamagesIncludeInFavorOfParties(1234)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.be.empty;
            caseQuery.addDamagesIncludeInFavorOfParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.be.empty;

            caseQuery.addDamagesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.be.empty;
            caseQuery.addDamagesIncludeAwardedAgainstParties([1234, 2345, 3456])
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.be.empty;

            caseQuery.addDamagesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.be.empty;
            caseQuery.addDamagesIncludeJudgmentSource([1234, 2345, 3456])
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.be.empty;

            caseQuery.addDamagesIncludeName(1234)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.Name).to.be.empty;
            caseQuery.addDamagesIncludeName([1234, 2345, 3456])
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.Name).to.be.empty;
        })

        it('adding the same findings IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeInFavorOfParties(1234)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeInFavorOfParties(1234)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]
            caseQuery.addDamagesIncludeInFavorOfParties(array1)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeInFavorOfParties(array2)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeInFavorOfParties(1234)
            expect(caseQuery.queryObject.Damages.Include.InFavorOfParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addDamagesIncludeAwardedAgainstParties(array1)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeAwardedAgainstParties(array2)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234)
            expect(caseQuery.queryObject.Damages.Include.AwardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addDamagesIncludeJudgmentSource(array1)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeJudgmentSource(array2)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeJudgmentSource(1234)
            expect(caseQuery.queryObject.Damages.Include.JudgmentSource).to.have.lengthOf(4);
            caseQuery.clear();

            // Name
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeName(1234)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeName(1234)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(1);
            caseQuery.clear();



            caseQuery.addDamagesIncludeName(array1)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeName(array2)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeName(1234)
            expect(caseQuery.queryObject.Damages.Include.Name).to.have.lengthOf(4);
            caseQuery.clear();

            // Type
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeType(1234)
            expect(caseQuery.queryObject.Damages.Include.Type).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeType(1234)
            expect(caseQuery.queryObject.Damages.Include.Type).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addDamagesIncludeType(array1)
            expect(caseQuery.queryObject.Damages.Include.Type).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeType(array2)
            expect(caseQuery.queryObject.Damages.Include.Type).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeType(1234)
            expect(caseQuery.queryObject.Damages.Include.Type).to.have.lengthOf(4);
            caseQuery.clear();
        })
    })

    describe('Patents', () => {
        it('should be able to add and remove case Types includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Patents.Include).to.be.empty;
            expect(caseQuery.queryObject.Patents.Exclude).to.be.empty;

            caseQuery.addPatentsInclude(1234)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Patents.Include).to.be.empty;
            caseQuery.addPatentsInclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Patents.Include).to.be.empty;

            caseQuery.addPatentsExclude(1234)
            expect(caseQuery.queryObject.Patents.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Patents.Exclude).to.be.empty;
            caseQuery.addPatentsExclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Patents.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Patents.Exclude).to.be.empty;
        })

        it('adding the same Case Type to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addPatentsInclude(1234)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(1);
            caseQuery.addPatentsInclude(1234)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPatentsExclude(1234)
            expect(caseQuery.queryObject.Patents.Exclude).to.have.lengthOf(1);
            caseQuery.addPatentsExclude(1234)
            expect(caseQuery.queryObject.Patents.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]
            caseQuery.addPatentsInclude(array1)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(3);
            caseQuery.addPatentsInclude(array2)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(4);
            caseQuery.addPatentsInclude(1234)
            expect(caseQuery.queryObject.Patents.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCaseTypesExclude(array1)
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(3)
            caseQuery.addCaseTypesExclude(array2)
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(4);
            caseQuery.addCaseTypesExclude(1234)
            expect(caseQuery.queryObject.CaseTypes.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Judges', () => {
        it('should be able to add and remove judges includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Judges.Include).to.be.empty;
            expect(caseQuery.queryObject.Judges.Exclude).to.be.empty;

            caseQuery.addJudgesInclude(1234)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Judges.Include).to.be.empty;
            caseQuery.addJudgesInclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Judges.Include).to.be.empty;

            caseQuery.addJudgesExclude(1234)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Judges.Exclude).to.be.empty;
            caseQuery.addJudgesExclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Judges.Exclude).to.be.empty;
        })

        it('adding the same judge to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]

            var caseQuery = new CasesQueryRequest();
            caseQuery.addJudgesInclude(1234)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(1);
            caseQuery.addJudgesInclude(1234)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addJudgesExclude(1234)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(1);
            caseQuery.addJudgesExclude(1234)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addJudgesInclude(array1)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(3);
            caseQuery.addJudgesInclude(array2)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(4);
            caseQuery.addJudgesInclude(1234)
            expect(caseQuery.queryObject.Judges.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addJudgesExclude(array1)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(3)
            caseQuery.addJudgesExclude(array2)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(4);
            caseQuery.addJudgesExclude(1234)
            expect(caseQuery.queryObject.Judges.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Magistrates', () => {
        it('should be able to add and remove magistrate includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Magistrates.Include).to.be.empty;
            expect(caseQuery.queryObject.Magistrates.Exclude).to.be.empty;

            caseQuery.addMagistratesInclude(1234)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Magistrates.Include).to.be.empty;
            caseQuery.addMagistratesInclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Magistrates.Include).to.be.empty;

            caseQuery.addMagistratesExclude(1234)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Magistrates.Exclude).to.be.empty;
            caseQuery.addMagistratesExclude([1234, 2345, 3456])
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Magistrates.Exclude).to.be.empty;
        })

        it('adding the same magistrate to includes and excludes should not duplicate entries', () => {
            var magistrate = 1234;
            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]

            var caseQuery = new CasesQueryRequest();
            caseQuery.addMagistratesInclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(1);
            caseQuery.addMagistratesInclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMagistratesExclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(1);
            caseQuery.addMagistratesExclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMagistratesInclude(array1)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(3);
            caseQuery.addMagistratesInclude(array2)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(4);
            caseQuery.addMagistratesInclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addMagistratesExclude(array1)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(3)
            caseQuery.addMagistratesExclude(array2)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(4);
            caseQuery.addMagistratesExclude(magistrate)
            expect(caseQuery.queryObject.Magistrates.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Courts', () => {
        var court = "njd"
        var array1 = ["njd", "dcd", "ord"]
        var array2 = ["dcd", "ord", "alsd"]

        it('should be able to add and remove courts includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Courts.Include).to.be.empty;
            expect(caseQuery.queryObject.Courts.Exclude).to.be.empty;

            caseQuery.addCourtsInclude(court)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Courts.Include).to.be.empty;
            caseQuery.addCourtsInclude(array1)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Courts.Include).to.be.empty;

            caseQuery.addCourtsExclude(court)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Courts.Exclude).to.be.empty;
            caseQuery.addCourtsExclude(array1)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Courts.Exclude).to.be.empty;
        })

        it('adding the same court to includes and excludes should not duplicate entries', () => {
            var court = "njd"
            var array1 = ["njd", "dcd", "ord"]
            var array2 = ["dcd", "ord", "alsd"]

            var caseQuery = new CasesQueryRequest();
            caseQuery.addCourtsInclude(court)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(1);
            caseQuery.addCourtsInclude(court)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCourtsExclude(court)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(1);
            caseQuery.addCourtsExclude(court)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCourtsInclude(array1)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(3);
            caseQuery.addCourtsInclude(array2)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(4);
            caseQuery.addCourtsInclude(court)
            expect(caseQuery.queryObject.Courts.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCourtsExclude(array1)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(3)
            caseQuery.addCourtsExclude(array2)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(4);
            caseQuery.addCourtsExclude(court)
            expect(caseQuery.queryObject.Courts.Exclude).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Law Firms', () => {
        var lawFirm = 1234
        var array1 = [1234, 2345, 3456,]
        var array2 = [2345, 3456, 4567]

        it('should be able to add and remove lawFirms includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.LawFirms.Include).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.Exclude).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.be.empty;

            caseQuery.addLawFirmsInclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.Include).to.be.empty;
            caseQuery.addLawFirmsInclude(array1)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.Include).to.be.empty;

            caseQuery.addLawFirmsExclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.Exclude).to.be.empty;
            caseQuery.addLawFirmsExclude(array1)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.Exclude).to.be.empty;

            caseQuery.addLawFirmsIncludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.be.empty;
            caseQuery.addLawFirmsIncludePlaintiff(array1)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.be.empty;

            caseQuery.addLawFirmsExcludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.be.empty;
            caseQuery.addLawFirmsExcludePlaintiff(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.be.empty;

            caseQuery.addLawFirmsIncludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.be.empty;
            caseQuery.addLawFirmsIncludeDefendant(array1)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.be.empty;

            caseQuery.addLawFirmsExcludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.be.empty;
            caseQuery.addLawFirmsExcludeDefendant(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.be.empty;

            caseQuery.addLawFirmsIncludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.be.empty;
            caseQuery.addLawFirmsIncludeThirdParty(array1)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.be.empty;

            caseQuery.addLawFirmsExcludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.be.empty;
            caseQuery.addLawFirmsExcludeThirdParty(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.be.empty;
        })

        it('adding the same law firm to includes and excludes should not duplicate entries', () => {
            var lawFirm = 1234
            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]

            var caseQuery = new CasesQueryRequest();
            caseQuery.addLawFirmsInclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(1);
            caseQuery.addLawFirmsInclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(1);
            caseQuery.addLawFirmsExclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsInclude(array1)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(3);
            caseQuery.addLawFirmsInclude(array2)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(4);
            caseQuery.addLawFirmsInclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExclude(array1)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(3)
            caseQuery.addLawFirmsExclude(array2)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(4);
            caseQuery.addLawFirmsExclude(lawFirm)
            expect(caseQuery.queryObject.LawFirms.Exclude).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludePlaintiff(array1)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludePlaintiff(array2)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludePlaintiff(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(3)
            caseQuery.addLawFirmsExcludePlaintiff(array2)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludePlaintiff(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeDefendant(array1)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeDefendant(array2)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeDefendant(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(3)
            caseQuery.addLawFirmsExcludeDefendant(array2)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeDefendant(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeThirdParty(array1)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeThirdParty(array2)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.IncludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeThirdParty(array1)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(3)
            caseQuery.addLawFirmsExcludeThirdParty(array2)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeThirdParty(lawFirm)
            expect(caseQuery.queryObject.LawFirms.ExcludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();
        })
    });

    describe('Parties', () => {
        var party = 1234
        var array1 = [1234, 2345, 3456,]
        var array2 = [2345, 3456, 4567]

        it('should be able to add and remove parties includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.Parties.Include).to.be.empty;
            expect(caseQuery.queryObject.Parties.Exclude).to.be.empty;
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.be.empty;

            caseQuery.addPartiesInclude(party)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.Include).to.be.empty;
            caseQuery.addPartiesInclude(array1)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.Include).to.be.empty;

            caseQuery.addPartiesExclude(party)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.Exclude).to.be.empty;
            caseQuery.addPartiesExclude(array1)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.Exclude).to.be.empty;

            caseQuery.addPartiesIncludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.be.empty;
            caseQuery.addPartiesIncludePlaintiff(array1)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.be.empty;

            caseQuery.addPartiesExcludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.be.empty;
            caseQuery.addPartiesExcludePlaintiff(array1)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.be.empty;

            caseQuery.addPartiesIncludeDefendant(party)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.be.empty;
            caseQuery.addPartiesIncludeDefendant(array1)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.be.empty;

            caseQuery.addPartiesExcludeDefendant(party)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.be.empty;
            caseQuery.addPartiesExcludeDefendant(array1)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.be.empty;

            caseQuery.addPartiesIncludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.be.empty;
            caseQuery.addPartiesIncludeThirdParty(array1)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.be.empty;

            caseQuery.addPartiesExcludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.be.empty;
            caseQuery.addPartiesExcludeThirdParty(array1)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.be.empty;
        })

        it('adding the same party to includes and excludes should not duplicate entries', () => {
            var party = 1234
            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]

            var caseQuery = new CasesQueryRequest();
            caseQuery.addPartiesInclude(party)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(1);
            caseQuery.addPartiesInclude(party)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExclude(party)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(1);
            caseQuery.addPartiesExclude(party)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesInclude(array1)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(3);
            caseQuery.addPartiesInclude(array2)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(4);
            caseQuery.addPartiesInclude(party)
            expect(caseQuery.queryObject.Parties.Include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExclude(array1)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(3)
            caseQuery.addPartiesExclude(array2)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(4);
            caseQuery.addPartiesExclude(party)
            expect(caseQuery.queryObject.Parties.Exclude).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.addPartiesIncludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.addPartiesExcludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludePlaintiff(array1)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(3);
            caseQuery.addPartiesIncludePlaintiff(array2)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(4);
            caseQuery.addPartiesIncludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.IncludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludePlaintiff(array1)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(3)
            caseQuery.addPartiesExcludePlaintiff(array2)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(4);
            caseQuery.addPartiesExcludePlaintiff(party)
            expect(caseQuery.queryObject.Parties.ExcludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludeDefendant(party)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeDefendant(party)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeDefendant(party)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeDefendant(party)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeDefendant(array1)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeDefendant(array2)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeDefendant(party)
            expect(caseQuery.queryObject.Parties.IncludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeDefendant(array1)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(3)
            caseQuery.addPartiesExcludeDefendant(array2)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeDefendant(party)
            expect(caseQuery.queryObject.Parties.ExcludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeThirdParty(array1)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeThirdParty(array2)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.IncludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeThirdParty(array1)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(3)
            caseQuery.addPartiesExcludeThirdParty(array2)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeThirdParty(party)
            expect(caseQuery.queryObject.Parties.ExcludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();
        })

        describe("Resolutions", () => {
            var resolution = "Claimant Win - Jury";
            var array1 = ["Claimant Win - Jury", "Procedural - Dismissal", "Claim Defendant Win - Summary Judgment"]
            var array2 = ["Claimant Win - Jury", "Procedural - Dismissal", "Claim Defendant Win - Consent Judgment"]

            it("should be able to add and remove resolution", () => {
                var caseQuery = new CasesQueryRequest();
                expect(caseQuery.queryObject.Resolutions.Include).to.be.empty;
                expect(caseQuery.queryObject.Resolutions.Exclude).to.be.empty;

                caseQuery.addResolutionsInclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.Resolutions.Include).to.be.empty;
                caseQuery.addResolutionsInclude(array1)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(3);
                caseQuery.finalize();
                caseQuery.clear();
                expect(caseQuery.queryObject.Resolutions.Include).to.be.empty;

                caseQuery.addResolutionsExclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.Resolutions.Exclude).to.be.empty;
                caseQuery.addResolutionsExclude(array1)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(3);
                caseQuery.clear();
                expect(caseQuery.queryObject.Resolutions.Exclude).to.be.empty;
            })

            it("adding the same resolution to include and excludes should not double", () => {
                var caseQuery = new CasesQueryRequest();
                caseQuery.addResolutionsInclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(1);
                caseQuery.addResolutionsInclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(1);
                caseQuery.clear();

                caseQuery.addResolutionsExclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(1);
                caseQuery.addResolutionsExclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(1);
                caseQuery.clear();

                caseQuery.addResolutionsInclude(array1)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(3);
                caseQuery.addResolutionsInclude(array2)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(4);
                caseQuery.addResolutionsInclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Include).to.have.lengthOf(4);
                caseQuery.clear();

                caseQuery.addResolutionsExclude(array1)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(3)
                caseQuery.addResolutionsExclude(array2)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(4);
                caseQuery.addResolutionsExclude(resolution)
                expect(caseQuery.queryObject.Resolutions.Exclude).to.have.lengthOf(4);
                caseQuery.clear();
            })
        })

        describe("MDL", () => {
            var mdl = 1234;
            var array1 = [1234, 2345, 3456]
            var array2 = [2345, 3456, 4567]

            it("should be able to add and remove MDLs", () => {
                var caseQuery = new CasesQueryRequest();
                expect(caseQuery.queryObject.MDL.Include).to.be.empty;
                expect(caseQuery.queryObject.MDL.Exclude).to.be.empty;

                caseQuery.addMDLInclude(mdl)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.MDL.Include).to.be.empty;
                caseQuery.addMDLInclude(array1)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(3);
                caseQuery.finalize();
                caseQuery.clear();
                expect(caseQuery.queryObject.MDL.Include).to.be.empty;

                caseQuery.addMDLExclude(mdl)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.MDL.Exclude).to.be.empty;
                caseQuery.addMDLExclude(array1)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(3);
                caseQuery.clear();
                expect(caseQuery.queryObject.MDL.Exclude).to.be.empty;
            })

            it("adding the same MDL to include and excludes should not double", () => {
                var caseQuery = new CasesQueryRequest();
                caseQuery.addMDLInclude(mdl)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(1);
                caseQuery.addMDLInclude(mdl)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(1);
                caseQuery.clear();

                caseQuery.addMDLExclude(mdl)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(1);
                caseQuery.addMDLExclude(mdl)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(1);
                caseQuery.clear();

                caseQuery.addMDLInclude(array1)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(3);
                caseQuery.addMDLInclude(array2)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(4);
                caseQuery.addMDLInclude(mdl)
                expect(caseQuery.queryObject.MDL.Include).to.have.lengthOf(4);
                caseQuery.clear();

                caseQuery.addMDLExclude(array1)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(3)
                caseQuery.addMDLExclude(array2)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(4);
                caseQuery.addMDLExclude(mdl)
                expect(caseQuery.queryObject.MDL.Exclude).to.have.lengthOf(4);
                caseQuery.clear();
            })
        })
    });
})

describe("Set/unset attributes", () => {
    var caseQuery = new CasesQueryRequest();

    describe("Damages", () => {
        var amount1 = 1237777
        var amount2 = 787991
        function setNegativeAmount() {
            caseQuery.setDamagesMinimumAmount(-1);
        }

        function setNonNumeric() {
            caseQuery.setDamagesMinimumAmount([]);
        }

        it('Setting Minimum Amount', () => {
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(0)
            caseQuery.setDamagesMinimumAmount(amount1)
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(amount1)
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(0)
            caseQuery.setDamagesMinimumAmount(amount1)
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(amount1)
            caseQuery.setDamagesMinimumAmount(amount2)
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(amount2)
            caseQuery.clear();
            expect(caseQuery.queryObject.Damages.Include.MinimumAmount).to.equal(0)
        })

        it('Setting Negative Amount throws error', () => {
            expect(setNegativeAmount).to.throw("Damages amount must be a number greater than 0")
        })

        it('Setting Non-Numeric Amount throws error', () => {
            expect(setNonNumeric).to.throw("Damages amount must be a number greater than 0")
        })
    })

    describe('Ordering', () => {
        var first = "ByFirstFiled";
        var last = "ByLastFiled";

        it('Setting Ordering', () => {
            expect(caseQuery.queryObject.Ordering).to.equal(first)
            caseQuery.setOrdering(last)
            expect(caseQuery.queryObject.Ordering).to.equal(last);
            caseQuery.clear();
            expect(caseQuery.queryObject.Ordering).to.equal(first)
        })
    })

    describe('Page', () => {
        var pageSize = 100;

        it('Setting Page Size', () => {
            expect(caseQuery.queryObject.PageSize).to.equal(5)
            caseQuery.setPageSize(pageSize)
            expect(caseQuery.queryObject.PageSize).to.equal(pageSize);
            caseQuery.clear();
            expect(caseQuery.queryObject.PageSize).to.equal(5)
        })

        it('Setting Page', () => {
            expect(caseQuery.queryObject.Page).to.equal(1)
            caseQuery.setPage(5)
            expect(caseQuery.queryObject.Page).to.equal(5);
            caseQuery.nextPage();
            expect(caseQuery.queryObject.Page).to.equal(6)
            caseQuery.nextPage();
            expect(caseQuery.queryObject.Page).to.equal(7)
            caseQuery.clear();
            expect(caseQuery.queryObject.Page).to.equal(1)
        })
    })
})

describe('Date Operation', () => {
    var caseQuery = new CasesQueryRequest();
    var operators = ["OnOrAfter", "OnOrBefore"]
    var fields = ["Filed", "Terminated", "LastDocket", "Trial"]
    var goodDate = "2021-01-01"
    var badDate = "01/01/2021"

    it('Adding valid dates, fields and operators succeed', () => {
        operators.forEach(operator => {
            fields.forEach(field => {
                caseQuery.setDate(goodDate, field, operator);
                expect(caseQuery.queryObject.Dates[field][operator]).to.equal(goodDate)
                caseQuery.clear()
                expect(caseQuery.queryObject.Dates[field][operator]).to.be.empty;
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

    describe('Post Body', () => {
        it("should be able to retrieve POST body", () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.getPostBody()).to.not.be.empty;
        })
    })
})