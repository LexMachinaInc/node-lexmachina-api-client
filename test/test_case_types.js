var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe('List Case Types', () => {

    it('should contain case types', async () => {
        const { nockDone} = await nockBack('list-case-types-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTypes = await client.listCaseTypes();

        expect(caseTypes).to.have.length.above(15);
        caseTypes.should.include("ERISA");
        caseTypes.should.include("Civil Rights");
        caseTypes.should.include("Torts");
        nockDone();
    })
})