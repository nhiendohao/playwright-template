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

export default test;