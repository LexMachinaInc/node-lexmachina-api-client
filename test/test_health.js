var chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe('Health Check', () => {

    it('should register health', async () => {
        const { nockDone, context } = await nockBack('health-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var health = await client.health();
        nockDone();
        expect(health).to.equal("Feelin' fine.");
    })
})