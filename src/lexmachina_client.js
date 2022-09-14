const BaseLexMachinaRequest = require('./base_lm_request.js');
const QueryDistrictCases = require('./query_district_cases.js');

module.exports = class LexMachinaClient {

    constructor(config_path) {
        this.lmRequest = new BaseLexMachinaRequest(config_path);
        this.queryEngine = new QueryDistrictCases(config_path);
    }

    async attorneys(attornies) {
        var config = {};
        if (Number.isInteger(attornies)) {
            config.endpoint = '/attorneys/' + attornies;
        } else if (Array.isArray(attornies)) {

            config.endpoint = '/attorneys';
            config.params = { attorneyIds: attornies };
        } else {
            throw new Error('The attorney_id must be an integer or array of integers');
        }
        return this.lmRequest.requestURL(config);
    }

    async districtCases(cases) {
        var config = {};
        if (Number.isInteger(cases)) {
            config.endpoint = '/district-cases/' + cases;
        } else {
            throw new Error('The case_id must be an integer');
        }
        return this.lmRequest.requestURL(config);
    }

    async federalJudges(judges) {
        var config = {};
        if (Number.isInteger(judges)) {
            config.endpoint = '/federal-judges/' + judges;
        } else if (Array.isArray(judges)) {
            config.endpoint = '/federal-judges';
            config.params = {federalJudgeIds: judges };
        } else {
            throw new Error('The judges_id must be an integer or array of integers');
        }
        return this.lmRequest.requestURL(config);
    }

    async health() {
        var config = { 'endpoint': '/health' };
        return this.lmRequest.requestURL(config);
    }

    async lawFirm(lawFirms) {
        var config = {};
        if (Number.isInteger(lawFirms)) {
            config.endpoint = '/law-firms/' + lawFirms;
        } else if (Array.isArray(lawFirms)) {
            config.endpoint = '/law-firms';
            config.params = { lawFirmIds: lawFirms };
        } else {
            throw new Error('The law_firm_id must be an integer or array of integers');
        }
        return this.lmRequest.requestURL(config);
    }

    async listCaseResolutions() {
        var config = { 'endpoint': '/list-case-resolutions' };
        return this.lmRequest.requestURL(config);
    }

    async listCaseTags() {
        var config = { 'endpoint': '/list-case-tags' };
        return this.lmRequest.requestURL(config);
    }

    async listCaseTypes() {
        var config = { 'endpoint': '/list-case-types' };
        return this.lmRequest.requestURL(config);
    }

    async listCourts() {
        var config = { 'endpoint': '/list-courts' };
        return this.lmRequest.requestURL(config);
    }

    async listDamages() {
        var config = { 'endpoint': '/list-damages' };
        return this.lmRequest.requestURL(config);
    }

    async listEvents() {
        var config = { 'endpoint': '/list-events' };
        return this.lmRequest.requestURL(config);
    }
    
    async listJudgmentSources() {
        var config = { 'endpoint': '/list-judgment-sources' };
        return this.lmRequest.requestURL(config);
    }
    async magistrates(magistrates) {
        var config = {};
        if (Number.isInteger(magistrates)) {
            config.endpoint = '/magistrate-judges/' + magistrates;
        } else if (Array.isArray(magistrates)) {
            config.endpoint = '/magistrate-judges';
            config.params = { magistrateJudgeIds: magistrates };
        } else {
            throw new Error('The magistrate_id must be an integer or array of integers');
        }
        return this.lmRequest.requestURL(config);
    }

    async parties(parties) {
        var config = {};
        if (Number.isInteger(parties)) {
            config.endpoint = '/parties/' + parties;
        } else if (Array.isArray(parties)) {
            config.endpoint = '/parties';
            config.params = { partyIds: parties };
        } else {
            throw new Error('The party_id must be an integer or array of integers');
        }
        return this.lmRequest.requestURL(config);
    }

    async searchJudges(judge_string) {
        var config = {};
        config.endpoint = '/search-judges';
        config.params = { q: judge_string };
        return this.lmRequest.requestURL(config);
    }

    async queryDistrictCases(query, options) {
        return this.queryEngine.queryDistrictCases(query, options);
    }
};
