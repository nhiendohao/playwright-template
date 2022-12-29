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