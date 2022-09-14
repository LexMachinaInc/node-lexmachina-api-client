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

describe('Law Firm Endpoints', () => {
    var lawfirmId = 1368;
    var lawfirmIds = [1368, 920, 101693204];

    describe('Lookup Law Firm', () => {

        it('should contain single lawfirm information', async () => {
            const { nockDone} = await nockBack('lawfirms-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var lawfirm = await client.lawFirm(lawfirmId);
            nockDone();

            expect(lawfirm.lawFirmId).to.equal(lawfirmId);
            expect(lawfirm.name).to.equal('Perkins Coie');
        });
    });

    describe('Lookup Law Firms', () => {

        it('should contain multiple law firm information', async () => {
            const { nockDone} = await nockBack('lawfirms-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var lawfirms = await client.lawFirm(lawfirmIds);
            nockDone();
            lawfirms.should.have.length(lawfirmIds.length);
            lawfirmIds.forEach(lawfirm => {
                lawfirms.should.include.a.thing.with.deep.property('lawFirmId', lawfirm);
            });
            lawfirms.should.include.a.thing.with.deep.nested.property('name', 'Perkins Coie');
            lawfirms.should.include.a.thing.with.deep.nested.property('name', 'Quinn Emanuel Urquhart & Sullivan');
            lawfirms.should.include.a.thing.with.deep.nested.property('name', 'Sligh Law Firm');
        });
    });

    describe('Error Handling', () => {
        var lawfirmsInput;
        var lawfirmsNoInput;
        var lawfirmBadInput;
        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('lawfirms-single-data.json');
            nock.enableNetConnect();

            lawfirmsNoInput = client.lawFirm();
            lawfirmBadInput = client.lawFirm('Invalid String Input');
            lawfirmsInput = client.lawFirm(lawfirmId);
            nockDone();
            await expect(lawfirmsInput).to.be.fulfilled;
            await expect(lawfirmsNoInput).to.be.rejected;
            await expect(lawfirmBadInput).to.be.rejected;
        });
    });
});