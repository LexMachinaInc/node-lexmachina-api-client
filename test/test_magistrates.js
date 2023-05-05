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

describe('Magistrate Endpoints', () => {
    var magistrateId = 1507;
    var magistrateIds = [1507, 1536, 1385];
    describe('Lookup Magistrate', () => {

        it('should contain single magistrate information', async () => {
            const { nockDone} = await nockBack('magistrate-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var magistrate = await client.magistrates(magistrateId);
            nockDone();

            expect(magistrate.magistrateJudgeId).to.equal(magistrateId);
            expect(magistrate.name).to.equal('Craig S Denney');
        }); 
    });

    describe('Lookup Magistrates', () => {

        it('should contain multiple magistrate information', async () => {
            const { nockDone} = await nockBack('magistrate-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var magistrates = await client.magistrates(magistrateIds);
            nockDone();
            magistrates.should.have.length(magistrateIds.length);
            magistrateIds.forEach(magistrate => {
                magistrates.should.include.a.thing.with.deep.property('magistrateJudgeId', magistrate);
            });
            magistrates.should.include.a.thing.with.deep.nested.property('name', 'Zahid N Quraishi');
            magistrates.should.include.a.thing.with.deep.nested.property('name', 'Ajmel A Quereshi');
            magistrates.should.include.a.thing.with.deep.nested.property('name', 'Craig S Denney');
        });
    });

    describe('Error Handling', () => {
        var magistratesInput;
        var magistratesNoInput;
        var magistrateBadInput;
        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('magistrate-single-data.json');
            nock.enableNetConnect();

            magistratesNoInput = client.magistrates();
            magistrateBadInput = client.magistrates('Invalid String Input');
            magistratesInput = client.magistrates(magistrateId);
            nockDone();
            expect(magistratesInput).to.be.fulfilled;
            expect(magistratesNoInput).to.be.rejected;
            expect(magistrateBadInput).to.be.rejected;
        });
    });
});