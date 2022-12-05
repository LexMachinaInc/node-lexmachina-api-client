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

describe('Patent Endpoints', () => {
    var patentId = '7304635';
    var patentIds = ['7304635', '4703017', '6003252'];

    describe('Lookup Patent', () => {

        it('should contain single patent information', async () => {
            const { nockDone} = await nockBack('patent-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var patent = await client.patents(patentId);
            nockDone();

            expect(patent.number).to.equal(patentId);
            expect(patent.title).to.equal('Programmable virtual book system');
        });
    });

    describe('Lookup Patents', () => {

        it('should contain multiple patent information', async () => {
            const { nockDone} = await nockBack('patent-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var patents = await client.patents(patentIds);
            nockDone();
            patents.should.have.length(patentIds.length);
            patentIds.forEach(patent => {
                patents.should.include.a.thing.with.deep.property('number', patent);
            });
            patents.should.include.a.thing.with.deep.nested.property('title', 'Programmable virtual book system');
            patents.should.include.a.thing.with.deep.nested.property('title', 'Solid phase assay with visual readout');
            patents.should.include.a.thing.with.deep.nested.property('title', 'Conversion apparatus and method for use with excavator and crane devices');
        });
    });

    describe('Error Handling', () => {
        var patentsInput;
        var patentsNoInput;
        var patentBadInput;

        it('bad input throws error', async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('patent-single-data.json');
            nock.enableNetConnect();

            patentsNoInput = client.patents();
            patentBadInput = client.patents(123);
            patentsInput = client.patents(patentId);
            nockDone();
            await expect(patentsInput).to.be.fulfilled;
            await expect(patentsNoInput).to.be.rejected;
            await expect(patentBadInput).to.be.rejected;
        });
    });
});