var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List Originating Venues', () => {

    it('should contain originating venues', async () => {
        const { nockDone} = await nockBack('list-originating-venues-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var venuesObject = await client.listOriginatingVenues();
        nockDone();
        expect(venuesObject.originatingVenues).to.have.length.above(5);

        venuesObject.originatingVenues.should.include('Originating Venue: Other Court');
        venuesObject.originatingVenues.should.include('Originating Venue: Court of Federal Claims');
    });
});
