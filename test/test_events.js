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
        const { nockDone} = await nockBack('list-district-events-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var eventsObjects = await client.listDistrictEvents();
        var events = eventsObjects.events;
        nockDone();
        expect(events).to.have.length.above(5);

        events.should.include('Filed');
        events.should.include('Terminated');
    });
});

describe('List State Events', () => {

    it('should contain case tags', async () => {
        const { nockDone} = await nockBack('list-state-events-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var eventsObject = await client.listStateEvents();
        var events = eventsObject.events;
        nockDone();
        expect(events).to.have.length.above(2);

        events.should.include('Filed');
        events.should.include('Terminated');
    });
});

describe('List Appeals Events', () => {

    it('should contain events', async () => {
        const { nockDone} = await nockBack('list-appeals-events-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var eventsObject = await client.listAppealsEvents();
        var events = eventsObject.events;
        nockDone();
        expect(events).to.have.length.above(1);

        events.should.include('Filed');
        events.should.include('Terminated');
    });
});