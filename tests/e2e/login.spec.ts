import { test, expect } from "../../fixtures/baseFixtures";
import { LoginPage } from "../../pages/LoginPage";
import users from "../../data/users.json";


test.describe('Login Tests', () => {

    test('successfull login', { tag: ['@smoke'] }, async ({ loggedInPage }) => {
        const loginPage = new LoginPage(loggedInPage);

        await loginPage.login(users.standard.username, users.standard.password);
        await expect(loggedInPage).toHaveURL('/inventory.html');
    })

    test('unsuccessfull login', { tag: ['@smoke'] }, async ({ loggedInPage }) => {
        const loginPage = new LoginPage(loggedInPage);

        await loginPage.login('wrong_user', 'wrong_password');

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    })
})

