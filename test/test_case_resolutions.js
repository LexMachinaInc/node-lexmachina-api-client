var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Case Resolutions', () => {

    it('should contain case resolutions', async () => {
        const { nockDone} = await nockBack('list-case-resolutions-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseResolutions = await client.listCaseResolutions();
        nockDone();
        expect(caseResolutions).to.have.length.above(20);

        caseResolutions.should.deep.include({summary:'Claimant Win', specific:'Bench Trial'});
        caseResolutions.should.deep.include({summary:'Procedural', specific:'Dismissal'});
        caseResolutions.should.deep.include({summary:'Claim Defendant Win', specific:'Jury'});

    });
});