import { test,expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";


let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
    config = new TestConfig();
    await page.goto(config.appUrl);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000)
    await page.close();
});


    test("should login successfully with valid credentials @sanity @regression", async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.setEmail(config.email);
        await loginPage.setPassword(config.password);
        await loginPage.clickLogin();

        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageDisplayed();
        expect(isMyAccountPageDisplayed).toBeTruthy();

    }); 


