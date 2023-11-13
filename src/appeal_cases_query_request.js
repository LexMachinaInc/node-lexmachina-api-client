const moment = require('moment');

function pushUnique(array, item) {
    if (!array.some((arrayItem) => JSON.stringify(item) == JSON.stringify(arrayItem))) {
        //    if (!array.includes(item)) {
        array.push(item);
    }
}

module.exports = class AppealCasesQueryRequest {

    constructor() {

        this.queryObjectTemplate = {
            'courts': { 'include': [], 'exclude': []},
            'caseStatus': 'Open',
            'caseTags': { 'include': [], 'exclude': [] },
            'dates': {
                'filed': { 'onOrAfter': '', 'onOrBefore': '' },
                'terminated': { 'onOrAfter': '', 'onOrBefore': '' },
                'lastDocket': { 'onOrAfter': '', 'onOrBefore': '' }
            },
            'judges': { 'include': [], 'exclude': [] },
            'lawFirms': { 'include': [], 'exclude': [], 'includeAppellant': [], 'excludeAppellant': [], 'includeAppellee': [],  'excludeAppellee': [], 'includeRespondent': [], 'excludeRespondent': [], 'includeThirdParty': [], 'excludeThirdParty': [], 'includePetitionerMovant': [], 'excludePetitionerMovant': []},
            'attorneys': { 'include': [], 'exclude': [], 'includeAppellant': [], 'excludeAppellant': [], 'includeAppellee': [],  'excludeAppellee': [], 'includeRespondent': [], 'excludeRespondent': [], 'includeThirdParty': [], 'excludeThirdParty': [], 'includePetitionerMovant': [], 'excludePetitionerMovant': []},
            'parties': { 'include': [], 'exclude': [], 'includeAppellant': [], 'excludeAppellant': [], 'includeAppellee': [],  'excludeAppellee': [], 'includeRespondent': [], 'excludeRespondent': [], 'includeThirdParty': [], 'excludeThirdParty': [], 'includePetitionerMovant': [], 'excludePetitionerMovant': []},
            'originatingVenues': { 'include': [], 'exclude': [] },
            "originatingCases": { "includeDistrictCaseIds": [],"excludeDistrictCaseIds": [],"includeOriginatingJudges": { "districtFederalJudges": { "include": [],"exclude": []}},"originatingDistrictCaseCriteria": { "courts": {"include": [], "exclude": []}, "caseTypes": { "include": [], "exclude": []  } } },
            'resolutions': { 'include': [], 'exclude': [] },
            'supremeCourtDecisions': { 'include': [], 'exclude': [] },
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

    addLawFirmsIncludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includeAppellant, ids);
        }
        return this;
    }

    addLawFirmsExcludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludeAppellant, ids);
        }
        return this;
    }

    addLawFirmsIncludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includeAppellee, ids);
        }
        return this;
    }

    addLawFirmsExcludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludeAppellee, ids);
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

    addLawFirmsIncludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includeRespondent, ids);
        }
        return this;
    }

    addLawFirmsExcludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludeRespondent, ids);
            return this;
        }
        return this;
    }


    addLawFirmsIncludePetitionerMovant(ids) {

        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsIncludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.includePetitionerMovant, ids);
        }
        return this;
    }

    addLawFirmsExcludePetitionerMovant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addLawFirmsExcludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.lawFirms.excludePetitionerMovant, ids);
            return this;
        }
        return this;
    }    
    addAttorneysInclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysInclude(id); });
        } else {
            pushUnique(this.queryObject.attorneys.include, ids);
        }
        return this;
    }

    addAttorneysExclude(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExclude(id); });
        } else {
            pushUnique(this.queryObject.attorneys.exclude, ids);
        }
        return this;
    }

    addAttorneysIncludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysIncludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.attorneys.includeAppellant, ids);
        }
        return this;
    }

    addAttorneysExcludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExcludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.attorneys.excludeAppellant, ids);
        }
        return this;
    }

    addAttorneysIncludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysIncludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.attorneys.includeAppellee, ids);
        }
        return this;
    }

    addAttorneysExcludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExcludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.attorneys.excludeAppellee, ids);
            return this;
        }
        return this;
    }

    addAttorneysIncludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysIncludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.attorneys.includeThirdParty, ids);
        }
        return this;
    }

    addAttorneysExcludeThirdParty(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExcludeThirdParty(id); });
        } else {
            pushUnique(this.queryObject.attorneys.excludeThirdParty, ids);
        }
        return this;
    }


    addAttorneysIncludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysIncludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.attorneys.includeRespondent, ids);
        }
        return this;
    }

    addAttorneysExcludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExcludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.attorneys.excludeRespondent, ids);
            return this;
        }
        return this;
    }


    addAttorneysIncludePetitionerMovant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysIncludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.attorneys.includePetitionerMovant, ids);
        }
        return this;
    }

    addAttorneysExcludePetitionerMovant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addAttorneysExcludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.attorneys.excludePetitionerMovant, ids);
            return this;
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

    addPartiesIncludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.parties.includeAppellant, ids);
        }
        return this;
    }

    addPartiesExcludeAppellant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeAppellant(id); });
        } else {
            pushUnique(this.queryObject.parties.excludeAppellant, ids);
        }
        return this;
    }

    addPartiesIncludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.parties.includeAppellee, ids);
        }
        return this;
    }

    addPartiesExcludeAppellee(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeAppellee(id); });
        } else {
            pushUnique(this.queryObject.parties.excludeAppellee, ids);
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


    addPartiesIncludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.parties.includeRespondent, ids);
        }
        return this;
    }

    addPartiesExcludeRespondent(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludeRespondent(id); });
        } else {
            pushUnique(this.queryObject.parties.excludeRespondent, ids);
            return this;
        }
        return this;
    }


    addPartiesIncludePetitionerMovant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesIncludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.parties.includePetitionerMovant, ids);
        }
        return this;
    }

    addPartiesExcludePetitionerMovant(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addPartiesExcludePetitionerMovant(id); });
        } else {
            pushUnique(this.queryObject.parties.excludePetitionerMovant, ids);
            return this;
        }
        return this;
    }    

    addOriginatingVenuesInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingVenuesInclude(value); });
        } else {
            pushUnique(this.queryObject.originatingVenues.include, values);
        }
        return this;
    }

    addOriginatingVenuesExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingVenuesExclude(value); });
        } else {
            pushUnique(this.queryObject.originatingVenues.exclude, values);
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

    addOriginatingCasesIncludeDistrictCaseIds(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addOriginatingCasesIncludeDistrictCaseIds(id); });
        } else {
            pushUnique(this.queryObject.originatingCases.includeDistrictCaseIds, ids);
        }
        return this;
    }

    addOriginatingCasesExcludeDistrictCaseIds(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => { this.addOriginatingCasesExcludeDistrictCaseIds(id); });
        } else {
            pushUnique(this.queryObject.originatingCases.excludeDistrictCaseIds, ids);
        }
        return this;
    }

    addOriginatingCasesIncludeOriginatingJudges(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesIncludeOriginatingJudges(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.include, values);
        }
        return this;
    }

    addOriginatingCasesExcludeOriginatingJudges(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesExcludeOriginatingJudges(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.includeOriginatingJudges.districtFederalJudges.exclude, values);
        }
        return this;
    }

    addOriginatingCasesIncludeCourts(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesIncludeCourts(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.include, values);
        }
        return this;
    }

    addOriginatingCasesExcludeCourts(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesExcludeCourts(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.originatingDistrictCaseCriteria.courts.exclude, values);
        }
        return this;
    }

    addOriginatingCasesIncludeCaseTypes(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesIncludeCaseTypes(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.include, values);
        }
        return this;
    }

    addOriginatingCasesExcludeCaseTypes(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addOriginatingCasesExcludeCaseTypes(value); });
        } else {
            pushUnique(this.queryObject.originatingCases.originatingDistrictCaseCriteria.caseTypes.exclude, values);
        }
        return this;
    }


    addSupremeCourtDecisionsInclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addSupremeCourtDecisionsInclude(value); });
        } else {
            pushUnique(this.queryObject.supremeCourtDecisions.include, values);
        }
        return this;
    }

    addSupremeCourtDecisionsExclude(values) {
        if (Array.isArray(values)) {
            values.forEach(value => { this.addSupremeCourtDecisionsExclude(value); });
        } else {
            pushUnique(this.queryObject.supremeCourtDecisions.exclude, values);
        }
        return this;
    }

    setDate(value, field, operator) {
        var object ;

        if (typeof field === 'string') {
            object = this.queryObject.dates[field];
        } else {
            object = field;
        }
        //console.log('In setDate using object=%s', JSON.stringify(object) );
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