const {test, expect} = require('@playwright/test');
const {customTest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
//Json > string > js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataSet)
{
test(`Log in Test - ${data.userEmail}, ${data.productName}`,async ({page})=> {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(data.userEmail, data.password);
    const dashboardPage = poManager.getDashBoardPage(); 
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkOut();

    const checkOutPage = poManager.getCheckOutPage()
    await checkOutPage.searchCountryAndSelect("arg","Argentina")
    const orderId = await checkOutPage.submitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    
    const myOrderPage = poManager.getMyOrdersPage();
    await myOrderPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await myOrderPage.getOrderId())).toBeTruthy();
});

}

customTest.only(`Log in Test (fixture Data)`,async ({page,testDataForOrder})=> {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userEmail, testDataForOrder.password);
    const dashboardPage = poManager.getDashBoardPage(); 
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkOut();
});
