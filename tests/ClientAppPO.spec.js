const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
const {POManager} = require('../pageobjects/POManager');
// const {LoginPage} = require('../pageobjects/LoginPage');
// const {DashboardPage} = require('../pageobjects/DashboardPage');
// const {CartPage} = require('../pageobjects/CartPage');
// const {CheckOutPage} = require('../pageobjects/CheckOutPage')
// const {MyOrdersPage} = require('../pageobjects/MyOrdersPage');

test.only('Log in Test',async ({page})=> {
    const poManager = new POManager(page);
    const userEmail = "gonzaronderos@gmail.com";
    const passsword = "Estudiantes?11";
    const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await expect(page.locator("h1.login-title")).toContainText("Log in");
    await loginPage.validLogin(userEmail, passsword);
    const dashboardPage = poManager.getDashBoardPage(); 
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.confirmProductAnProceedtoCheckout();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
    const checkOutPage = poManager.getCheckOutPage()
    await checkOutPage.completeShippingInfo();
    await checkOutPage.placeOrder();
    await expect(page.locator(".hero-primary")).toHaveText("  Thankyou for the order. ");
    const order = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const myOrderPage = poManager.getMyOrdersPage();
    await myOrderPage.goToMyOrders();
    await myOrderPage.verifyOrderIsListed(order);
});

