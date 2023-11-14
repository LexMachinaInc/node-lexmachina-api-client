var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Appealability Rulings', () => {

    it('should contain appealability rulings', async () => {
        const { nockDone} = await nockBack('list-appealability-rulings-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var rulings = await client.listAppealabilityRulings();
        nockDone();
        expect(rulings).to.have.length.above(5);

        rulings.should.include('Permission to Appeal: Grant');
        rulings.should.include('Petition for Review: Deny');
    });
});
