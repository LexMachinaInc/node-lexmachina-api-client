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

describe('Access Token Utility Functions', () => {

    describe('Constructor Functions', () => {
        it('should be able to instantiate empty constructor', () => {
            var atu = new AccessTokenUtils();
            expect(atu.token_config).to.not.be.empty;
        });

        it('should be able to access non-default file constructor', () => {
            var atu = new AccessTokenUtils('./config/config-notdefault.json');
            expect(atu.token_config).to.not.be.empty;
        });

        it('should be able to access relative path file constructor', () => {
            var atu = new AccessTokenUtils('./config/config-notdefault.json');
            expect(atu.token_config).to.not.be.empty;
        });

        it('should throw error with nonexistent file constructor', () => {
            function badConfigFile() {
                var atu = new AccessTokenUtils('../config/nonexistent.json');
                atu;
            }
            expect(badConfigFile).to.throw();
        });

        it('should throw error with nonexistent file constructor', () => {
            function badConfigFile() {
                var atu = new AccessTokenUtils('../config/nonexistent.json');
                atu;
            }
            expect(badConfigFile).to.throw();
        });
    });

    describe('FetchTokenIntoStorage', () => {
        it('should get token from API and store via node-persist', async () => {
            var atu = new AccessTokenUtils();
            nock.enableNetConnect();
            const doFetch = atu.fetchTokenIntoStorage();
            const { nockDone} = await nockBack('access-token-success.json');
            await expect(doFetch).to.be.fulfilled;
            nockDone();
        });
    });

});

