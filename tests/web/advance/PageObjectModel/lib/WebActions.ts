import fs from 'fs';
import * as CryptoJS from 'crypto-js';
import type { Download, Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import { Workbook } from 'exceljs';
import { testConfig } from '../testConfig';
import path from 'path';
const waitForElement = testConfig.waitForElement;

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
     * 
     * @returns drecypted password
     */
    async decipherPassword(): Promise<string> {
        //ENCRYPT
        // const cipher = CryptoJS.AES.encrypt('abcdef','unique');
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(testConfig.password, "unique").toString(CryptoJS.enc.Utf8);
    }

    async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
        }
    }

    /**
     * Set Delay time
     * @param {number} time  delay time
     * @returns 
     */
    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    /**
     * Click on Specific Element
     * @param {string} locator 
     */
    async clickElement(locator: string): Promise<void> {
        await this.page.click(locator);
    }

    /**
     * Click on Specific JS Element 
     * @param {string} locator 
     */
    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
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
     * Fill in specific Element
     * @param {string} locator 
     * @param {string} text 
     */
    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text);
    }

    /**
     * Drag Element A to Element B
     * @param {string} dragElementLocator 
     * @param {string} dropElementLocator 
     */
    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    /**
     * Select Dropdown Item
     * @param {string} locator 
     * @param {string} option 
     */
    async selectOptionFromDropdown(locator: string, option: string): Promise<void> {
        const selectDropDownLocator = await this.page.$(locator);
        selectDropDownLocator.type(option);
    }

    /**
     * get Element text
     * @param {string} locator 
     * @returns {string}
     */
    async getTextFromWebElements(locator: string): Promise<string[]> {
        return this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
    }

    /**
     * Download File on Click event
     * @param {string} locator 
     * @returns {Download}
     */
    async downloadFile(locator: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent(`download`),
            this.page.click(locator)
        ]);
        await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
        return download.suggestedFilename();
    }

    /**
     * Send specific Key Press
     * @param {string} locator 
     * @param {string} key 
     */
    async keyPress(locator: string, key: string): Promise<void> {
        this.page.press(locator, key);
    }

    /**
     * Read excel Data
     * @param {string} fileName 
     * @param {string} sheetName 
     * @param {number} rowNum 
     * @param {number} cellNum 
     * @returns 
     */
    async readDataFromExcel(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string> {
        const workbook = new Workbook();
        return workbook.xlsx.readFile(fileName).then(function () {
            const sheet = workbook.getWorksheet(sheetName);
            return sheet.getRow(rowNum).getCell(cellNum).toString();
        });
    }

    /**
     * Read text file
     * @param {string} filePath 
     * @returns 
     */
    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    /**
     * Set text file
     * @param {string} filePath 
     * @param {string} data 
     */
    async writeDataIntoTextFile(filePath: number | fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
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

    /**
     * Verify New Page is Opened on Click and Close Page after validation
     * @param {BrowserContext} context 
     * @param {string} newWindowLocator 
     * @param {string} urlText 
     * @param {string} clickOnNewWindowLocator 
     */
    async verifyNewWindowUrlAndClick(context: BrowserContext, newWindowLocator: string, urlText: string, clickOnNewWindowLocator: string): Promise<void> {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.page.click(newWindowLocator)
        ])
        await newPage.waitForLoadState();
        expect(newPage.url()).toContain(urlText);
        await newPage.click(clickOnNewWindowLocator);
        await newPage.close();
    }

    /**
     * Verify Element contains text
     * @param {string} locator 
     * @param {string} text 
     */
    async verifyElementContainsText(locator: string, text: string): Promise<void> {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    /**
     * Verify Element value
     * @param {string} locator 
     * @param {string} text 
     */
    async verifyJSElementValue(locator: string, text: string): Promise<void> {
        const textValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
        expect(textValue.trim()).toBe(text);
    }

    /**
     * Verify Element Attribute
     * @param {string} locator 
     * @param {string} attribute 
     * @param {string} value 
     */
    async verifyElementAttribute(locator: string, attribute: string, value: string): Promise<void> {
        const textValue = await this.page.getAttribute(locator, attribute);
        expect(textValue.trim()).toBe(value);
    }

    /**
     * Verify Element is Visible
     * @param {string} locator 
     * @param {string} errorMessage 
     */
    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: waitForElement })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    /**
     * Verify true conditional
     * @param {boolean} status 
     * @param {string} errorMessage 
     */
    async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
        expect(status, `${errorMessage}`).toBe(true);
    }

    /**
     * Verify value
     * @param {string} expectedValue 
     * @param {string} actualValue 
     * @param {string} errorMessage 
     */
    async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
        expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
    }
}