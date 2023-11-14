const BaseLexMachinaRequest = require('./base_lm_request.js');
const QueryDistrictCases = require('./query_cases.js');
const path = require('path');

module.exports = class LexMachinaClient {

    constructor(input_config_file_path) {
            var config_file_path='';
            if (!input_config_file_path) {
                config_file_path =  '../config/config.json';
            } else {
                if (!path.isAbsolute(input_config_file_path)) {
                    config_file_path = path.join(process.cwd(), input_config_file_path);
                } else {
                    config_file_path = input_config_file_path;
                }
            }
    
            try {
                var config =  require(config_file_path);
                this.token_config = config.authParameters;
            } catch (e){
                console.log(' Cannot load config file at ' + config_file_path);
                throw (e);
            }
        
        
        this.lmRequest = new BaseLexMachinaRequest(config);
        this.queryEngine = new QueryDistrictCases(config);
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

    async stateCases(cases) {
        var config = {};
        if (Number.isInteger(cases)) {
            config.endpoint = '/state-cases/' + cases;
        } else {
            throw new Error('The case_id must be an integer');
        }
        return this.lmRequest.requestURL(config);
    }


    async appealsCases(cases) {
        var config = {};
        if (Number.isInteger(cases)) {
            config.endpoint = '/appeals-cases/' + cases;
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

    async listDistrictCaseResolutions() {
        var config = { 'endpoint': '/list-case-resolutions/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }

    async listStateCaseResolutions() {
        var config = { 'endpoint': '/list-case-resolutions/State' };
        return this.lmRequest.requestURL(config);
    }

    async listAppealsCaseResolutions() {
        var config = { 'endpoint': '/list-case-resolutions/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }


    async listAppealabilityRulings() {
        var config = { 'endpoint': '/list-appealability-rulings' };
        return this.lmRequest.requestURL(config);
    } 
    
    async listAppellateDecisions() {
        var config = { 'endpoint': '/list-appellate-decisions/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }

    async listOriginatingVenues() {
        var config = { 'endpoint': '/list-originating-venues/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }

    async listDistrictCaseTags() {
        var config = { 'endpoint': '/list-case-tags/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }    
    
    async listStateCaseTags() {
        var config = { 'endpoint': '/list-case-tags/State' };
        return this.lmRequest.requestURL(config);
    }

    async listAppealsCaseTags() {
        var config = { 'endpoint': '/list-case-tags/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }

    async listDistrictCaseTypes() {
        var config = { 'endpoint': '/list-case-types/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }

    async listStateCaseTypes() {
        var config = { 'endpoint': '/list-case-types/State' };
        return this.lmRequest.requestURL(config);
    }

    async listAppealsCaseTypes() {
        var config = { 'endpoint': '/list-case-types/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }


    async listDistrictCourts() {
        var config = { 'endpoint': '/list-courts/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }

    async listStateCourts() {
        var config = { 'endpoint': '/list-courts/State' };
        return this.lmRequest.requestURL(config);
    }

    async listAppealsCourts() {
        var config = { 'endpoint': '/list-courts/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }

    async listDistrictDamages() {
        var config = { 'endpoint': '/list-damages/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }

    async listStateDamages() {
        var config = { 'endpoint': '/list-damages/State' };
        return this.lmRequest.requestURL(config);
    }

    async listDistrictEvents() {
        var config = { 'endpoint': '/list-events/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }
    
    async listStateEvents() {
        var config = { 'endpoint': '/list-events/State' };
        return this.lmRequest.requestURL(config);
    }

    async listAppealsEvents() {
        var config = { 'endpoint': '/list-events/FederalAppeals' };
        return this.lmRequest.requestURL(config);
    }

    async listDistrictJudgmentSources() {
        var config = { 'endpoint': '/list-judgment-sources/FederalDistrict' };
        return this.lmRequest.requestURL(config);
    }
    async listStateJudgmentEvents() {
        var config = { 'endpoint': '/list-judgment-events/State' };
        return this.lmRequest.requestURL(config);
    }

    async listSupremeCourtDecisions() {
        var config = { 'endpoint': '/list-supreme-court-decisions/FederalAppeals' };
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

    async patents(patents) {
        var config = {};
        if (typeof(patents) == 'string') {
            config.endpoint = '/patents/' + patents;
        } else if (Array.isArray(patents)) {
            config.endpoint = '/patents/';
            config.params = { patentNumbers: patents };
        } else {
            throw new Error('The patent_id must be a string or array of strings');
        }
        return this.lmRequest.requestURL(config);
    }

    async searchJudges(judge_string) {
        if (judge_string == '') {
            throw new Error('The search query cannot be empty');
        }

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
        return this.queryEngine.queryCases("district", query, options);
    }

    async queryStateCases(query, options) {
        return this.queryEngine.queryCases("state", query, options);
    }

    async queryAppealsCases(query, options) {
        return this.queryEngine.queryCases("appeals", query, options);
    }
};
