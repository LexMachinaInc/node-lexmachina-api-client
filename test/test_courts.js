var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List District Courts', () => {

    it('should contain district courts', async () => {
        const { nockDone} = await nockBack('list-district-courts-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var courts = await client.listDistrictCourts();

        expect(courts).to.have.length.above(90);
        courts.should.include.a.thing.with.deep.property('abbreviation', 'njd');
        courts.should.include.a.thing.with.deep.property('name', 'U.S. District Court for the District of Columbia');
        courts.should.include.a.thing.with.deep.property('shortName', 'D.Or.');
        nockDone();
    });
});

describe('List State Courts', () => {

    it('should contain state courts', async () => {
        const { nockDone} = await nockBack('list-state-courts-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var courts = await client.listStateCourts();

        expect(courts).to.have.length.above(40);
        courts.should.include.a.thing.with.deep.property('type', 'State');
        courts.should.include.a.thing.with.deep.property('name', 'Bronx County Supreme Court');
        courts.should.include.a.thing.with.deep.property('state', 'NY');
        nockDone();
    });
});

describe('List Appeals Courts', () => {

    it('should contain appeals courts', async () => {
        const { nockDone} = await nockBack('list-appeals-courts-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var courts = await client.listAppealsCourts();

        expect(courts).to.have.length.above(10);
        courts.should.include.a.thing.with.deep.property('type', 'FederalAppeals');
        courts.should.include.a.thing.with.deep.property('name', 'U.S. Court of Appeals for the Ninth Circuit');
        courts.should.include.a.thing.with.deep.property('shortName', '7th Cir.');
        courts.should.include.a.thing.with.deep.property('abbreviation', 'cafc');
        nockDone();
    });
});