var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List District Case Resolutions', () => {

    it('should contain district case resolutions', async () => {
        const { nockDone} = await nockBack('list-district-case-resolutions-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseResolutionsObject = await client.listDistrictCaseResolutions();
        nockDone();
        var caseResolutions = caseResolutionsObject.caseResolutions;
        expect(caseResolutions).to.have.length.above(20);

        caseResolutions.should.deep.include({summary:'Claimant Win', specific:'Trial'});
        caseResolutions.should.deep.include({summary:'Procedural', specific:'Dismissal'});
        caseResolutions.should.deep.include({summary:'Claim Defendant Win', specific:'Trial'});

    });
});

describe('List State Case Resolutions', () => {

    it('should contain state case resolutions', async () => {
        const { nockDone} = await nockBack('list-state-case-resolutions-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseResolutionsObject = await client.listStateCaseResolutions();
        nockDone();
        var caseResolutions = caseResolutionsObject.caseResolutions;
        expect(caseResolutions).to.have.length.above(10);

        expect(caseResolutions).to.contain.an.item.with.property('summary', 'Plaintiff Win');
        expect(caseResolutions).to.contain.an.item.with.property('summary', 'Procedural');
        expect(caseResolutions).to.contain.an.item.with.property('summary', 'Defendant Win');
        expect(caseResolutions).to.contain.an.item.with.property('specific', 'Bench Trial');
        expect(caseResolutions).to.contain.an.item.with.property('specific', 'Consent Judgment');
        expect(caseResolutions).to.contain.an.item.with.property('specific', 'Jury Verdict');

    });
});