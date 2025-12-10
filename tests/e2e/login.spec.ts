import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import users from "../../data/users.json";

test.describe('Login Tests', () => {

    test('successfull login', { tag: ['@smoke'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL('/inventory.html');
    })

    test('unsuccessfull login', { tag: ['@smoke'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login('wrong_user', 'wrong_password');

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    })
})

