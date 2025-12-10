import { BasePage } from "./base/BasePage";
import { Page, Locator } from "@playwright/test";

export class CheckoutPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;
    private readonly errorMessage: Locator;


    private readonly finishButton: Locator;
    private readonly summaryContainer: Locator;

    // Complete Page 
    private readonly completeHeader: Locator;

    // Payment Page 
    private readonly summaryItemPrices: Locator;
    private readonly summarySubtotalLabel: Locator;
    private readonly summaryTaxLabel: Locator;
    private readonly summaryTotalLabel: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.cancelButton = this.page.locator('[data-test="cancel"]');
        this.summaryContainer = this.page.locator('.summary_info');
        this.finishButton = this.page.locator('[data-test="finish"]');

        // Complete page
        this.completeHeader = this.page.locator('.complete-header');

        // For error message
        this.errorMessage = this.page.locator('[data-test="error"]');

        this.summaryItemPrices = this.page.locator('.inventory_item_price');
        this.summarySubtotalLabel = this.page.locator('.summary_subtotal_label');
        this.summaryTaxLabel = this.page.locator('.summary_tax_label');
        this.summaryTotalLabel = this.page.locator('.summary_total_label');
    }

    async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
        await this.page.waitForURL('/checkout-step-two.html');
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL('/checkout-complete.html');
    }

    async getCompletionMessage(): Promise<string | null> {
        return this.completeHeader.textContent();
    }

    async getErrorMessage(): Promise<string | null> {
        const text = await this.errorMessage.textContent();
        if (text) {
            return text.trim();
        } else {
            return null;
        }
    }

    private parseMoney(text: string | null): number {
        if (!text) return 0;
        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getOverviewItemPrices(): Promise<number[]> {
        const texts = await this.summaryItemPrices.allTextContents();
        return texts.map(t => this.parseMoney(t));
    }

    async getSummarySubtotal(): Promise<number> {
        const text = await this.summarySubtotalLabel.textContent();
        return this.parseMoney(text);

    }

    async getSummaryTax(): Promise<number> {
        const text = await this.summaryTaxLabel.textContent();
        return this.parseMoney(text);
    }

    async getSummaryTotal(): Promise<number> {
        const text = await this.summaryTotalLabel.textContent();
        return this.parseMoney(text);
    }

}