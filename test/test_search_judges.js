var chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe('Search Judges', () => {

    it('should contain results', async () => {
        var search_string = "brim";
        const { nockDone, context } = await nockBack('search-judges-brim-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var judges = await client.searchJudges(search_string);
        nockDone();
        expect(judges.FederalJudges).to.have.length.above(1);
        judges.FederalJudges.should.include.a.thing.with.deep.property("Name", "Philip A. Brimmer");
        judges.FederalJudges.should.include.a.thing.with.deep.property("Initials", "PAB");
    })
})