var chai = require('chai');
const expect = require('chai').expect;
chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('Search Parties', () => {

    it('should contain results', async () => {
        var search_string = 'merck';
        const { nockDone } = await nockBack('search-parties-merck-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var parties = await client.searchParties(search_string);
        nockDone();
        expect(parties).to.have.length.above(100);
        parties.should.include.a.thing.with.deep.property('name', 'John Merck');
        parties.should.include.a.thing.with.deep.property('partyId', 147190);
    });

    it('should page through results', async () => {
        var search_string = 'schmitt';
        const { nockDone } = await nockBack('search-parties-schmitt-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var parties = await client.searchParties(search_string);
        nockDone();
        expect(parties).to.have.length.above(501);
    });


    it('should gracefully fail empty input', async () => {
        const client = new LexMachinaClient();
        await expect( client.searchParties('')).to.be.rejectedWith(Error);
    });
});