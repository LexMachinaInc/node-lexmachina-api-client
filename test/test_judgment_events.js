var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Judgment Events', () => {

    it('should contain judgment events', async () => {
        const { nockDone} = await nockBack('list-judgment-events-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var judgmentEvents = await client.listStateJudgmentEvents();
        nockDone();

        expect(Object.keys(judgmentEvents)).to.have.lengthOf(2);
        var actualEvents = judgmentEvents.judgmentEvents;
        actualEvents.should.include('Default Judgment');
        actualEvents.should.include('Consent Judgment');
        });
    });