import { expect } from '@playwright/test';
import test from '../../lib/BaseTest';
import { loggers } from 'winston';

/* 
    Example with using storageState: 
    1. Un-comment test.use to use existing cookies.json 
    2. Comment-out login and validation steps
    3. Un-comment 2 last steps to navigate straight to secure page

*/
// test.use({ storageState: "cookies.json" })
test(`C1 C2 C4 C5 Login to Heroku app.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');

});

test(`C3 Login to Heroku app.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');
    await myAccountPage.page.context().storageState({ path: "cookies.json" });
    await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");
    // await loginPage.page.goto("https://the-internet.herokuapp.com/secure")
    // await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");

});

test(`C6 Login to Heroku app.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');
    await myAccountPage.page.context().storageState({ path: "cookies.json" });
    await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");
});