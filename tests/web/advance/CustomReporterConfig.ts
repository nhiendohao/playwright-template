import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestError,
  TestResult,
  TestStep,
} from "@playwright/test/reporter";
const { performance } = require("perf_hooks");

const winston = require(`winston`);

const console = new winston.transports.Console();
const fs = require("fs");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `info` or less than it
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});

// Writes logs to console
logger.add(console);

let totalPassed = 0;
let totalFailed = 0;
let totalFlaky = 0;
let totalSkipped = 0;
let testStartTime: number;

export default class CustomReporterConfig implements Reporter {
  onBegin?(config: FullConfig, suite: Suite): void {
    logger.info(
      "We're running on env :" +
        process.env.TEST_ENV +
        " with credential account: " +
        process.env.BASE_USERNAME
    );
    logger.info(`Running test for suite named : ${suite.suites[0].title}`);
    testStartTime = performance.now();
  }

  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started : ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info(
      `Test Case Completed : ${test.title} Status : ${result.status}`
    );
    const retries = result.retry || 0;
    if (result.status === "passed") {
      if (result.retry === 0) totalPassed++;
      else if (result.retry > 0) {
        totalFlaky++;
        logger.info(
          "This test is flarky " +
            test.title +
            " no. of retry is " +
            result.retry +
            " against no. of tries " +
            test.retries
        );
      }
    } else if (result.status === "failed") {
      if (retries === test.retries) {
        totalFailed++;
      }
    } else if (result.status === "skipped") {
      totalSkipped++;
    }
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logger.info(`Executing Step : ${step.title}`);
      logger.info(`Executing Step : ` + result.status);
    }
  }

  onError(error: TestError): void {
    logger.error(error.message);
  }

  onEnd(result: FullResult): void | Promise<void> {
    const testEndTime = performance.now();
    const testDuration = testEndTime - testStartTime;
    let totalTest = totalPassed + totalFailed + totalFlaky + totalSkipped;
    logger.info(
      "Total Passed " +
        totalPassed +
        " , Total Failed " +
        totalFailed +
        " , Total Flarky " +
        totalFlaky +
        " , Total Skipped " +
        totalSkipped
    );
    const testResult = {
      testStatus: result.status,
      duration: testDuration / 60000,
      totalTests: totalTest,
      totalFailed: totalFailed,
      totalPassed: totalPassed,
      totalFlarky: totalFlaky,
      totalSkipped: totalSkipped,
    };
    fs.writeFileSync("result.json", JSON.stringify(testResult));
  }
}
