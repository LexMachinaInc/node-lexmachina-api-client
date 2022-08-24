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

describe("Magistrate Endpoints", () => {
    var magistrateId = 333;
    var magistrateIds = [333, 141, 131];

    describe('Lookup Magistrate', () => {

        it('should contain single magistrate information', async () => {
            const { nockDone} = await nockBack('magistrate-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var magistrate = await client.magistrates(magistrateId);
            nockDone();

            expect(magistrate.MagistrateId).to.equal(magistrateId);
            expect(magistrate.Name).to.equal("Hildy Bowbeer");
        })
    })

    describe('Lookup Magistrates', () => {

        it('should contain multiple magistrate information', async () => {
            const { nockDone} = await nockBack('magistrate-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var magistrates = await client.magistrates(magistrateIds);
            nockDone();
            magistrates.should.have.length(magistrateIds.length)
            magistrateIds.forEach(magistrate => {
                magistrates.should.include.a.thing.with.deep.property("MagistrateId", magistrate);
            })
            magistrates.should.include.a.thing.with.deep.nested.property("Name", "Hildy Bowbeer");
            magistrates.should.include.a.thing.with.deep.nested.property("Name", "Nita L Stormes");
            magistrates.should.include.a.thing.with.deep.nested.property("Name", "Nathanael M Cousins");
        })
    })

    describe('Error Handling', () => {
        var magistratesInput;
        var magistratesNoInput
        var magistrateBadInput;
        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('magistrate-single-data.json');
            nock.enableNetConnect();

            magistratesNoInput = client.magistrates();
            magistrateBadInput = client.magistrates("Invalid String Input");
            magistratesInput = client.magistrates(magistrateId)
            nockDone();
            await expect(magistratesInput).to.be.fulfilled;
            await expect(magistratesNoInput).to.be.rejected;
            await expect(magistrateBadInput).to.be.rejected;
        })
    })
})