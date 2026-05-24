import { Page, expect, Locator } from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;

    private readonly radioGuest: Locator;
    private readonly btnContinue: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtAddress1: Locator;
    private readonly txtAddress2: Locator;
    private readonly txtCity: Locator;
    private readonly txtPostcode: Locator;
    private readonly drpCountry: Locator;
    private readonly drpState: Locator;
    private readonly btnContinueBillingAddress: Locator;
    private readonly btnContinueDeliveryAddress: Locator;
    private readonly btnContinueShippingAddress: Locator;
    private readonly btnContinuePaymentMethod: Locator;
    private readonly txtDeliveryMethod: Locator;
    private readonly chkboxTerms: Locator;
    private readonly lblTotalPrice: Locator;
    private readonly btnConfirmOrder: Locator;
    private readonly lblOrderConfirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.radioGuest = page.locator("//input[@name='account' and @value='guest']");
        this.btnContinue = page.locator("//input[@id='button-account']");
        this.txtFirstName = page.locator("//input[@name='firstname']");
        this.txtLastName = page.locator("//input[@name='lastname']");
        this.txtAddress1 = page.locator("//input[@name='address_1']");
        this.txtAddress2 = page.locator("//input[@name='address_2']");
        this.txtCity = page.locator("//input[@name='city']");
        this.txtPostcode = page.locator("//input[@name='postcode']");
        this.drpCountry = page.locator("//select[@name='country_id']");
        this.drpState = page.locator("//select[@name='zone_id']");
        this.btnContinueBillingAddress = page.locator("//input[@id='button-guest']");
        this.btnContinueDeliveryAddress = page.locator("//input[@id='button-shipping']");

        this.btnContinueShippingAddress = page.locator("//input[@id='button-shipping-method']");

        this.btnContinuePaymentMethod = page.locator("//input[@id='button-payment-method']");
        this.txtDeliveryMethod = page.locator("//div[@id='collapse-shipping-method']//p");
        this.chkboxTerms = page.locator("//input[@name='agree']");
        this.lblTotalPrice = page.locator("//div[@class='table-responsive']//tr[last()]//td[2]");
        this.btnConfirmOrder = page.locator("//input[@id='button-confirm']");
        this.lblOrderConfirmationMessage = page.locator("//div[@id='content']//h1");
    }

    async isCheckoutPageExists(): Promise<boolean> {
        try {
            await expect(this.page).toHaveTitle("Checkout");
            return true;
        } catch (error) {
            console.log(`Error occurred while verifying Checkout Page: ${error}`);
            return false;
        }
    }

    async chooseCheckoutOption(checkoutOption: string) {
        if (checkoutOption === 'Guest Checkout') {
            await this.radioGuest.check();
        }
    }

    async clickOnContinue() {
        await this.btnContinue.click();
    }

    async setFirstName(firstName: string) {
        await this.txtFirstName.fill(firstName);
    }

    async setLastName(lastName: string) {
        await this.txtLastName.fill(lastName);
    }

    async setAddress1(address1: string) {
        await this.txtAddress1.fill(address1);
    }

    async setAddress2(address2: string) {
        await this.txtAddress2.fill(address2);
    }

    async setCity(city: string) {
        await this.txtCity.fill(city);
    }

    async setPostcode(postcode: string) {
        await this.txtPostcode.fill(postcode);
    }

    async selectCountry(country: string) {
        await this.drpCountry.selectOption({ label: country });
    }

    async selectState(state: string) {
        await this.drpState.selectOption({ label: state });
    }

    async clickContinueAfterBillingAddress() {
        await this.btnContinueBillingAddress.click();
    }

    async clickContinueAfterDeliveryAddress() {
        await this.btnContinueDeliveryAddress.click();
    }

    async setDeliveryMethodComment(deliveryMessage: string) {
        await this.txtDeliveryMethod.fill(deliveryMessage)
    }

    async clickContinueAfterShippingAddress() {
        await this.btnContinueShippingAddress.click();
    }

    async selectTermsAndConditions() {
        await this.chkboxTerms.check();
    }

    async clickContinueAfterPaymentMethod() {
        await this.btnContinuePaymentMethod.click();
    }

    async getTotalPriceBeforeConfOrder() {
        return await this.lblTotalPrice.textContent();
    }

    async clickConfirmOrder() {
        await this.btnConfirmOrder.click();
    }

    async isOrderPlaced() {
        try {
            if (this.page.on(`dialog`, async dialog => dialog.accept())) {
                await this.page.waitForEvent('dialog');
            }
            await expect(this.lblOrderConfirmationMessage).toHaveText("Your order has been placed!");
            return true;
        } catch (error) {
            console.log(`Error occurred while verifying order confirmation: ${error}`);
            return false;
        }

    }

}