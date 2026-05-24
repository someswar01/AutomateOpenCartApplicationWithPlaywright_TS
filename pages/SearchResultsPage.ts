import {Page,expect,Locator} from "@playwright/test";

import { ProductPage } from "../pages/ProductPage";

export class SearchResultsPage {
    private readonly page: Page;

    private readonly searchPageHeader: Locator;
    private readonly searchProductors: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchPageHeader = page.locator("//h1[contains(text(),'Search - ')]");
        this.searchProductors = page.locator("//div[@class='product-thumb']");
    }

    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search - ') ?? false;

        } catch (error) {
            console.log(`Error occurred while verifying Search Results Page: ${error}`);
            return false;
        }       
    }

    async isProductExists(productName: string): Promise<boolean> {
        try {
            const count = await this.searchProductors.count();
            for (let i = 0; i < count; i++) {
                const title = await this.searchProductors.nth(i).textContent();
                if (title === productName) {
                    return true;
                }
            }
            
        } catch (error) {
            console.log(`Error occurred while checking if product '${productName}' exists: ${error}`);
            
        }   
        return false;
    }

    }