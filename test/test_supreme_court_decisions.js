var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Supreme Court Decisions', () => {

    it('should contain supreme court decisions', async () => {
        const { nockDone} = await nockBack('list-supreme-court-decisions-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var decisions = await client.listSupremeCourtDecisions();
        nockDone();
        expect(decisions).to.have.length.above(2);

        decisions.should.include('Affirmed by SCOTUS');
        decisions.should.include('Reversed by SCOTUS');
    });
});
