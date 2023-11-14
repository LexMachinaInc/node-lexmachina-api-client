var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List District Case Types', () => {

    it('should contain district case types', async () => {
        const { nockDone} = await nockBack('list-district-case-types-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTypesObject = await client.listDistrictCaseTypes();
        var caseTypes = caseTypesObject[0].caseTypes;

        expect(caseTypes).to.have.length.above(15);
        caseTypes.should.include('ERISA');
        caseTypes.should.include('Civil Rights');
        caseTypes.should.include('Torts');
        nockDone();
    });
});

describe('List State Case Types', () => {

    it('should contain state case types', async () => {
        const { nockDone} = await nockBack('list-state-case-types-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTypesObject = await client.listStateCaseTypes();
        
        expect(caseTypesObject).to.have.length.above(45);
        caseTypesObject.should.include.a.thing.with.deep.nested.property("caseTypes",[
            "Contract (TX)",
            "Injury or Damage (TX)",
            "Other Civil (TX)",
            "Real Property (TX)",
            "Related to Criminal Matters (TX)"]);
        caseTypesObject.should.include.a.thing.with.deep.nested.property("caseTypes",[
            "Other Civil (GA)",
            "Torts (GA)",
            "Civil Writ (GA)",
            "Appeal / Judicial Review (GA)",
            "Tax Appeal (GA)",
            "Property (GA)",
            "Contract (GA)"]);
        caseTypesObject.should.include.a.thing.with.deep.nested.property("caseTypes",[
            "Contract (OR)",
            "Other Civil (OR)",
            "Real Property (OR)",
            "Torts (General) (OR)",
            "Torts (Legal Malpractice) (OR)",
            "Torts (Medical Malpractice) (OR)",
            "Torts (Products Liability) (OR)",
            "Torts (Wrongful Death) (OR)"]);
        nockDone();
    });
});

describe('List Appeals Case Types', () => {

    it('should contain appeals case types', async () => {
        const { nockDone} = await nockBack('list-appeals-case-types-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTypesObject = await client.listAppealsCaseTypes();
        
        expect(caseTypesObject[0].caseTypes).to.have.length.above(20);
 
        caseTypesObject[0].caseTypes.should.contain("Antitrust");  
        caseTypesObject[0].caseTypes.should.contain("Insurance");  
        caseTypesObject[0].caseTypes.should.contain("Trade Secret");  

        nockDone();
    });
});