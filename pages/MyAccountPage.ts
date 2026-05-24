import { Page, expect, Location, Locator } from "@playwright/test";

import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {
    private readonly page: Page;
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgHeading = page.locator("//h2[text()='My Account']");
        this.lnkLogout = page.locator("//a[text()='Logout']");
    }

    async isMyAccountPageDisplayed(): Promise<boolean> {
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        } catch (error) {
            console.log(`Error occurred while verifying My Account Page: ${error}`);
            return false;
        }
    }

    async clickLogout(): Promise<LogoutPage> {
        try {
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        } catch (error) {
            console.log(`Error occurred while clicking Logout link: ${error}`);
            throw error;
        }
    }

}
