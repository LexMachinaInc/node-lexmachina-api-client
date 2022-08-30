var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'))
const expect = chai.expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe("District Case Endpoint", () => {
    var caseId = 93617;
    describe('Lookup District Case', () => {

        it('should contain case information', async () => {
            const { nockDone} = await nockBack('district-case-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var districtCase = await client.districtCases(caseId);
            nockDone();

            expect(districtCase.caseId).to.equal(caseId);
            expect(districtCase.caseTags).to.have.length.above(2);
        })
    })

    describe('Error Handling', () => {
        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('district-case-data.json');
            nock.enableNetConnect();
            var caseNoInput = client.districtCases();
            var caseBadInput = client.districtCases("This is invalid input");
            var caseInput = client.districtCases(caseId);
            nockDone();
            await expect(caseInput).to.be.fulfilled;
            await expect(caseNoInput).to.be.rejected;
            await expect(caseBadInput).to.be.rejected;
        })
    })
})