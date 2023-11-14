var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List AppellateDecisions', () => {

    it('should contain appellate decisions', async () => {
        const { nockDone} = await nockBack('list-appellate-decisions-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var rulings = await client.listAppellateDecisions();
        nockDone();
        expect(rulings).to.have.length.above(2);

        rulings.should.include('Affirmed');
        rulings.should.include('Reversed');
    });
});
