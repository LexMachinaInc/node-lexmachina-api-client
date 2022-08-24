const CasesQueryRequest = require('../src/case_query_request.js')
var chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'))

const nock = require('nock');
const nockBack = require('nock').back;

nockBack.fixtures = "./test/nock_fixtures/"
const LexMachinaClient = require('../src/lexmachina_client')
nockBack.setMode('record');

describe("Executing Query", () => {


});