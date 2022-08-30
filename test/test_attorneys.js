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

describe("Attorney Endpoints", () => {
    var attorneyId = 110161257;
    var attorneyIds = [110161257, 43337, 14974596];
    
     describe('Lookup Attorney', () => {
        it('should contain single attorney information', async () => {
            const { nockDone} = await nockBack('attorneys-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var attorney = await client.attorneys(attorneyId);
            nockDone();
            expect(attorney.attorneyId).to.equal(attorneyId);
            expect(attorney.name).to.equal("Gerry L. Spence");
        })
    }) 

    describe('Lookup Attorneys', () => {

        it('should contain multiple attorney information', async () => {
            const { nockDone} = await nockBack('attorneys-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var attorneys = await client.attorneys(attorneyIds);
            console.log(attorneys)
            nockDone();
            attorneys.should.have.length(attorneyIds.length)
            attorneyIds.forEach(attorney => {
                attorneys.should.include.a.thing.with.deep.property("attorneyId", attorney);
            })
            attorneys.should.include.a.thing.with.deep.nested.property("name", "Gerry L. Spence");
        })
    })

    describe('Error Handling', () => {
        var attorneysInput;
        var attorneysNoInput
        var attorneyBadInput;
        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('attorneys-single-data.json');
            nock.enableNetConnect();
            attorneysNoInput = client.attorneys();
            attorneyBadInput = client.attorneys("Invalid String Input");
            attorneysInput = client.attorneys(attorneyId)
            nockDone();
            await expect(attorneysInput).to.be.fulfilled;
            await expect(attorneysNoInput).to.be.rejected;
            await expect(attorneyBadInput).to.be.rejected;
        })
    })
})