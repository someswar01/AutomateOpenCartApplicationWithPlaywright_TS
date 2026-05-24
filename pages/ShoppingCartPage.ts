import { Page,expect,Locator } from "@playwright/test";

import { CheckoutPage } from "../pages/CheckoutPage";

export class ShoppingCartPage {
    private readonly page: Page;

    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;      


    constructor(page: Page) {
        this.page = page;
        this.lblTotalPrice = page.locator("//td[@class='text-right' and contains(text(),'$')]"); 
        this.btnCheckout = page.locator("//a[contains(text(),'Checkout')]");

    }

    async getTotalPrice(): Promise<string | null> {
        try{
        return await this.lblTotalPrice.textContent();
        }catch(error){
            console.log(`Error occurred while fetching total price: ${error}`);
            return null;
        }
    }

    async clickonCheckout(): Promise<CheckoutPage> {
    
            await this.btnCheckout.click();
            return new CheckoutPage(this.page);
    }
    async isPageLoaded(): Promise<boolean> {
        try {
            return await this.btnCheckout.isVisible();
        } catch (error) {
            console.log(`Error occurred while verifying Shopping Cart Page: ${error}`);
            return false;
        }
    }

}

    