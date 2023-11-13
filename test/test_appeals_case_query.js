const AppealCasesQueryRequest = require('../src/appeal_cases_query_request.js');
var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

describe('Add and Remove Query Statements', () => {

    describe('Courts', () =>{
    it('should be able to add and remove court includes and excludes', () => {
        var caseQuery = new AppealCasesQueryRequest();
        expect(caseQuery.queryObject.courts.include).to.be.empty;
        expect(caseQuery.queryObject.courts.exclude).to.be.empty;


        caseQuery.addCourtsInclude('1st Cir.');
        expect(caseQuery.queryObject.courts.include).to.have.lengthOf(1);
        caseQuery.addCourtsInclude(['1st Cir.', 'Fed. Cir.', '8th Cir.']);
        expect(caseQuery.queryObject.courts.include).to.have.lengthOf(3);
        caseQuery.finalize();
        caseQuery.clear();
        expect(caseQuery.queryObject.courts.include).to.be.empty;
        caseQuery.addCourtsInclude('1st Cir.');
        caseQuery.addCourtsInclude(['1st Cir.', 'Fed. Cir.', '8th Cir.']);
        caseQuery.clear();
        expect(caseQuery.queryObject.courts.include).to.be.empty;

        caseQuery.addCourtsExclude('1st Cir.');
        expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(1);
        caseQuery.clear();
        expect(caseQuery.queryObject.courts.exclude).to.be.empty;
        caseQuery.addCourtsExclude(['1st Cir.', 'Fed. Cir.', '8th Cir.']);
        expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(3);
        caseQuery.clear();
        expect(caseQuery.queryObject.courts.exclude).to.be.empty;
        caseQuery.addCourtsExclude('1st Cir.');
        caseQuery.addCourtsExclude(['1st Cir.', 'Fed. Cir.', '8th Cir.']);
        expect(caseQuery.queryObject.courts.exclude).to.have.lengthOf(3);
        caseQuery.clear();
        expect(caseQuery.queryObject.courts.exclude).to.be.empty;
    });
});

    describe('Case Tags', () => {
        it('should be able to add and remove case Tags includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
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
            var caseQuery = new AppealCasesQueryRequest();
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


    describe('Judges', () => {
        it('should be able to add and remove judges includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
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

            var caseQuery = new AppealCasesQueryRequest();
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

    // Attorneys

    describe('Attorneys', () => {
        it('should be able to add and remove law firm includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.include).to.be.empty;
            expect(caseQuery.queryObject.attorneys.exclude).to.be.empty;

            caseQuery.addAttorneysInclude(1234);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.include).to.be.empty;
            caseQuery.addAttorneysInclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.include).to.be.empty;

            caseQuery.addAttorneysExclude(1234);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.exclude).to.be.empty;
            caseQuery.addAttorneysExclude([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.exclude).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysInclude(1234);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(1);
            caseQuery.addAttorneysInclude(1234);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExclude(1234);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(1);
            caseQuery.addAttorneysExclude(1234);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysInclude(array1);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(3);
            caseQuery.addAttorneysInclude(array2);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(4);
            caseQuery.addAttorneysInclude(1234);
            expect(caseQuery.queryObject.attorneys.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExclude(array1);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(3);
            caseQuery.addAttorneysExclude(array2);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(4);
            caseQuery.addAttorneysExclude(1234);
            expect(caseQuery.queryObject.attorneys.exclude).to.have.lengthOf(4);
            caseQuery.clear();


        });

        // Appellant

        it('should be able to add and remove attorney appellant includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.be.empty;

            caseQuery.addAttorneysIncludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.be.empty;
            caseQuery.addAttorneysIncludeAppellant([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.be.empty;

            caseQuery.addAttorneysExcludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.be.empty;
            caseQuery.addAttorneysExcludeAppellant([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysIncludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(1);
            caseQuery.addAttorneysIncludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(1);
            caseQuery.addAttorneysExcludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysIncludeAppellant(array1);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(3);
            caseQuery.addAttorneysIncludeAppellant(array2);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(4);
            caseQuery.addAttorneysIncludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeAppellant(array1);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(3);
            caseQuery.addAttorneysExcludeAppellant(array2);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(4);
            caseQuery.addAttorneysExcludeAppellant(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellant).to.have.lengthOf(4);
            caseQuery.clear();


        });

        // Appellee

        it('should be able to add and remove attorney includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.be.empty;

            caseQuery.addAttorneysIncludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.be.empty;
            caseQuery.addAttorneysIncludeAppellee([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.be.empty;

            caseQuery.addAttorneysExcludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.be.empty;
            caseQuery.addAttorneysExcludeAppellee([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysIncludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(1);
            caseQuery.addAttorneysIncludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(1);
            caseQuery.addAttorneysExcludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysIncludeAppellee(array1);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(3);
            caseQuery.addAttorneysIncludeAppellee(array2);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(4);
            caseQuery.addAttorneysIncludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeAppellee(array1);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(3);
            caseQuery.addAttorneysExcludeAppellee(array2);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(4);
            caseQuery.addAttorneysExcludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(4);
            caseQuery.clear();


        });

        // Respondent

        it('should be able to add and remove attorney includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.be.empty;

            caseQuery.addAttorneysIncludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.be.empty;
            caseQuery.addAttorneysIncludeRespondent([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.be.empty;

            caseQuery.addAttorneysExcludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.be.empty;
            caseQuery.addAttorneysExcludeRespondent([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysIncludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.have.lengthOf(1);
            caseQuery.addAttorneysIncludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.includeRespondent).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.have.lengthOf(1);
            caseQuery.addAttorneysExcludeRespondent(1234);
            expect(caseQuery.queryObject.attorneys.excludeRespondent).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysIncludeAppellee(array1);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(3);
            caseQuery.addAttorneysIncludeAppellee(array2);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(4);
            caseQuery.addAttorneysIncludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.includeAppellee).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeAppellee(array1);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(3);
            caseQuery.addAttorneysExcludeAppellee(array2);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(4);
            caseQuery.addAttorneysExcludeAppellee(1234);
            expect(caseQuery.queryObject.attorneys.excludeAppellee).to.have.lengthOf(4);
            caseQuery.clear();


        });

        // Petitioner Movant

        it('should be able to add and remove attorney includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.be.empty;

            caseQuery.addAttorneysIncludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.be.empty;
            caseQuery.addAttorneysIncludePetitionerMovant([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.be.empty;

            caseQuery.addAttorneysExcludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.be.empty;
            caseQuery.addAttorneysExcludePetitionerMovant([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysIncludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(1);
            caseQuery.addAttorneysIncludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExcludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(1);
            caseQuery.addAttorneysExcludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysIncludePetitionerMovant(array1);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(3);
            caseQuery.addAttorneysIncludePetitionerMovant(array2);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(4);
            caseQuery.addAttorneysIncludePetitionerMovant(1234);
            expect(caseQuery.queryObject.attorneys.includePetitionerMovant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExcludePetitionerMovant(array1);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(3);
            caseQuery.addAttorneysExcludePetitionerMovant(array2);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(4);
            caseQuery.addAttorneysExcludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.excludePetitionerMovant).to.have.lengthOf(4);
            caseQuery.clear();


        });

        // Third Party

        it('should be able to add and remove attorney includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.be.empty;

            caseQuery.addAttorneysIncludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.be.empty;
            caseQuery.addAttorneysIncludeThirdParty([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.be.empty;

            caseQuery.addAttorneysExcludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.be.empty;
            caseQuery.addAttorneysExcludeThirdParty([1234, 2345, 3456]);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.be.empty;
        });

        it('adding the same attorney to includes and excludes should not duplicate entries', () => {
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addAttorneysIncludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(1);
            caseQuery.addAttorneysIncludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.addAttorneysExcludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addAttorneysIncludeThirdParty(array1);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(3);
            caseQuery.addAttorneysIncludeThirdParty(array2);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(4);
            caseQuery.addAttorneysIncludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.includeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addAttorneysExcludeThirdParty(array1);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(3);
            caseQuery.addAttorneysExcludeThirdParty(array2);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.addAttorneysExcludeThirdParty(1234);
            expect(caseQuery.queryObject.attorneys.excludeThirdParty).to.have.lengthOf(4);
            caseQuery.clear();


        });
    });

    describe('Law Firms', () => {
        var lawFirm = 1234;
        var array1 = [1234, 2345, 3456];

        it('should be able to add and remove lawFirms includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.lawFirms.include).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.exclude).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.be.empty;
            expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.be.empty;

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

            // Appellant

            caseQuery.addLawFirmsIncludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;
            caseQuery.addLawFirmsIncludeAppellant(array1);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;

            caseQuery.addLawFirmsExcludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;
            caseQuery.addLawFirmsExcludeAppellant(array1);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;


            // Appellee

            caseQuery.addLawFirmsIncludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;
            caseQuery.addLawFirmsIncludeAppellee(array1);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;

            caseQuery.addLawFirmsExcludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;
            caseQuery.addLawFirmsExcludeAppellee(array1);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;

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

            caseQuery.addLawFirmsIncludeRespondent(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.be.empty;
            caseQuery.addLawFirmsIncludeRespondent(array1);
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.includeRespondent).to.be.empty;

            caseQuery.addLawFirmsExcludeRespondent(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.be.empty;
            caseQuery.addLawFirmsExcludeRespondent(array1);
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.lawFirms.excludeRespondent).to.be.empty;
    
            // Petitioner Movant

        var caseQuery = new AppealCasesQueryRequest();
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.be.empty;
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.be.empty;

        caseQuery.addLawFirmsIncludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(1);
        caseQuery.clear();
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.be.empty;
        caseQuery.addLawFirmsIncludePetitionerMovant([1234, 2345, 3456]);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(3);
        caseQuery.finalize();
        caseQuery.clear();
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.be.empty;

        caseQuery.addLawFirmsExcludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(1);
        caseQuery.clear();
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.be.empty;
        caseQuery.addLawFirmsExcludePetitionerMovant([1234, 2345, 3456]);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(3);
        caseQuery.clear();
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.be.empty;
    });

    it('adding the same attorney to includes and excludes should not duplicate entries', () => {
        var array1 = [1234, 2345, 3456];
        var array2 = [2345, 3456, 4567];

        var caseQuery = new AppealCasesQueryRequest();
        caseQuery.addLawFirmsIncludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(1);
        caseQuery.addLawFirmsIncludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(1);
        caseQuery.clear();

        caseQuery.addLawFirmsExcludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(1);
        caseQuery.addLawFirmsExcludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(1);
        caseQuery.clear();

        caseQuery.addLawFirmsIncludePetitionerMovant(array1);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(3);
        caseQuery.addLawFirmsIncludePetitionerMovant(array2);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(4);
        caseQuery.addLawFirmsIncludePetitionerMovant(1234);
        expect(caseQuery.queryObject.lawFirms.includePetitionerMovant).to.have.lengthOf(4);
        caseQuery.clear();

        caseQuery.addLawFirmsExcludePetitionerMovant(array1);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(3);
        caseQuery.addLawFirmsExcludePetitionerMovant(array2);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(4);
        caseQuery.addLawFirmsExcludeThirdParty(1234);
        expect(caseQuery.queryObject.lawFirms.excludePetitionerMovant).to.have.lengthOf(4);
        caseQuery.clear();


    });

    

        it('adding the same law firm to includes and excludes should not duplicate entries', () => {
            var lawFirm = 1234;
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
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

            caseQuery.addLawFirmsIncludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeAppellant(array1);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeAppellant(array2);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeAppellant(array1);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(3);
            caseQuery.addLawFirmsExcludeAppellant(array2);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeAppellant(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(1);
            caseQuery.addLawFirmsIncludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(1);
            caseQuery.addLawFirmsExcludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addLawFirmsIncludeAppellee(array1);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(3);
            caseQuery.addLawFirmsIncludeAppellee(array2);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(4);
            caseQuery.addLawFirmsIncludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addLawFirmsExcludeAppellee(array1);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(3);
            caseQuery.addLawFirmsExcludeAppellee(array2);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(4);
            caseQuery.addLawFirmsExcludeAppellee(lawFirm);
            expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(4);
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
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.parties.include).to.be.empty;
            expect(caseQuery.queryObject.parties.exclude).to.be.empty;
            expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;
            expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;
            expect(caseQuery.queryObject.parties.includeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeThirdParty).to.be.empty;
            expect(caseQuery.queryObject.parties.includeRespondent).to.be.empty;
            expect(caseQuery.queryObject.parties.excludeRespondent).to.be.empty;
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.be.empty;
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.be.empty;

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

            caseQuery.addPartiesIncludeAppellant(party);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;
            caseQuery.addPartiesIncludeAppellant(array1);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;

            caseQuery.addPartiesExcludeAppellant(party);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;
            caseQuery.addPartiesExcludeAppellant(array1);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;

            caseQuery.addPartiesIncludeAppellee(party);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;
            caseQuery.addPartiesIncludeAppellee(array1);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;

            caseQuery.addPartiesExcludeAppellee(party);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;
            caseQuery.addPartiesExcludeAppellee(array1);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;

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

            caseQuery.addPartiesIncludeRespondent(party);
            expect(caseQuery.queryObject.parties.includeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeRespondent).to.be.empty;
            caseQuery.addPartiesIncludeRespondent(array1);
            expect(caseQuery.queryObject.parties.includeRespondent).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includeRespondent).to.be.empty;

            caseQuery.addPartiesExcludeRespondent(party);
            expect(caseQuery.queryObject.parties.excludeRespondent).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeRespondent).to.be.empty;
            caseQuery.addPartiesExcludeRespondent(array1);
            expect(caseQuery.queryObject.parties.excludeRespondent).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludeRespondent).to.be.empty;

            caseQuery.addPartiesIncludePetitionerMovant(party);
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.be.empty;
            caseQuery.addPartiesIncludePetitionerMovant(array1);
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.includePetitionerMovant).to.be.empty;

            caseQuery.addPartiesExcludePetitionerMovant(party);
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.be.empty;
            caseQuery.addPartiesExcludePetitionerMovant(array1);
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.parties.excludePetitionerMovant).to.be.empty;

        });

        it('adding the same party to includes and excludes should not duplicate entries', () => {
            var party = 1234;
            var array1 = [1234, 2345, 3456];
            var array2 = [2345, 3456, 4567];

            var caseQuery = new AppealCasesQueryRequest();
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

            caseQuery.addPartiesIncludeAppellant(party);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeAppellant(party);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeAppellant(party);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeAppellant(party);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeAppellant(array1);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeAppellant(array2);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeAppellant(party);
            expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeAppellant(array1);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(3);
            caseQuery.addPartiesExcludeAppellant(array2);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeAppellant(party);
            expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesIncludeAppellee(party);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(1);
            caseQuery.addPartiesIncludeAppellee(party);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesExcludeAppellee(party);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(1);
            caseQuery.addPartiesExcludeAppellee(party);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addPartiesIncludeAppellee(array1);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeAppellee(array2);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeAppellee(party);
            expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeAppellee(array1);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(3);
            caseQuery.addPartiesExcludeAppellee(array2);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeAppellee(party);
            expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(4);
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

            caseQuery.addPartiesIncludeRespondent(array1);
            expect(caseQuery.queryObject.parties.includeRespondent).to.have.lengthOf(3);
            caseQuery.addPartiesIncludeRespondent(array2);
            expect(caseQuery.queryObject.parties.includeRespondent).to.have.lengthOf(4);
            caseQuery.addPartiesIncludeRespondent(party);
            expect(caseQuery.queryObject.parties.includeRespondent).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addPartiesExcludeRespondent(array1);
            expect(caseQuery.queryObject.parties.excludeRespondent).to.have.lengthOf(3);
            caseQuery.addPartiesExcludeRespondent(array2);
            expect(caseQuery.queryObject.parties.excludeRespondent).to.have.lengthOf(4);
            caseQuery.addPartiesExcludeRespondent(party);
            expect(caseQuery.queryObject.parties.excludeRespondent).to.have.lengthOf(4);
            caseQuery.clear();
    });

    });

    describe('Originating Venues', () => {
        it('should be able to add and remove originating venues includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.originatingVenues.include).to.be.empty;
            expect(caseQuery.queryObject.originatingVenues.exclude).to.be.empty;

            caseQuery.addOriginatingVenuesInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingVenues.include).to.be.empty;
            caseQuery.addOriginatingVenuesInclude(['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court']);
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingVenues.include).to.be.empty;

            caseQuery.addOriginatingVenuesExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingVenues.exclude).to.be.empty;
            caseQuery.addOriginatingVenuesExclude(['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court']);
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingVenues.exclude).to.be.empty;
        });

        it('adding the same originating venues to includes and excludes should not duplicate entries', () => {
            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addOriginatingVenuesInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(1);
            caseQuery.addOriginatingVenuesInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addOriginatingVenuesExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(1);
            caseQuery.addOriginatingVenuesExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court'];
            var array2 = ['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Bankruptcy Appellate Panel'];
            caseQuery.addOriginatingVenuesInclude(array1);
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(3);
            caseQuery.addOriginatingVenuesInclude(array2);
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(4);
            caseQuery.addOriginatingVenuesInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addOriginatingVenuesExclude(array1);
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(3);
            caseQuery.addOriginatingVenuesExclude(array2);
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(4);
            caseQuery.addOriginatingVenuesExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.originatingVenues.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Originating Cases', () => {
        describe('Case Ids', ()=>{
        it('should be able to add and remove originating cases includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.be.empty;
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.be.empty;

            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.be.empty;
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds([123, 456, 789]);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.be.empty;

            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.be.empty;
            caseQuery.addOriginatingCasesExcludeDistrictCaseIds([234, 567, 890]);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.be.empty;
        });

        it('adding the same originating cases IDS to includes and excludes should not duplicate entries', () => {
            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(234);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(234);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = [123, 456, 789];
            var array2 = [123, 456, 789, 890];
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(array1);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(array2);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesIncludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.includeDistrictCaseIds).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(array1);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(array2);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesExcludeDistrictCaseIds(123);
            expect(caseQuery.queryObject.originatingCases.excludeDistrictCaseIds).to.have.lengthOf(4);
            caseQuery.clear();
        });
        });

        describe('Judges', ()=>{
        it('should be able to and remove originating judges include and exclude', ()=>{
                var caseQuery = new AppealCasesQueryRequest();
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.be.empty;
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.be.empty;
    
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.be.empty;
                caseQuery.addOriginatingCasesIncludeOriginatingJudges([123, 456, 789]);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(3);
                caseQuery.finalize();
                caseQuery.clear();
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.be.empty;
    
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(1);
                caseQuery.clear();
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.be.empty;
                caseQuery.addOriginatingCasesExcludeOriginatingJudges([234, 567, 890]);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(3);
                caseQuery.clear();
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.be.empty;
            });
    
            it('adding the same originating cases IDS to includes and excludes should not duplicate entries', () => {
                var caseQuery = new AppealCasesQueryRequest();
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(1);
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(1);
                caseQuery.clear();
    
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(234);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(1);
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(234);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(1);
                caseQuery.clear();
    
                var array1 = [123, 456, 789];
                var array2 = [123, 456, 789, 890];
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(array1);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(3);
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(array2);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(4);
                caseQuery.addOriginatingCasesIncludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include).to.have.lengthOf(4);
                caseQuery.clear();
    
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(array1);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(3);
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(array2);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(4);
                caseQuery.addOriginatingCasesExcludeOriginatingJudges(123);
                expect(caseQuery.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude).to.have.lengthOf(4);
                caseQuery.clear();
            });
    });

    describe('Courts', ()=>{
        it('should be able to add and remove originating courts includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.be.empty;
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.be.empty;

            caseQuery.addOriginatingCasesIncludeCourts();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.be.empty;
            caseQuery.addOriginatingCasesIncludeCourts(['1st Cir.', 'Fed. Cir.', '8th Cir.']);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.be.empty;

            caseQuery.addOriginatingCasesExcludeCourts(123);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.be.empty;
            caseQuery.addOriginatingCasesExcludeCourts([234, 567, 890]);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.be.empty;
        });

        it('adding the same originating courts to includes and excludes should not duplicate entries', () => {
            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addOriginatingCasesIncludeCourts('1st Cir.');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesIncludeCourts('1st Cir.');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeCourts('2nd Cir.');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesExcludeCourts('2nd Cir.');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['1st Cir.', 'Fed. Cir.', '8th Cir.'];
            var array2 = ['1st Cir.', 'Fed. Cir.', '8th Cir.', '9th Cir.'];
            caseQuery.addOriginatingCasesIncludeCourts(array1);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesIncludeCourts(array2);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesIncludeCourts(array1[0]);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeCourts(array1);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesExcludeCourts(array2);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesExcludeCourts(array1[0]);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    describe('Case Types', ()=>{
        it('should be able to add and remove originating case types includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.be.empty;
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.be.empty;

            caseQuery.addOriginatingCasesIncludeCaseTypes('ERISA');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.be.empty;
            caseQuery.addOriginatingCasesIncludeCaseTypes(['Antitrust','Bankruptcy','Civil Rights']);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.be.empty;

            caseQuery.addOriginatingCasesExcludeCaseTypes('ERISA');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.be.empty;
            caseQuery.addOriginatingCasesExcludeCaseTypes(['Antitrust','Bankruptcy','Civil Rights']);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.be.empty;
        });

        it('adding the same originating case types to includes and excludes should not duplicate entries', () => {
            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addOriginatingCasesIncludeCaseTypes('ERISA');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesIncludeCaseTypes('ERISA');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeCaseTypes('Copyright');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.addOriginatingCasesExcludeCaseTypes('Copyright');
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Antitrust','Bankruptcy','Civil Rights'];
            var array2 = ['Antitrust','Bankruptcy','Civil Rights', 'Tax'];
            caseQuery.addOriginatingCasesIncludeCaseTypes(array1);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesIncludeCaseTypes(array2);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesIncludeCaseTypes(array1[0]);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addOriginatingCasesExcludeCaseTypes(array1);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(3);
            caseQuery.addOriginatingCasesExcludeCaseTypes(array2);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(4);
            caseQuery.addOriginatingCasesExcludeCaseTypes(array1[0]);
            expect(caseQuery.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });

    });

    describe('Supreme Court Decisions', () => {
        it('should be able to add and remove supreme court decision includes and excludes', () => {
            var caseQuery = new AppealCasesQueryRequest();
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.be.empty;
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.be.empty;

            caseQuery.addSupremeCourtDecisionsInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.be.empty;
            caseQuery.addSupremeCourtDecisionsInclude(['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court']);
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(3);
            caseQuery.finalize();
            caseQuery.clear();
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.be.empty;

            caseQuery.addSupremeCourtDecisionsExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(1);
            caseQuery.clear();
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.be.empty;
            caseQuery.addSupremeCourtDecisionsExclude(['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court']);
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(3);
            caseQuery.clear();
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.be.empty;
        });

        it('adding the same supreme court decision to includes and excludes should not duplicate entries', () => {
            var caseQuery = new AppealCasesQueryRequest();
            caseQuery.addSupremeCourtDecisionsInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(1);
            caseQuery.addSupremeCourtDecisionsInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(1);
            caseQuery.clear();

            caseQuery.addSupremeCourtDecisionsExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(1);
            caseQuery.addSupremeCourtDecisionsExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(1);
            caseQuery.clear();

            var array1 = ['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Federal Bankruptcy Court'];
            var array2 = ['Originating Venue: Board of Immigration Appeals', 'Originating Venue: Court of Federal Claims', 'Originating Venue: Bankruptcy Appellate Panel'];
            caseQuery.addSupremeCourtDecisionsInclude(array1);
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(3);
            caseQuery.addSupremeCourtDecisionsInclude(array2);
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(4);
            caseQuery.addSupremeCourtDecisionsInclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.include).to.have.lengthOf(4);
            caseQuery.clear();

            caseQuery.addSupremeCourtDecisionsExclude(array1);
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(3);
            caseQuery.addSupremeCourtDecisionsExclude(array2);
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(4);
            caseQuery.addSupremeCourtDecisionsExclude('Originating Venue: Board of Immigration Appeals');
            expect(caseQuery.queryObject.supremeCourtDecisions.exclude).to.have.lengthOf(4);
            caseQuery.clear();
        });
    });


    describe('Set/unset attributes', () => {
        var caseQuery = new AppealCasesQueryRequest();


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
        var caseQuery = new AppealCasesQueryRequest();
        var operators = ['onOrAfter', 'onOrBefore'];
        var fields = ['filed', 'terminated', 'lastDocket'];
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
    });

    describe('Post Body', () => {
            it('should be able to retrieve POST body', () => {
                var caseQuery = new AppealCasesQueryRequest();
                expect(caseQuery.getPostBody()).to.not.be.empty;
            });
        });

        describe('Clear Empty Values', () => {
            it('clearing empty query should leave no fields', () => {
                var caseQuery = new AppealCasesQueryRequest();
                caseQuery.finalize();
                //console.log("After clearing, object is %s", JSON.stringify(caseQuery.queryObject));
                expect(Object.keys(caseQuery.queryObject)).to.have.lengthOf(4);
            });

        });

        describe('Chaining Constraints', () => {
            var includeStringArray = ['includeString1', 'includeString2', 'includeString3'];
            var excludeStringArray = ['excludeString1', 'excludeString2', 'excludeString3'];
            var includeIntegerArray = [12345, 23456, 34567];
            var excludeIntegerArray = [54321, 65432, 76543];



            describe('chaining constraint functions should add all constraints', () => {
                var caseQuery = new AppealCasesQueryRequest();
                expect(caseQuery.queryObject.caseTags.include).to.be.empty;
                expect(caseQuery.queryObject.caseTags.exclude).to.be.empty;

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

                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;
                    expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;

                    caseQuery.addLawFirmsIncludeAppellant(3434)
                        .addLawFirmsExcludeAppellant(4545)
                        .addLawFirmsIncludeAppellant(5656);
                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(2);
                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.contain(3434);
                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.contain(5656);
                    expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(1);
                    expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.contain(4545);
                    caseQuery.clear();

                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.be.empty;
                    expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.be.empty;

                    caseQuery.addLawFirmsIncludeAppellant(includeIntegerArray)
                        .addLawFirmsExcludeAppellant(excludeIntegerArray)
                        .addLawFirmsIncludeAppellant(333);
                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.have.lengthOf(4);
                    expect(caseQuery.queryObject.lawFirms.includeAppellant).to.contain(333);
                    includeIntegerArray.forEach(lawFirm => {
                        expect(caseQuery.queryObject.lawFirms.includeAppellant).to.contain(lawFirm);
                    });
                    expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.have.lengthOf(3);
                    excludeIntegerArray.forEach(lawFirm => {
                        expect(caseQuery.queryObject.lawFirms.excludeAppellant).to.contain(lawFirm);
                    });
                    caseQuery.clear();
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;
                    expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;

                    caseQuery.addLawFirmsIncludeAppellee(3434)
                        .addLawFirmsExcludeAppellee(4545)
                        .addLawFirmsIncludeAppellee(5656);
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(2);
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.contain(3434);
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.contain(5656);
                    expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(1);
                    expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.contain(4545);
                    caseQuery.clear();

                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.be.empty;
                    expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.be.empty;

                    caseQuery.addLawFirmsIncludeAppellee(includeIntegerArray)
                        .addLawFirmsExcludeAppellee(excludeIntegerArray)
                        .addLawFirmsIncludeAppellee(333);
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.have.lengthOf(4);
                    expect(caseQuery.queryObject.lawFirms.includeAppellee).to.contain(333);
                    includeIntegerArray.forEach(lawFirm => {
                        expect(caseQuery.queryObject.lawFirms.includeAppellee).to.contain(lawFirm);
                    });
                    expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.have.lengthOf(3);
                    excludeIntegerArray.forEach(lawFirm => {
                        expect(caseQuery.queryObject.lawFirms.excludeAppellee).to.contain(lawFirm);
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

                    expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;
                    expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;

                    caseQuery.addPartiesIncludeAppellant(3434)
                        .addPartiesExcludeAppellant(4545)
                        .addPartiesIncludeAppellant(5656);
                    expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(2);
                    expect(caseQuery.queryObject.parties.includeAppellant).to.contain(3434);
                    expect(caseQuery.queryObject.parties.includeAppellant).to.contain(5656);
                    expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(1);
                    expect(caseQuery.queryObject.parties.excludeAppellant).to.contain(4545);
                    caseQuery.clear();

                    expect(caseQuery.queryObject.parties.includeAppellant).to.be.empty;
                    expect(caseQuery.queryObject.parties.excludeAppellant).to.be.empty;

                    caseQuery.addPartiesIncludeAppellant(includeIntegerArray)
                        .addPartiesExcludeAppellant(excludeIntegerArray)
                        .addPartiesIncludeAppellant(333);
                    expect(caseQuery.queryObject.parties.includeAppellant).to.have.lengthOf(4);
                    expect(caseQuery.queryObject.parties.includeAppellant).to.contain(333);
                    includeIntegerArray.forEach(party => {
                        expect(caseQuery.queryObject.parties.includeAppellant).to.contain(party);
                    });
                    expect(caseQuery.queryObject.parties.excludeAppellant).to.have.lengthOf(3);
                    excludeIntegerArray.forEach(party => {
                        expect(caseQuery.queryObject.parties.excludeAppellant).to.contain(party);
                    });
                    caseQuery.clear();
                    expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;
                    expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;

                    caseQuery.addPartiesIncludeAppellee(3434)
                        .addPartiesExcludeAppellee(4545)
                        .addPartiesIncludeAppellee(5656);
                    expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(2);
                    expect(caseQuery.queryObject.parties.includeAppellee).to.contain(3434);
                    expect(caseQuery.queryObject.parties.includeAppellee).to.contain(5656);
                    expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(1);
                    expect(caseQuery.queryObject.parties.excludeAppellee).to.contain(4545);
                    caseQuery.clear();

                    expect(caseQuery.queryObject.parties.includeAppellee).to.be.empty;
                    expect(caseQuery.queryObject.parties.excludeAppellee).to.be.empty;

                    caseQuery.addPartiesIncludeAppellee(includeIntegerArray)
                        .addPartiesExcludeAppellee(excludeIntegerArray)
                        .addPartiesIncludeAppellee(333);
                    expect(caseQuery.queryObject.parties.includeAppellee).to.have.lengthOf(4);
                    expect(caseQuery.queryObject.parties.includeAppellee).to.contain(333);
                    includeIntegerArray.forEach(party => {
                        expect(caseQuery.queryObject.parties.includeAppellee).to.contain(party);
                    });
                    expect(caseQuery.queryObject.parties.excludeAppellee).to.have.lengthOf(3);
                    excludeIntegerArray.forEach(party => {
                        expect(caseQuery.queryObject.parties.excludeAppellee).to.contain(party);
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

                it('chaining date function should set dates', () => {
                    caseQuery.clear();

                    caseQuery.setDate('2011-01-01', 'filed', 'onOrAfter')
                        .setDate('2012-02-02', 'terminated', 'onOrBefore')
                        .setDate('2013-03-03', 'lastDocket', 'onOrAfter');

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