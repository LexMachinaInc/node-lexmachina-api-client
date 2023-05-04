var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List District Damages', () => {

    it('should contain damages', async () => {
        const { nockDone} = await nockBack('list-district-damages-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var damagesObject = await client.listDistrictDamages();
        var damages = damagesObject.damagesByPraticeArea;
        nockDone();

        expect(Object.keys(damages)).to.have.length.above(15);
        damages.should.contain.key('Patent');
        damages['Patent'].should.contain('Reasonable Royalty');
        expect(damages['ERISA']).to.include('Administrative Fees');
    });
});

describe('List State Damages', () => {

    it('should contain damages', async () => {
        const { nockDone} = await nockBack('list-state-damages-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var damagesObject = await client.listStateDamages();
        var damages = damagesObject.damages;
        nockDone();

        expect(damages).to.have.length.above(2);
        damages.should.contain('General Damages (Judgment on Merits)');
    });
});