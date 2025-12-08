import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import users from "../../data/users.json";


test('Standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('/inventory.html');
})


test('User sees an error message when logging in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('wrong_user', 'wrong_password');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
})
