import { Page,Locator,expect } from "@playwright/test";

import { ShoppingCartPage } from "../pages/ShoppingCartPage";

export class ProductPage {
    private readonly page: Page;

    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMessage: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtQuantity = page.locator("#quantity");
        this.btnAddToCart = page.locator("#button-cart");
        this.cnfMessage = page.locator(".alert.alert-success");
        this.btnItems = page.locator("#button-items");
        this.lnkViewCart = page.locator("//a[text()='View Cart']");
    }       

    async setQuantity(quantity: string): Promise<void> {
        try {
            await this.txtQuantity.fill(quantity);
        } catch (error) {
            console.log(`Error occurred while setting quantity: ${error}`);
            throw error;
        }

    }
    async clickAddToCart(): Promise<void> {
        try {
            await this.btnAddToCart.click();
        } catch (error) {
            console.log(`Error occurred while clicking Add to Cart button: ${error}`);
            throw error;
        }
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
           if(this.cnfMessage!=null){
               return true;
           }else{       
           return false;
              }
        } catch (error) {
            console.log(`confirmation message not found: ${error}`);
            return false;
        }
    }

    async clickItemsToNavigateCart(): Promise<void> {
        try {
            await this.btnItems.click();
        } catch (error) {
            console.log(`Error occurred while clicking Items button: ${error}`);
            throw error;
        }   
    }

    async clickViewCart(): Promise<ShoppingCartPage> {

            await this.lnkViewCart.click();
            return new ShoppingCartPage(this.page);
       
    }

    async addProductToCart(quantity: string): Promise<void> {
        
            await this.setQuantity(quantity);
            await this.clickAddToCart();
            await this.isConfirmationMessageVisible();
    } 

}