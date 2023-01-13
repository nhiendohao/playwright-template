
# Junit TestRail Reporter

You've got some test cases in TestRail that are automated and the results are ouputted in a JUnit
format. This will report the results as a run in TestRail.

## Installation

Begin by install the package as a dependency

```sh
npm install
```

Then add Junit report to Playwright config. TestRail Reporter would base on junit reporter to update status.

```typescripts
reporter: [
['junit', { outputFile: 'test-results/junit_report.xml' }],
]
```

## Usage

Add the test suite and case identifier in the title of your test:

```js
  ...

  it('C123456 given some scenario when an action is taken then something is true', () => {})

  // multiple test cases are supported as well
  test('C654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})

  // so are multiple test suites
  test('C123456 S654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})

  ...
```

Upload test results to Testrail:

1. Run your test to generate junit report xml at `test-results/junit_report.xml`
2. Then run the the following command :Use environment variables directly into command line as below

```shell
TESTRAIL_HOST=https://testrail.com \
TESTRAIL_PROJECT_ID=319 \
TESTRAIL_RUN_NAME="Automated Test Run via junit-testrail-reporter" \
TESTRAIL_USERNAME=username \
TESTRAIL_PASSWORD=123456 \
TESTRAIL_SUITE_ID=1 \
TESTRAIL_RUN_ID=1 \
npx junit-testrail-reporter \
-p=test-results/junit_report.xml \
-c=1
```

* Custom params:

  * `runId` / `-r` : By default, it will automatically create new test run on TestRail. Once runId is provided, test results would be updated for that specific runId.
  * completeRun `-c` : By default test run would be created/updated status only. Incase you want to complete that test run, let `-c=1`, it would complete test run on the go!
  * TESTRAIL_RUN_NAME : By default Test Run Name would be `Automated Test Run via junit-testrail-reporter + Current RunTime` . You can provide expected test runName like `TESTRAIL_RUN_NAME="Testing on Beta"`, this would create test run named `Testing on Beta + Current Runtime`

## Configuration

| Argument Name           | Environment Variable    | Description                                                               | Required | Default                                                                                                                 |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| `host` or `h`           | `TESTRAIL_HOST`         | The host of the TestRail server to send results to.                       | ✔️     | -                                                                                                                       |
| -                       | `TESTRAIL_PASSWORD`     | The password, of the user, used to authenticate with TestRail.            | ✔️     | -                                                                                                                       |
| `projectId`             | `TESTRAIL_PROJECT_ID`   | The identifier of the TestRail project to send results to.                | ✔️     | -                                                                                                                       |
| `resultsPattern` or `p` | -                       | The glob pattern for test result files that will be reported to TestRail. | ✔️     | -                                                                                                                       |
| `runName` or `r`        | `TESTRAIL_RUN_NAME`     | A brief description used to identify the automated test run.              | ❌       | `Automated Test Run via junit-testrail-reporter + Current RunTime`                                                      |
| `runId` or `r`          | `TESTRAIL_RUN_ID`       | Provide runId if you want to update an existing test run                  | ❌       |                                                                                                                         |
| `completRun` or `u`     | `TESTRAIL_COMPLETE_RUN` | Complete the test run after updating status                               | ❌       | By default, we just update test run status.If `c=1`, test run would be marked as complete on TestRail |

> The **password** configuration parameter can only be set via environment variable.
> The **resultsPattern** configuration parameter can only be set via command line arguments.
