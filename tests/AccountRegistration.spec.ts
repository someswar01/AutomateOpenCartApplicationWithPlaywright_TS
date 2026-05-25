import { test, expect} from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';

import { RandomDataUtils } from '../utils/randomDataGenerator';

import { TestConfig } from '../test.config';   

test.describe('Account Registration Tests', () => {

    let homePage: HomePage;
    let registrationPage: RegistrationPage;
    let testConfig: TestConfig; 

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registrationPage = new RegistrationPage(page);
        testConfig = new TestConfig();
        await page.goto(testConfig.appUrl);
    });

    test.afterEach(async ({ page }) => {
        
        await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result before closing the browser

        await page.close();
    });

    test('TC01: Verify that a user can register successfully with valid details @master @regression', async ({ page }) => {
        await homePage.isHomePageDisplayed();
        await homePage.clickMyAccount();
        await homePage.clickRegister();     

        const randomEmail = RandomDataUtils.generateRandomEmail();
        const randomFirstName = RandomDataUtils.generateRandomFirstName();
        const randomLastName = RandomDataUtils.generateRandomLastName();
        const randomTelephone = RandomDataUtils.generateRandomTelephone();
        const randomPassword = RandomDataUtils.generateRandomPassword();        

        await registrationPage.setFirstName(randomFirstName);
        await registrationPage.setLastName(randomLastName);
        await registrationPage.setEmail(randomEmail);   
        await registrationPage.setTelephone(randomTelephone);
        await registrationPage.setPassword(randomPassword);
        await registrationPage.setConfirmPassword(randomPassword);
        await registrationPage.checkPrivacyPolicy();
        await registrationPage.clickContinue(); 

        const confirmationMessage = await registrationPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('Your Account Has Been Created!');

    });

    // Additional test cases for account registration can be added here         
    

}); 
