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



