import { Page, expect, Locator } from "@playwright/test";

export class HomePage {
    private readonly page: Page;

    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lnkMyAccount = page.locator("//a[@title='My Account']");
        this.lnkRegister = page.locator("xpath=//a[text()='Register']");
        this.lnkLogin = page.locator("li[class='dropdown open'] li:nth-child(2) a:nth-child(1)");
        this.txtSearchBox = page.locator('input[name="search"]');
        this.btnSearch = page.locator('button[class="btn btn-default btn-lg"]');
    }

    async isHomePageDisplayed() {
        try {
            let pageTitle: string = await this.page.title();
            if (pageTitle) {
                return true;
            }

        } catch (error) {
            console.log(`Error occurred while verifying Home Page: ${error}`);
            throw error;
        }
    }

    async clickMyAccount() {
        try {
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Error occurred while clicking My Account link: ${error}`);
            throw error;
        }
    }

    async clickRegister() {
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Error occurred while clicking Register link: ${error}`);
            throw error;
        }
    }

    async clickLogin() {
        try {
            await this.lnkLogin.click();
        } catch (error) {
            console.log(`Error occurred while clicking Login link: ${error}`);
            throw error;
        }
    }

    async enterProductName(productName: string) {
        try {
            await this.txtSearchBox.fill(productName);
        } catch (error) {
            console.log(`Error occurred while entering product name in search box: ${error}`);
            throw error;
        }
    }

    async clickSearchButton() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Error occurred while clicking Search button: ${error}`);
            throw error;
        }
    }

}