var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe('List Case Tags', () => {

    it('should contain case tags', async () => {
        const { nockDone} = await nockBack('list-case-tags-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTypes = await client.listCaseTags();
        nockDone();
        expect(caseTypes).to.have.length.above(50);

        caseTypes.should.include("Trial");
        caseTypes.should.include("Motor Vehicle");
        caseTypes.should.include("Chapter 11");
    })
})