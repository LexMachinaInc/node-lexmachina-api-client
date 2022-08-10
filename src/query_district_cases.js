const BaseLexMachinaRequest = require('./base_lm_request')

module.exports = class QueryDistrictCases {

    constructor(config) {
        this.lmRequest = new BaseLexMachinaRequest(config);
    }

    async queryOnePage(query, options) {
        var config = {}
        config.endpoint = '/query-district-cases'
        config.method = 'post'
        config.data = query.getPostBody()

        var result = await this.lmRequest.requestURL(config)

        return result.CaseIds
    }

    async queryAllPages(query, options) {
        var cases = []
        var page_cases = []
        query.setPageSize(100)
        do {
            page_cases = await this.queryOnePage(query, options)
            cases = [...new Set([...cases, ...page_cases])];
            query.nextPage()
        } while (page_cases.length > 0)
        return cases
    }

    async queryDistrictCases(query, options) {
        query.finalize()

        if (options && options.pageThrough) {
            return await this.queryAllPages(query, options)
        } else {
            return await this.queryOnePage(query, options)
        }
    }
}