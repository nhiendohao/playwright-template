* `Guide: Understand [Page Object Model](https://playwright.dev/docs/pom)

## Definine tasks for specific Page Object

```typescript
import { LoginPageObjects } from '../objectRepository/LoginPageObjects';
import { WebActions } from "../../lib/WebActions";
import type { Page } from '@playwright/test';
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class LoginPage extends LoginPageObjects {
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(testConfig.qa);
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await webActions.enterElementText(LoginPage.USERNAME_TEXTBOX,testConfig.username);
        await webActions.enterElementText(LoginPage.PASSWORD_TEXTBOX,decipherPassword);
        await webActions.clickElement(LoginPage.SUBMIT_BUTTON);
    }

}

```

## Define a Common Action/Validation

```typescript
export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to specific URL
     * @param url expected url 
    */
    async navigateToURL(url: string) {
        this.page.goto(url);
    }
   
     /**
     * Click on Center of Element Bounding box
     * @param {string} locator 
     */
    async boundingBoxClickElement(locator: string): Promise<void> {
        await this.delay(1000);
        const elementHandle = await this.page.$(locator);
        const box = await elementHandle.boundingBox();
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    /**
     * Verify Element Text
     * @param {string} locator 
     * @param {string} text 
     */
    async verifyElementText(locator: string, text: string): Promise<void> {
        const textValue = await this.page.textContent(locator);
        expect(textValue.trim()).toBe(text);
    }
}
```

## Define a Base Test to extend

```typescript
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pageFactory/pageRepository/LoginPage';

import { MyAccountPage } from '../pageFactory/pageRepository/MyAccountPage';


const test = baseTest.extend<{
    loginPage: LoginPage;
    myAccountPage: MyAccountPage;


}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },

});

export default test
```

## Define a test case

```typescript
import test from '../../lib/BaseTest';

test(`Login to Heroku app.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');
    await myAccountPage.page.context().storageState({path:"cookies.json"});
    await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");
});
```
