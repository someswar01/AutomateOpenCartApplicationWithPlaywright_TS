# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccountRegistration.spec.ts >> Account Registration Tests >> TC01: Verify that a user can register successfully with valid details
- Location: tests\AccountRegistration.spec.ts:23:9

# Error details

```
Error: page.goto: net::ERR_CERT_AUTHORITY_INVALID at https://localhost/opencart/upload/
Call log:
  - navigating to "https://localhost/opencart/upload/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e5]:
    - heading "Your connection is not private" [level=1] [ref=e6]
    - paragraph [ref=e7]:
      - text: Attackers might be trying to steal your information from
      - strong [ref=e8]: localhost
      - text: (for example, passwords, messages, or credit cards).
      - link "Learn more about this warning" [ref=e9] [cursor=pointer]:
        - /url: "#"
    - button "net::ERR_CERT_AUTHORITY_INVALID" [ref=e11]
  - generic [ref=e12]:
    - button "Back to safety" [ref=e13] [cursor=pointer]
    - button "Advanced" [ref=e14] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect} from '@playwright/test';
  2  | 
  3  | import { HomePage } from '../pages/HomePage';
  4  | import { RegistrationPage } from '../pages/RegistrationPage';
  5  | 
  6  | import { RandomDataUtils } from '../utils/randomDataGenerator';
  7  | 
  8  | import { TestConfig } from '../test.config';   
  9  | 
  10 | test.describe('Account Registration Tests', () => {
  11 | 
  12 |     let homePage: HomePage;
  13 |     let registrationPage: RegistrationPage;
  14 |     let testConfig: TestConfig; 
  15 | 
  16 |     test.beforeEach(async ({ page }) => {
  17 |         homePage = new HomePage(page);
  18 |         registrationPage = new RegistrationPage(page);
  19 |         testConfig = new TestConfig();
> 20 |         await page.goto(testConfig.appUrl);
     |                    ^ Error: page.goto: net::ERR_CERT_AUTHORITY_INVALID at https://localhost/opencart/upload/
  21 |     });
  22 | 
  23 |     test('TC01: Verify that a user can register successfully with valid details', async ({ page }) => {
  24 |         await homePage.isHomePageDisplayed();
  25 |         await homePage.clickMyAccount();
  26 |         await homePage.clickRegister();     
  27 | 
  28 |         const randomEmail = RandomDataUtils.generateRandomEmail();
  29 |         const randomFirstName = RandomDataUtils.generateRandomFirstName();
  30 |         const randomLastName = RandomDataUtils.generateRandomLastName();
  31 |         const randomTelephone = RandomDataUtils.generateRandomTelephone();
  32 |         const randomPassword = RandomDataUtils.generateRandomPassword();        
  33 | 
  34 |         await registrationPage.setFirstName(randomFirstName);
  35 |         await registrationPage.setLastName(randomLastName);
  36 |         await registrationPage.setEmail(randomEmail);   
  37 |         await registrationPage.setTelephone(randomTelephone);
  38 |         await registrationPage.setPassword(randomPassword);
  39 |         await registrationPage.setConfirmPassword(randomPassword);
  40 |         await registrationPage.checkPrivacyPolicy();
  41 |         await registrationPage.clickContinue(); 
  42 | 
  43 |         const confirmationMessage = await registrationPage.getConfirmationMessage();
  44 |         expect(confirmationMessage).toContain('Your Account Has Been Created!');
  45 | 
  46 |         await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result before closing the browser
  47 |     });
  48 | 
  49 |     // Additional test cases for account registration can be added here         
  50 |     
  51 | 
  52 | }); 
  53 | 
```