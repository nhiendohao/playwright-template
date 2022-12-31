# Project Introduction

* Basic use cases with Playwright [here](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/basic)
* Advance framework design with:
  * [Page Object Repo & Page Factory](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/advance/PageObjectModel)
  * [ScreenPlay](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/advance/ScreenPlay)
* Pipepline for CI/CD:
  * [Github action](https://github.com/nhiendohao/playwright-template/tree/master/.github/workflows)
  * CircleCI : TBD

[![Playwright Tests](https://github.com/nhiendohao/playwright-template/actions/workflows/playwright.yml/badge.svg)](https://github.com/nhiendohao/playwright-template/actions/workflows/playwright.yml)

# Installation

* CI/CD : npm ci
* Local env:
  * `npx playwright install --with-deps` : install playwright with browser
  * `npm install` : install some dependencies in package.json

# Usage

## 1. Run Test

* Run all tests with all Projects: `npx playwright test`
* Run test by Project name:`npx playwright test --project=pom`, `npx playwright test --project=screenplay`
* Run test by Environment name: `TEST_ENV=alpha npx playwright test`

## 2. Integration

### Allure Report

**Package** :https://www.npmjs.com/package/allure-playwright

**Usage:**

1. Via playwright.config.ts:

```typescript
{
  reporter: [['line'], ['allure-playwright']]
}
```


| Option       | Description                                                                                                               | Default            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| outputFolder | Path to results folder.                                                                                                   | `./allure-results` |
| detail       | Hide`pw:api` and `hooks` steps in report. [See here](https://www.npmjs.com/package/allure-playwright#hooks-and-api-calls) | `true`             |
| suiteTitle   | Use test title instead of`allure.suite()`. [See here](https://www.npmjs.com/package/allure-playwright#suit-title)         | `true`             |

3. Via CLI:

```shell
npx playwright test --reporter=allure-playwright
```

Generate Allure Report:

allure generate allure-results -o allure-report --clean
* Generate report at folder allure-report base on json reports in allure-results folder

Open Allure Report:

```shell
allure open allure-report
```
Slack

* TBD

### TestRail Reporters

* TBD

### Attach report to Github Page

* Checkout Sample Allure report at : https://nhiendohao.github.io/playwright-template/
