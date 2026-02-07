import { test, expect } from '../../fixtures/baseFixtures';
import users from '../../data/users.json';
import userInfo from '../../data/user-info.json';
import { url } from 'inspector';

test.describe('Checkout Tests', () => {

    test('user can complete checkout successfully', { tag: ['@smoke', '@checkout'] }, async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
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


    test('checkout error when first name is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo(
            userInfo.missingFirstName.firstName,
            userInfo.missingFirstName.lastName,
            userInfo.missingFirstName.postalCode
        );

        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });


    test('checkout error when last name is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo(
            userInfo.missingLastName.firstName,
            userInfo.missingLastName.lastName,
            userInfo.missingLastName.postalCode
        );

        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: Last Name is required');
    })


    test('checkout error when postal code is missing', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo(
            userInfo.invalidPostal.firstName,
            userInfo.invalidPostal.lastName,
            userInfo.invalidPostal.postalCode
        );

        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: Postal Code is required');
    })


    test('Cancel on checkout step one returns to Cart', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.cancelCheckout();

        expect(page.url()).toContain('/cart.html');
    })


    test('cancel on checkout step two returns to inventory', { tag: ['@checkout', '@regression'] }, async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo(
            userInfo.default.firstName,
            userInfo.default.lastName,
            userInfo.default.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.cancelCheckout();

        expect(page.url()).toContain('inventory.html');
    });

    test('order summary total matches sum of item prices plus tax', { tag: ['@checkout', '@regression'] }, async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

        for (const product of productsToAdd) {
            await inventoryPage.addProductToCartByName(product);
        }

        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo(
            userInfo.default.firstName,
            userInfo.default.lastName,
            userInfo.default.postalCode
        );
        await checkoutPage.continueToOverview();

        const itemPrices = await checkoutPage.getOverviewItemPrices();
        const expectedSubtotal = itemPrices.reduce((sum, price) => sum + price, 0);

        const subtotal = await checkoutPage.getSummarySubtotal();
        const tax = await checkoutPage.getSummaryTax();
        const total = await checkoutPage.getSummaryTotal();

        expect(subtotal).toBeCloseTo(expectedSubtotal, 2);

        const expectedTotal = subtotal + tax;
        expect(total).toBeCloseTo(expectedTotal, 2);
        console.log('Total:', total, 'Expected:', expectedTotal);
    });
});
