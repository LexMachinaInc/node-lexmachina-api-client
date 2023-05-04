var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Judgment Sources', () => {
    var categories = ['damages', 'remedies', 'findings'];

    it('should contain judgment sources', async () => {
        const { nockDone} = await nockBack('list-judgments-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var judgmentSources = await client.listJudgmentSources();
        nockDone();

        expect(Object.keys(judgmentSources)).to.have.lengthOf(4);
        categories.forEach(category => {
            judgmentSources.should.include.key(category);
            judgmentSources[category].should.include('Default Judgment');
            judgmentSources[category].should.include('Consent Judgment');
        });
    });
});