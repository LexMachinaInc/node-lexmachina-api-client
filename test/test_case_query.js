const CasesQueryRequest = require('../src/case_query_request.js');
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

describe('Add and Remove Query Statements', () => {

    describe('Case Status', () => {
        it('should be able to add and remove Case Status', () => {
            var caseQuery = new CasesQueryRequest();
            ['open', 'close'].forEach(caseStatus => {
                caseQuery.setCaseStatus(caseStatus);
                expect(caseQuery.queryObject.caseStatus).to.equal(caseStatus);
            });
            caseQuery.clear();
            expect(caseQuery.queryObject.caseStatus).to.be.empty;
        });
    });

    describe('Case Types', () => {
        it('should be able to add and remove case Types includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.caseTypes.include).to.be.empty;
            expect(caseQuery.queryObject.caseTypes.exclude).to.be.empty;

            caseQuery.addCaseTypesInclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTypes.include).to.be.empty;
            caseQuery.addCaseTypesInclude(['Antitrust', 'Copyrights', 'Contracts']);
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTypes.include).to.be.empty;

            caseQuery.addCaseTypesExclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTypes.exclude).to.be.empty;
            caseQuery.addCaseTypesExclude(['Antitrust', 'Copyrights', 'Contracts']);
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTypes.exclude).to.be.empty;
        });

        it('adding the same Case Type to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addCaseTypesInclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(1);
            caseQuery.addCaseTypesInclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCaseTypesExclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.addCaseTypesExclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Antitrust', 'Bankruptcy', 'Civil Rights'];
            var array2 = ['Antitrust', 'Bankruptcy', 'Consumer Protection'];
            caseQuery.addCaseTypesInclude(array1);
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(3);
            caseQuery.addCaseTypesInclude(array2);
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(4);
            caseQuery.addCaseTypesInclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCaseTypesExclude(array1);
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(3);
            caseQuery.addCaseTypesExclude(array2);
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(4);
            caseQuery.addCaseTypesExclude('Antitrust');
            expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Case Tags', () => {
        it('should be able to add and remove case Tags includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.caseTags.include).to.be.empty;
            expect(caseQuery.queryObject.caseTags.exclude).to.be.empty;

            caseQuery.addCaseTagsInclude('Trial');
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTags.include).to.be.empty;
            caseQuery.addCaseTagsInclude(['Trial', 'COVID-19', 'Pro Se']);
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTags.include).to.be.empty;

            caseQuery.addCaseTagsExclude('Trial');
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTags.exclude).to.be.empty;
            caseQuery.addCaseTagsExclude(['Trial', 'COVID-19', 'Pro Se']);
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.caseTags.exclude).to.be.empty;
        });

        it('adding the same Case Tag to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addCaseTagsInclude('Trial');
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(1);
            caseQuery.addCaseTagsInclude('Trial');
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCaseTagsExclude('Trial');
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(1);
            caseQuery.addCaseTagsExclude('Trial');
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Trial', 'COVID-19', 'Pro Se'];
            var array2 = ['Trial', 'COVID-19', 'Appealed'];
            caseQuery.addCaseTagsInclude(array1);
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(3);
            caseQuery.addCaseTagsInclude(array2);
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(4);
            caseQuery.addCaseTagsInclude('Trial');
            expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCaseTagsExclude(array1);
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(3);
            caseQuery.addCaseTagsExclude(array2);
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(4);
            caseQuery.addCaseTagsExclude('Trial');
            expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Events', () => {
        it('should be able to add and remove events includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.events.includeEventTypes).to.be.empty;
            expect(caseQuery.queryObject.events.excludeEventTypes).to.be.empty;

            caseQuery.addEventTypesInclude('Filed');
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.events.includeEventTypes).to.be.empty;
            caseQuery.addEventTypesInclude(['Markman Hearing', 'Permanent Injuction', 'Summary Judgement']);
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.events.includeEventTypes).to.be.empty;

            caseQuery.addEventTypesExclude('Filed');
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.events.excludeEventTypes).to.be.empty;
            caseQuery.addEventTypesExclude(['Markman Hearing', 'Permanent Injuction', 'Summary Judgement']);
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.events.excludeEventTypes).to.be.empty;
        });

        it('adding the same events to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addEventTypesInclude('Filed');
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(1);
            caseQuery.addEventTypesInclude('Filed');
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addEventTypesExclude('Filed');
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(1);
            caseQuery.addEventTypesExclude('Filed');
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Markman Hearing', 'Permanent Injuction', 'Summary Judgement'];
            var array2 = ['Permanent Injuction', 'Summary Judgement', 'Dismiss (Contested)'];
            caseQuery.addEventTypesInclude(array1);
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(3);
            caseQuery.addEventTypesInclude(array2);
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(4);
            caseQuery.addEventTypesInclude('Markman Hearing');
            expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addEventTypesExclude(array1);
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(3);
            caseQuery.addEventTypesExclude(array2);
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(4);
            caseQuery.addEventTypesExclude('Markman Hearing');
            expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Findings', () => {
        it('should be able to add and remove findings includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.be.empty;
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.be.empty;
            expect(caseQuery.queryObject.findings[0].nameType.include).to.be.empty;
            expect(caseQuery.queryObject.findings[0].nameType.exclude).to.be.empty;

            caseQuery.addFindingsIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.be.empty;
            caseQuery.addFindingsIncludeAwardedToParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.be.empty;

            caseQuery.addFindingsIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.be.empty;
            caseQuery.addFindingsIncludeAwardedAgainstParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.be.empty;

            caseQuery.addFindingsIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;
            caseQuery.addFindingsIncludeJudgmentSource([1234, 2345, 3456]);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;

            caseQuery.addFindingsIncludePatentInvalidityReasons(1234);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.be.empty;
            caseQuery.addFindingsIncludePatentInvalidityReasons([1234, 2345, 3456]);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.be.empty;

            var name1 = 'test name';
            var type1 = 'test type';
            var name2 = 'test name 2';
            var type2 = 'test type 2';

            caseQuery.addFindingsIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.findings[0].nameType.include).to.have.lengthOf(1);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            caseQuery.addFindingsIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.findings[0].nameType.include).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeNameType(name2, type2);
            expect(caseQuery.queryObject.findings[0].nameType.include).to.have.lengthOf(2);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('name',name2);
            (caseQuery.queryObject.findings[0].nameType.include).should.contain.a.thing.with.deep.property('type',type2);

        });

        it('adding the same findings IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addFindingsIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();


            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];
            caseQuery.addFindingsIncludeAwardedToParties(array1);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeAwardedToParties(array2);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();



            caseQuery.addFindingsIncludeAwardedAgainstParties(array1);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeAwardedAgainstParties(array2);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            caseQuery.addFindingsIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.addFindingsIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addFindingsIncludeJudgmentSource(array1);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.addFindingsIncludeJudgmentSource(array2);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.addFindingsIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.clear();

            // Patent Invalidity Reasons
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(1);
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addFindingsIncludePatentInvalidityReasons(array1);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(3);
            caseQuery.addFindingsIncludePatentInvalidityReasons(array2);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(4);
            caseQuery.addFindingsIncludePatentInvalidityReasons(1234);
            expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Remedies', () => {
        it('should be able to add and remove remedies includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.be.empty;
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;

            caseQuery.addRemediesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.be.empty;
            caseQuery.addRemediesIncludeAwardedToParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.be.empty;

            caseQuery.addRemediesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.be.empty;
            caseQuery.addRemediesIncludeAwardedAgainstParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.be.empty;

            caseQuery.addRemediesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;
            caseQuery.addRemediesIncludeJudgmentSource([1234, 2345, 3456]);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;

            var name1 = 'test name';
            var type1 = 'test type';
            var name2 = 'test name 2';
            var type2 = 'test type 2';

            caseQuery.addRemediesIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.remedies[0].nameType.include).to.have.lengthOf(1);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            caseQuery.addRemediesIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.remedies[0].nameType.include).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeNameType(name2, type2);
            expect(caseQuery.queryObject.remedies[0].nameType.include).to.have.lengthOf(2);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('name',name2);
            (caseQuery.queryObject.remedies[0].nameType.include).should.contain.a.thing.with.deep.property('type',type2);


        });

        it('adding the same remedy IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addRemediesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];
            caseQuery.addRemediesIncludeAwardedToParties(array1);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeAwardedToParties(array2);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addRemediesIncludeAwardedAgainstParties(array1);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeAwardedAgainstParties(array2);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            caseQuery.addRemediesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.addRemediesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addRemediesIncludeJudgmentSource(array1);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.addRemediesIncludeJudgmentSource(array2);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.addRemediesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Damages', () => {
        it('should be able to add and remove damage includes ', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.be.empty;
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.be.empty;
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;
            expect(caseQuery.queryObject.damages[0].nameType.include).to.be.empty;
            expect(caseQuery.queryObject.damages[0].nameType.exclude).to.be.empty;

            caseQuery.addDamagesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.be.empty;
            caseQuery.addDamagesIncludeAwardedToParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.be.empty;

            caseQuery.addDamagesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.be.empty;
            caseQuery.addDamagesIncludeAwardedAgainstParties([1234, 2345, 3456]);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.be.empty;

            caseQuery.addDamagesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;
            caseQuery.addDamagesIncludeJudgmentSource([1234, 2345, 3456]);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;

            var name1 = 'test name';
            var type1 = 'test type';
            var name2 = 'test name 2';
            var type2 = 'test type 2';

            caseQuery.addDamagesIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.damages[0].nameType.include).to.have.lengthOf(1);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            caseQuery.addDamagesIncludeNameType(name1, type1);
            expect(caseQuery.queryObject.damages[0].nameType.include).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeNameType(name2, type2);
            expect(caseQuery.queryObject.damages[0].nameType.include).to.have.lengthOf(2);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('name',name1);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('type',type1);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('name',name2);
            (caseQuery.queryObject.damages[0].nameType.include).should.contain.a.thing.with.deep.property('type',type2);


        });

        it('adding the same findings IDs to includes should not duplicate entries', () => {
            //Awarded To Parties
            var caseQuery = new CasesQueryRequest();
            caseQuery.addDamagesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];
            caseQuery.addDamagesIncludeAwardedToParties(array1);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeAwardedToParties(array2);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeAwardedToParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Awarded Against Parties
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addDamagesIncludeAwardedAgainstParties(array1);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeAwardedAgainstParties(array2);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeAwardedAgainstParties(1234);
            expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(4);
            caseQuery.clear();

            // Judgment Sources
            caseQuery.addDamagesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.addDamagesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addDamagesIncludeJudgmentSource(array1);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(3);
            caseQuery.addDamagesIncludeJudgmentSource(array2);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.addDamagesIncludeJudgmentSource(1234);
            expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(4);
            caseQuery.clear();

        });
    });

    describe('Patents', () => {
        it('should be able to add and remove case Types includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.patents.include).to.be.empty;
            expect(caseQuery.queryObject.patents.exclude).to.be.empty;

            caseQuery.addPatentsInclude(1234);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.patents.include).to.be.empty;
            caseQuery.addPatentsInclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.patents.include).to.be.empty;

            caseQuery.addPatentsExclude(1234);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.patents.exclude).to.be.empty;
            caseQuery.addPatentsExclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.patents.exclude).to.be.empty;
        });

        it('adding the same Case Type to includes and excludes should not duplicate entries', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addPatentsInclude(1234);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(1);
            caseQuery.addPatentsInclude(1234);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPatentsExclude(1234);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(1);
            caseQuery.addPatentsExclude(1234);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];
            caseQuery.addPatentsInclude(array1);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(3);
            caseQuery.addPatentsInclude(array2);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(4);
            caseQuery.addPatentsInclude(1234);
            expect(caseQuery.queryObject.patents.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPatentsExclude(array1);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(3);
            caseQuery.addPatentsExclude(array2);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(4);
            caseQuery.addPatentsExclude(1234);
            expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Judges', () => {
        it('should be able to add and remove judges includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;

            caseQuery.addJudgesInclude(1234);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.judges.include).to.be.empty;
            caseQuery.addJudgesInclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.judges.include).to.be.empty;

            caseQuery.addJudgesExclude(1234);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;
            caseQuery.addJudgesExclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.judges.exclude).to.be.empty;
        });

        it('adding the same judge to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new CasesQueryRequest();
            caseQuery.addJudgesInclude(1234);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(1);
            caseQuery.addJudgesInclude(1234);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addJudgesExclude(1234);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(1);
            caseQuery.addJudgesExclude(1234);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addJudgesInclude(array1);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(3);
            caseQuery.addJudgesInclude(array2);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(4);
            caseQuery.addJudgesInclude(1234);
            expect(caseQuery.queryObject.judges.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addJudgesExclude(array1);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(3);
            caseQuery.addJudgesExclude(array2);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(4);
            caseQuery.addJudgesExclude(1234);
            expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Magistrates', () => {
        it('should be able to add and remove magistrate includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.magistrates.include).to.be.empty;
            expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;

            caseQuery.addMagistratesInclude(1234);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.magistrates.include).to.be.empty;
            caseQuery.addMagistratesInclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.magistrates.include).to.be.empty;

            caseQuery.addMagistratesExclude(1234);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;
            caseQuery.addMagistratesExclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;
        });

        it('adding the same magistrate to includes and excludes should not duplicate entries', () => {
            var magistrate = 1234;
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new CasesQueryRequest();
            caseQuery.addMagistratesInclude(magistrate);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(1);
            caseQuery.addMagistratesInclude(magistrate);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMagistratesExclude(magistrate);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(1);
            caseQuery.addMagistratesExclude(magistrate);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMagistratesInclude(array1);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(3);
            caseQuery.addMagistratesInclude(array2);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(4);
            caseQuery.addMagistratesInclude(magistrate);
            expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addMagistratesExclude(array1);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(3);
            caseQuery.addMagistratesExclude(array2);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(4);
            caseQuery.addMagistratesExclude(magistrate);
            expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Courts', () => {
        var court = 'njd';
        var array1 = ['njd', 'dcd', 'ord'];

        it('should be able to add and remove courts includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;

            caseQuery.addCourtsInclude(court);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.courts.include).to.be.empty;
            caseQuery.addCourtsInclude(array1);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.courts.include).to.be.empty;

            caseQuery.addCourtsExclude(court);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;
            caseQuery.addCourtsExclude(array1);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.courts.exclude).to.be.empty;
        });

        it('adding the same court to includes and excludes should not duplicate entries', () => {
            var court = 'njd';
            var array1 = ['njd', 'dcd', 'ord'];
            var array2 = ['dcd', 'ord', 'alsd'];

            var caseQuery = new CasesQueryRequest();
            caseQuery.addCourtsInclude(court);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(1);
            caseQuery.addCourtsInclude(court);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCourtsExclude(court);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(1);
            caseQuery.addCourtsExclude(court);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addCourtsInclude(array1);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(3);
            caseQuery.addCourtsInclude(array2);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(4);
            caseQuery.addCourtsInclude(court);
            expect(caseQuery.queryObject.courts.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addCourtsExclude(array1);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(3);
            caseQuery.addCourtsExclude(array2);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(4);
            caseQuery.addCourtsExclude(court);
            expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Law Firms', () => {
        var lawFirm = 1234;
        var array1 = [1234, 2345, 3456];

        it('should be able to add and remove lawFirms includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;

            caseQuery.addLawFirmsInclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            caseQuery.addLawFirmsInclude(array1);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;

            caseQuery.addLawFirmsExclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;
            caseQuery.addLawFirmsExclude(array1);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

            caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
            caseQuery.addLawFirmsIncludePlaintiff(array1);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;

            caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;
            caseQuery.addLawFirmsExcludePlaintiff(array1);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

            caseQuery.addLawFirmsIncludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
            caseQuery.addLawFirmsIncludeDefendant(array1);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;

            caseQuery.addLawFirmsExcludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;
            caseQuery.addLawFirmsExcludeDefendant(array1);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;

            caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            caseQuery.addLawFirmsIncludeThirdParty(array1);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;

            caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;
            caseQuery.addLawFirmsExcludeThirdParty(array1);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;
        });

        it('adding the same law firm to includes and excludes should not duplicate entries', () => {
            var lawFirm = 1234;
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new CasesQueryRequest();
            caseQuery.addLawFirmsInclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(1);
            caseQuery.addLawFirmsInclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(1);
            caseQuery.addLawFirmsExclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsInclude(array1);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(3);
            caseQuery.addLawFirmsInclude(array2);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(4);
            caseQuery.addLawFirmsInclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExclude(array1);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(3);
            caseQuery.addLawFirmsExclude(array2);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(4);
            caseQuery.addLawFirmsExclude(lawFirm);
            expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludePlaintiff(array1);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludePlaintiff(array2);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludePlaintiff(array1);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(3);
            caseQuery.addLawFirmsExcludePlaintiff(array2);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludePlaintiff(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeDefendant(array1);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeDefendant(array2);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeDefendant(array1);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(3);
            caseQuery.addLawFirmsExcludeDefendant(array2);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeDefendant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeThirdParty(array1);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeThirdParty(array2);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeThirdParty(array1);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.addLawFirmsExcludeThirdParty(array2);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeThirdParty(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Parties', () => {
        var party = 1234;
        var array1 = [1234, 2345, 3456];

        it('should be able to add and remove parties includes and excludes', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;
            expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;
            expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;

            caseQuery.addPartiesInclude(party);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            caseQuery.addPartiesInclude(array1);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.include).to.be.empty;

            caseQuery.addPartiesExclude(party);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;
            caseQuery.addPartiesExclude(array1);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;

            caseQuery.addPartiesIncludePlaintiff(party);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
            caseQuery.addPartiesIncludePlaintiff(array1);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;

            caseQuery.addPartiesExcludePlaintiff(party);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;
            caseQuery.addPartiesExcludePlaintiff(array1);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

            caseQuery.addPartiesIncludeDefendant(party);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
            caseQuery.addPartiesIncludeDefendant(array1);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;

            caseQuery.addPartiesExcludeDefendant(party);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;
            caseQuery.addPartiesExcludeDefendant(array1);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

            caseQuery.addPartiesIncludeThirdParty(party);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            caseQuery.addPartiesIncludeThirdParty(array1);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;

            caseQuery.addPartiesExcludeThirdParty(party);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
            caseQuery.addPartiesExcludeThirdParty(array1);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
        });

        it('adding the same party to includes and excludes should not duplicate entries', () => {
            var party = 1234;
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new CasesQueryRequest();
            caseQuery.addPartiesInclude(party);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(1);
            caseQuery.addPartiesInclude(party);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExclude(party);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(1);
            caseQuery.addPartiesExclude(party);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesInclude(array1);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(3);
            caseQuery.addPartiesInclude(array2);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(4);
            caseQuery.addPartiesInclude(party);
            expect(caseQuery.queryObject.parties.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExclude(array1);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(3);
            caseQuery.addPartiesExclude(array2);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(4);
            caseQuery.addPartiesExclude(party);
            expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludePlaintiff(party);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(1);
            caseQuery.addPartiesIncludePlaintiff(party);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludePlaintiff(party);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.addPartiesExcludePlaintiff(party);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludePlaintiff(array1);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(3);
            caseQuery.addPartiesIncludePlaintiff(array2);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(4);
            caseQuery.addPartiesIncludePlaintiff(party);
            expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludePlaintiff(array1);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(3);
            caseQuery.addPartiesExcludePlaintiff(array2);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(4);
            caseQuery.addPartiesExcludePlaintiff(party);
            expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludeDefendant(party);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeDefendant(party);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeDefendant(party);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeDefendant(party);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeDefendant(array1);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeDefendant(array2);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeDefendant(party);
            expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeDefendant(array1);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(3);
            caseQuery.addPartiesExcludeDefendant(array2);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeDefendant(party);
            expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludeThirdParty(party);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeThirdParty(party);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeThirdParty(party);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeThirdParty(party);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeThirdParty(array1);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeThirdParty(array2);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeThirdParty(party);
            expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeThirdParty(array1);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.addPartiesExcludeThirdParty(array2);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeThirdParty(party);
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Resolutions', () => {
        var summary1 = 'Claimant Win';
        var specific1 = 'Contested Dismissal';
        var summary2 = 'Procedural';
        var specific2 = 'Severance';
        var summary3 = 'Likely Settlement';
        var specific3 = 'Likely Settlement';


        it('should be able to add and remove resolution', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.resolutions.include).to.be.empty;
            expect(caseQuery.queryObject.resolutions.exclude).to.be.empty;

            caseQuery.addResolutionsInclude(summary1, specific1);
            expect(caseQuery.queryObject.resolutions.include).to.have.lengthOf(1);
            caseQuery.addResolutionsInclude(summary2, specific2);
            expect(caseQuery.queryObject.resolutions.include).to.have.lengthOf(2);
            caseQuery.addResolutionsInclude(summary3, specific3);
            expect(caseQuery.queryObject.resolutions.include).to.have.lengthOf(3);
            caseQuery.addResolutionsInclude(summary3, specific3);
            expect(caseQuery.queryObject.resolutions.include).to.have.lengthOf(3);
            caseQuery.clear();

            caseQuery.addResolutionsExclude(summary1, specific1);
            expect(caseQuery.queryObject.resolutions.exclude).to.have.lengthOf(1);
            caseQuery.addResolutionsExclude(summary2, specific2);
            expect(caseQuery.queryObject.resolutions.exclude).to.have.lengthOf(2);
            caseQuery.addResolutionsExclude(summary3, specific3);
            expect(caseQuery.queryObject.resolutions.exclude).to.have.lengthOf(3);
            caseQuery.addResolutionsExclude(summary3, specific3);
            expect(caseQuery.queryObject.resolutions.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.resolutions.exclude).to.be.empty;
        });

    });

    describe('MDL', () => {
        var mdl = 1234;
        var array1 = [1234, 2345, 3456];
        var array2 = [2345, 3456, 4567];

        it('should be able to add and remove MDLs', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.mdl.include).to.be.empty;
            expect(caseQuery.queryObject.mdl.exclude).to.be.empty;

            caseQuery.addMDLInclude(mdl);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.mdl.include).to.be.empty;
            caseQuery.addMDLInclude(array1);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.mdl.include).to.be.empty;

            caseQuery.addMDLExclude(mdl);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.mdl.exclude).to.be.empty;
            caseQuery.addMDLExclude(array1);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.mdl.exclude).to.be.empty;
        });

        it('adding the same MDL to include and excludes should not double', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.addMDLInclude(mdl);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(1);
            caseQuery.addMDLInclude(mdl);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMDLExclude(mdl);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(1);
            caseQuery.addMDLExclude(mdl);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addMDLInclude(array1);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(3);
            caseQuery.addMDLInclude(array2);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(4);
            caseQuery.addMDLInclude(mdl);
            expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addMDLExclude(array1);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(3);
            caseQuery.addMDLExclude(array2);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(4);
            caseQuery.addMDLExclude(mdl);
            expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });
});

describe('Set/unset attributes', () => {
    var caseQuery = new CasesQueryRequest();

    describe('Damages', () => {
        var amount1 = 1237777;
        var amount2 = 787991;
        function setNegativeAmount() {
            caseQuery.setDamagesMinimumAmount(-1);
        }

        function setNonNumeric() {
            caseQuery.setDamagesMinimumAmount([]);
        }

        it('Setting Minimum Amount', () => {
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(0);
            caseQuery.setDamagesMinimumAmount(amount1);
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(amount1);
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(0);
            caseQuery.setDamagesMinimumAmount(amount1);
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(amount1);
            caseQuery.setDamagesMinimumAmount(amount2);
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(amount2);
            caseQuery.clear();
            expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(0);
        });

        it('Setting Negative Amount throws error', () => {
            expect(setNegativeAmount).to.throw('Damages amount must be a number greater than 0');
        });

        it('Setting Non-Numeric Amount throws error', () => {
            expect(setNonNumeric).to.throw('Damages amount must be a number greater than 0');
        });
    });

    describe('Ordering', () => {
        var first = 'ByFirstFiled';
        var last = 'ByLastFiled';

        it('Setting Ordering', () => {
            expect(caseQuery.queryObject.ordering).to.equal(first);
            caseQuery.setOrdering(last);
            expect(caseQuery.queryObject.ordering).to.equal(last);
            caseQuery.clear();
            expect(caseQuery.queryObject.ordering).to.equal(first);
        });
    });

    describe('Page', () => {
        var pageSize = 100;

        it('Setting Page Size', () => {
            expect(caseQuery.queryObject.pageSize).to.equal(5);
            caseQuery.setPageSize(pageSize);
            expect(caseQuery.queryObject.pageSize).to.equal(pageSize);
            caseQuery.clear();
            expect(caseQuery.queryObject.pageSize).to.equal(5);
        });

        it('Setting Page', () => {
            expect(caseQuery.queryObject.page).to.equal(1);
            caseQuery.setPage(5);
            expect(caseQuery.queryObject.page).to.equal(5);
            caseQuery.nextPage();
            expect(caseQuery.queryObject.page).to.equal(6);
            caseQuery.nextPage();
            expect(caseQuery.queryObject.page).to.equal(7);
            caseQuery.clear();
            expect(caseQuery.queryObject.page).to.equal(1);
        });
    });
});

describe('Date Operation', () => {
    var caseQuery = new CasesQueryRequest();
    var operators = ['onOrAfter', 'onOrBefore'];
    var fields = ['filed', 'terminated', 'lastDocket', 'trial'];
    var goodDate = '2021-01-01';
    var badDate = '01/01/2021';

    it('Adding valid dates, fields and operators succeed', () => {
        operators.forEach(operator => {
            fields.forEach(field => {
                caseQuery.setDate(goodDate, field, operator);
                expect(caseQuery.queryObject.dates[field][operator]).to.equal(goodDate);
                caseQuery.clear();
                expect(caseQuery.queryObject.dates[field][operator]).to.be.empty;
            });
        });
    });

    it('Adding invalid date throws error', () => {
        function badDateSet() {
            caseQuery.setDate(badDate, fields[0], operators[0]);
        }
        expect(badDateSet).to.throw(/Dates must be in YYYY-MM-DD format/);
        expect(badDateSet).to.throw(badDate);
    });

    it('Adding invalid operator throws error', () => {
        var badOperator = 'notAnOperator';
        function badOperatorSet() {
            caseQuery.setDate(goodDate, fields[0], badOperator);
        }
        expect(badOperatorSet).to.throw(/Not a valid operator/);
        expect(badOperatorSet).to.throw(badOperator);
    });

    it('Adding invalid field throws error', () => {
        var badField = 'notAField';
        function badFieldSet() {
            caseQuery.setDate(goodDate, badField, operators[0]);
        }
        expect(badFieldSet).to.throw(/Not a valid field/);
        expect(badFieldSet).to.throw(badField);
    });

    describe('Post Body', () => {
        it('should be able to retrieve POST body', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.getPostBody()).to.not.be.empty;
        });
    });

    describe('Clear Empty Values', () => {
        it('clearing empty query should leave no fields', () => {
            var caseQuery = new CasesQueryRequest();
            caseQuery.finalize();
            //console.log("After clearing, object is %s", JSON.stringify(caseQuery.queryObject));
            expect(Object.keys(caseQuery.queryObject)).to.have.lengthOf(3);
        });

    });

    describe('Chaining Constraints', () => {
        var includeStringArray = ['includeString1', 'includeString2', 'includeString3'];
        var excludeStringArray = ['excludeString1', 'excludeString2', 'excludeString3'];
        var includeIntegerArray = [12345, 23456, 34567];
        var excludeIntegerArray = [54321, 65432, 76543];



        describe('chaining constraint functions should add all constraints', () => {
            var caseQuery = new CasesQueryRequest();
            expect(caseQuery.queryObject.caseTags.include).to.be.empty;
            expect(caseQuery.queryObject.caseTags.exclude).to.be.empty;
            
            it('chaining constraint functions should set case status and add tags', () => {

                caseQuery.setCaseStatus('TestValue')
                    .addCaseTagsInclude('TagInclude')
                    .addCaseTagsExclude('TagExclude')
                    .addCaseTagsInclude('TagInclude2');
                expect(caseQuery.queryObject.caseStatus).to.equal('TestValue');
                expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.caseTags.include).to.contain('TagInclude');
                expect(caseQuery.queryObject.caseTags.include).to.contain('TagInclude2');
                expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.caseTags.exclude).to.contain('TagExclude');
                caseQuery.clear();

                caseQuery.addCaseTagsInclude(includeStringArray)
                    .addCaseTagsExclude(excludeStringArray)
                    .addCaseTagsInclude('TagInclude');
                expect(caseQuery.queryObject.caseTags.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.caseTags.include).to.contain('TagInclude');
                includeStringArray.forEach(caseTag => {
                    expect(caseQuery.queryObject.caseTags.include).to.contain(caseTag);
                });
                expect(caseQuery.queryObject.caseTags.exclude).to.have.lengthOf(3);
                excludeStringArray.forEach(caseTag => {
                    expect(caseQuery.queryObject.caseTags.exclude).to.contain(caseTag);
                });      
            });       

            it('chaining constraint functions should add case types', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.caseTypes.include).to.be.empty;
                expect(caseQuery.queryObject.caseTypes.exclude).to.be.empty;
            
                caseQuery.addCaseTypesInclude('TypeInclude')
                    .addCaseTypesExclude('TypeExclude')
                    .addCaseTypesInclude('TypeInclude2');
                expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.caseTypes.include).to.contain('TypeInclude');
                expect(caseQuery.queryObject.caseTypes.include).to.contain('TypeInclude2');
                expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.caseTypes.exclude).to.contain('TypeExclude');

                caseQuery.clear();

                expect(caseQuery.queryObject.caseTypes.include).to.be.empty;
                expect(caseQuery.queryObject.caseTypes.exclude).to.be.empty;

                caseQuery.addCaseTypesInclude(includeStringArray)
                    .addCaseTypesExclude(excludeStringArray)
                    .addCaseTypesInclude('TypeInclude');
                expect(caseQuery.queryObject.caseTypes.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.caseTypes.include).to.contain('TypeInclude');
                includeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.caseTypes.include).to.contain(caseType);
                });
                expect(caseQuery.queryObject.caseTypes.exclude).to.have.lengthOf(3);
                excludeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.caseTypes.exclude).to.contain(caseType);
                });            
            }); 

            it('chaining constraint functions should add event types', () => {

                caseQuery.clear();

                caseQuery.addEventTypesInclude('EventTypeInclude')
                    .addEventTypesExclude('EventTypeExclude')
                    .addEventTypesInclude('EventTypeInclude2');
                expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(2);
                expect(caseQuery.queryObject.events.includeEventTypes).to.contain('EventTypeInclude');
                expect(caseQuery.queryObject.events.includeEventTypes).to.contain('EventTypeInclude2');
                expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(1);
                expect(caseQuery.queryObject.events.excludeEventTypes).to.contain('EventTypeExclude');

                caseQuery.clear();

                expect(caseQuery.queryObject.events.includeEventTypes).to.be.empty;
                expect(caseQuery.queryObject.events.excludeEventTypes).to.be.empty;

                caseQuery.addEventTypesInclude(includeStringArray)
                    .addEventTypesExclude(excludeStringArray)
                    .addEventTypesInclude('EventTypeInclude');
                expect(caseQuery.queryObject.events.includeEventTypes).to.have.lengthOf(4);
                expect(caseQuery.queryObject.events.includeEventTypes).to.contain('EventTypeInclude');
                includeStringArray.forEach(eventType => {
                    expect(caseQuery.queryObject.events.includeEventTypes).to.contain(eventType);
                });
                expect(caseQuery.queryObject.events.excludeEventTypes).to.have.lengthOf(3);
                excludeStringArray.forEach(eventType => {
                    expect(caseQuery.queryObject.events.excludeEventTypes).to.contain(eventType);
                });             
            });

            it('chaining constraint functions should add courts', () => {

                caseQuery.clear();


                expect(caseQuery.queryObject.courts.include).to.be.empty;
                expect(caseQuery.queryObject.courts.exclude).to.be.empty;
            
                caseQuery.addCourtsInclude('CourtInclude')
                    .addCourtsExclude('CourtExclude')
                    .addCourtsInclude('CourtInclude2');
                expect(caseQuery.queryObject.courts.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.courts.include).to.contain('CourtInclude');
                expect(caseQuery.queryObject.courts.include).to.contain('CourtInclude2');
                expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.courts.exclude).to.contain('CourtExclude');

                caseQuery.clear();

                expect(caseQuery.queryObject.courts.include).to.be.empty;
                expect(caseQuery.queryObject.courts.exclude).to.be.empty;

                caseQuery.addCourtsInclude(includeStringArray)
                    .addCourtsExclude(excludeStringArray)
                    .addCourtsInclude('CourtInclude');
                expect(caseQuery.queryObject.courts.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.courts.include).to.contain('CourtInclude');
                includeStringArray.forEach(court => {
                    expect(caseQuery.queryObject.courts.include).to.contain(court);
                });
                expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(3);
                excludeStringArray.forEach(court => {
                    expect(caseQuery.queryObject.courts.exclude).to.contain(court);
                });             
            });

            it('chaining constraint functions should add judges', () => {

                caseQuery.clear();

   

                expect(caseQuery.queryObject.judges.include).to.be.empty;
                expect(caseQuery.queryObject.judges.exclude).to.be.empty;

                caseQuery.addJudgesInclude(3434)
                    .addJudgesExclude(4545)
                    .addJudgesInclude(5656);
                expect(caseQuery.queryObject.judges.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.judges.include).to.contain(3434);
                expect(caseQuery.queryObject.judges.include).to.contain(5656);
                expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.judges.exclude).to.contain(4545);
                caseQuery.clear();

                caseQuery.addJudgesInclude(includeIntegerArray)
                    .addJudgesExclude(excludeIntegerArray)
                    .addJudgesInclude(333);
                expect(caseQuery.queryObject.judges.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.judges.include).to.contain(333);
                includeIntegerArray.forEach(judge => {
                    expect(caseQuery.queryObject.judges.include).to.contain(judge);
                });
                expect(caseQuery.queryObject.judges.exclude).to.have.lengthOf(3);
                excludeIntegerArray.forEach(judge => {
                    expect(caseQuery.queryObject.judges.exclude).to.contain(judge);
                });             
            });

            it('chaining constraint functions should add magistrates', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.magistrates.include).to.be.empty;
                expect(caseQuery.queryObject.magistrates.exclude).to.be.empty;

                caseQuery.addMagistratesInclude(3434)
                    .addMagistratesExclude(4545)
                    .addMagistratesInclude(5656);
                expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.magistrates.include).to.contain(3434);
                expect(caseQuery.queryObject.magistrates.include).to.contain(5656);
                expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.magistrates.exclude).to.contain(4545);
                caseQuery.clear();

                caseQuery.addMagistratesInclude(includeIntegerArray)
                    .addMagistratesExclude(excludeIntegerArray)
                    .addMagistratesInclude(333);
                expect(caseQuery.queryObject.magistrates.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.magistrates.include).to.contain(333);
                includeIntegerArray.forEach(magistrate => {
                    expect(caseQuery.queryObject.magistrates.include).to.contain(magistrate);
                });
                expect(caseQuery.queryObject.magistrates.exclude).to.have.lengthOf(3);
                excludeIntegerArray.forEach(magistrate => {
                    expect(caseQuery.queryObject.magistrates.exclude).to.contain(magistrate);
                });             
            });

            it('chaining constraint functions should add law firms', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

                caseQuery.addLawFirmsInclude(3434)
                    .addLawFirmsExclude(4545)
                    .addLawFirmsInclude(5656);
                expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.lawFirms.include).to.contain(3434);
                expect(caseQuery.queryObject.lawFirms.include).to.contain(5656);
                expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.lawFirms.exclude).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;

                caseQuery.addLawFirmsInclude(includeIntegerArray)
                    .addLawFirmsExclude(excludeIntegerArray)
                    .addLawFirmsInclude(333);
                expect(caseQuery.queryObject.lawFirms.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.lawFirms.include).to.contain(333);
                includeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.include).to.contain(lawFirm);
                });
                expect(caseQuery.queryObject.lawFirms.exclude).to.have.lengthOf(3);
                excludeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.exclude).to.contain(lawFirm);
                });             
                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

                caseQuery.addLawFirmsIncludePlaintiff(3434)
                    .addLawFirmsExcludePlaintiff(4545)
                    .addLawFirmsIncludePlaintiff(5656);
                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(2);
                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.contain(3434);
                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.contain(5656);
                expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(1);
                expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.be.empty;

                caseQuery.addLawFirmsIncludePlaintiff(includeIntegerArray)
                    .addLawFirmsExcludePlaintiff(excludeIntegerArray)
                    .addLawFirmsIncludePlaintiff(333);
                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.have.lengthOf(4);
                expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.contain(333);
                includeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.includePlaintiff).to.contain(lawFirm);
                });
                expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.have.lengthOf(3);
                excludeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.excludePlaintiff).to.contain(lawFirm);
                });             
                caseQuery.clear();
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;

                caseQuery.addLawFirmsIncludeDefendant(3434)
                    .addLawFirmsExcludeDefendant(4545)
                    .addLawFirmsIncludeDefendant(5656);
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(2);
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.contain(3434);
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.contain(5656);
                expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(1);
                expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.be.empty;

                caseQuery.addLawFirmsIncludeDefendant(includeIntegerArray)
                    .addLawFirmsExcludeDefendant(excludeIntegerArray)
                    .addLawFirmsIncludeDefendant(333);
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.have.lengthOf(4);
                expect(caseQuery.queryObject.lawFirms.includeDefendant).to.contain(333);
                includeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.includeDefendant).to.contain(lawFirm);
                });
                expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.have.lengthOf(3);
                excludeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.excludeDefendant).to.contain(lawFirm);
                });             
                caseQuery.clear();
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;

                caseQuery.addLawFirmsIncludeThirdParty(3434)
                    .addLawFirmsExcludeThirdParty(4545)
                    .addLawFirmsIncludeThirdParty(5656);
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(2);
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.contain(3434);
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.contain(5656);
                expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(1);
                expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
                expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;

                caseQuery.addLawFirmsIncludeThirdParty(includeIntegerArray)
                    .addLawFirmsExcludeThirdParty(excludeIntegerArray)
                    .addLawFirmsIncludeThirdParty(333);
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.have.lengthOf(4);
                expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.contain(333);
                includeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.contain(lawFirm);
                });
                expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.have.lengthOf(3);
                excludeIntegerArray.forEach(lawFirm => {
                    expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.contain(lawFirm);
                });             
            });

            it('chaining constraint functions should add parties', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.parties.include).to.be.empty;
                expect(caseQuery.queryObject.parties.exclude).to.be.empty;

                caseQuery.addPartiesInclude(3434)
                    .addPartiesExclude(4545)
                    .addPartiesInclude(5656);
                expect(caseQuery.queryObject.parties.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.parties.include).to.contain(3434);
                expect(caseQuery.queryObject.parties.include).to.contain(5656);
                expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.parties.exclude).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.parties.include).to.be.empty;
                expect(caseQuery.queryObject.parties.exclude).to.be.empty;

                caseQuery.addPartiesInclude(includeIntegerArray)
                    .addPartiesExclude(excludeIntegerArray)
                    .addPartiesInclude(333);
                expect(caseQuery.queryObject.parties.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.parties.include).to.contain(333);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.include).to.contain(party);
                });
                expect(caseQuery.queryObject.parties.exclude).to.have.lengthOf(3);
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.exclude).to.contain(party);
                });             
                caseQuery.clear();

                expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
                expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

                caseQuery.addPartiesIncludePlaintiff(3434)
                    .addPartiesExcludePlaintiff(4545)
                    .addPartiesIncludePlaintiff(5656);
                expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(2);
                expect(caseQuery.queryObject.parties.includePlaintiff).to.contain(3434);
                expect(caseQuery.queryObject.parties.includePlaintiff).to.contain(5656);
                expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(1);
                expect(caseQuery.queryObject.parties.excludePlaintiff).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.parties.includePlaintiff).to.be.empty;
                expect(caseQuery.queryObject.parties.excludePlaintiff).to.be.empty;

                caseQuery.addPartiesIncludePlaintiff(includeIntegerArray)
                    .addPartiesExcludePlaintiff(excludeIntegerArray)
                    .addPartiesIncludePlaintiff(333);
                expect(caseQuery.queryObject.parties.includePlaintiff).to.have.lengthOf(4);
                expect(caseQuery.queryObject.parties.includePlaintiff).to.contain(333);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.includePlaintiff).to.contain(party);
                });
                expect(caseQuery.queryObject.parties.excludePlaintiff).to.have.lengthOf(3);
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.excludePlaintiff).to.contain(party);
                });             
                caseQuery.clear();
                expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
                expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

                caseQuery.addPartiesIncludeDefendant(3434)
                    .addPartiesExcludeDefendant(4545)
                    .addPartiesIncludeDefendant(5656);
                expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(2);
                expect(caseQuery.queryObject.parties.includeDefendant).to.contain(3434);
                expect(caseQuery.queryObject.parties.includeDefendant).to.contain(5656);
                expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(1);
                expect(caseQuery.queryObject.parties.excludeDefendant).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.parties.includeDefendant).to.be.empty;
                expect(caseQuery.queryObject.parties.excludeDefendant).to.be.empty;

                caseQuery.addPartiesIncludeDefendant(includeIntegerArray)
                    .addPartiesExcludeDefendant(excludeIntegerArray)
                    .addPartiesIncludeDefendant(333);
                expect(caseQuery.queryObject.parties.includeDefendant).to.have.lengthOf(4);
                expect(caseQuery.queryObject.parties.includeDefendant).to.contain(333);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.includeDefendant).to.contain(party);
                });
                expect(caseQuery.queryObject.parties.excludeDefendant).to.have.lengthOf(3);
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.excludeDefendant).to.contain(party);
                });             
                caseQuery.clear();
                expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
                expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;

                caseQuery.addPartiesIncludeThirdParty(3434)
                    .addPartiesExcludeThirdParty(4545)
                    .addPartiesIncludeThirdParty(5656);
                expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(2);
                expect(caseQuery.queryObject.parties.includeThirdParty).to.contain(3434);
                expect(caseQuery.queryObject.parties.includeThirdParty).to.contain(5656);
                expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(1);
                expect(caseQuery.queryObject.parties.excludeThirdParty).to.contain(4545);
                caseQuery.clear();

                expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
                expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;

                caseQuery.addPartiesIncludeThirdParty(includeIntegerArray)
                    .addPartiesExcludeThirdParty(excludeIntegerArray)
                    .addPartiesIncludeThirdParty(333);
                expect(caseQuery.queryObject.parties.includeThirdParty).to.have.lengthOf(4);
                expect(caseQuery.queryObject.parties.includeThirdParty).to.contain(333);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.includeThirdParty).to.contain(party);
                });
                expect(caseQuery.queryObject.parties.excludeThirdParty).to.have.lengthOf(3);
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.parties.excludeThirdParty).to.contain(party);
                });             
            });

            it('chaining constraint functions should add resolutions', () => {

                caseQuery.clear();     

                var summary1 = 'Claimant Win';
                var specific1 = 'Contested Dismissal';
                var summary2 = 'Procedural';
                var specific2 = 'Severance';
                var summary3 = 'Likely Settlement';
                var specific3 = 'Likely Settlement';
    
 
                expect(caseQuery.queryObject.resolutions.include).to.be.empty;
                expect(caseQuery.queryObject.resolutions.exclude).to.be.empty;
    
                caseQuery.addResolutionsInclude(summary1, specific1)
                    .addResolutionsExclude(summary2, specific2)
                    .addResolutionsInclude(summary3, specific3);
                expect(caseQuery.queryObject.resolutions.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.resolutions.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.resolutions.include).to.contain.an.item.with.property('summary', summary1);
                expect(caseQuery.queryObject.resolutions.include).to.contain.an.item.with.property('specific', specific1);
                expect(caseQuery.queryObject.resolutions.include).to.contain.an.item.with.property('summary', summary3);
                expect(caseQuery.queryObject.resolutions.include).to.contain.an.item.with.property('specific', specific3);
                expect(caseQuery.queryObject.resolutions.exclude).to.contain.an.item.with.property('summary', summary2);
                expect(caseQuery.queryObject.resolutions.exclude).to.contain.an.item.with.property('specific', specific2);
            });

            it('chaining constraint functions should add findings', () => {

                caseQuery.clear();
    
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addFindingsIncludeAwardedToParties(1234)
                    .addFindingsIncludeAwardedAgainstParties(2345)
                    .addFindingsIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(2);
                expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(1);
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.contain(1234);
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.contain(3456);
                expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.contain(2345);

                caseQuery.clear();
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addFindingsIncludeAwardedToParties(includeIntegerArray)
                    .addFindingsIncludeAwardedAgainstParties(excludeIntegerArray)
                    .addFindingsIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.have.lengthOf(4);
                expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.have.lengthOf(3);
                expect(caseQuery.queryObject.findings[0].awardedToParties).to.contain(3456);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.findings[0].awardedToParties).to.contain(party);
                });
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.findings[0].awardedAgainstParties).to.contain(party);
                });
                caseQuery.clear();
  
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.be.empty;
                caseQuery.addFindingsIncludeJudgmentSource('IncludeJudgment')
                    .addFindingsExcludeJudgmentSource('ExcludeJudgment')
                    .addFindingsIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.contain('IncludeJudgment');
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.contain('IncludeJudgment2');
                expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.contain('ExcludeJudgment');

                caseQuery.clear();
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.be.empty;
    
                caseQuery.addFindingsIncludeJudgmentSource(includeStringArray)
                    .addFindingsExcludeJudgmentSource(excludeStringArray)
                    .addFindingsIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.have.lengthOf(3);
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.contain('IncludeJudgment2');
                includeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.contain(source);
                });
                excludeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.findings[0].judgmentSource.exclude).to.contain(source);
                });

                caseQuery.clear();

                expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.be.empty;
    
                caseQuery.addFindingsIncludePatentInvalidityReasons('Reason1')
                    .addFindingsIncludePatentInvalidityReasons(includeStringArray)
                    .addFindingsIncludePatentInvalidityReasons('Reason2');
                expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.have.lengthOf(5);
                expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.contain('Reason1');
                expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.contain('Reason2');
                includeStringArray.forEach(reason => {
                    expect(caseQuery.queryObject.findings[0].patentInvalidityReasons.include).to.contain(reason);
                });
                caseQuery.clear();
                expect(caseQuery.queryObject.findings[0].nameType.include).to.be.empty;
                expect(caseQuery.queryObject.findings[0].nameType.exclude).to.be.empty;
    
                caseQuery.addFindingsIncludeNameType('includeName', 'includeType')
                    .addFindingsExcludeNameType('excludeName', 'excludeType')
                    .addFindingsIncludeNameType('includeName1', 'includeType1');
                expect(caseQuery.queryObject.findings[0].nameType.include).to.contain.an.item.with.property('name', 'includeName');
                expect(caseQuery.queryObject.findings[0].nameType.include).to.contain.an.item.with.property('type', 'includeType');
                expect(caseQuery.queryObject.findings[0].nameType.exclude).to.contain.an.item.with.property('name', 'excludeName');
                expect(caseQuery.queryObject.findings[0].nameType.exclude).to.contain.an.item.with.property('type', 'excludeType');
                expect(caseQuery.queryObject.findings[0].nameType.include).to.contain.an.item.with.property('name', 'includeName1');
                expect(caseQuery.queryObject.findings[0].nameType.include).to.contain.an.item.with.property('type', 'includeType1');

                caseQuery.clear();
                expect(caseQuery.queryObject.findings[0].date.onOrAfter).to.be.empty;
                expect(caseQuery.queryObject.findings[0].date.onOrBefore).to.be.empty;
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.be.empty;

                caseQuery.addFindingsDate('2022-01-01', 'onOrAfter')
                    .addFindingsIncludeJudgmentSource('IncludeJudgment');
                expect(caseQuery.queryObject.findings[0].date).to.have.property('onOrAfter', '2022-01-01');
                expect(caseQuery.queryObject.findings[0].judgmentSource.include).to.contain('IncludeJudgment');


            });
            
            it('chaining constraint functions should add remedies', () => {

                caseQuery.clear();
    
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addRemediesIncludeAwardedToParties(1234)
                    .addRemediesIncludeAwardedAgainstParties(2345)
                    .addRemediesIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(2);
                expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(1);
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.contain(1234);
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.contain(3456);
                expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.contain(2345);

                caseQuery.clear();
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addRemediesIncludeAwardedToParties(includeIntegerArray)
                    .addRemediesIncludeAwardedAgainstParties(excludeIntegerArray)
                    .addRemediesIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.have.lengthOf(4);
                expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.have.lengthOf(3);
                expect(caseQuery.queryObject.remedies[0].awardedToParties).to.contain(3456);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.remedies[0].awardedToParties).to.contain(party);
                });
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.remedies[0].awardedAgainstParties).to.contain(party);
                });
                caseQuery.clear();
  
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.be.empty;
                caseQuery.addRemediesIncludeJudgmentSource('IncludeJudgment')
                    .addRemediesExcludeJudgmentSource('ExcludeJudgment')
                    .addRemediesIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.contain('IncludeJudgment');
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.contain('IncludeJudgment2');
                expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.contain('ExcludeJudgment');

                caseQuery.clear();
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.be.empty;
    
                caseQuery.addRemediesIncludeJudgmentSource(includeStringArray)
                    .addRemediesExcludeJudgmentSource(excludeStringArray)
                    .addRemediesIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.have.lengthOf(3);
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.contain('IncludeJudgment2');
                includeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.contain(source);
                });
                excludeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.remedies[0].judgmentSource.exclude).to.contain(source);
                });

                caseQuery.clear();

                expect(caseQuery.queryObject.remedies[0].nameType.include).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].nameType.exclude).to.be.empty;
    
                caseQuery.addRemediesIncludeNameType('includeName', 'includeType')
                    .addRemediesExcludeNameType('excludeName', 'excludeType')
                    .addRemediesIncludeNameType('includeName1', 'includeType1');
                expect(caseQuery.queryObject.remedies[0].nameType.include).to.contain.an.item.with.property('name', 'includeName');
                expect(caseQuery.queryObject.remedies[0].nameType.include).to.contain.an.item.with.property('type', 'includeType');
                expect(caseQuery.queryObject.remedies[0].nameType.exclude).to.contain.an.item.with.property('name', 'excludeName');
                expect(caseQuery.queryObject.remedies[0].nameType.exclude).to.contain.an.item.with.property('type', 'excludeType');
                expect(caseQuery.queryObject.remedies[0].nameType.include).to.contain.an.item.with.property('name', 'includeName1');
                expect(caseQuery.queryObject.remedies[0].nameType.include).to.contain.an.item.with.property('type', 'includeType1');

                caseQuery.clear();
                expect(caseQuery.queryObject.remedies[0].date.onOrAfter).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].date.onOrBefore).to.be.empty;
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.be.empty;

                caseQuery.addRemediesDate('2022-01-01', 'onOrAfter')
                    .addRemediesIncludeJudgmentSource('IncludeJudgment');
                expect(caseQuery.queryObject.remedies[0].date).to.have.property('onOrAfter', '2022-01-01');
                expect(caseQuery.queryObject.remedies[0].judgmentSource.include).to.contain('IncludeJudgment');


            });        
            
            it('chaining constraint functions should add damages', () => {

                caseQuery.clear();
    
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addDamagesIncludeAwardedToParties(1234)
                    .addDamagesIncludeAwardedAgainstParties(2345)
                    .addDamagesIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(2);
                expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(1);
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.contain(1234);
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.contain(3456);
                expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.contain(2345);

                caseQuery.clear();
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.be.empty;
                expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.be.empty;
    
                caseQuery.addDamagesIncludeAwardedToParties(includeIntegerArray)
                    .addDamagesIncludeAwardedAgainstParties(excludeIntegerArray)
                    .addDamagesIncludeAwardedToParties(3456);
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.have.lengthOf(4);
                expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.have.lengthOf(3);
                expect(caseQuery.queryObject.damages[0].awardedToParties).to.contain(3456);
                includeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.damages[0].awardedToParties).to.contain(party);
                });
                excludeIntegerArray.forEach(party => {
                    expect(caseQuery.queryObject.damages[0].awardedAgainstParties).to.contain(party);
                });
                caseQuery.clear();
  
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.be.empty;
                caseQuery.addDamagesIncludeJudgmentSource('IncludeJudgment')
                    .addDamagesExcludeJudgmentSource('ExcludeJudgment')
                    .addDamagesIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain('IncludeJudgment');
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain('IncludeJudgment2');
                expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.contain('ExcludeJudgment');

                caseQuery.clear();
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;
                expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.be.empty;
    
                caseQuery.addDamagesIncludeJudgmentSource(includeStringArray)
                    .addDamagesExcludeJudgmentSource(excludeStringArray)
                    .addDamagesIncludeJudgmentSource('IncludeJudgment2');
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.have.lengthOf(3);
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain('IncludeJudgment2');
                includeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain(source);
                });
                excludeStringArray.forEach(source => {
                    expect(caseQuery.queryObject.damages[0].judgmentSource.exclude).to.contain(source);
                });

                caseQuery.clear();

                expect(caseQuery.queryObject.damages[0].nameType.include).to.be.empty;
                expect(caseQuery.queryObject.damages[0].nameType.exclude).to.be.empty;
    
                caseQuery.addDamagesIncludeNameType('includeName', 'includeType')
                    .addDamagesExcludeNameType('excludeName', 'excludeType')
                    .addDamagesIncludeNameType('includeName1', 'includeType1');
                expect(caseQuery.queryObject.damages[0].nameType.include).to.contain.an.item.with.property('name', 'includeName');
                expect(caseQuery.queryObject.damages[0].nameType.include).to.contain.an.item.with.property('type', 'includeType');
                expect(caseQuery.queryObject.damages[0].nameType.exclude).to.contain.an.item.with.property('name', 'excludeName');
                expect(caseQuery.queryObject.damages[0].nameType.exclude).to.contain.an.item.with.property('type', 'excludeType');
                expect(caseQuery.queryObject.damages[0].nameType.include).to.contain.an.item.with.property('name', 'includeName1');
                expect(caseQuery.queryObject.damages[0].nameType.include).to.contain.an.item.with.property('type', 'includeType1');

                caseQuery.clear();
                expect(caseQuery.queryObject.damages[0].date.onOrAfter).to.be.empty;
                expect(caseQuery.queryObject.damages[0].date.onOrBefore).to.be.empty;
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;

                caseQuery.addDamagesDate('2022-01-01', 'onOrAfter')
                    .addDamagesIncludeJudgmentSource('IncludeJudgment');
                expect(caseQuery.queryObject.damages[0].date).to.have.property('onOrAfter', '2022-01-01');
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain('IncludeJudgment');

                caseQuery.clear();
                expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(0);
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.be.empty;

                caseQuery.setDamagesMinimumAmount(7552)
                    .addDamagesIncludeJudgmentSource('IncludeJudgment');
                expect(caseQuery.queryObject.damages[0].minimumAmount).to.equal(7552);
                expect(caseQuery.queryObject.damages[0].judgmentSource.include).to.contain('IncludeJudgment');


            });      


            it('chaining constraint functions should add patents', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.patents.include).to.be.empty;
                expect(caseQuery.queryObject.patents.exclude).to.be.empty;
            
                caseQuery.addPatentsInclude('PatentInclude')
                    .addPatentsExclude('PatentExclude')
                    .addPatentsInclude('PatentInclude2');
                expect(caseQuery.queryObject.patents.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.patents.include).to.contain('PatentInclude');
                expect(caseQuery.queryObject.patents.include).to.contain('PatentInclude2');
                expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.patents.exclude).to.contain('PatentExclude');

                caseQuery.clear();

                expect(caseQuery.queryObject.patents.include).to.be.empty;
                expect(caseQuery.queryObject.patents.exclude).to.be.empty;

                caseQuery.addPatentsInclude(includeStringArray)
                    .addPatentsExclude(excludeStringArray)
                    .addPatentsInclude('PatentInclude');
                expect(caseQuery.queryObject.patents.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.patents.include).to.contain('PatentInclude');
                includeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.patents.include).to.contain(caseType);
                });
                expect(caseQuery.queryObject.patents.exclude).to.have.lengthOf(3);
                excludeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.patents.exclude).to.contain(caseType);
                });            
            }); 


            it('chaining constraint functions should add MDL', () => {

                caseQuery.clear();

                expect(caseQuery.queryObject.mdl.include).to.be.empty;
                expect(caseQuery.queryObject.mdl.exclude).to.be.empty;
            
                caseQuery.addMDLInclude(12345)
                    .addMDLExclude(23456)
                    .addMDLInclude(34567);
                expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(2);
                expect(caseQuery.queryObject.mdl.include).to.contain(12345);
                expect(caseQuery.queryObject.mdl.include).to.contain(34567);
                expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(1);
                expect(caseQuery.queryObject.mdl.exclude).to.contain(23456);

                caseQuery.clear();

                expect(caseQuery.queryObject.mdl.include).to.be.empty;
                expect(caseQuery.queryObject.mdl.exclude).to.be.empty;

                caseQuery.addMDLInclude(includeStringArray)
                    .addMDLExclude(excludeStringArray)
                    .addMDLInclude(12345);
                expect(caseQuery.queryObject.mdl.include).to.have.lengthOf(4);
                expect(caseQuery.queryObject.mdl.include).to.contain(12345);
                includeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.mdl.include).to.contain(caseType);
                });
                expect(caseQuery.queryObject.mdl.exclude).to.have.lengthOf(3);
                excludeStringArray.forEach(caseType => {
                    expect(caseQuery.queryObject.mdl.exclude).to.contain(caseType);
                });      
                caseQuery.clear();

            });     

            it('chaining date function should set dates', () => {
                caseQuery.clear();

                caseQuery.setDate('2011-01-01', 'filed', 'onOrAfter')
                    .setDate('2012-02-02', 'terminated', 'onOrBefore')
                    .setDate('2013-03-03','lastDocket', 'onOrAfter' );

                expect(caseQuery.queryObject.dates['filed']['onOrAfter']).to.equal('2011-01-01');
                expect(caseQuery.queryObject.dates['terminated']['onOrBefore']).to.equal('2012-02-02');
                expect(caseQuery.queryObject.dates['lastDocket']['onOrAfter']).to.equal('2013-03-03');
             
            });

            it('chaining control functions should change values', () => {
                caseQuery.clear();

                caseQuery.setOrdering('ordering')
                    .setPage(7)
                    .setPageSize(44);

                expect(caseQuery.queryObject.pageSize).to.equal(44);
                expect(caseQuery.queryObject.page).to.equal(7);
                expect(caseQuery.queryObject.ordering).to.equal('ordering');
             
                caseQuery.clear();

                caseQuery.setPage(9)
                    .setPageSize(55)
                    .setOrdering('different');
                expect(caseQuery.queryObject.pageSize).to.equal(55);
                expect(caseQuery.queryObject.page).to.equal(9);
                expect(caseQuery.queryObject.ordering).to.equal('different');
                            
                caseQuery.clear();         
                expect(caseQuery.queryObject.page).to.equal(1);
                caseQuery.nextPage().nextPage().nextPage();
                expect(caseQuery.queryObject.page).to.equal(4);
        
            });
        
        }); 


    });


});