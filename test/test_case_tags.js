var chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = './test/nock_fixtures/';
const LexMachinaClient = require('../src/lexmachina_client');
nockBack.setMode('record');

describe('List District Case Tags', () => {

    it('should contain district case tags', async () => {
        const { nockDone} = await nockBack('list-district-case-tags-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTagsObject = await client.listDistrictCaseTags();
        var caseTags = caseTagsObject[0].caseTags;
        nockDone();
        expect(caseTagsObject.length).to.equal(1);

        caseTags.should.include('Trial');
        caseTags.should.include('Motor Vehicle');
        caseTags.should.include('Chapter 11');
    });
});

describe('List State Case Tags', () => {

    it('should contain state case tags', async () => {
        const { nockDone} = await nockBack('list-state-case-tags-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTagsObject = await client.listStateCaseTags();
        nockDone();
        
        expect(caseTagsObject).to.have.length.greaterThan(40);

        caseTagsObject.should.include.a.thing.with.deep.nested.property("caseTags",[
            "Trial",
            "Jury"
        ]);        
        caseTagsObject.should.include.a.thing.with.deep.nested.property("court", {
            "name": "Court of Chancery",
            "type": "State",
            "state": "DE"
        });
    });
});

describe('List Appeals Case Tags', () => {

    it('should contain appeals case tags', async () => {
        const { nockDone} = await nockBack('list-appeals-case-tags-data.json');
        nock.enableNetConnect();
        const client = new LexMachinaClient();
        var caseTagsObject = await client.listAppealsCaseTags();
        nockDone();
        
        expect(caseTagsObject[0].caseTags).to.have.length.greaterThan(10);

        caseTagsObject[0].caseTags.should.contain(
            "Petition for Review: Grant"
        );  
        
        caseTagsObject[0].caseTags.should.contain(
            "Appealability Ruling"
        );  

        caseTagsObject.should.include.a.thing.with.deep.nested.property("court", {
            "name": "All Federal Appeals Courts",
            "type": "FederalAppeals"
        });
    });
});