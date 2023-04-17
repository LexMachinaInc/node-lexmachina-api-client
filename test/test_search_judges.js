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

describe('Search Judges', () => {

    it('should contain results', async () => {
        var search_string = 'brim';
        const { nockDone } = await nockBack('search-judges-brim-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var judges = await client.searchJudges(search_string);
        nockDone();
        expect(judges.federalJudges).to.have.length.above(1);
        judges.federalJudges.should.include.a.thing.with.deep.property('name', 'Philip A. Brimmer');
        judges.federalJudges.should.include.a.thing.with.deep.property('initials', 'PAB');
    });

    it('should gracefully fail empty input', async () => {
        const client = new LexMachinaClient();
        await expect( client.searchJudges('')).to.be.rejectedWith(Error);
    });
});