
# Allure Report

**Package** :[Allure Playwright](https://www.npmjs.com/package/allure-playwright)

**Precondition:**

* Via playwright.config.ts: Enable Playwright Allure reporter

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

* Via CLI:

```shell
npx playwright test --reporter=allure-playwright
```

Generate Allure Report:

`allure generate allure-results -o allure-report --clean`

* Generate report at folder allure-report base on json reports in allure-results folder

Open Allure Report:

```shell
allure open allure-report
```
