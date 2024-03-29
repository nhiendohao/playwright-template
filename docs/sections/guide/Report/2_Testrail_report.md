# Custom TestRail Reporter

Update Test Run Status on Test End, base on TestCase name.

Begin by install the package as a dependency

```sh
npm install @dlenroc/testrail
```

## Logic

Add the test suite and case identifier in the title of your test.

1. Reporter would base on given Testsuite of TestRail
2. If `TR_RUN_ID` is given, Reporter would use it and jump to step 4
3. If `TR_RUN_ID` is not given, Create TestRun base on list of automated test cases on the go
4. Update TestRun status on TestRail base on `TR_RUN_ID` from step 2 || 3

```ts
  ...

  test('C123456 given some scenario when an action is taken then something is true', () => {})

  // multiple test cases are supported as well
  test('C654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})
  ...
```

## Config reporter on playwright config file as below

```ts
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

Refer to .env.local for simple setup

## Configuration

| Environment Variable | Description                                                    | Required | Default                                                             |
| ---------------------- | ---------------------------------------------------------------- | ---------- | --------------------------------------------------------------------- |
| `TR_HOST_NAME`       | The host of the TestRail server to send results to.            | ✔️     | -                                                                   |
| `TR_PASSWORD`        | The password, of the user, used to authenticate with TestRail. | ✔️     | -                                                                   |
| `TR_USERNAME`        | The username, used to authenticate with TestRail.              | ✔️     | -                                                                   |
| `TR_PROJECT_ID`      | The identifier of the TestRail project to send results to.     | ✔️     | -                                                                   |
| `TR_SUITE_ID`        | The specific test suite used for create/update test run.       | ✔️     | -                                                                   |
| `TR_RUN_ID`          | Provide runId if you want to update an existing test run       | ❌       | If runId is not provided, new test run would be generated on the go |
| `TR_RUN_NAME`        | Provide runName if you want to use specific name for test run  | ❌       |                                                                     |
