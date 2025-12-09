import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base/BasePage";


export class InventoryPage extends BasePage {
    private readonly inventoryContainer: Locator;
    private readonly cartBadge: Locator;
    private readonly sortSelect: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;

    constructor(page: Page) {
        super(page);

        // Main container for inventory items
        this.inventoryContainer = this.page.locator('[data-test="inventory_list"]');

        // Cart badge (top-right)
        this.cartBadge = this.page.locator("[data-test='shopping-cart-badge']");

        // Sort select
        this.sortSelect = this.page.locator('[data-test="product-sort-container"]');

        // Product names
        this.productNames = this.page.locator('[data-test="inventory-item-name"]');

        // Product prices
        this.productPrices = this.page.locator('[data-test="inventory-item-price"]');
    }

    async open() {
        // Open inventory page directly
        await this.goto('/inventory.html');
        await this.waitForLoad();
    }

    async addProductToCartByName(productName: string) {

        // Convert "Sauce Labs Backpack" to "add-to-cart-sauce-labs-backpack"
        const nameWithDash = productName.toLowerCase().replace(/\s+/g, '-');
        const testId = `add-to-cart-${nameWithDash}`;

        const addToCartButton = this.page.locator(`[data-test="${testId}"]`);
        await addToCartButton.click();
    }

    async removeProductFromCartByName(productName: string) {
        const nameWithDash = productName.toLowerCase().replace(/\s+/g, '-');
        const testId = `remove-${nameWithDash}`;

        const removeButton = this.page.locator(`[data-test="${testId}"]`);
        await removeButton.click();
    }

    async getCartCount() {
        const text = await this.cartBadge.textContent();
        if (!text) return 0;

        return Number(text);
    }

    async sortByNameAscending() {
        await this.sortSelect.selectOption('az');
    }

    async sortByNameDescending() {
        await this.sortSelect.selectOption('za');
    }

    async getProductNames(): Promise<string[]> {
        return this.productNames.allTextContents();

    }

    async sortByPriceLowToHigh() {
        await this.sortSelect.selectOption('lohi');
    }

    async sortByPriceHighToLow() {
        await this.sortSelect.selectOption('hilo');
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.productPrices.allTextContents();
        console.log('Product Prices: ', texts);
        return texts.map(n => Number(n.replace('$', '')));
    }

}
