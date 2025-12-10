import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../data/users.json';


test.describe('Inventory Tests', () => {

    test('adding product to cart updates cart badge count', { tag: ['@smoke', '@formValidation'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL('/inventory.html');

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(1);
    });


    test('user can add multiple products to the cart', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(2);
    });


    test('remove product from cart', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
        await inventoryPage.removeProductFromCartByName('Sauce Labs Backpack');

        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(1);
    });


    test('sort products by name A-Z', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.sortByNameAscending();

        const names = await inventoryPage.getProductNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    });


    test('sort products by name Z-A', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.sortByNameDescending();

        const names = await inventoryPage.getProductNames();
        const sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(sorted);
    });


    test('sort products by price low to high', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.sortByPriceLowToHigh();

        const prices = await inventoryPage.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });


    test('sort products by price high to low', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.sortByPriceHighToLow();

        const prices = await inventoryPage.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sorted);
    });

});

