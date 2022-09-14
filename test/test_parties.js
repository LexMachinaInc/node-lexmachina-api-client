var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const expect = chai.expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('Party Endpoints', () => {
    var partyId = 216320;
    var partyIds = [216320, 196852, 56391];

    describe('Lookup Party', () => {

        it('should contain single party information', async () => {
            const { nockDone} = await nockBack('party-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var party = await client.parties(partyId);
            nockDone();

            expect(party.partyId).to.equal(partyId);
            expect(party.name).to.equal('Neil Gaiman');
        });
    });

    describe('Lookup Parties', () => {

        it('should contain multiple parties information', async () => {
            const { nockDone} = await nockBack('parties-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var parties = await client.parties(partyIds);
            nockDone();
            parties.should.have.length(partyIds.length);
            partyIds.forEach(party => {
                parties.should.include.a.thing.with.deep.property('partyId', party);
            });
            parties.should.include.a.thing.with.deep.nested.property('name', 'Todd McFarlane');
            parties.should.include.a.thing.with.deep.nested.property('name', 'Stan Lee');
            parties.should.include.a.thing.with.deep.nested.property('name', 'Neil Gaiman');
        });
    });

    describe('Error Handling', () => {
        var partiesInput;
        var partiesNoInput;
        var partyBadInput;

        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('party-single-data.json');
            nock.enableNetConnect();

            partiesNoInput = client.parties();
            partyBadInput = client.parties('Invalid String Input');
            partiesInput = client.parties(partyId);
            nockDone();
            await expect(partiesInput).to.be.fulfilled;
            await expect(partiesNoInput).to.be.rejected;
            await expect(partyBadInput).to.be.rejected;
        });
    });
});