const moment = require('moment');

function pushUnique(array, item) {
    if (!array.some((arrayItem) => JSON.stringify(item) == JSON.stringify(arrayItem))) {
        //    if (!array.includes(item)) {
        array.push(item);
    }
}

module.exports = class CasesQueryRequest {

    constructor() {

        this.queryObjectTemplate = {
            'caseStatus': '',
            'caseTypes': { 'include': [], 'exclude': [] },
            'caseTags': { 'include': [], 'exclude': [] },
            'dates': {
                'filed': { 'onOrAfter': '', 'onOrBefore': '' },
                'terminated': { 'onOrAfter': '', 'onOrBefore': '' },
                'trial': { 'onOrAfter': '', 'onOrBefore': '' },
                'lastDocket': { 'onOrAfter': '', 'onOrBefore': '' }
            },
            'judges': { 'include': [], 'exclude': [] },
            'magistrates': { 'include': [], 'exclude': [] },
            'events': { 'includeEventTypes': [], 'excludeEventTypes': [] },
            'lawFirms': { 'include': [], 'exclude': [], 'includePlaintiff': [], 'excludePlaintiff': [], 'includeDefendant': [], 'excludeDefendant': [], 'includeThirdParty': [], 'excludeThirdParty': [] },
            'parties': { 'include': [], 'exclude': [], 'includePlaintiff': [], 'excludePlaintiff': [], 'includeDefendant': [], 'excludeDefendant': [], 'includeThirdParty': [], 'excludeThirdParty': [] },
            'courts': { 'include': [], 'exclude': [] },
            'resolutions': { 'include': [], 'exclude': [] },
            'findings': [{ 'judgmentSource': {'include': [], 'exclude': []}, 'nameType': {'include':[], 'exclude':[]}, 'date': {'onOrAfter':'', 'onOrBefore':''}, 'awardedToParties': [], 'awardedAgainstParties':[], 'patentInvalidityReasons': {'include':[]} } ],
            'remedies': [{ 'judgmentSource': {'include': [], 'exclude': []}, 'nameType': {'include':[], 'exclude':[]}, 'date': {'onOrAfter':'', 'onOrBefore':''}, 'awardedToParties': [], 'awardedAgainstParties':[] } ],
            'damages':  [{ 'judgmentSource': {'include': [], 'exclude': []}, 'nameType': {'include':[], 'exclude':[]}, 'date': {'onOrAfter':'', 'onOrBefore':''}, 'awardedToParties': [], 'awardedAgainstParties':[], 'minimumAmount': 0 } ],
            'patents': { 'include': [], 'exclude': [] },
            'mdl': { 'include': [], 'exclude': [] },
            'ordering': 'ByFirstFiled',
            'page': 1,
            'pageSize': 5
        };
        this.queryObject = JSON.parse(JSON.stringify(this.queryObjectTemplate));
    }

    removeEmptyValues(data) {
        for (var key in data) {
            var item = data[key];
            // see if this item is an array
            if (Array.isArray(item)) {
                // see if the array is empty
                if (item.length > 0) {
                    this.removeEmptyValues(item);
                } 
                if (item.length == 0) {
                    // remove this item from the parent object
                    delete data[key];
                }
                if (item.length == 1 && item[0]== undefined) {
                    // if the one items is an empty object
                    delete data[key];
                }
                // if this item is an object, then recurse into it 
                // to remove empty arrays in it too
            } else if (typeof item == 'object') {
                this.removeEmptyValues(item);
                if (Object.keys(item) == 0) {
                    delete data[key];
                }
            } else if (typeof item == 'string') {
                if (item == '') {
                    delete data[key];
                }
            } else if (typeof item == 'number') {
                if (item == 0) {
                    delete data[key];
                }
            }
        }
    }

    setCaseStatus(status) {
        this.queryObject.caseStatus = status;
        return this;
    }

    addCaseTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesInclude(value); });
        } else {
            pushUnique(this.queryObject.caseTypes.include, values);
        }
        return this;
    }

    addCaseTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTypesExclude(value); });
        } else {
            pushUnique(this.queryObject.caseTypes.exclude, values);
        }
        return this;
    }

    addCaseTagsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsInclude(value); });
        } else {
            pushUnique(this.queryObject.caseTags.include, values);
        }
        return this;
    }

    addCaseTagsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCaseTagsExclude(value); });
        } else {
            pushUnique(this.queryObject.caseTags.exclude, values);
        }
        return this;
    }

    addJudgesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesInclude(id); });
        } else {
            pushUnique(this.queryObject.judges.include, ids);
        }
        return this;
    }

    addJudgesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addJudgesExclude(id); });
        } else {
            pushUnique(this.queryObject.judges.exclude, ids);
        }
        return this;
    }

    addMagistratesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesInclude(id); });
        } else {
            pushUnique(this.queryObject.magistrates.include, ids);
        }
        return this;
    }

    addMagistratesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addMagistratesExclude(id); });
        } else {
            pushUnique(this.queryObject.magistrates.exclude, ids);
        }
        return this;
    }

    addEventTypesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesInclude(value); });
        } else {
            pushUnique(this.queryObject.events.includeEventTypes, values);
        }
        return this;
    }

    addEventTypesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addEventTypesExclude(value); });
        } else {
            pushUnique(this.queryObject.events.excludeEventTypes, values);
        }
        return this;
    }

    addLawFirmsInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsInclude(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.include, ids);
        }
        return this;
    }

    addLawFirmsExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExclude(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.exclude, ids);
        }
        return this;
    }

    addLawFirmsIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludePlaintiff(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includePlaintiff, ids);
        }
        return this;
    }

    addLawFirmsExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludePlaintiff(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludePlaintiff, ids);
        }
        return this;
    }

    addLawFirmsIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeDefendant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includeDefendant, ids);
        }
        return this;
    }

    addLawFirmsExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeDefendant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludeDefendant, ids);
            return this;
        }
        return this;
    }

    addLawFirmsIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includeThirdParty, ids);
        }
        return this;
    }

    addLawFirmsExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludeThirdParty, ids);
        }
        return this;
    }

    addPartiesInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesInclude(id); });
        } else {
            pushUnique(this.queryObject.parties.include, ids);
        }
        return this;
    }

    addPartiesExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExclude(id); });
        } else {
            pushUnique(this.queryObject.parties.exclude, ids);
        }
        return this;
    }

    addPartiesIncludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludePlaintiff(id); });
        } else {
            pushUnique(this.queryObject.parties.includePlaintiff, ids);
        }
        return this;
    }

    addPartiesExcludePlaintiff(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludePlaintiff(id); });
        } else {
            pushUnique(this.queryObject.parties.excludePlaintiff, ids);
        }
        return this;
    }

    addPartiesIncludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeDefendant(id); });
        } else {
            pushUnique(this.queryObject.parties.includeDefendant, ids);
        }
        return this;
    }

    addPartiesExcludeDefendant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeDefendant(id); });
        } else {
            pushUnique(this.queryObject.parties.excludeDefendant, ids);
        }
        return this;
    }

    addPartiesIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.parties.includeThirdParty, ids);
        }
        return this;
    }

    addPartiesExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.parties.excludeThirdParty, ids);
        }
        return this;
    }

    addCourtsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsInclude(value); });
        } else {
            pushUnique(this.queryObject.courts.include, values);
        }
        return this;
    }

    addCourtsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addCourtsExclude(value); });
        } else {
            pushUnique(this.queryObject.courts.exclude, values);
        }
        return this;
    }

    addResolutionsInclude(summary, specific ) {
        var object = {'summary': summary, 'specific': specific};
        pushUnique(this.queryObject.resolutions.include, object);
        return this;
    }

    addResolutionsExclude(summary, specific ) {
        var object = {'summary': summary, 'specific': specific};
        pushUnique(this.queryObject.resolutions.exclude, object);
        return this;
    }

    addFindingsIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedToParties(id); });
        } else {
            pushUnique(this.queryObject.findings[0].awardedToParties, ids);
        }
        return this;
    }

    addFindingsIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addFindingsIncludeAwardedAgainstParties(id); });
        } else {
            pushUnique(this.queryObject.findings[0].awardedAgainstParties, ids);
        }
        return this;
    }

    addFindingsIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludeJudgmentSource(value); });
        } else {
            // dhs 2022-09-12 
            // For now just going to assume array of 1 item when adding attributes to findings queries
            pushUnique(this.queryObject.findings[0].judgmentSource.include, values);
        }
        return this;
    }

    addFindingsExcludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsExcludeJudgmentSource(value); });
        } else {
            // dhs 2022-09-12 
            // For now just going to assume array of 1 item when adding attributes to findings queries
            pushUnique(this.queryObject.findings[0].judgmentSource.exclude, values);
        }
        return this;
    }

    addFindingsIncludePatentInvalidityReasons(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addFindingsIncludePatentInvalidityReasons(value); });
        } else {
            pushUnique(this.queryObject.findings[0].patentInvalidityReasons.include, values);
        }
        return this;
    }

    addFindingsIncludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.findings[0].nameType.include, object);
        return this;
    }

    addFindingsExcludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.findings[0].nameType.exclude, object);
        return this;
    }

    addFindingsDate(value, operator) {
        this.setDate(value, this.queryObject.findings[0].date, operator);
        return this;
    }

    addRemediesIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedToParties(id); });
        } else {
            pushUnique(this.queryObject.remedies[0].awardedToParties, ids);
        }
        return this;
    }

    addRemediesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addRemediesIncludeAwardedAgainstParties(id); });
        } else {
            pushUnique(this.queryObject.remedies[0].awardedAgainstParties, ids);
        }
        return this;
    }

    addRemediesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addRemediesIncludeJudgmentSource(value); });
        } else {
            pushUnique(this.queryObject.remedies[0].judgmentSource.include, values);
        }
        return this;
    }

    addRemediesExcludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addRemediesExcludeJudgmentSource(value); });
        } else {
            pushUnique(this.queryObject.remedies[0].judgmentSource.exclude, values);
        }
        return this;
    }
  
    addRemediesIncludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.remedies[0].nameType.include, object);
        return this;
    }

    addRemediesExcludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.remedies[0].nameType.exclude, object);
        return this;
    }

    addRemediesDate(value, operator) {
        this.setDate(value, this.queryObject.remedies[0].date, operator);
        return this;
    }

    addDamagesIncludeAwardedToParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeAwardedToParties(id); });
        } else {
            pushUnique(this.queryObject.damages[0].awardedToParties, ids);
        }
        return this;
    }

    addDamagesIncludeAwardedAgainstParties(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addDamagesIncludeAwardedAgainstParties(id); });
        } else {
            pushUnique(this.queryObject.damages[0].awardedAgainstParties, ids);
        }
        return this;
    }

    addDamagesIncludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.damages[0].nameType.include, object);
        return this;
    }

    addDamagesExcludeNameType(name, type) {
        var object = {'name':name, 'type':type};
        pushUnique(this.queryObject.damages[0].nameType.exclude, object);
        return this;
    }

    addDamagesIncludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesIncludeJudgmentSource(value); });
        } else {
            pushUnique(this.queryObject.damages[0].judgmentSource.include, values);
        }
        return this;
    }

    addDamagesExcludeJudgmentSource(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addDamagesExcludeJudgmentSource(value); });
        } else {
            pushUnique(this.queryObject.damages[0].judgmentSource.exclude, values);
        }
        return this;
    }

    addDamagesDate(value, operator) {
        this.setDate(value, this.queryObject.damages[0].date, operator);
        return this;
    }

    setDamagesMinimumAmount(amount) {
        if (typeof amount != 'number' || amount <= 0) {
            throw new Error('Damages amount must be a number greater than 0');
        }
        this.queryObject.damages[0].minimumAmount = amount;
        return this;
    }

    addPatentsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsInclude(value); });
        } else {
            pushUnique(this.queryObject.patents.include, values);
        }
        return this;
    }

    addPatentsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addPatentsExclude(value); });
        } else {
            pushUnique(this.queryObject.patents.exclude, values);
        }
        return this;
    }

    addMDLInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLInclude(value); });
        } else {
            pushUnique(this.queryObject.mdl.include, values);
        }
        return this;    }

    addMDLExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addMDLExclude(value); });
        } else {
            pushUnique(this.queryObject.mdl.exclude, values);
        }
        return this;    }

    setDate(value, field, operator) {
        var object ;

        if (typeof field === 'string') {
            object = this.queryObject.dates[field];
        } else {
            object = field;
        }
        //console.log("In setDate using object=%s", JSON.stringify(object) );
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
            throw new Error('Dates must be in YYYY-MM-DD format: ' + value);
        }
        if (object == undefined) {
            throw new Error('Not a valid field: ' + field);
        }
        if (object[operator] == undefined) {
            throw new Error('Not a valid operator: ' + operator);
        }

        object[operator] = value;
        return this;
    }

    setOrdering(order) {
        this.queryObject.ordering = order;
        return this;
    }

    setPage(page) {
        this.queryObject.page = page;
        return this;
    }

    setPageSize(size) {
        this.queryObject.pageSize = size;
        return this;
    }

    nextPage() {
        this.queryObject.page++;
        return this;
    }

    clear() {
        this.queryObject = JSON.parse(JSON.stringify(this.queryObjectTemplate));
    }

    finalize() {
        this.removeEmptyValues(this.queryObject);
    }

    getPostBody() {
        return this.queryObject;
    }
};