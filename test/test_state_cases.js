var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const expect = chai.expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('State Case Endpoint', () => {
    var caseId = 2007659138;
    describe('Lookup State Case', () => {

        it('should contain case information', async () => {
            const { nockDone} = await nockBack('state-case-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var stateCase = await client.stateCases(caseId);
            nockDone();

            expect(stateCase.stateCaseId).to.equal(caseId);
            expect(stateCase.caseTags).to.have.length.above(2);
        });
    });

    describe('Error Handling', () => {
        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('state-case-data-error.json');
            nock.enableNetConnect();
            var caseNoInput = client.stateCases();
            var caseBadInput = client.stateCases('This is invalid input');
            var caseInput = client.stateCases(caseId);
            nockDone();
            await expect(caseInput).to.be.fulfilled;
            await expect(caseNoInput).to.be.rejected;
            await expect(caseBadInput).to.be.rejected;
        });
    });
});