var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'))
const assert = chai.assert;
const expect = chai.expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe("Resolve Party Endpoints", () => {
    var partyId = 216320;
    var partyIds = [216320, 196852, 56391];

    describe('Resolve Party', () => {

        it('should contain single party information', async () => {
            const { nockDone, context } = await nockBack('resolve-party-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var party = await client.resolveParties(partyId);
            nockDone();

            expect(party.InputId).to.equal(partyId);
            expect(party.Party.Name).to.equal("Neil Gaiman");
        })
    })

    describe('Resolve Parties', () => {

        it('should contain multiple parties information', async () => {
            const { nockDone, context } = await nockBack('resolve-parties-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var parties = await client.resolveParties(partyIds);
            nockDone();
            parties.should.have.length(partyIds.length)
            partyIds.forEach(party => {
                parties.should.include.a.thing.with.deep.property("InputId", party);
            })
            parties.should.include.a.thing.with.deep.nested.property("Party.Name", "Todd McFarlane");
            parties.should.include.a.thing.with.deep.nested.property("Party.Name", "Stan Lee");
            parties.should.include.a.thing.with.deep.nested.property("Party.Name", "Neil Gaiman");
        })
    })

    describe('Error Handling', () => {
        var partiesInput;
        var partiesNoInput
        var partyBadInput;

        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone, context } = await nockBack('resolve-party-single-data.json');
            nock.enableNetConnect();

            partiesNoInput = client.resolveParties();
            partyBadInput = client.resolveParties("Invalid String Input");
            partiesInput = client.resolveParties(partyId)
            nockDone();
            await expect(partiesInput).to.be.fulfilled;
            await expect(partiesNoInput).to.be.rejected;
            await expect(partyBadInput).to.be.rejected;
        })
    })
})