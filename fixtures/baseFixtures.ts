import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type myFixtures = {
    loggedInPage: Page;
};

// Extended base test with the custom fixture type
export const test = base.extend<myFixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(page);
    }
});

export { expect } from '@playwright/test';
