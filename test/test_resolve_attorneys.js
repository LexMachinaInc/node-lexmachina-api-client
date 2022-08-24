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

describe("Resolve Attorney Endpoint", () => {
    var attorneyId = 110161257;
    var attorneyIds = [110161257, 43337, 14974596];

    describe('Resolve Attorney', () => {

        it('should contain resolved attorney information', async () => {
            const { nockDone} = await nockBack('resolve-attorneys-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var attorney = await client.resolveAttorneys(attorneyId);
            nockDone();

            expect(attorney.InputId).to.equal(attorneyId);
            expect(attorney.Attorney.Name).to.equal("Gerry L. Spence");
        })
    })

    describe('Lookup Attorneys', () => {

        it('should contain multiple attorney information', async () => {
            const { nockDone} = await nockBack('resolve-attorneys-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var attorneys = await client.resolveAttorneys(attorneyIds);
            nockDone();
            attorneys.should.have.length(attorneyIds.length)
            attorneyIds.forEach(attorney => {
                attorneys.should.include.a.thing.with.deep.property("InputId", attorney);
            })
            attorneys.should.include.a.thing.with.deep.nested.property("Attorney.Name", "Gerry L. Spence");
        })
    })

    describe('Error Handling', () => {
        var attorneysInput;
        var attorneysNoInput
        var attorneyBadInput;

        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('resolve-attorneys-single-data.json');
            nock.enableNetConnect();

            attorneysNoInput = client.attorneys();
            attorneyBadInput = client.resolveAttorneys("Invalid String Input");
            attorneysInput = client.resolveAttorneys(attorneyId)
            nockDone();
            await expect(attorneysInput).to.be.fulfilled;
            await expect(attorneysNoInput).to.be.rejected;
            await expect(attorneyBadInput).to.be.rejected;
        })
    })
})