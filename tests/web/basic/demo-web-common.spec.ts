import test, { chromium, expect } from "@playwright/test";

// Simple example for web navigaton
test('Simple nagivation ', async ({ page }) => {
    const logo = page.getByRole('img', { name: 'Google' });
    await page.goto('http://google.com.vn');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle("Google");
});

// Example for Web hierarchy
// Browser -> Context -> Page1
//         -> Context -> Page2
test.skip('Web hierarchy example', async () => {
    const browser = chromium.launch();
    const context = (await browser).newContext();
    const page = (await context).newPage();
    const page2 = (await context).newPage();

    (await page).goto("http://youtube.com");
    (await page2).goto("http://vnexpress.net");

});

// Browser -> Context1 -> Page1
// Browser -> Context2-> Page2
test.skip('Web hierarchy example - 2', async () => {
    const browser = chromium.launch();
    const context = (await browser).newContext();
    const context2 = (await browser).newContext();
    const page = (await context).newPage();
    const page2 = (await context2).newPage();

    (await page).goto("http://youtube.com");
    (await page2).goto("http://vnexpress.net");

});

//iFrame example 
test('iFrame example', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/#iFrame');

    const myIFrame = page.frameLocator('internal:text="<br />"i').getByPlaceholder('Search...');

    await myIFrame.fill("ABCD");
    await myIFrame.press("Enter");


    const searchResult = page.frameLocator('internal:text="<br />"i').getByRole('heading', { name: 'Search results for: abcd' });
    await searchResult.waitFor({ state: 'visible' });

    await expect(searchResult).toBeVisible();

});

//filePicker - Upload
test('FilePicker for upload example', async ({ page }) => {
    await page.goto('https://kitchen.applitools.com/ingredients/file-picker');

    const uploadButton = await page.getByLabel('Upload Recipe Picture');

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'), uploadButton.click()
    ]);

    await fileChooser.setFiles('resources/couple.jpeg')
});

//filePicker - Download
test('FilePicker for download example', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');

    const downloadButton = await page.getByRole('link', { name: 'Download' });

    const [fileDownload] = await Promise.all([
        page.waitForEvent('download'), downloadButton.click()
    ]);

    await fileDownload.saveAs('resources/sample_download.jpeg')
});

//GeoLocation example
test.use({
    permissions: ['geolocation'],
    geolocation: {
        latitude: 10.94000,
        longitude: 106.8000,
    },
});
test('Stimulate GeoLocation', async ({ page }) => {
    await page.goto('https://mylocation.org/');

    const browserGeoTab = page.getByRole('tab', { name: 'Browser Geolocation' });
    const startTestButton = page.getByRole('button', { name: 'Start Test' });

    const geoLatitude = page.getByRole('cell', { name: '10.94' });
    const geoLongtitude = page.getByRole('cell', { name: '106.8' });

    await browserGeoTab.click();
    await startTestButton.click();

    await expect(geoLatitude).toBeVisible();
    await expect(geoLongtitude).toBeVisible();

});

//Locale example
test.use({ locale: 'ko-KR' });
test('Stimulate locale', async ({ page }) => {
    await page.goto("https://amazon.com");
});


//Network - Intercepting example 
test('Intercept network - mock api response within web application', async ({ page }) => {
    await page.route('https://kitchen.applitools.com/api/recipes', (route) => {
        route.fulfill({
            body: JSON.stringify({
                "time": 1671374535336,
                "data": [
                    {
                        "id": "hot-fried-chicken",
                        "title": "Hot Fried Chicken",
                        "image": "/images/hot-fried-chicken.jpg"
                    },
                ]
            })
        })
    });
    await page.goto("https://kitchen.applitools.com/ingredients/api");
    await page.waitForLoadState('networkidle');

})

test('Intercept network - custom api response within web application', async ({ page }) => {
    await page.route("https://kitchen.applitools.com/api/recipes", async (route) => {
        const response = await page.request.fetch(route.request());
        let body = await response.text();
        body = body.replace('"Hot Fried Chicken"', '"Robby Chicken AWSOME"');
        await route.fulfill({ body });

    });
    await page.goto("https://kitchen.applitools.com/ingredients/api");
    await page.waitForLoadState("networkidle");

});

// Image validation example
test.skip('Simple image validation ', async ({ page }) => {
    const logo = page.getByRole('img', { name: 'Google' });
    await page.goto('http://google.com.vn');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveScreenshot('google_logo.png');
    // await expect(logo).toHaveScreenshot('resources-ABC-chromium-darwin.png');
    // await expect(logo).toHaveScreenshot('resources-ABC-chromium-darwin.png',{maxDiffPixelRatio: 0.1});
});


// Storage cookies example
// test.use({ storageState: 'cookies.json'})
// Ref Advance POM Example