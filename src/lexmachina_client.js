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

    async getOneSearchPage(options, resultFieldName) {
        var config = options || {};
        if (config.params.q == '') {
            throw new Error('The search query cannot be empty');
        }
        var result = await this.lmRequest.requestURL(config);
        //console.log(result);
        if (result) {
            return result[resultFieldName];
        } else {
            return  [];
        }
    }

    async searchParties(searchString, options) {

        var pageNumber = 1;
        var parties = [];
        var page_parties = [];
        options = options || {};
        options.endpoint = '/search-parties';
        options.method = 'get';
        options.params = {'q': searchString, 'pageSize': 500};
        do {
            options.params.pageNumber = pageNumber;
            page_parties = await this.getOneSearchPage(options, 'parties');
            parties = [...new Set([...parties, ...page_parties])];
            pageNumber++;
        } while (page_parties.length > 0);
        return parties;
    }

    async searchLawFirms(searchString, options) {
        var pageNumber = 1;
        var lawFirms = [];
        var page_law_firms = [];
        options = options || {};
        options.endpoint = '/search-law-firms';
        options.method = 'get';
        options.params = {'q': searchString, 'pageSize': 500};
        do {
            options.params.pageNumber = pageNumber;
            page_law_firms = await this.getOneSearchPage(options, 'lawFirms');
            lawFirms = [...new Set([...lawFirms, ...page_law_firms])];
            pageNumber++;
        } while (page_law_firms.length > 0);
        return lawFirms;
    }

    async searchAttorneys(searchString, options) {
        var pageNumber = 1;
        var attorneys = [];
        var page_attorneys = [];
        options = options || {};
        options.endpoint = '/search-attorneys';
        options.method = 'get';
        options.params = {'q': searchString, 'pageSize': 500};
        do {
            options.params.pageNumber = pageNumber;
            page_attorneys = await this.getOneSearchPage(options, 'attorneys');
            attorneys = [...new Set([...attorneys, ...page_attorneys])];
            pageNumber++;
        } while (page_attorneys.length > 0);
        return attorneys;
    }

    async queryDistrictCases(query, options) {
        return this.queryEngine.queryDistrictCases(query, options);
    }
};
