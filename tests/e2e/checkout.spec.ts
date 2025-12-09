import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import users from '../../data/users.json';
import userInfo from '../../data/user-info.json';

test('standard user can complete checkout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const product of productsToAdd) {
        await inventoryPage.addProductToCartByName(product);
    }

    await inventoryPage.goToCart();
    const cartNames = await cartPage.getItemNames();
    expect(cartNames).toEqual(productsToAdd);

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo(
        userInfo.default.firstName,
        userInfo.default.lastName,
        userInfo.default.postalCode
    );

    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();

    const message = await checkoutPage.getCompletionMessage();
    expect(message?.trim()).toBe('Thank you for your order!');
});