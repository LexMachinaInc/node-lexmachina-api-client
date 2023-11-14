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

describe('Appeal Case Endpoint', () => {
    var caseId = 2005612712;
    describe('Lookup Appeal Case', () => {

        it('should contain case information', async () => {
            const { nockDone} = await nockBack('appeal-case-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var appealsCase = await client.appealsCases(caseId);
            nockDone();

            expect(appealsCase.appealsCaseId).to.equal(caseId);
            expect(appealsCase.caseTags).to.have.length.above(1);
        });
    });

    describe('Error Handling', () => {
        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('appeal-case-data.json');
            nock.enableNetConnect();
            var caseNoInput = client.appealsCases();
            var caseBadInput = client.appealsCases('This is invalid input');
            var caseInput = client.appealsCases(caseId);
            nockDone();
            await expect(caseInput).to.be.fulfilled;
            await expect(caseNoInput).to.be.rejected;
            await expect(caseBadInput).to.be.rejected;
        });
    });
});