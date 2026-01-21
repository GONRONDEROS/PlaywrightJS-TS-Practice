const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrderCompletedPage} = require('../pageobjects/OrderCompletedPage')
const {MyOrdersPage} = require('../pageobjects/MyOrdersPage');

test.only('Log in Test',async ({page})=> {
    const userEmail = "gonzaronderos@gmail.com";
    const passsword = "Estudiantes?11";
    const productName = "ZARA COAT 3";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await expect(page.locator("h1.login-title")).toContainText("Log in");
    await loginPage.validLogin(userEmail, passsword);
    const dashboardPage = new DashboardPage(page); 
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    const cartPage = new CartPage(page);
    cartPage.confirmProductAnProceedtoCheckout();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
    const orderCompletedPage = new OrderCompletedPage(page);
    await orderCompletedPage.completeShippingInfo();
    await orderCompletedPage.placeOrder();
    await expect(page.locator(".hero-primary")).toHaveText("  Thankyou for the order. ");
    const order = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const myOrderPage = new MyOrdersPage(page);
    await myOrderPage.goToMyOrders();
    await myOrderPage.verifyOrderIsListed(order);
});

