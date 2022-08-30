var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe('List Courts', () => {

    it('should contain courts', async () => {
        const { nockDone} = await nockBack('list-courts-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var courts = await client.listCourts();

        expect(courts).to.have.length.above(90);
        courts.should.include.a.thing.with.deep.property("abbreviation", "njd");
        courts.should.include.a.thing.with.deep.property("name", "U.S. District Court for the District of Columbia");
        courts.should.include.a.thing.with.deep.property("shortName", "D.Or.");
        nockDone();
    })
})