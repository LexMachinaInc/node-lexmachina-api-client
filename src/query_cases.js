const BaseLexMachinaRequest = require('./base_lm_request');

module.exports = class QueryCases {

    constructor(config) {
        this.lmRequest = new BaseLexMachinaRequest(config);
    }

    async queryOnePage(court, query, options) {
        var config = options || {};
        if (court == "district") {
            config.endpoint = '/query-district-cases';
        } else if (court == "state") {
            config.endpoint = '/query-state-cases';
        } else if (court == "appeals") {
            config.endpoint = '/query-appeals-cases';
        } else {
            throw new Error("A court must be specified for queries")
        }
        config.method = 'post';
        config.data = query.getPostBody();

        var result = await this.lmRequest.requestURL(config);
        if (result) {
            var caseObjects = result.cases;
            if (court == "district") {
            return caseObjects.map(a=>a.districtCaseId);
            }
            if (court == "state"){
                return caseObjects.map(a=>a.stateCaseId);
                }
            if (court == "appeals"){
                return caseObjects.map(a=>a.appealsCaseId)
            }
        } else {
            return  [];
        }
    }

    async queryAllPages(court, query, options) {
        var cases = [];
        var page_cases = [];
        query.setPageSize(100);
        do {
            page_cases = await this.queryOnePage(court, query, options);
            cases = [...new Set([...cases, ...page_cases])];
            query.nextPage();
        } while (page_cases.length > 0);
        return cases;
    }

    async queryCases(court, query, options) {
        query.finalize();

        if (options && options.pageThrough) {
            return await this.queryAllPages(court, query, options);
        } else {
            return await this.queryOnePage(court, query, options);
        }
    }

};