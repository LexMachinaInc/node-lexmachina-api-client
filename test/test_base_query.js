var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const expect = chai.expect;
chai.should();

const nock = require('nock');
const nockBack = require('nock').back;

nockBack.fixtures = './test/nock_fixtures/';
const AccessTokenUtils = require('../src/access_token_utils.js');
nockBack.setMode('record');
const LexMachinaClient = require('../src/lexmachina_client');


describe('Base LexMachina Request', () => {

    describe('User Agent', () => {
        it('should include version in user agent', () => {
            const client = new LexMachinaClient();
            expect(client.lmRequest.atu.token_config).to.not.be.empty;
        });

        it('should be able to access non-default file constructor', () => {
            const client = new LexMachinaClient('./config/config-notdefault.json');
            expect(client.lmRequest.atu.token_config).to.not.be.empty;
        });

        it('should be able to access relative path file constructor', () => {
            const client = new LexMachinaClient('./config/config-notdefault.json');
            expect(client.lmRequest.atu.token_config).to.not.be.empty;
        });

        it('should throw error with nonexistent file constructor', () => {
            function badConfigFile() {
                const client = new LexMachinaClient('../config/nonexistent.json');
            }
            expect(badConfigFile).to.throw();
        });

    });

    describe('FetchTokenIntoStorage', () => {
        it('should get token from API and store via node-persist', async () => {
            const client = new LexMachinaClient();
            nock.enableNetConnect();
            const doFetch = client.lmRequest.atu.fetchTokenIntoStorage();
            const { nockDone} = await nockBack('access-token-success.json');
            await expect(doFetch).to.be.fulfilled;
            nockDone();
        });
    });

});

