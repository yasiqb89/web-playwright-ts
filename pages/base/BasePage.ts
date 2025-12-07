import { Page, expect } from "@playwright/test";

export class BasePage {
    // Accessible from child classes
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to a URL
    async goto(path: string = '/') {
        await this.page.goto(path);
    }

    // Wait for URL to match a pattern
    async waitForUrl(urlPart: string) {
        await expect(this.page).toHaveURL(new RegExp(urlPart));

    }

    // Wait for page to be loaded
    async waitForLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}


