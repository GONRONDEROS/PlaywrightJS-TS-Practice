const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
const { info } = require('node:console');

test('Check Out Test',async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");


    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const lognInButton = page.locator("#login");
    const listedProductsArray = page.locator(".card-body");
    
    const productToBuy = "ZARA COAT 3";
    const goToCartBtn = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text='Checkout'");
    const personalInfoCard = page.locator(".form__cc");
    const infoCardFields = page.locator("div.field > input.input.txt");
    const applyCupponBtn = page.locator("div.field > button");
    const userShippingInfofield = page.locator("div.user__name > input.input");
    const countryShippingInfoField = page.locator("div.form-group > input");
    const placeOrderBtn = page.locator("div.actions > a")


    await expect(page.locator("h1.login-title")).toContainText("Log in");
    await userName.fill("gonzaronderos@gmail.com");
    await password.fill("Estudiantes?11");
    await lognInButton.click();
    await page.locator(".card-body b").first().waitFor();
    const productsCounter = await listedProductsArray.count();
    for(let i = 0; i < productsCounter; ++i) {
        if (await listedProductsArray.nth(i).locator("b").textContent() === productToBuy) {
            await listedProductsArray.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }

    await goToCartBtn.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/order?prop=%5B%226960eac0c941646b7a8b3e68%22%5D");
    await personalInfoCard.isVisible();
    await expect(infoCardFields.nth(0)).toHaveValue("4542 9931 9292 2293");
    await infoCardFields.nth(1).fill("528");
    await infoCardFields.nth(2).fill("Gonzalo Ronderos");
    await infoCardFields.nth(3).fill("rahulshettyacademy");
    await applyCupponBtn.click();
    await expect(await page.locator("div.field > p")).toContainText("* Coupon Applied");
    await expect(userShippingInfofield).toHaveValue("gonzaronderos@gmail.com");
    await countryShippingInfoField.pressSequentially("arg");
    await page.pause();







});

