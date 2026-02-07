import { test, expect } from "../../fixtures/baseFixtures";
import users from "../../data/users.json";
import loginData from "../../data/login-data.json";


test.describe('Login Tests', () => {

    test('successfull login', { tag: ['@smoke'] }, async ({ loggedInPage, loginPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(loggedInPage).toHaveURL('/inventory.html');
    })

    test('unsuccessfull login', { tag: ['@smoke'] }, async ({ loginPage }) => {
        await loginPage.login(users.invalidUser.username, users.invalidUser.password);

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    })
})


// Data Driven Testing
test.describe('Login Tests DDT', () => {

    for (const data of loginData) {
        test(data.name, { tag: ['@smoke', '@auth'] }, async ({ loggedInPage, loginPage }) => {
            await loginPage.login(data.username, data.password);

            if (data.expectSuccess) {
                await expect(loggedInPage).toHaveURL('/inventory.html');
            } else {
                const error = await loginPage.getErrorMessage();
                expect(error).toContain(data.expectedError);
            }
        });
    }
});
