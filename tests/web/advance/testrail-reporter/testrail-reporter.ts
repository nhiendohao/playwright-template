import TestRail, { Result } from "@dlenroc/testrail";
import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
import { exitOnError } from "winston";
const winston = require(`winston`);


const console = new winston.transports.Console();

const StatusMap = new Map<string, number>([
    ['failed', 5],
    ['passed', 1],
    ['skipped', 3],
    ['timeOut', 5],
    ['interrupted', 5],
])

const api = new TestRail({
    host: process.env.TR_HOST_NAME,
    password: process.env.TR_PASSWORD,
    username: process.env.TR_USERNAME,
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // - Write all logs with importance level of `info` or less than it
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
});

const runName = process.env.TR_RUN_NAME;
const projectId = parseInt(process.env.TR_PROJECT_ID);
const suiteId = parseInt(process.env.TR_SUITE_ID);

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
    onEnd(result: FullResult): void | Promise<void> {
        //Log out result
        logger.info('Return test run result ' + result.status);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);

        let runId = parseInt(process.env.TR_RUN_ID);

        //Return no test case match with TestRail Case ID Regex
        const testCaseMatches = getTestCaseName(test.title);
        if (testCaseMatches != null) {

            let testId = parseInt(testCaseMatches[0].substring(1), 10);
            //Update test status if test case is not skipped
            if (result.status != 'skipped') {
                let testComment = setTestComment(result);
                addResultForSuite(api, runId, testId, StatusMap.get(result.status), testComment);
            }
        }

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
            logger.info('Failed to create new testrail run ' + JSON.stringify(reason));
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
    }).then(
        (res) => { logger.info('This success res ' + JSON.stringify(res)); },
        (reason) => { logger.info('This is reason ' + JSON.stringify(reason)); })
}
/**
 * Set Test comment for TestCase Failed | Passed
 * @param result 
 * @returns 
 */
function setTestComment(result: TestResult) {
    if (result.status == 'failed' || result.status == 'timedOut' || result.status == 'interrupted') {
        return "Test Status is " + result.status + ' ' + JSON.stringify(result.errors);
    }
    else {
        return "Test Passed ";
    }
}