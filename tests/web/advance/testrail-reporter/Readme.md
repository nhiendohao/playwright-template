# Custom Reporter for TestRail

Update Test Run Status on Test End, base on TestCase name.

Begin by install the package as a dependency

```sh
npm install
```

## Usage

Add the test suite and case identifier in the title of your test:

```js
  ...

  it('C123456 given some scenario when an action is taken then something is true', () => {})

  // multiple test cases are supported as well
  test('C654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})
  ...
```

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
