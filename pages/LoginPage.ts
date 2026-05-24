import { Page,expect,Locator } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;

    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly txtErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtEmail = page.getByPlaceholder('E-Mail Address');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.txtErrorMessage = page.locator("//div[contains(@class,'alert-danger')]");
    }

    async setEmail(email: string): Promise<void> {
        try {
            await this.txtEmail.fill(email);
        } catch (error) {
            console.log(`Error occurred while setting email: ${error}`);
            throw error;
        }
    }                   

    async setPassword(password: string): Promise<void> {
        try {
            await this.txtPassword.fill(password);
        } catch (error) {
            console.log(`Error occurred while setting password: ${error}`);
            throw error;
        }
    }           

    async clickLogin(): Promise<void> {
        try {
            await this.btnLogin.click();
        } catch (error) {
            console.log(`Error occurred while clicking login button: ${error}`);
            throw error;
        }
    }       

    async getErrorMessage(): Promise<string> {
        try {
            return await this.txtErrorMessage.textContent() || '';
        } catch (error) {
            console.log(`Error occurred while fetching error message: ${error}`);
            throw error;
        }
    }   


}