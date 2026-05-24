import { Page,expect,Locator } from "@playwright/test";

export class RegistrationPage {
    private readonly page: Page;   

    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtFirstName = page.getByLabel('First Name');
        this.txtLastName = page.getByLabel('Last Name');
        this.txtEmail = page.getByLabel('E-Mail');
        this.txtTelephone = page.getByLabel('Telephone');
        this.txtPassword = page.locator("//input[@id='input-password']");
        this.txtConfirmPassword = page.locator("#input-confirm");
        this.chkPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
        this.msgConfirmation = page.locator("//h1[text()='Your Account Has Been Created!']");

    }

    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
    }

    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }      

    async setTelephone(telephone: string): Promise<void> {
        await this.txtTelephone.fill(telephone);
    }

    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    async setConfirmPassword(confirmPassword: string): Promise<void> {
        await this.txtConfirmPassword.fill(confirmPassword);
    }
    
    async checkPrivacyPolicy(): Promise<void> {
        await this.chkPolicy.check();
    }       

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async getConfirmationMessage(): Promise<string> {
        return await this.msgConfirmation.textContent() ?? '';
    }

    async completeRegistration(userData: { firstName: string, lastName: string, email: string, telephone: string, password: string, confirmPassword: string }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.confirmPassword);
        await this.checkPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();
    }
}