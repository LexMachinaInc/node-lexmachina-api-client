var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'))
const expect = chai.expect;
chai.should();
const nock = require('nock');
const nockBack = require('nock').back;
nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe("Judge Endpoints", () => {
    var judgeId = 3349;
    var judgeIds = [3349, 3488, 2877];
    describe('Lookup Judge', () => {

         it('should contain single judge information', async () => {
            const { nockDone} = await nockBack('judge-single-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var judge = await client.federalJudges(judgeId);
            nockDone();

            expect(judge.federalJudgeId).to.equal(judgeId);
            expect(judge.name).to.equal("Beryl Alaine Howell");
        }) 
    })

    describe('Lookup Judges', () => {

        it('should contain multiple judge information', async () => {
            const { nockDone} = await nockBack('judge-multiple-data.json');
            nock.enableNetConnect();
            const client = new LexMachinaClient();
            var judges = await client.federalJudges(judgeIds);
            nockDone();
            judges.should.have.length(judgeIds.length)
            judgeIds.forEach(judge => {
                judges.should.include.a.thing.with.deep.property("federalJudgeId", judge);
            })
            judges.should.include.a.thing.with.deep.nested.property("name", "Beryl Alaine Howell");
            judges.should.include.a.thing.with.deep.nested.property("name", "Vernon Speede Broderick");
            judges.should.include.a.thing.with.deep.nested.property("name", "James S. Moody");
        })
    })

    describe('Error Handling', () => {
        var judgesInput;
        var judgesNoInput
        var judgeBadInput;
        it("bad input throws error", async () => {
            const client = new LexMachinaClient();
            const { nockDone} = await nockBack('judge-single-data.json');
            nock.enableNetConnect();

            judgesNoInput = client.federalJudges();
            judgeBadInput = client.federalJudges("Invalid String Input");
            judgesInput = client.federalJudges(judgeId)
            nockDone();
            expect(judgesInput).to.be.fulfilled;
            expect(judgesNoInput).to.be.rejected;
            expect(judgeBadInput).to.be.rejected;
        })
    })
})