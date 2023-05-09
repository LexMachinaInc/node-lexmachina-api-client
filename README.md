# node-lexmachina-api-client
Client for Lex Machina Legal Analytics API

This package provides a client to access the Lex Machina API for legal analytics. Access and documentation are provided at the [Lex Machina API Developer Portal](https://developer.lexmachina.com/).

This version of the node package (2.0 and above) is specifically for accessing the general availability version of the Lex Machina API. For users still accessing beta you will need to pin your version to the 1.0 release by specifiying "@lexmachina/lexmachina-client": "1.x" in your package.json file.

# Getting Started

1. Create an app and get the client key and secret via the [directions here](https://developer.lexmachina.com/default/docs/generating_oauth_credentials).

1. In your project directory create a directory /config and inside that create a file named config.json . Populate using the below values and the key and secret from above:

    ```json
    {
        "baseURL": "https://api.lexmachina.com",
        "authParams": {
            "client": {
                "id": "CLIENT ID",
                "secret": "CLIENT SECRET"
            },
            "auth": {
                "tokenHost": "https://api.beta/lexmachina.com",
                "tokenPath": "/oauth2/token"
            }
        }
    }
    ```

1. To execute API calls you will use the two classes of this package. Both are discussed in detail later.

    1. For accessing all GET and POST endpoints, LexMachinaClient provides those functions.
    1. In order to specify the query use a case query request to add criteria to the query.

For each of these, you first create the object then call the functions on that object.


# Lex Machina Client

The LexMachinaClient object is the main way to interact with the GET and POST functions of the Lex Machina API.



## Instantiating the LexMachinaClient object

If called with no parameter in the constructor, the config file will be loaded from the node package base directory of lexmachina-client/config/config-auth.json
 
```javascript
var client = new LexMachinaClient();
```

If passed a string for a file path, the config file will be loaded from that location. 

```javascript
var client = new LexMachinaClient("../config/config.json");
```


## GET functions from LexMachinaClient

The functions provided fall into several classes:
1. Lists of resources
1. Lookup by ID
1. Searches

## Lists of Resources

These functions are available from LexMachinaClient. Each returns an array or JSON object describing resources. 

- LexMachinaClient.listDistrictCaseResolutions()
- LexMachinaClient.listStateCaseResolutions()
- LexMachinaClient.listDistrictCaseTags()
- LexMachinaClient.listStateCaseTags()
- LexMachinaClient.listDistrictCaseTypes()
- LexMachinaClient.listStateCaseTypes()
- LexMachinaClient.listDistrictCourts()
- LexMachinaClient.listStateCourts()
- LexMachinaClient.listDistrictDamages()
- LexMachinaClient.listStateDamages()
- LexMachinaClient.listDistrictEvents()
- LexMachinaClient.listStateEvents()
- LexMachinaClient.listDistrictJudgmentSources()
- LexMachinaClient.listStateJudgmentEvents()

## Lookup by ID(s)
These functions are available from LexMachinaClient. Each takes a single integer or an array of up to 100 integers where the parameter is the Lex Machina ID for that record. It will return a JSON object or an array of objects representing the data for that type of record.

- LexMachinaClient.attorneys()
- LexMachinaClient.districtCases()
- LexMachinaClient.federalJudges()
- LexMachinaClient.lawFirm()
- LexMachinaClient.magistrates()
- LexMachinaClient.parties()
- LexMachinaClient.patents()


## Search Functions

Search functions take a string input and return lists of JSON objects. These searches match substrings on the names being searched for.

- LexMachinaClient.searchAttorneys()
- LexMachinaClient.searchJudges()
- LexMachinaClient.searchLawFirms()
- LexMachinaClient.searchParties()

# Case Query Object



Querying for cases is an operation with enough complexity that it warrants its own class. In order to query for district cases, first a DistrictCasesQueryRequest must be constructed. To query for state cases, use a StateCasesQueryRequest object.

All operations on either case query request add criteria to the query. There are no methods to remove individual criteria but the object can be returned to empty at any time via the .clear() method.

The constraint methods can be chained so all constraints can be added in a single line such as:

```javascript
  const query = new DistrictCasesQueryRequest()
     .setDate("2022-09-01", "filed", "onOrAfter")
     .addLawFirmsIncludeDefendant(123)
     .setPageSize(100);
```

Following is a list of operations available in the cases query request without discussion of the meaning of each. For a detailed discussion of the concepts used in querying the Lex Machina API see [this post on the developer portal for district queries](https://developer.lexmachina.com/default/docs/query_usage_portal_post) and [this post adding the state concepts](https://developer.lexmachina.com/default/docs/state_query_usage).


## Participant Criteria

The following methods add criteria based on participants in a case and their role. Each takes an integer or array of integers that correspond to the Lex Machina ID for each participant type. These function calls can be chained. All of the following work on either district or state requests.

- .addJudgesInclude()
- .addJudgesExclude()

- .addMagistratesInclude()
- .addMagistratesExclude()

- .addLawFirmsInclude()
- .addLawFirmsExclude()
- .addLawFirmsIncludePlaintiff()
- .addLawFirmsExcludePlaintiff()
- .addLawFirmsIncludeDefendant()
- .addLawFirmsExcludeDefendant()
- .addLawFirmsIncludeThirdParty()
- .addLawFirmsExcludeThirdParty()

- .addPartiesInclude()
- .addPartiesExclude()
- .addPartiesIncludePlaintiff()
- .addPartiesExcludePlaintiff()
- .addPartiesIncludeDefendant()
- .addPartiesExcludeDefendant()
- .addPartiesIncludeThirdParty()
- .addPartiesExcludeThirdParty()


## Case Aspect Criteria

The following methods add criteria based on aspects of the case. In most of these, the list of valid inputs is available via the corresponding API list functionality, such as LexMachinaClient.listCaseTypes() . 

All of the add functions will take either a single value or an array of values. The set functions require a single value. These function calls can be chained.


- .setCaseStatus()
- .addCaseTypesInclude()
- .addCaseTypesExclude()
- .addCaseTagsInclude()
- .addCaseTagsExclude()
- .addEventTypesInclude()
- .addEventTypesExclude()
- .addResolutionsInclude()
- .addResolutionsExclude()
- .addFindingsIncludeAwardedToParties()
- .addFindingsIncludeAwardedAgainstParties()
- .addFindingsIncludeJudgmentSource()
- .addFindingsExcludeJudgmentSource()
- .addFindingsIncludePatentInvalidityReasons()
- .addRemediesIncludeAwardedToParties()
- .addRemediesIncludeAwardedAgainstParties()
- .addRemediesIncludeJudgmentSource()
- .addRemediesExcludeJudgmentSource()
- .addDamagesIncludeAwardedToParties()
- .addDamagesIncludeAwardedAgainstParties()
- .addDamagesIncludeNameType()
- .addDamagesExcludeNameType()
- .addDamagesIncludeJudgmentSource()
- .addDamagesExcludeJudgmentSource()
- .addDamagesDate()
- .setDamagesMinimumAmount()
- .addPatentsInclude()
- .addPatentsExclude()
- .addMDLInclude()
- .addMDLExclude()

## Date Criteria

The setDate() method uses a different pattern. It takes three parameters: date value, a field and an operator. The date value must be a string in valid date format of "YYYY-MM-DD". The field is one of the below string values. This function call can be chained.


- Filed
- Terminated
- Trial
- LastDocket

The operators are one of the these strings:

- OnOrBefore
- OnOrAfter

.setDate()

Example:

To query on all district cases filed since the beginning of 2019:

```javascript
DistrictCasesQueryRequest.setDate("2019-01-01", "Filed", "OnOrAfter");
```

## Query aspects

The following methods control aspects of the query and operation of the query. By default the page size is 5 cases and it can be increased to a maximum of 100. These function calls can be chained.


- .setOrdering()
- .setPage()
- .setPageSize()
- .nextPage()
- .clear()


# Executing the Query

After creating a case query request with the desired criteria, the query must be executed. This is done with the LexMachinaClient object. To execute the query, pass in the request object. 


```javascript
var client = new LexMachinaClient();
var query = new DistrictCasesQueryRequest(); // Add criteria to this
var cases = await client.queryDistrictCases(query)
```

```javascript
var client = new LexMachinaClient();
var query = new StateCasesQueryRequest(); // Add criteria to this
var cases = await client.queryStateCases(query)
```

There is an optional second parameter that is a JSON object for options. This takes a single value at present. If absent, the query will be executed with the page and page size in the query object. If this option object is present:

```json
{pageThrough: true}
```
then the query will execute against each of the pages one at a time, returning the final array of all case IDs. For very large data sets this can be a long operation, minutes or even hours.

This method returns a Promise. Either a callback needs to be provided to handle the results or use the "await" modifier to cause execution to pause until the results have finished. If you don't know what this means, use await.

```javascript
  var caseIDs = await queryClient.queryDistrictCases(query, { pageThrough: true })
```

