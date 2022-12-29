# Project Introduction:

* Basic use cases with Playwright [here](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/basichttps:/)
* Advance framework design with:
  * [Page Object Repo & Page Factory](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/advance/PageObjectModel)
  * [ScreenPlay](https://github.com/nhiendohao/playwright-template/tree/master/tests/web/advance/ScreenPlay)
* Pipepline for CI/CD:
  * [Github action](https://github.com/nhiendohao/playwright-template/tree/master/.github/workflows)
  * CircleCI : TBD

# Installation:

* CI/CD : npm ci
* Local env:
  * `npx playwright install --with-deps` : install playwright with browser
  * `npm install` : install some dependencies in package.json

# Usage:

## 1. Run Test

* Run all tests with all Projects: `npx playwright test`
* Run test by Project name:`npx playwright test --project=pom`, `npx playwright test --project=screenplay`
* Run test by Environment name: `TEST_ENV=alpha npx playwright test`

## 2. Integration

### Slack

* TBD

### TestRail Reporters

* TBD

### Attach report to Git Page

* TBD
