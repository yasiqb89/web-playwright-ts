import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../data/users.json';

test('standard user can add a product to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('/inventory.html');

    // Add product 
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');


    // Assert cart count is 1 
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);
});


test('standard user can add multiple products to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');

    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(2);
});


test('standard user can remove a product from the cart', async ({ page }) => {
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


test('products are sorted by name A to Z when using name sort', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByNameAscending();

    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
});


test('products are sorted by name Z to A when using name sort', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByNameDescending();

    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
});


test('products are sorted by price low to high when using price sort', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
});


test('products are sorted by price high to low when using price sort', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.sortByPriceHighToLow();

    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
});


