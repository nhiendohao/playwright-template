import test from '../../lib/BaseTest';

/* 
    Example with using storageState: 
    1. Un-comment test.use to use existing cookies.json 
    2. Comment-out login and validation steps
    3. Un-comment 2 last steps to navigate straight to secure page

*/
// test.use({ storageState: "cookies.json" })
test(`Login to Heroku app.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');
    await myAccountPage.page.context().storageState({path:"cookies.json"});
    await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");
    // await loginPage.page.goto("https://the-internet.herokuapp.com/secure")
    // await myAccountPage.verifyURL("https://the-internet.herokuapp.com/secure");
    await myAccountPage.page.close();

});