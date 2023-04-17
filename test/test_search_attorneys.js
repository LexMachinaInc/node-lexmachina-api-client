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

describe('Search Attorneys', () => {

    it('should contain results', async () => {
        var search_string = 'sligh';
        const { nockDone } = await nockBack('search-attorneys-sligh-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var attorneys = await client.searchAttorneys(search_string);
        nockDone();
        expect(attorneys).to.have.length.above(1);
        attorneys.should.include.a.thing.with.deep.property('name', 'Kathryn H. Sligh');
        attorneys.should.include.a.thing.with.deep.property('attorneyId', 106831204);
    });

    it('should page through results', async () => {
        var search_string = 'schmidt';
        const { nockDone } = await nockBack('search-attorneys-schmidt-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var attorneys = await client.searchAttorneys(search_string);
        nockDone();
        expect(attorneys).to.have.length.above(501);
    });

    it('should gracefully fail empty input', async () => {
        const client = new LexMachinaClient();
        await expect( client.searchAttorneys('')).to.be.rejectedWith(Error);
    });
});