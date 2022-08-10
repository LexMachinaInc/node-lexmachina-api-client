const moment = require('moment')

function pushUnique(array, item) {
    if (!array.includes(item)) {
        array.push(item)
    }
}

module.exports = class CasesQueryRequest {

    constructor() {

        this.queryObjectTemplate = {
            "CaseStatus": "",
            "CaseTypes": { "Include": [], "Exclude": [] },
            "CaseTags": { "Include": [], "Exclude": [] },
            "Dates": {
                "Filed": { "OnOrAfter": "", "OnOrBefore": "" },
                "Terminated": { "OnOrAfter": "", "OnOrBefore": "" },
                "Trial": { "OnOrAfter": "", "OnOrBefore": "" },
                "LastDocket": { "OnOrAfter": "", "OnOrBefore": "" }
            },
            "Judges": { "Include": [], "Exclude": [] },
            "Magistrates": { "Include": [], "Exclude": [] },
            "Events": { "IncludeEventTypes": [], "ExcludeEventTypes": [] },
            "LawFirms": { "Include": [], "Exclude": [], "IncludePlaintiff": [], "ExcludePlaintiff": [], "IncludeDefendant": [], "ExcludeDefendant": [], "IncludeThirdParty": [], "ExcludeThirdParty": [] },
            "Parties": { "Include": [], "Exclude": [], "IncludePlaintiff": [], "ExcludePlaintiff": [], "IncludeDefendant": [], "ExcludeDefendant": [], "IncludeThirdParty": [], "ExcludeThirdParty": [] },
            "Courts": { "Include": [], "Exclude": [] },
            "Resolutions": { "Include": [], "Exclude": [] },
            "Findings": { "Include": { "AwardedToParties": [], "AwardedAgainstParties": [], "JudgmentSource": [], "PatentInvalidityReasons": [] } },
            "Remedies": { "Include": { "AwardedToParties": [], "AwardedAgainstParties": [], "JudgmentSource": [] } },
            "Damages": { "Include": { "InFavorOfParties": [], "AwardedAgainstParties": [], "MinimumAmount": 0, "Name": [], "Type": [], "JudgmentSource": [] } },
            "Patents": { "Include": [], "Exclude": [] },
            "MDL": { "Include": [], "Exclude": [] },
            "Ordering": "ByFirstFiled",
            "Page": 1,
            "PageSize": 5
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
        this.queryObject.CaseStatus = status
    }

    addCaseTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesInclude(value) })
        } else {
            pushUnique(this.queryObject.CaseTypes.Include, values);
        }
    }

    addCaseTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesExclude(value) })
        } else {
            pushUnique(this.queryObject.CaseTypes.Exclude, values)
        }
    }

    addCaseTagsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsInclude(value) })
        } else {
            pushUnique(this.queryObject.CaseTags.Include, values)
        }
    }

    addCaseTagsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsExclude(value) })
        } else {
            pushUnique(this.queryObject.CaseTags.Exclude, values)
        }
    }

    addJudgesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesInclude(id) })
        } else {
            pushUnique(this.queryObject.Judges.Include, ids)
        }
    }

    addJudgesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesExclude(id) })
        } else {
            pushUnique(this.queryObject.Judges.Exclude, ids)
        }
    }

    addMagistratesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesInclude(id) })
        } else {
            pushUnique(this.queryObject.Magistrates.Include, ids)
        }
    }

    addMagistratesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesExclude(id) })
        } else {
            pushUnique(this.queryObject.Magistrates.Exclude, ids)
        }
    }

    addEventTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesInclude(value) })
        } else {
            pushUnique(this.queryObject.Events.IncludeEventTypes, values)
        }
    }

    addEventTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesExclude(value) })
        } else {
            pushUnique(this.queryObject.Events.ExcludeEventTypes, values)
        }
    }

    addLawFirmsInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsInclude(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.Include, ids)
        }
    }

    addLawFirmsExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExclude(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.Exclude, ids)
        }
    }

    addLawFirmsIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.IncludePlaintiff, ids)
        }
    }

    addLawFirmsExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.ExcludePlaintiff, ids)
        }
    }

    addLawFirmsIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.IncludeDefendant, ids)
        }
    }

    addLawFirmsExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.ExcludeDefendant, ids)
        }
    }

    addLawFirmsIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.IncludeThirdParty, ids)
        }
    }

    addLawFirmsExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.LawFirms.ExcludeThirdParty, ids)
        }
    }

    addPartiesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesInclude(id) })
        } else {
            pushUnique(this.queryObject.Parties.Include, ids)
        }
    }

    addPartiesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExclude(id) })
        } else {
            pushUnique(this.queryObject.Parties.Exclude, ids)
        }
    }

    addPartiesIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.Parties.IncludePlaintiff, ids)
        }
    }

    addPartiesExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludePlaintiff(id) })
        } else {
            pushUnique(this.queryObject.Parties.ExcludePlaintiff, ids)
        }
    }

    addPartiesIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.Parties.IncludeDefendant, ids)
        }
    }

    addPartiesExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeDefendant(id) })
        } else {
            pushUnique(this.queryObject.Parties.ExcludeDefendant, ids)
        }
    }

    addPartiesIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.Parties.IncludeThirdParty, ids)
        }
    }

    addPartiesExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeThirdParty(id) })
        } else {
            pushUnique(this.queryObject.Parties.ExcludeThirdParty, ids)
        }
    }

    addCourtsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsInclude(value) })
        } else {
            pushUnique(this.queryObject.Courts.Include, values)
        }
    }

    addCourtsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsExclude(value) })
        } else {
            pushUnique(this.queryObject.Courts.Exclude, values)
        }
    }

    addResolutionsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addResolutionsInclude(value) })
        } else {
            pushUnique(this.queryObject.Resolutions.Include, values)
        }
    }

    addResolutionsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addResolutionsExclude(value) })
        } else {
            pushUnique(this.queryObject.Resolutions.Exclude, values)
        }
    }

    addFindingsIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedToParties(id) })
        } else {
            pushUnique(this.queryObject.Findings.Include.AwardedToParties, ids)
        }
    }

    addFindingsIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.Findings.Include.AwardedAgainstParties, ids)
        }
    }

    addFindingsIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.Findings.Include.JudgmentSource, values)
        }
    }

    addFindingsIncludePatentInvalidityReasons(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludePatentInvalidityReasons(value) })
        } else {
            pushUnique(this.queryObject.Findings.Include.PatentInvalidityReasons, values)
        }
    }

    addRemediesIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedToParties(id) })
        } else {
            pushUnique(this.queryObject.Remedies.Include.AwardedToParties, ids)
        }
    }

    addRemediesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.Remedies.Include.AwardedAgainstParties, ids)
        }
    }

    addRemediesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addRemediesIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.Remedies.Include.JudgmentSource, values)
        }
    }

    addDamagesIncludeInFavorOfParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeInFavorOfParties(id) })
        } else {
            pushUnique(this.queryObject.Damages.Include.InFavorOfParties, ids)
        }
    }

    addDamagesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeAwardedAgainstParties(id) })
        } else {
            pushUnique(this.queryObject.Damages.Include.AwardedAgainstParties, ids)
        }
    }

    addDamagesIncludeName(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeName(value) })
        } else {
            pushUnique(this.queryObject.Damages.Include.Name, values)
        }
    }

    addDamagesIncludeType(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeType(value) })
        } else {
            pushUnique(this.queryObject.Damages.Include.Type, values)
        }
    }

    addDamagesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeJudgmentSource(value) })
        } else {
            pushUnique(this.queryObject.Damages.Include.JudgmentSource, values)
        }
    }

    setDamagesMinimumAmount(amount) {
        if (typeof amount != "number" || amount <= 0) {
            throw new Error("Damages amount must be a number greater than 0")
        }
        this.queryObject.Damages.Include.MinimumAmount = amount
    }

    addPatentsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsInclude(value) })
        } else {
            pushUnique(this.queryObject.Patents.Include, values)
        }
    }

    addPatentsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsExclude(value) })
        } else {
            pushUnique(this.queryObject.Patents.Exclude, values)
        }
    }

    addMDLInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLInclude(value) })
        } else {
            pushUnique(this.queryObject.MDL.Include, values)
        }
    }

    addMDLExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLExclude(value) })
        } else {
            pushUnique(this.queryObject.MDL.Exclude, values)
        }
    }

    setDate(value, field, operator) {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
            throw new Error("Dates must be in YYYY-MM-DD format: " + value)
        }
        if (this.queryObject.Dates[field] == undefined) {
            throw new Error("Not a valid field: " + field)
        }
        if (this.queryObject.Dates[field][operator] == undefined) {
            throw new Error("Not a valid operator: " + operator)
        }

        this.queryObject.Dates[field][operator] = value
    }

    setOrdering(order) {
        this.queryObject.Ordering = order
    }

    setPage(page) {
        this.queryObject.Page = page
    }

    setPageSize(size) {
        this.queryObject.PageSize = size
    }

    nextPage() {
        this.queryObject.Page++
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