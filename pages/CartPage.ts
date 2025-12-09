import { BasePage } from "./base/BasePage";
import { Page, Locator } from "@playwright/test";

export class CartPage extends BasePage {
    private readonly cartItems: Locator;
    private readonly cartItemNames: Locator;
    private readonly cartItemPrices: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);

        // Each line item in the cart
        this.cartItems = this.page.locator('.cart_item');

        // Name & price inside each cart item
        this.cartItemNames = this.cartItems.locator('[data-test="inventory-item-name"]');
        this.cartItemPrices = this.cartItems.locator('.inventory_item_price');

        // Actions
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
    }

    async getItemNames(): Promise<string[]> {
        const names = await this.cartItemNames.allTextContents();
        console.log(names);
        return names.map(name => name.trim());
    }

    async getItemPrices(): Promise<number[]> {
        const texts = await this.cartItemPrices.allTextContents();
        return texts.map(text => Number(text.replace('$', '')));
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('/checkout-step-one.html');
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await this.page.waitForURL('/inventory.html');
    }


    async removeItemByName(productName: string) {
        const item = this.cartItems
            .filter({ hasText: productName })
            .first();

        const removeButton = item.locator('[data-test^="remove-"]');
        await removeButton.click();
    }
}