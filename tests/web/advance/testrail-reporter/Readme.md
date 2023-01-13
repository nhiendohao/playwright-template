# Work in Progress - Custom Reporter for TestRail

Update Test Run Status on Test End, base on TestCase name. Currently only work on 1 worker, still has issue with parallelism with multiple workers

## Config reporter on playwright config file as below

```typescripts
reporter: [[`./tests/web/advance/testrail-reporter/testrail-reporter.ts`]],
```

Use env file for storing below environment variables:

```js
TR_HOST_NAME= 'https://robbykei1.testrail.io'
TR_PASSWORD= 'kaMZNBE20iJS0QCJYGpl-bwfUCtXHvXXYDge6CEs0'
TR_USERNAME= 'nhiendohao@gmail.com'
TR_SUITE_ID= '1'
TR_RUN_NAME= 'Running test by env'
TR_PROJECT_ID= '1'
TR_RUN_ID= '250'
```

## Configuration

| Environment Variable  | Description                                                               | Required | Default                                                            |
| ----------------------- | --------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| `TR_HOST_NAME`       | The host of the TestRail server to send results to.                       | ✔️     | -                                                                  |
| `TR_PASSWORD`   | The password, of the user, used to authenticate with TestRail.            | ✔️     | -                                                                  |
| `TR_USERNAME`   | The username, used to authenticate with TestRail.            | ✔️     | -                                                                  |
| `TR_PROJECT_ID` | The identifier of the TestRail project to send results to.                | ✔️     | -                                                                  |
| `TR_SUITE_ID`                    | The specific test suite used for create/update test run. | ✔️     | -                                                                  |
| `TESTRAIL_RUN_ID`     | Provide runId if you want to update an existing test run                  | ❌       | If runId is not provided, new test run would be generated on the go                                                                    |
| `TR_RUN_NAME`     | Provide runName if you want to use specific name for test run                  | ❌       |                                                                    |
