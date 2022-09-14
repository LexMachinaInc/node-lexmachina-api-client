var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Damages', () => {

    it('should contain damages', async () => {
        const { nockDone} = await nockBack('list-damages-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var damages = await client.listDamages();
        nockDone();

        expect(Object.keys(damages)).to.have.length.above(15);
        damages.should.contain.key('Patent');
        damages['Patent'].should.contain('Reasonable Royalty');
        expect(damages['ERISA']).to.include('Administrative Fees');
    });
});