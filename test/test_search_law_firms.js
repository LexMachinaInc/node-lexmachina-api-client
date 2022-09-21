var chai = require('chai');
const expect = require('chai').expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('Search Law Firms', () => {

    it('should contain results', async () => {
        var search_string = 'slusher';
        const { nockDone } = await nockBack('search-law-firms-slusher-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var lawFirms = await client.searchLawFirms(search_string);
        nockDone();
        expect(lawFirms).to.have.length.above(1);
        lawFirms.should.include.a.thing.with.deep.property('name', 'Rodney B Slusher');
        lawFirms.should.include.a.thing.with.deep.property('lawFirmId', 18620057);
    });


    it('should page through results', async () => {
        var search_string = 'schmidt';
        const { nockDone } = await nockBack('search-law-firms-schmidt-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var lawFirms = await client.searchLawFirms(search_string);
        nockDone();
        expect(lawFirms).to.have.length.above(501);
    });
});