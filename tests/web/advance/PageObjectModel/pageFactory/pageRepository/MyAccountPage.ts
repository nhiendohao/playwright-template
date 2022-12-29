import { MyAccountPageObjects } from "../objectRepository/MyAccountPageObjects";
import { WebActions } from "../../lib/WebActions";
import {  expect, Page } from '@playwright/test';

let webActions: WebActions;

export class MyAccountPage extends MyAccountPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyURL(url : string): Promise<void> {
        await this.page.waitForLoadState();
        expect(this.page.url()).toContain(url);    }

}