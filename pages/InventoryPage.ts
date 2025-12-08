import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base/BasePage";


export class InventoryPage extends BasePage {
    private readonly inventoryContainer: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);

        // Main container for inventory items
        this.inventoryContainer = this.page.locator('[data-test="inventory_list"]');

        // Cart badge (top-right)
        this.cartBadge = this.page.locator("[data-test='shopping-cart-badge']");
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

    async getCartCount() {
        const text = await this.cartBadge.textContent();
        if (!text) return 0;

        return Number(text);
    }
}
