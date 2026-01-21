//Login UI -> .json
//test -> .json, cart-,order, orderdetails, orderhistory

const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
let webContext;

test.beforeAll(async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("gonzaronderos@gmail.com");
    await page.locator('#userPassword').fill("Estudiantes?11");
    await page.locator("[name='login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
    


});

test('Log in Test',async ()=> {

    const email = "";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const allCardTitles = await page.locator(".card-body b").allTextContents();
    console.log(allCardTitles);
    const countProducts = await products.count();
    for(let i = 0; i < countProducts; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    };

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text='Checkout'").click();
    await page.getByPlaceholder("Select Country").pressSequentially("arg");
    await page.getByRole("button", {name : "Argentina"}).click();
    await page.getByText("PLACE ORDER").click();
    await page.getByTestId("Thankyou for the order.").isVisible();  
});