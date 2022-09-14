var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Events', () => {

    it('should contain case tags', async () => {
        const { nockDone} = await nockBack('list-events-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var events = await client.listEvents();
        nockDone();
        expect(events).to.have.length.above(5);

        events.should.include('Filed');
        events.should.include('Terminated');
    });
});