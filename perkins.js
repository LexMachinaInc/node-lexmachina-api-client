const LexMachinaClient = require('./src/lexmachinaclient')
const CasesQueryRequest = require('./src/casequery.js')
const QueryDistrictCasesRequest = require('./src/querydistrictcases.js')
const readlinesync = require('readline-sync')
const { exit } = require('process')

async function getJudge() {
  var client = new LexMachinaClient('./config/config.json');

  var searchString = readlinesync.question("Enter the name or portion of the name of the judge to search for\n")
  console.log("searching on " + searchString)
  var judgeJSON = await client.searchJudges(searchString)
  var judgeList = judgeJSON.FederalJudges
  if (judgeList.length == 0) {
    console.log("The search returned no judges\n")
    process.exit()
  }
  for (i = 0; i < judgeList.length; i++) {
    var judge = judgeList[i]
    console.log((i + 1) + ") " + judge.Name)
  }
  var judgeIndex = readlinesync.question("Enter the number of the judge to use\n")
  return judgeList[judgeIndex - 1].FederalJudgeId

}

async function run() {
  var client = new LexMachinaClient();
  var query = new CasesQueryRequest();
  var queryclient = new QueryDistrictCasesRequest();
  var law_firm_id = 1368
  judge_id = await getJudge()
  judge = await client.federalJudges(judge_id)
  law_firm = await client.lawFirm(law_firm_id)

  console.log("Looking up attorneys from " + law_firm.LawFirm.Name + " that have faced " + judge.Name + "\n\n")
  query.addJudgesInclude(judge_id)
  query.addLawFirmsInclude(law_firm_id)
  var cases = await queryclient.queryDistrictCases(query, { pageThrough: true })
  var attorneys = []
  for (var i = 0; i < cases.length; i++) {
    var districtcase = cases[i]
    console.log("Working on case #" + (i + 1))
    var thiscase = await client.districtCases(districtcase)
    thiscase.Attorneys.forEach(attorney => {
      if (attorney.LawFirmIds.includes(law_firm_id)) {
        if (!attorneys.includes(attorney.Name)) {
          attorneys.push(attorney.Name)
        }
        console.log(attorney.Name + "  ID #" + attorney.AttorneyId)
      }
    })
  }

  console.log("\n\n" + attorneys.length + " attorneys have faced " + judge.Name)
  console.log("\nFinal List \n\n")
  attorneys.sort().forEach(attorney => { console.log(attorney) })
  console.log("\n\n")
}

run()