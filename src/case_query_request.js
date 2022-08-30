const moment = require('moment')

function pushUnique(array, item) {
    if (!array.includes(item)) {
        array.push(item)
    }
}

module.exports = class CasesQueryRequest {

    constructor() {

        this.queryObjectTemplate = {
            "caseStatus": "",
            "caseTypes": { "include": [], "exclude": [] },
            "caseTags": { "include": [], "exclude": [] },
            "dates": {
                "filed": { "onOrAfter": "", "onOrBefore": "" },
                "terminated": { "onOrAfter": "", "onOrBefore": "" },
                "trial": { "onOrAfter": "", "onOrBefore": "" },
                "lastDocket": { "onOrAfter": "", "onOrBefore": "" }
            },
            "judges": { "include": [], "exclude": [] },
            "magistrates": { "include": [], "exclude": [] },
            "events": { "includeEventTypes": [], "excludeEventTypes": [] },
            "lawFirms": { "include": [], "exclude": [], "includePlaintiff": [], "excludePlaintiff": [], "includeDefendant": [], "excludeDefendant": [], "includeThirdParty": [], "excludeThirdParty": [] },
            "parties": { "include": [], "exclude": [], "includePlaintiff": [], "excludePlaintiff": [], "includeDefendant": [], "excludeDefendant": [], "includeThirdParty": [], "excludeThirdParty": [] },
            "courts": { "include": [], "exclude": [] },
            "resolutions": { "include": [], "exclude": [] },
            "findings": { "include": { "awardedToParties": [], "awardedAgainstParties": [], "judgmentSource": [], "patentInvalidityReasons": [] } },
            "remedies": { "include": { "awardedToParties": [], "awardedAgainstParties": [], "judgmentSource": [] } },
            "damages": { "include": { "inFavorOfParties": [], "awardedAgainstParties": [], "minimumAmount": 0, "name": [], "type": [], "judgmentSource": [] } },
            "patents": { "include": [], "exclude": [] },
            "mdl": { "include": [], "exclude": [] },
            "ordering": "ByFirstFiled",
            "page": 1,
            "pageSize": 5
        }
        this.queryObject = JSON.parse(JSON.stringify(this.queryObjectTemplate))
    }

    removeEmptyValues(data) {
        for (var key in data) {
            var item = data[key];
            // see if this item is an array
            if (Array.isArray(item)) {
                // see if the array is empty
                if (item.length > 0) {
                    this.removeEmptyValues(item);
                } else {
                    // remove this item from the parent object
                    delete data[key];
                }
                // if this item is an object, then recurse into it 
                // to remove empty arrays in it too
            } else if (typeof item == "object") {
                this.removeEmptyValues(item);
                if (Object.keys(item) == 0) {
                    delete data[key];
                }
            } else if (typeof item == 'string') {
                if (item == "") {
                    delete data[key];
                }
            } else if (typeof item == "number") {
                if (item == 0) {
                    delete data[key]
                }
            }
        }
    }

    setCaseStatus(status) {
        this.queryObject.caseStatus = status
    }

    addCaseTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesInclude(value) })
        } else {
            pushUnique(this.queryObject.caseTypes.include, values);
        }
    }

    addCaseTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesExclude(value) })
        } else {
            pushUnique(this.queryObject.caseTypes.exclude, values)
        }
    }

    addCaseTagsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsInclude(value) })
        } else {
            pushUnique(this.queryObject.caseTags.include, values)
        }
    }

    addCaseTagsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsExclude(value) })
        } else {
            pushUnique(this.queryObject.caseTags.exclude, values)
        }
    }

    addJudgesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesInclude(id) })
        } else {
            pushUnique(this.queryObject.judges.include, ids)
        }
    }

    addJudgesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesExclude(id) })
        } else {
            pushUnique(this.queryObject.judges.exclude, ids)
        }
    }

    addMagistratesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesInclude(id) })
        } else {
            pushUnique(this.queryObject.magistrates.include, ids)
        }
    }

    addMagistratesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesExclude(id) })
        } else {
            pushUnique(this.queryObject.magistrates.exclude, ids)
        }
    }

    addEventTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesInclude(value) })
        } else {
            pushUnique(this.queryObject.events.includeEventTypes, values)
        }
    }

    addEventTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesExclude(value) })
        } else {
            pushUnique(this.queryObject.events.excludeEventTypes, values)
        }
    }

    addLawFirmsInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsInclude(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.include, ids)
        }
    }

    addLawFirmsExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExclude(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.exclude, ids)
        }
    }

    addLawFirmsIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.includePlaintiff, ids)
        }
    }

    addLawFirmsExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.excludePlaintiff, ids)
        }
    }

    addLawFirmsIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.includeDefendant, ids)
        }
    }

    addLawFirmsExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.excludeDefendant, ids)
        }
    }

    addLawFirmsIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.includeThirdParty, ids)
        }
    }

    addLawFirmsExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.lawFirms.excludeThirdParty, ids)
        }
    }

    addPartiesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesInclude(id) })
        } else {
            pushUnique(this.queryObject.parties.include, ids)
        }
    }

    addPartiesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExclude(id) })
        } else {
            pushUnique(this.queryObject.parties.exclude, ids)
        }
    }

    addPartiesIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.parties.includePlaintiff, ids)
        }
    }

    addPartiesExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.parties.excludePlaintiff, ids)
        }
    }

    addPartiesIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.parties.includeDefendant, ids)
        }
    }

    addPartiesExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.parties.excludeDefendant, ids)
        }
    }

    addPartiesIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.parties.includeThirdParty, ids)
        }
    }

    addPartiesExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.parties.excludeThirdParty, ids)
        }
    }

    addCourtsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsInclude(value) })
        } else {
            pushUnique(this.queryObject.courts.include, values)
        }
    }

    addCourtsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsExclude(value) })
        } else {
            pushUnique(this.queryObject.courts.exclude, values)
        }
    }

    addResolutionsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addResolutionsInclude(value) })
        } else {
            pushUnique(this.queryObject.resolutions.include, values)
        }
    }

    addResolutionsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addResolutionsExclude(value) })
        } else {
            pushUnique(this.queryObject.resolutions.exclude, values)
        }
    }

    addFindingsIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedToParties(id) })
        } else {
            pushUnique(this.queryObject.findings.include.awardedToParties, ids)
        }
    }

    addFindingsIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.findings.include.awardedAgainstParties, ids)
        }
    }

    addFindingsIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.findings.include.judgmentSource, values)
        }
    }

    addFindingsIncludePatentInvalidityReasons(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludePatentInvalidityReasons(value) })
        } else {
            pushUnique(this.queryObject.findings.include.patentInvalidityReasons, values)
        }
    }

    addRemediesIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedToParties(id) })
        } else {
            pushUnique(this.queryObject.remedies.include.awardedToParties, ids)
        }
    }

    addRemediesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.remedies.include.awardedAgainstParties, ids)
        }
    }

    addRemediesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addRemediesIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.remedies.include.judgmentSource, values)
        }
    }

    addDamagesIncludeInFavorOfParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeInFavorOfParties(id) })
        } else {
            pushUnique(this.queryObject.damages.include.inFavorOfParties, ids)
        }
    }

    addDamagesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.damages.include.awardedAgainstParties, ids)
        }
    }

    addDamagesIncludeName(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeName(value) })
        } else {
            pushUnique(this.queryObject.damages.include.name, values)
        }
    }

    addDamagesIncludeType(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeType(value) })
        } else {
            pushUnique(this.queryObject.damages.include.type, values)
        }
    }

    addDamagesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.damages.include.judgmentSource, values)
        }
    }

    setDamagesMinimumAmount(amount) {
        if (typeof amount != "number" || amount <= 0) {
            throw new Error("Damages amount must be a number greater than 0")
        }
        this.queryObject.damages.include.minimumAmount = amount
    }

    addPatentsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsInclude(value) })
        } else {
            pushUnique(this.queryObject.patents.include, values)
        }
    }

    addPatentsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsExclude(value) })
        } else {
            pushUnique(this.queryObject.patents.exclude, values)
        }
    }

    addMDLInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLInclude(value) })
        } else {
            pushUnique(this.queryObject.mdl.include, values)
        }
    }

    addMDLExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLExclude(value) })
        } else {
            pushUnique(this.queryObject.mdl.exclude, values)
        }
    }

    setDate(value, field, operator) {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
            throw new Error("Dates must be in YYYY-MM-DD format: " + value)
        }
        if (this.queryObject.dates[field] == undefined) {
            throw new Error("Not a valid field: " + field)
        }
        if (this.queryObject.dates[field][operator] == undefined) {
            throw new Error("Not a valid operator: " + operator)
        }

        this.queryObject.dates[field][operator] = value
    }

    setOrdering(order) {
        this.queryObject.ordering = order
    }

    setPage(page) {
        this.queryObject.page = page
    }

    setPageSize(size) {
        this.queryObject.pageSize = size
    }

    nextPage() {
        this.queryObject.page++
    }

    clear() {
        this.queryObject = JSON.parse(JSON.stringify(this.queryObjectTemplate))
    }

    finalize() {
        this.removeEmptyValues(this.queryObject)
    }

    getPostBody() {
        return this.queryObject
    }
}