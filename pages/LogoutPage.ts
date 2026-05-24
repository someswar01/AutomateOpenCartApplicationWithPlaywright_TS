import { Page, expect, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
    private readonly page: Page
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnContinue = page.locator("//a[text()='Continue']");
    }


    async clickContinue(): Promise<HomePage> {
        try {
            await this.btnContinue.click();
            return new HomePage(this.page);
        } catch (error) {
            console.log(`Error occurred while clicking Continue button: ${error}`);
            throw error;
        }

    }

    async isContinueButtonDisplayed(): Promise<boolean> {
        try {
            return await this.btnContinue.isVisible();
        } catch (error) {
            console.log(`Error occurred while verifying Continue button: ${error}`);
            throw error;
        }
    }

}
