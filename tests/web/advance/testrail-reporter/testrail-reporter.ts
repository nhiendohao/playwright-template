import TestRail, { AddResultsForCases } from "@dlenroc/testrail";
import { AndroidKey } from "@playwright/test";
import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult } from "@playwright/test/reporter";
import moment from "moment";
const winston = require(`winston`);


const console = new winston.transports.Console();


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // - Write all logs with importance level of `info` or less than it
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
});

/**
 * Mapping status within Playwright & TestRail
 */
const StatusMap = new Map<string, number>([
    ['failed', 5],
    ['passed', 1],
    ['skipped', 3],
    ['timeOut', 5],
    ['interrupted', 5],
])

/**
 * Init TestRail api credential
 */
let executionDateTime = moment().format('MMM Do YYYY, HH:mm (Z)');

const api = new TestRail({
    host: process.env.TR_HOST_NAME as string,
    password: process.env.TR_PASSWORD as string,
    username: process.env.TR_USERNAME as string
});

const runName = process.env.TR_RUN_NAME + ' ' + executionDateTime;
const projectId = parseInt(process.env.TR_PROJECT_ID as string);
const suiteId = parseInt(process.env.TR_SUITE_ID as string);

const testResults: AddResultsForCases[] = [];


// Writes logs to console
logger.add(console);

export default class CustomReporterConfig implements Reporter {

    async onBegin?(config: FullConfig, suite: Suite) {
        // Set TestRun Id
        if (!process.env.TR_RUN_ID) {
            logger.info('Current TR_RUN_ID ' + process.env.TR_RUN_ID);
            await addTestRailRun(projectId);

        } else {
            logger.info('Test existing Run Id ' + process.env.TR_RUN_ID);
        }
    }

    onTestBegin(test: TestCase, result: TestResult): void {
    }

    onTestEnd(test: TestCase, result: TestResult) {
        logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);

        //Return no test case match with TestRail Case ID Regex
        const testCaseMatches = getTestCaseName(test.title);
        if (testCaseMatches != null) {

            testCaseMatches.forEach(testCaseMatch => {
                let testId = parseInt(testCaseMatch.substring(1), 10);
                //Update test status if test case is not skipped
                if (result.status != 'skipped') {
                    let testComment = setTestComment(result);
                    let myPayload = {
                        case_id: testId,
                        status_id: StatusMap.get(result.status),
                        comment: testComment
                    }
                    testResults.push(myPayload);
                }
            });
        }
    }

    async onEnd(result: FullResult): Promise<void> {
        let runId = parseInt(process.env.TR_RUN_ID as string);
        logger.info('Updating test status for test run id ' + runId);
        await updateResultCases(runId, testResults);
    }
    onError(error: TestError): void {
        logger.error(error.message);
    }
}
/** 
 * Get list of matched Test id with TestRail Id
 */
function getTestCaseName(testname: string) {
    const testCaseIdRegex = /\bC(\d+)\b/g;
    const testCaseMatches = [testname.match(testCaseIdRegex)];

    if (testCaseMatches[0] != null) {
        testCaseMatches[0].forEach((testCaseMatch) => {
            let testCaseId = parseInt(testCaseMatch.substring(1), 10);
            logger.info('Matched test case id is ' + testCaseId);
        })
    }
    else {
        logger.info('No test case matchs.')
    }
    return testCaseMatches[0];
}

/**
 * Create TestRail TestRun id
 * @param projectId 
 * @returns 
 */
async function addTestRailRun(projectId: number) {
    return await api.addRun(projectId, {
        include_all: true,
        name: runName,
        suite_id: suiteId,
    }).then(
        (res) => {
            logger.info('New test run is ' + res.id);
            process.env.TR_RUN_ID = (res.id).toString();
        },
        (reason) => {
            logger.info('Failed to create new testrail run ' + reason);
        })
}

/**
 * Add Test Result for TestSuite by Test Case ID/IDs
 * @param api 
 * @param runId 
 * @param caseId 
 * @param status 
 */
async function addResultForSuite(api: TestRail, runId: number, caseId: number, status: number, comment: string) {
    await api.addResultForCase(runId, caseId, {
        status_id: status,
        comment: comment
    }).then((res) => { logger.info('Updated status for caseId ' + caseId + ' in runId ' + runId); }, (reason) => { logger.info('Failed to call Update Api due to ' + JSON.stringify(reason)); })
}
/**
 * Set Test comment for TestCase Failed | Passed
 * @param result 
 * @returns 
 */
function setTestComment(result: TestResult) {
    if (result.status == 'failed' || result.status == 'timedOut' || result.status == 'interrupted') {
        return "Test Status is " + result.status + ' ' + JSON.stringify(result.error);
    }
    else {
        return "Test Passed within " + result.duration + ' ms';
    }
}

/**
 * Update TestResult for multiple cases
 * @param api 
 * @param runId 
 * @param payload 
 */
async function updateResultCases(runId: number, payload: any) {
    await api.addResultsForCases(runId, {
        results: payload,
    }).then(
        (result) => {
            logger.info('Finish update test result for runId ' + runId);
        },
        (reason) => {
            logger.info('Failed to update result ' + JSON.stringify(reason));
        })
}