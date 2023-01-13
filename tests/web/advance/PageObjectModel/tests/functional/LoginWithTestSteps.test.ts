import test from '../../lib/BaseTest';

// We can use Steps like in Cucmber format as shown below

test(`C2 @Smoke2 Verify Login with test Step`, async ({ loginPage, myAccountPage }) => {
    await test.step(`Navigate to Heroku`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Login to Heroku App`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is Navigated to My Account page.`, async () => {
        await myAccountPage.verifyURL('https://the-internet.herokuapp.com/secure');
    });
});