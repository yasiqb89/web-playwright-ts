import { test, expect } from '../../fixtures/baseFixtures';
import users from '../../data/users.json';


test.describe('Cart Tests', () => {

    test('items added to cart should appear correctly in cart page', { tag: '@smoke' }, async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

        for (const product of productsToAdd) {
            await inventoryPage.addProductToCartByName(product);
        }

        await inventoryPage.goToCart();
        const cartNames = await cartPage.getItemNames();
        console.log(cartNames);

        expect(cartNames).toEqual(productsToAdd);
    });


    test('user can remove an item from the cart', async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

        for (const product of productsToAdd) {
            await inventoryPage.addProductToCartByName(product);
        }

        await inventoryPage.goToCart();
        await cartPage.removeItemByName('Sauce Labs Backpack');


        const cartNames = await cartPage.getItemNames();
        expect(cartNames).toEqual(['Sauce Labs Bike Light']);


    });

});
